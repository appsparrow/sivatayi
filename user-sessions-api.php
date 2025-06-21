<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Allow CORS for your domain
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Validate required fields
    if (!isset($input['sessionId']) || !isset($input['name']) || !isset($input['questions'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing required fields: sessionId, name, questions']);
        exit;
    }
    
    $session_data = [
        'sessionId' => $input['sessionId'],
        'name' => $input['name'],
        'timestamp' => $input['timestamp'] ?? date('c'),
        'questions' => $input['questions'],
        'totalQuestions' => $input['totalQuestions'] ?? count($input['questions']),
        'sessionStatus' => $input['sessionStatus'] ?? 'incomplete',
        'ip' => $_SERVER['REMOTE_ADDR'],
        'userAgent' => $_SERVER['HTTP_USER_AGENT'] ?? '',
        'saved_at' => date('c')
    ];
    
    $file = 'user-sessions.json';
    
    // Read existing data
    $current_data = [];
    if (file_exists($file)) {
        $file_contents = file_get_contents($file);
        $current_data = json_decode($file_contents, true);
        if (!is_array($current_data)) {
            $current_data = [];
        }
    }
    
    // Check if session already exists (update existing entry)
    $session_updated = false;
    for ($i = 0; $i < count($current_data); $i++) {
        if ($current_data[$i]['sessionId'] === $session_data['sessionId']) {
            $current_data[$i] = $session_data;
            $session_updated = true;
            break;
        }
    }
    
    // If not updated, add as new entry
    if (!$session_updated) {
        $current_data[] = $session_data;
    }
    
    // Save to file
    if (file_put_contents($file, json_encode($current_data, JSON_PRETTY_PRINT))) {
        echo json_encode([
            'success' => true,
            'message' => $session_updated ? 'Session updated successfully' : 'Session saved successfully',
            'sessionId' => $session_data['sessionId'],
            'totalQuestions' => $session_data['totalQuestions']
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to save session data']);
    }
    
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed. Only POST requests are accepted.']);
}
?> 