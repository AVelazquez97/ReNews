<?php

namespace App\Services;

use Config\Services;

class EmailService
{
    public function sendNewPasswordEmail($email, $newPassword)
    {
        $emailConfig = Services::email();

//        $emailConfig->setFrom(env('mail.From'), env('mail.FromName'));
        $emailConfig->setTo($email);
        $emailConfig->setSubject('Tu nueva contraseña de ReNews');

        $message = "Hola, \n\n";
        $message .= "Has solicitado una nueva contraseña. Aquí la tienes: \n\n";
        $message .= $newPassword;
        $message .= "\n\nPor favor, cambia tu contraseña después de iniciar sesión.";
        $message .= "\n\nSaludos, \nEl equipo de ReNews";

        $emailConfig->setMessage($message);

        if ($emailConfig->send()) {
            log_message('info', 'New password email sent to ' . $email);
        } else {
            log_message('error', 'Failed to send new password email to ' . $email);
        }
    }
}