<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Voiture extends Model
{
    use HasFactory;

    protected $fillable = [
        'modele',
        'marque',
        'matricule',
        'nombre_place',
        'prix_jour',
        'vitesse_max',
        'couleur',
        'type_carburant',
        'kilometrage',
        'disponibilité',
        'chemin_image',
    ];
}
