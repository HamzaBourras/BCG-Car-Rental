<!DOCTYPE html>
<html>

<head>
    <title>Nouveau message de contact</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style type="text/css">
        /* Base styles */
        body {
            font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            background-color: #f5f7fa;
            margin: 0;
            padding: 0;
        }

        /* Container */
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
        }

        /* Header */
        .email-header {
            background-color: #3f51b5;
            color: white;
            padding: 25px 30px;
            text-align: center;
        }

        .email-header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
            color: #ffffff;
        }

        /* Content */
        .email-content {
            padding: 30px;
        }

        .alert-banner {
            background-color: #fff3cd;
            color: #856404;
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 4px;
            border-left: 4px solid #ffc107;
            font-weight: 500;
        }

        .message-box {
            background-color: #f8f9fa;
            border-left: 4px solid #3f51b5;
            padding: 20px;
            margin: 20px 0;
            border-radius: 0 4px 4px 0;
        }

        .info-grid {
            display: grid;
            grid-template-columns: 120px 1fr;
            gap: 12px;
            margin-bottom: 15px;
        }

        .info-label {
            font-weight: 600;
            color: #3f51b5;
        }

        .info-value {
            color: #555555;
        }

        .message-text {
            white-space: pre-line;
            background-color: #ffffff;
            padding: 15px;
            border-radius: 4px;
            border: 1px solid #e0e0e0;
            margin-top: 15px;
        }

        /* Action buttons */
        .action-buttons {
            margin-top: 25px;
            display: flex;
            gap: 10px;
        }

        .btn {
            display: inline-block;
            padding: 10px 20px;
            border-radius: 4px;
            text-decoration: none;
            font-weight: 500;
        }

        .btn-primary {
            background-color: #3f51b5;
            color: white;
        }

        .btn-secondary {
            background-color: #6c757d;
            color: white;
        }

        /* Footer */
        .email-footer {
            background-color: #e9ecef;
            padding: 20px 30px;
            text-align: center;
            font-size: 14px;
            color: #6c757d;
            border-top: 1px solid #dee2e6;
        }

        .logo {
            max-width: 150px;
            margin-bottom: 15px;
        }

        /* Responsive adjustments */
        @media only screen and (max-width: 600px) {
            .email-container {
                margin: 0;
                border-radius: 0;
            }

            .info-grid {
                grid-template-columns: 1fr;
            }

            .action-buttons {
                flex-direction: column;
            }
        }
    </style>
</head>

<body>
    <div class="email-container">
        <div class="email-header">
            <h1>Nouveau message de contact</h1>
        </div>

        <div class="email-content">
            <div class="alert-banner">
                Un visiteur a envoyé un message via le formulaire de contact
            </div>

            <div class="message-box">
                <div class="info-grid">
                    <span class="info-label">Client :</span>
                    <span class="info-value">{{ $prenom }} {{ $nom }}</span>
                </div>

                <div class="info-grid">
                    <span class="info-label">Email :</span>
                    <span class="info-value">
                        <a href="mailto:{{ $email }}">{{ $email }}</a>
                    </span>
                </div>

                <div class="info-grid">
                    <span class="info-label">Téléphone :</span>
                    <span class="info-value">
                        <a href="tel:{{ $telephone }}">{{ $telephone }}</a>
                    </span>
                </div>

                <div class="info-grid">
                    <span class="info-label">Date :</span>
                    <span class="info-value">{{ now()->format('d/m/Y H:i') }}</span>
                </div>

                <div class="info-grid">
                    <span class="info-label">Message :</span>
                    <div class="info-value message-text">{{ $content }}</div>
                </div>
            </div>

            {{-- <div class="action-buttons">
                <a href="mailto:{{ $email }}" class="btn btn-primary">Répondre au client</a>
                <a href="{{ url('/admin/contacts') }}" class="btn btn-secondary">Voir dans l'admin</a>
            </div> --}}
        </div>

        <div class="email-footer">
            {{-- <img src="{{ url('/frontend/images/logo2.png') }}" alt="BCG Location" class="logo"> --}}
            <p>© {{ date('Y') }} BCG Location. Tous droits réservés.</p>
            <p>Ce message a été généré automatiquement.</p>
        </div>
    </div>
</body>

</html>
