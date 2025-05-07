<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class VoitureRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'modele' => 'required|string|max:50',
            'marque' => 'required|string|max:50',
            'matricule' => 'required|string|unique:voitures|max:20',
            'nombre_place' => 'required|integer|min:2',
            'prix_jour' => 'required|numeric|min:0',
            'vitesse_max' => 'required|integer|',
            'couleur' => 'required|string|max:30',
            'type_carburant' => 'required|in:essence,diesel,hybride,électrique',
            'kilometrage' => 'required|integer|min:0',
            'climat' => 'required',
            'image' => 'required|mimes:jpeg,png,jpg|max:2048'
        ];
    }

    public function messages(): array
    {
        return [
            'modele.required' => 'Le modèle de la voiture est obligatoire',
            'modele.max' => 'Le modèle ne doit pas dépasser 50 caractères',

            'marque.required' => 'La marque de la voiture est obligatoire',
            'marque.max' => 'La marque ne doit pas dépasser 50 caractères',

            'matricule.required' => 'Le numéro d\'immatriculation est obligatoire',
            'matricule.unique' => 'Ce numéro d\'immatriculation est déjà utilisé',
            'matricule.max' => 'L\'immatriculation ne doit pas dépasser 20 caractères',

            'nombre_place.required' => 'Le nombre de places est obligatoire',
            'nombre_place.integer' => 'Le nombre de places doit être un entier',
            'nombre_place.min' => 'La voiture doit avoir au moins 2 places',
            'nombre_place.max' => 'La voiture ne peut avoir plus de 10 places',

            'prix_jour.required' => 'Le prix journalier est obligatoire',
            'prix_jour.numeric' => 'Le prix doit être un nombre',
            'prix_jour.min' => 'Le prix ne peut pas être négatif',

            'vitesse_max.required' => 'La vitesse maximale est obligatoire',
            'vitesse_max.integer' => 'La vitesse doit être un nombre entier',
            'vitesse_max.min' => 'La vitesse minimale doit être de 60 km/h',
            'vitesse_max.max' => 'La vitesse maximale ne peut excéder 350 km/h',

            'couleur.required' => 'La couleur est obligatoire',
            'couleur.max' => 'La couleur ne doit pas dépasser 30 caractères',

            'type_carburant.required' => 'Le type de carburant est obligatoire',
            'type_carburant.in' => 'Le carburant doit être parmi : essence, diesel, hybride ou électrique',

            'kilometrage.required' => 'Le kilométrage est obligatoire',
            'kilometrage.integer' => 'Le kilométrage doit être un nombre entier',
            'kilometrage.min' => 'Le kilométrage ne peut pas être négatif',

            'image.required' => 'L\'image de la voiture est obligatoire',
            // 'image.image' => 'Le fichier doit être une image',
            'image.mimes' => 'L\'image doit être de type : jpeg, png ou jpg',
            'image.max' => 'L\'image ne doit pas dépasser 2Mo'
        ];
    }
}
