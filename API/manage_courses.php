<?php
require_once 'config.php';
session_start();

// Admin Authentication Required
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    sendJsonResponse(['success' => false, 'message' => 'Unauthorized access. Please login first.'], 401);
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // List all courses for admin
    try {
        $stmt = $pdo->query("SELECT * FROM internship_courses ORDER BY sort_order ASC, id ASC");
        $courses = $stmt->fetchAll();

        $formatted = array_map(function($course) {
            $curriculum = [];
            if (!empty($course['curriculum'])) {
                $decoded = json_decode($course['curriculum'], true);
                if (is_array($decoded)) {
                    $curriculum = $decoded;
                } else {
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
        sendJsonResponse(['success' => false, 'message' => 'Failed to retrieve courses.', 'error' => $e->getMessage()], 500);
    }
}

if ($method !== 'POST') {
    sendJsonResponse(['success' => false, 'message' => 'Invalid request method.'], 405);
}

$input = json_decode(file_get_contents('php://input'), true) ?? [];
$action = $input['action'] ?? '';

// Helper to slugify string
function generateSlug($text) {
    $text = preg_replace('~[^\pL\d]+~u', '-', $text);
    $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);
    $text = preg_replace('~[^-\w]+~', '', $text);
    $text = trim($text, '-');
    $text = preg_replace('~-+~', '-', $text);
    $text = strtolower($text);
    return empty($text) ? 'course-' . time() : $text;
}

switch ($action) {
    case 'toggle_status':
        $id = (int)($input['id'] ?? 0);
        $isActive = !empty($input['is_active']) ? 1 : 0;
        if ($id <= 0) {
            sendJsonResponse(['success' => false, 'message' => 'Invalid course ID.'], 400);
        }

        try {
            $stmt = $pdo->prepare("UPDATE internship_courses SET is_active = ? WHERE id = ?");
            $stmt->execute([$isActive, $id]);
            sendJsonResponse(['success' => true, 'message' => 'Course status updated successfully.']);
        } catch (PDOException $e) {
            sendJsonResponse(['success' => false, 'message' => 'Failed to update status.', 'error' => $e->getMessage()], 500);
        }
        break;

    case 'create':
        $title = trim($input['title'] ?? '');
        if (empty($title)) {
            sendJsonResponse(['success' => false, 'message' => 'Course title is required.'], 400);
        }

        $slug = trim($input['slug'] ?? '');
        if (empty($slug)) {
            $slug = generateSlug($title);
        } else {
            $slug = generateSlug($slug);
        }

        // Check if slug exists, if so append unique suffix
        $stmt = $pdo->prepare("SELECT COUNT(*) FROM internship_courses WHERE slug = ?");
        $stmt->execute([$slug]);
        if ($stmt->fetchColumn() > 0) {
            $slug .= '-' . time();
        }

        $durationValue = max(1, (int)($input['duration_value'] ?? 1));
        $durationUnit = in_array($input['duration_unit'] ?? '', ['Weeks', 'Days', 'Months', 'Hours']) ? $input['duration_unit'] : 'Weeks';
        $duration = "{$durationValue} {$durationUnit}";
        $mode = in_array($input['mode'] ?? '', ['On-site', 'Online', 'Hybrid']) ? $input['mode'] : 'On-site';
        $isActive = !empty($input['is_active']) ? 1 : 0;
        $description = trim($input['description'] ?? '');
        $sortOrder = (int)($input['sort_order'] ?? 0);

        // Curriculum formatting
        $curriculum = $input['curriculum'] ?? [];
        if (is_array($curriculum)) {
            $curriculumJson = json_encode(array_values(array_filter(array_map('trim', $curriculum))));
        } else {
            $curriculumJson = json_encode([]);
        }

        try {
            $stmt = $pdo->prepare("INSERT INTO internship_courses 
                (slug, title, duration_value, duration_unit, duration, mode, is_active, description, curriculum, sort_order) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([
                $slug,
                $title,
                $durationValue,
                $durationUnit,
                $duration,
                $mode,
                $isActive,
                $description,
                $curriculumJson,
                $sortOrder
            ]);

            $newId = (int)$pdo->lastInsertId();
            sendJsonResponse([
                'success' => true,
                'message' => 'Course created successfully.',
                'course_id' => $newId
            ]);
        } catch (PDOException $e) {
            sendJsonResponse(['success' => false, 'message' => 'Failed to create course.', 'error' => $e->getMessage()], 500);
        }
        break;

    case 'update':
        $id = (int)($input['id'] ?? 0);
        if ($id <= 0) {
            sendJsonResponse(['success' => false, 'message' => 'Invalid course ID.'], 400);
        }

        $title = trim($input['title'] ?? '');
        if (empty($title)) {
            sendJsonResponse(['success' => false, 'message' => 'Course title is required.'], 400);
        }

        $slug = trim($input['slug'] ?? '');
        if (empty($slug)) {
            $slug = generateSlug($title);
        } else {
            $slug = generateSlug($slug);
        }

        // Check if slug taken by another course
        $stmt = $pdo->prepare("SELECT COUNT(*) FROM internship_courses WHERE slug = ? AND id != ?");
        $stmt->execute([$slug, $id]);
        if ($stmt->fetchColumn() > 0) {
            $slug .= '-' . time();
        }

        $durationValue = max(1, (int)($input['duration_value'] ?? 1));
        $durationUnit = in_array($input['duration_unit'] ?? '', ['Weeks', 'Days', 'Months', 'Hours']) ? $input['duration_unit'] : 'Weeks';
        $duration = "{$durationValue} {$durationUnit}";
        $mode = in_array($input['mode'] ?? '', ['On-site', 'Online', 'Hybrid']) ? $input['mode'] : 'On-site';
        $isActive = !empty($input['is_active']) ? 1 : 0;
        $description = trim($input['description'] ?? '');
        $sortOrder = (int)($input['sort_order'] ?? 0);

        // Curriculum formatting
        $curriculum = $input['curriculum'] ?? [];
        if (is_array($curriculum)) {
            $curriculumJson = json_encode(array_values(array_filter(array_map('trim', $curriculum))));
        } else {
            $curriculumJson = json_encode([]);
        }

        try {
            $stmt = $pdo->prepare("UPDATE internship_courses SET 
                slug = ?,
                title = ?,
                duration_value = ?,
                duration_unit = ?,
                duration = ?,
                mode = ?,
                is_active = ?,
                description = ?,
                curriculum = ?,
                sort_order = ?
                WHERE id = ?");
            $stmt->execute([
                $slug,
                $title,
                $durationValue,
                $durationUnit,
                $duration,
                $mode,
                $isActive,
                $description,
                $curriculumJson,
                $sortOrder,
                $id
            ]);

            sendJsonResponse(['success' => true, 'message' => 'Course updated successfully.']);
        } catch (PDOException $e) {
            sendJsonResponse(['success' => false, 'message' => 'Failed to update course.', 'error' => $e->getMessage()], 500);
        }
        break;

    case 'delete':
        $id = (int)($input['id'] ?? 0);
        if ($id <= 0) {
            sendJsonResponse(['success' => false, 'message' => 'Invalid course ID.'], 400);
        }

        try {
            $stmt = $pdo->prepare("DELETE FROM internship_courses WHERE id = ?");
            $stmt->execute([$id]);
            sendJsonResponse(['success' => true, 'message' => 'Course deleted successfully.']);
        } catch (PDOException $e) {
            sendJsonResponse(['success' => false, 'message' => 'Failed to delete course.', 'error' => $e->getMessage()], 500);
        }
        break;

    default:
        sendJsonResponse(['success' => false, 'message' => 'Unknown action.'], 400);
}
?>
