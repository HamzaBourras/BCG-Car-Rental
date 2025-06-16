<!DOCTYPE html>
<html>

<head>
    <title>Nouvelle réservation de voiture</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style type="text/css">
        /* Base styles */
        body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            background-color: #f7f7f7;
            margin: 0;
            padding: 0;
        }

        /* Container */
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        /* Header */
        .email-header {
            background-color: #2c3e50;
            color: white;
            padding: 25px 30px;
            text-align: center;
        }

        .email-header h2 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
        }

        /* Content */
        .email-content {
            padding: 30px;
        }

        .reservation-details {
            background-color: #f9f9f9;
            border-left: 4px solid #3498db;
            padding: 20px;
            margin-bottom: 25px;
            border-radius: 0 4px 4px 0;
        }

        .detail-row {
            margin-bottom: 12px;
            display: flex;
        }

        .detail-label {
            font-weight: 600;
            min-width: 150px;
            color: #2c3e50;
        }

        .detail-value {
            flex: 1;
        }

        .price-highlight {
            color: #e74c3c;
            font-weight: 700;
            font-size: 18px;
        }

        /* Footer */
        .email-footer {
            background-color: #ecf0f1;
            padding: 20px 30px;
            text-align: center;
            font-size: 14px;
            color: #7f8c8d;
        }

        .action-button {
            display: inline-block;
            background-color: #3498db;
            color: white !important;
            text-decoration: none;
            padding: 12px 25px;
            border-radius: 4px;
            font-weight: 600;
            margin-top: 15px;
        }

        /* Responsive adjustments */
        @media only screen and (max-width: 600px) {
            .email-container {
                margin: 0;
                border-radius: 0;
            }

            .detail-row {
                flex-direction: column;
            }

            .detail-label {
                margin-bottom: 5px;
            }
        }
    </style>
</head>

<body>
    <div class="email-container">
        <div class="email-header">
            <h2>Nouvelle réservation de voiture</h2>
        </div>

        <div class="email-content">
            <p>Bonjour,</p>
            <p>Une nouvelle réservation a été effectuée sur votre plateforme. Voici les détails :</p>

            <div class="reservation-details">
                <div class="detail-row">
                    <span class="detail-label">Client:</span>
                    <span class="detail-value">{{ $reservation->user->nom }} {{ $reservation->user->prenom }}</span>
                </div>

                <div class="detail-row">
                    <span class="detail-label">Voiture:</span>
                    <span class="detail-value">{{ $reservation->voiture->marque }}
                        {{ $reservation->voiture->modele }}</span>
                </div>

                <div class="detail-row">
                    <span class="detail-label">Dates:</span>
                    <span class="detail-value">
                        Du {{ \Carbon\Carbon::parse($reservation->date_debut)->format('d/m/Y') }}
                        au {{ \Carbon\Carbon::parse($reservation->date_fin)->format('d/m/Y') }}
                    </span>
                </div>

                <div class="detail-row">
                    <span class="detail-label">Prix total:</span>
                    <span class="detail-value price-highlight">{{ number_format($reservation->prix_total, 2) }}
                        DH</span>
                </div>

                <div class="detail-row">
                    <span class="detail-label">Adresse livraison:</span>
                    <span class="detail-value">{{ $reservation->adresse_livraison }}</span>
                </div>
            </div>

            <p>Pour gérer cette réservation, veuillez vous connecter à votre espace d'administration.</p>

            {{-- <a href="{{ url('/admin/reservations') }}" class="action-button">Accéder à l'administration</a> --}}
        </div>

        <div class="email-footer">
            <p>© {{ date('Y') }} BCG Location. Tous droits réservés.</p>
            <p>Ceci est un message automatique, merci de ne pas y répondre.</p>
        </div>
    </div>
</body>

</html>
