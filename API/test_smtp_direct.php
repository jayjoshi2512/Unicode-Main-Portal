<?php
header('Content-Type: text/plain');
$smtpHost = 'mail.unicodetechnolab.com';
$smtpPort = 465;
$smtpUser = 'admin@unicodetechnolab.com';
$smtpPass = 'Unicode@7749';
$adminEmail = 'joshijayc075@gmail.com';
$smtpFromName = 'Unicode Portal Test';

$subject = "Admin Login OTP Test SSL Context";
$message = "Test message with new SSL context";

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

    $target = $useImplicitTls ? 'ssl://' . $host : 'tcp://' . $host;
    
    $context = stream_context_create([
        'ssl' => [
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        ]
    ]);
    
    echo "Connecting to $target:$port...\n";
    $sock = stream_socket_client($target . ':' . $port, $errno, $errstr, $timeout, STREAM_CLIENT_CONNECT, $context);
    if (!$sock) throw new Exception("SMTP connect failed: $errstr ($errno)");
    stream_set_timeout($sock, $timeout);

    echo "Connect: " . smtp_get_response($sock);
    $serverName = 'localhost';
    
    fputs($sock, "EHLO $serverName\r\n");
    echo "EHLO: " . smtp_get_response($sock);

    fputs($sock, "AUTH LOGIN\r\n");
    echo "AUTH: " . smtp_get_response($sock);
    
    fputs($sock, base64_encode($user) . "\r\n");
    echo "USER: " . smtp_get_response($sock);
    
    fputs($sock, base64_encode($pass) . "\r\n");
    $passResp = smtp_get_response($sock);
    echo "PASS: " . $passResp;
    if (intval(substr($passResp, 0, 3)) !== 235) throw new Exception('Auth failed: ' . trim($passResp));

    fputs($sock, "MAIL FROM:<$fromEmail>\r\n");
    echo "MAIL FROM: " . smtp_get_response($sock);
    
    fputs($sock, "RCPT TO:<$toEmail>\r\n");
    echo "RCPT TO: " . smtp_get_response($sock);

    fputs($sock, "DATA\r\n");
    echo "DATA: " . smtp_get_response($sock);

    $headers = "Date: " . date("r") . "\r\n";
    $headers .= "Message-ID: <" . md5(uniqid(time())) . "@" . $serverName . ">\r\n";
    $headers .= "From: $fromName <$fromEmail>\r\n";
    $headers .= "To: <$toEmail>\r\n";
    $headers .= "Subject: $subject\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    fputs($sock, $headers . "\r\n" . $body . "\r\n.\r\n");
    $sendResp = smtp_get_response($sock);
    echo "SEND: " . $sendResp;
    if (intval(substr($sendResp, 0, 3)) !== 250) throw new Exception('Mail rejected: ' . trim($sendResp));

    fputs($sock, "QUIT\r\n");
    echo "QUIT: " . smtp_get_response($sock);
    fclose($sock);
}

try {
    smtp_send($smtpHost, $smtpPort, $smtpUser, $smtpPass, $smtpUser, $smtpFromName, $adminEmail, $subject, $message);
    echo "\n\n✅ Done. Email successfully accepted by server.\n";
} catch (Exception $e) {
    echo "\n\n❌ Error: " . $e->getMessage() . "\n";
}
