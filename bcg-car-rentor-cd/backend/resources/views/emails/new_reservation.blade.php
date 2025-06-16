<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nouvelle réservation de voiture</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Arial', sans-serif;
            background-color: #f5f5f5;
            color: #333;
            line-height: 1.6;
            padding: 20px;
        }

        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }

        .header {
            background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
            color: white;
            padding: 30px;
            text-align: center;
            position: relative;
        }

        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20"><defs><pattern id="grain" width="100" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="50" cy="5" r="0.5" fill="rgba(255,255,255,0.05)"/><circle cx="80" cy="15" r="1.5" fill="rgba(255,255,255,0.08)"/></pattern></defs><rect width="100" height="20" fill="url(%23grain)"/></svg>');
            opacity: 0.3;
        }

        .header h2 {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 10px;
            position: relative;
            z-index: 1;
        }

        .header .subtitle {
            font-size: 16px;
            opacity: 0.9;
            position: relative;
            z-index: 1;
        }

        .content {
            padding: 40px 30px;
        }

        .reservation-card {
            background: #f8f9fa;
            border-left: 5px solid #dc2626;
            border-radius: 8px;
            padding: 25px;
            margin-bottom: 30px;
        }

        .info-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 0;
            border-bottom: 1px solid #e5e7eb;
        }

        .info-row:last-child {
            border-bottom: none;
        }

        .info-label {
            font-weight: 600;
            color: #374151;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            flex: 1;
        }

        .info-value {
            font-weight: 500;
            color: #111827;
            font-size: 16px;
            text-align: right;
            flex: 2;
        }

        .price-highlight {
            background: linear-gradient(135deg, #dc2626, #ef4444);
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            text-align: center;
            font-size: 24px;
            font-weight: 700;
            margin: 20px 0;
            box-shadow: 0 4px 15px rgba(220, 38, 38, 0.3);
        }

        .cta-section {
            text-align: center;
            margin-top: 30px;
            padding: 25px;
            background: #f9fafb;
            border-radius: 8px;
            border: 1px solid #e5e7eb;
        }

        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #111827, #374151);
            color: white;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            font-size: 16px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }

        .footer {
            background: #111827;
            color: #9ca3af;
            padding: 20px 30px;
            text-align: center;
            font-size: 14px;
        }

        .footer .company-name {
            color: #dc2626;
            font-weight: 600;
        }

        .alert-badge {
            display: inline-block;
            background: #dc2626;
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 20px;
        }

        @media (max-width: 600px) {
            .email-container {
                margin: 0;
                border-radius: 0;
            }

            .header,
            .content,
            .footer {
                padding: 20px;
            }

            .info-row {
                flex-direction: column;
                align-items: flex-start;
                gap: 5px;
            }

            .info-value {
                text-align: left;
            }

            .header h2 {
                font-size: 24px;
            }
        }
    </style>
</head>

<body>
    <div class="email-container">
        <div class="header">
            <div class="alert-badge">Nouvelle réservation</div>
            <h2>Réservation confirmée</h2>
            <p class="subtitle">Une nouvelle demande de location vient d'être effectuée</p>
        </div>

        <div class="content">
            <div class="reservation-card">
                <div class="info-row">
                    <span class="info-label">Client</span>
                    <span class="info-value">{{ $reservation->user->nom }} {{ $reservation->user->prenom }}</span>
                </div>

                <div class="info-row">
                    <span class="info-label">Voiture</span>
                    <span class="info-value">{{ $reservation->voiture->marque }}
                        {{ $reservation->voiture->modele }}</span>
                </div>

                <div class="info-row">
                    <span class="info-label">Date début</span>
                    <span class="info-value">{{ $reservation->date_debut }}</span>
                </div>

                <div class="info-row">
                    <span class="info-label">Date fin</span>
                    <span class="info-value">{{ $reservation->date_fin }}</span>
                </div>

                <div class="info-row">
                    <span class="info-label">Livraison</span>
                    <span class="info-value">{{ $reservation->adresse_livraison }}</span>
                </div>
            </div>

            <div class="price-highlight">
                💰 Prix total: {{ number_format($reservation->prix_total, 2) }} DH
            </div>

            <div class="cta-section">
                <p style="margin-bottom: 20px; color: #6b7280;">Gérez cette réservation depuis votre espace
                    administrateur</p>
                <a href="#" class="cta-button">Accéder à l'espace admin</a>
            </div>
        </div>

        <div class="footer">
            <p>© 2025 <span class="company-name">CarRental Pro</span> - Système de gestion des réservations</p>
            <p style="margin-top: 10px; font-size: 12px;">Cet email a été généré automatiquement, merci de ne pas
                répondre.</p>
        </div>
    </div>
</body>

</html>
