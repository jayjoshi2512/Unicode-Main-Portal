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
        
        // In a real production environment, you should use a proper mailer like PHPMailer.
        // For simplicity, using mail() function here. Make sure server is configured to send emails.
        $subject = "Admin Login OTP";
        $message = "Your admin login OTP is: $otp. It is valid for 15 minutes.";
        $headers = "From: no-reply@unicodetech.in\r\n";
        
        mail($email, $subject, $message, $headers);
        
        sendJsonResponse(['success' => true, 'message' => 'OTP sent successfully.']);
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
        sendJsonResponse(['success' => false, 'message' => 'Not authenticated.'], 401);
    }
} elseif ($action === 'logout') {
    session_destroy();
    sendJsonResponse(['success' => true, 'message' => 'Logged out successfully.']);
} else {
    sendJsonResponse(['success' => false, 'message' => 'Invalid action.'], 400);
}
?>
