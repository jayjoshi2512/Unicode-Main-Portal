<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJsonResponse(['success' => false, 'message' => 'Invalid request method.'], 405);
}

$data = json_decode(file_get_contents('php://input'), true);

$internshipType = trim($data['internshipType'] ?? '');
$name = trim($data['name'] ?? '');
$gender = trim($data['gender'] ?? '');
$email = trim($data['email'] ?? '');
$phone = trim($data['phone'] ?? '');
$college = trim($data['college'] ?? '');
$city = trim($data['city'] ?? '');

if (empty($internshipType) || empty($name) || empty($gender) || empty($email) || empty($phone) || empty($college) || empty($city)) {
    sendJsonResponse(['success' => false, 'message' => 'All fields are required.'], 400);
}

// Domain validation (backend)
$emailLower = strtolower($email);
if (!str_ends_with($emailLower, '@gmail.com') && !str_ends_with($emailLower, '@outlook.com') && !str_ends_with($emailLower, '@yahoo.com')) {
    sendJsonResponse(['success' => false, 'message' => 'Please use a valid Gmail, Outlook, or Yahoo email address.'], 400);
}

try {
    $stmt = $pdo->prepare("INSERT INTO internships (internship_type, name, gender, email, phone, college, city) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([$internshipType, $name, $gender, $email, $phone, $college, $city]);
    sendJsonResponse(['success' => true, 'message' => 'Application submitted successfully.']);
} catch (PDOException $e) {
    sendJsonResponse(['success' => false, 'message' => 'Failed to save application.', 'error' => $e->getMessage()], 500);
}
?>
