<?php
// includes/get_student.php - Get single student
require_once __DIR__ . 'includes/db.php';

$id = $_GET['id'] ?? 0;

try {
    $stmt = $pdo->prepare("SELECT * FROM students WHERE id = :id");
    $stmt->execute([':id' => $id]);
    $student = $stmt->fetch();
    
    if ($student) {
        echo json_encode(['success' => true, 'student' => $student]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Student not found']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>