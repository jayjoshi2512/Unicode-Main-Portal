<?php
require_once 'config.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJsonResponse(['success' => false, 'message' => 'Invalid request method.'], 405);
}

$data = json_decode(file_get_contents('php://input'), true);
$action = $data['action'] ?? '';

$adminEmail = $_ENV['ADMIN_EMAIL'] ?? 'joshijayc075@gmail.com';

if ($action === 'send_otp') {
    $email = $adminEmail;

    $otp = sprintf("%06d", mt_rand(1, 999999));

    try {
        $stmt = $pdo->prepare("INSERT INTO admin_otp (email, otp, expires_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 15 MINUTE))");
        $stmt->execute([$email, $otp]);

        $subject = "Admin Login OTP";
        $message = "Your admin login OTP is: $otp. It is valid for 15 minutes.";

        // Read SMTP settings from environment
        $smtpHost = $_ENV['SMTP_HOST'] ?? 'localhost';
        // Force localhost if it's set to gmail but the user is unicodetechnolab.com to avoid interception bugs
        if (strpos($smtpHost, 'gmail') !== false && strpos($_ENV['SMTP_USER'] ?? '', 'unicodetechnolab.com') !== false) {
            $smtpHost = 'localhost';
        }
        $smtpPort = intval($_ENV['SMTP_PORT'] ?? 587);
        $smtpUser = $_ENV['SMTP_USER'] ?? '';
        $smtpPass = $_ENV['SMTP_PASS'] ?? '';
        $smtpFromName = $_ENV['SMTP_FROM_NAME'] ?? 'Unicode Portal';

        function smtp_get_response($sock) {
            $resp = '';
            while ($line = fgets($sock, 515)) {
                $resp .= $line;
                if (isset($line[3]) && $line[3] === ' ') break;
            }
            return $resp;
        }

        function smtp_send($host, $port, $user, $pass, $fromEmail, $fromName, $toEmail, $subject, $body) {
            $timeout = 10;
            $errno = 0;
            $errstr = '';
            $useImplicitTls = ($port === 465);

            $target = $useImplicitTls ? 'ssl://' . $host : $host;
            $sock = fsockopen($target, $port, $errno, $errstr, $timeout);
            if (!$sock) throw new Exception("SMTP connect failed: $errstr ($errno)");
            stream_set_timeout($sock, $timeout);

            $greeting = smtp_get_response($sock);
            $serverName = $_SERVER['SERVER_NAME'] ?? 'localhost';
            
            fputs($sock, "EHLO $serverName\r\n");
            $ehlo = smtp_get_response($sock);

            if (!$useImplicitTls) {
                fputs($sock, "STARTTLS\r\n");
                $starttls = smtp_get_response($sock);
                if (intval(substr($starttls, 0, 3)) === 220) {
                    $cryptoMethod = defined('STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT') ? STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT : STREAM_CRYPTO_METHOD_TLS_CLIENT;
                    stream_socket_enable_crypto($sock, true, $cryptoMethod);
                    fputs($sock, "EHLO $serverName\r\n");
                    smtp_get_response($sock);
                }
            }

            fputs($sock, "AUTH LOGIN\r\n");
            smtp_get_response($sock);
            fputs($sock, base64_encode($user) . "\r\n");
            smtp_get_response($sock);
            fputs($sock, base64_encode($pass) . "\r\n");
            $passResp = smtp_get_response($sock);
            if (intval(substr($passResp, 0, 3)) !== 235) throw new Exception('Auth failed');

            fputs($sock, "MAIL FROM:<$fromEmail>\r\n");
            smtp_get_response($sock);
            fputs($sock, "RCPT TO:<$toEmail>\r\n");
            smtp_get_response($sock);

            fputs($sock, "DATA\r\n");
            smtp_get_response($sock);

            $headers = "Date: " . date("r") . "\r\n";
            $headers .= "Message-ID: <" . md5(uniqid(time())) . "@" . $serverName . ">\r\n";
            $headers .= "From: $fromName <$fromEmail>\r\n";
            $headers .= "To: <$toEmail>\r\n";
            $headers .= "Subject: $subject\r\n";
            $headers .= "MIME-Version: 1.0\r\n";
            $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

            fputs($sock, $headers . "\r\n" . $body . "\r\n.\r\n");
            $sendResp = smtp_get_response($sock);
            if (intval(substr($sendResp, 0, 3)) !== 250) throw new Exception('Mail rejected');

            fputs($sock, "QUIT\r\n");
            fclose($sock);
        }

        try {
            smtp_send($smtpHost, $smtpPort, $smtpUser, $smtpPass, $smtpUser, $smtpFromName, $email, $subject, $message);
            sendJsonResponse(['success' => true, 'message' => 'OTP sent successfully.']);
        } catch (Exception $e) {
            sendJsonResponse(['success' => false, 'message' => 'Failed to send OTP via authenticated SMTP.', 'error' => $e->getMessage()], 500);
        }
    } catch (Exception $e) {
        sendJsonResponse(['success' => false, 'message' => 'Failed to send OTP.', 'error' => $e->getMessage()], 500);
    }
} elseif ($action === 'verify_otp') {
    $email = $adminEmail;
    $otp = trim($data['otp'] ?? '');

    try {
        $stmt = $pdo->prepare("SELECT * FROM admin_otp WHERE email = ? AND otp = ? AND expires_at > NOW() ORDER BY id DESC LIMIT 1");
        $stmt->execute([$email, $otp]);
        $record = $stmt->fetch();

        if ($record) {
            // Success
            $_SESSION['admin_logged_in'] = true;
            $_SESSION['admin_email'] = $email;

            // Delete used OTP
            $pdo->prepare("DELETE FROM admin_otp WHERE email = ?")->execute([$email]);

            sendJsonResponse(['success' => true, 'message' => 'Login successful.']);
        } else {
            sendJsonResponse(['success' => false, 'message' => 'Invalid or expired OTP.'], 401);
        }
    } catch (Exception $e) {
        sendJsonResponse(['success' => false, 'message' => 'Verification failed.'], 500);
    }
} elseif ($action === 'check_auth') {
    if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true) {
        sendJsonResponse(['success' => true, 'message' => 'Authenticated.']);
    } else {
        sendJsonResponse(['success' => false, 'message' => 'Not authenticated.']);
    }
} elseif ($action === 'logout') {
    session_destroy();
    sendJsonResponse(['success' => true, 'message' => 'Logged out successfully.']);
} else {
    sendJsonResponse(['success' => false, 'message' => 'Invalid action.'], 400);
}
