<?php
require_once 'config.php';

// Public GET endpoint to retrieve internship courses
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    sendJsonResponse(['success' => false, 'message' => 'Invalid request method.'], 405);
}

try {
    // Ensure table exists
    $stmt = $pdo->query("SELECT * FROM internship_courses ORDER BY sort_order ASC, id ASC");
    $courses = $stmt->fetchAll();

    // Format fields
    $formatted = array_map(function($course) {
        $curriculum = [];
        if (!empty($course['curriculum'])) {
            $decoded = json_decode($course['curriculum'], true);
            if (is_array($decoded)) {
                $curriculum = $decoded;
            } else {
                // If stored as newline separated
                $curriculum = array_filter(array_map('trim', explode("\n", $course['curriculum'])));
            }
        }

        return [
            'id' => (int)$course['id'],
            'slug' => $course['slug'],
            'title' => $course['title'],
            'duration_value' => (int)$course['duration_value'],
            'duration_unit' => $course['duration_unit'],
            'duration' => $course['duration'],
            'mode' => $course['mode'],
            'is_active' => (bool)$course['is_active'],
            'description' => $course['description'] ?? '',
            'curriculum' => array_values($curriculum),
            'sort_order' => (int)$course['sort_order'],
            'created_at' => $course['created_at'],
            'updated_at' => $course['updated_at'] ?? $course['created_at'],
        ];
    }, $courses);

    sendJsonResponse(['success' => true, 'data' => $formatted]);
} catch (PDOException $e) {
    sendJsonResponse(['success' => false, 'message' => 'Failed to fetch courses.', 'error' => $e->getMessage()], 500);
}
?>
