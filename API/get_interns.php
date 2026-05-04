<?php
require_once 'config.php';
session_start();

if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    sendJsonResponse(['success' => false, 'message' => 'Unauthorized access.'], 401);
}

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    sendJsonResponse(['success' => false, 'message' => 'Invalid request method.'], 405);
}

try {
    $stmt = $pdo->query("SELECT * FROM internships ORDER BY created_at DESC");
    $interns = $stmt->fetchAll();
    
    sendJsonResponse(['success' => true, 'data' => $interns]);
} catch (PDOException $e) {
    sendJsonResponse(['success' => false, 'message' => 'Failed to fetch data.', 'error' => $e->getMessage()], 500);
}
?>
