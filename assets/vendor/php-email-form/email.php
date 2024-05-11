<?php
header("Access-Control-Allow-Origin: *");

// Define Kwanele Dladla's email address
$recipient_email = "kwanele@example.com";

// Get form data (sanitize input)
$name = htmlspecialchars($_POST['name']);
$email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
$message = htmlspecialchars($_POST['message']);

// Check for required fields
if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400); // Bad Request
    echo "Error: Please fill out all required fields.";
    exit;
}

// Compose email message
$subject = "New message from $name";
$body = "Name: $name\n";
$body .= "Email: $email\n";
$body .= "Message: $message\n";

// Set additional headers
$headers = "From: $name <$email>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Send email
$mail_sent = mail($recipient_email, $subject, $body, $headers);

// Check if email was sent successfully
if ($mail_sent) {
    echo "OK"; // Send success response to the client-side JavaScript
} else {
    http_response_code(500); // Internal Server Error
    echo "Error: Failed to send email"; // Send error response to the client-side JavaScript
}
?>
