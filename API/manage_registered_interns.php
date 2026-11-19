<?php
require_once 'config.php';
session_start();

if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    sendJsonResponse(['success' => false, 'message' => 'Unauthorized access. Please login first.'], 401);
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
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
                'No.' => (string)$index++,
                'Name of Student' => $row['student_name'],
                'Course & Semester' => $row['course_semester'],
                'Duration' => $row['duration'],
                'College/University' => $row['college'],
            ];
        }

        sendJsonResponse(['success' => true, 'data' => $formatted]);
    } catch (PDOException $e) {
        sendJsonResponse(['success' => false, 'message' => 'Failed to retrieve records.', 'error' => $e->getMessage()], 500);
    }
}

if ($method !== 'POST') {
    sendJsonResponse(['success' => false, 'message' => 'Invalid request method.'], 405);
}

$input = json_decode(file_get_contents('php://input'), true) ?? [];
$action = $input['action'] ?? '';

switch ($action) {
    case 'create':
        $name = trim($input['student_name'] ?? '');
        $course = trim($input['course_semester'] ?? '');
        $duration = trim($input['duration'] ?? '');
        $college = trim($input['college'] ?? '');
        $sortOrder = (int)($input['sort_order'] ?? 0);

        if (empty($name)) {
            sendJsonResponse(['success' => false, 'message' => 'Student name is required.'], 400);
        }

        try {
            $stmt = $pdo->prepare("INSERT INTO registered_interns (student_name, course_semester, duration, college, sort_order) VALUES (?, ?, ?, ?, ?)");
            $stmt->execute([$name, $course, $duration, $college, $sortOrder]);
            $newId = (int)$pdo->lastInsertId();

            sendJsonResponse(['success' => true, 'message' => 'Student record added successfully.', 'id' => $newId]);
        } catch (PDOException $e) {
            sendJsonResponse(['success' => false, 'message' => 'Failed to add student record.', 'error' => $e->getMessage()], 500);
        }
        break;

    case 'update':
        $id = (int)($input['id'] ?? 0);
        $name = trim($input['student_name'] ?? '');
        $course = trim($input['course_semester'] ?? '');
        $duration = trim($input['duration'] ?? '');
        $college = trim($input['college'] ?? '');
        $sortOrder = (int)($input['sort_order'] ?? 0);

        if ($id <= 0 || empty($name)) {
            sendJsonResponse(['success' => false, 'message' => 'Valid ID and student name are required.'], 400);
        }

        try {
            $stmt = $pdo->prepare("UPDATE registered_interns SET student_name = ?, course_semester = ?, duration = ?, college = ?, sort_order = ? WHERE id = ?");
            $stmt->execute([$name, $course, $duration, $college, $sortOrder, $id]);

            sendJsonResponse(['success' => true, 'message' => 'Student record updated successfully.']);
        } catch (PDOException $e) {
            sendJsonResponse(['success' => false, 'message' => 'Failed to update student record.', 'error' => $e->getMessage()], 500);
        }
        break;

    case 'delete':
        $id = (int)($input['id'] ?? 0);
        if ($id <= 0) {
            sendJsonResponse(['success' => false, 'message' => 'Invalid record ID.'], 400);
        }

        try {
            $stmt = $pdo->prepare("DELETE FROM registered_interns WHERE id = ?");
            $stmt->execute([$id]);

            sendJsonResponse(['success' => true, 'message' => 'Student record deleted successfully.']);
        } catch (PDOException $e) {
            sendJsonResponse(['success' => false, 'message' => 'Failed to delete record.', 'error' => $e->getMessage()], 500);
        }
        break;

    case 'bulk_import':
        $records = $input['records'] ?? [];
        $replaceAll = !empty($input['replace_all']);

        if (!is_array($records) || empty($records)) {
            sendJsonResponse(['success' => false, 'message' => 'No valid records provided for import.'], 400);
        }

        try {
            $pdo->beginTransaction();

            if ($replaceAll) {
                $pdo->exec("TRUNCATE TABLE registered_interns");
            }

            $stmt = $pdo->prepare("INSERT INTO registered_interns (student_name, course_semester, duration, college, sort_order) VALUES (?, ?, ?, ?, ?)");

            $count = 0;
            foreach ($records as $index => $rec) {
                $name = trim($rec['student_name'] ?? $rec['Name of Student'] ?? '');
                $course = trim($rec['course_semester'] ?? $rec['Course & Semester'] ?? '');
                $duration = trim($rec['duration'] ?? $rec['Duration'] ?? '');
                $college = trim($rec['college'] ?? $rec['College/University'] ?? '');
                $sort = (int)($rec['sort_order'] ?? ($index + 1));

                if (!empty($name)) {
                    $stmt->execute([$name, $course, $duration, $college, $sort]);
                    $count++;
                }
            }

            $pdo->commit();
            sendJsonResponse(['success' => true, 'message' => "Successfully imported {$count} records.", 'imported_count' => $count]);
        } catch (PDOException $e) {
            if ($pdo->inTransaction()) {
                $pdo->rollBack();
            }
            sendJsonResponse(['success' => false, 'message' => 'Failed to import records.', 'error' => $e->getMessage()], 500);
        }
        break;

    default:
        sendJsonResponse(['success' => false, 'message' => 'Invalid action.'], 400);
}
?>
