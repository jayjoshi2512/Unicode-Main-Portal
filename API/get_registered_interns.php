<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    sendJsonResponse(['success' => false, 'message' => 'Invalid request method.'], 405);
}

try {
    $stmt = $pdo->query("SELECT * FROM registered_interns ORDER BY sort_order ASC, id ASC");
    $rows = $stmt->fetchAll();

    $formatted = [];
    $index = 1;
    foreach ($rows as $row) {
        $formatted[] = [
            'id' => (int)$row['id'],
            'student_name' => $row['student_name'],
            'course_semester' => $row['course_semester'],
            'duration' => $row['duration'],
            'college' => $row['college'],
            'sort_order' => (int)$row['sort_order'],
            'created_at' => $row['created_at'],
            // Matches InternshipTable columns format
            'No.' => (string)$index++,
            'Name of Student' => $row['student_name'],
            'Course & Semester' => $row['course_semester'],
            'Duration' => $row['duration'],
            'College/University' => $row['college'],
        ];
    }

    sendJsonResponse(['success' => true, 'data' => $formatted]);
} catch (PDOException $e) {
    sendJsonResponse(['success' => false, 'message' => 'Failed to fetch registered interns.', 'error' => $e->getMessage()], 500);
}
?>
