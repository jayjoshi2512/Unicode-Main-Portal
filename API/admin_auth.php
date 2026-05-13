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
    // Static OTP configuration, no email sent
    sendJsonResponse(['success' => true, 'message' => 'OTP sent successfully. (Static mode active)']);
} elseif ($action === 'verify_otp') {
    $email = $adminEmail;
    $otp = trim($data['otp'] ?? '');

    try {
        if ($otp === '780621') {
            // Success
            $_SESSION['admin_logged_in'] = true;
            $_SESSION['admin_email'] = $email;

            sendJsonResponse(['success' => true, 'message' => 'Login successful.']);
        } else {
            sendJsonResponse(['success' => false, 'message' => 'Invalid OTP.'], 401);
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
