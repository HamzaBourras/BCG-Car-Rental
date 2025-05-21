<?php

namespace App\Http\Requests;

use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;

class ReservationRequest extends FormRequest
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
        $today = Carbon::now()->format('Y-m-d H:i');
        return [
            'date_debut' => ['required', 'date', 'after_or_equal:' . $today,],
            'date_fin' => ['required', 'date', 'after:date_debut', 'after_or_equal:' . $today],
            'adresse_livraison' => ['required', 'string', 'max:255'],
            'prix_total' => ['required', 'numeric', 'min:0']
        ];
    }

    public function messages(): array
    {
        return [
            'date_debut.required' => 'La date de début est obligatoire.',
            'date_debut.date' => 'La date de début doit être une date valide.',
            'date_debut.after_or_equal' => 'La date de début ne peut pas être dans le passé.',
            'date_fin.required' => 'La date de fin est obligatoire.',
            'date_fin.date' => 'La date de fin doit être une date valide.',
            'date_fin.after' => 'La date de fin doit être postérieure à la date de début.',
            'date_fin.after_or_equal' => 'La date de fin ne peut pas être dans le passé.',
            'adresse_livraison.required' => 'L\'adresse de livraison est obligatoire.',
            'adresse_livraison.string' => 'L\'adresse de livraison doit être une chaîne de caractères.',
            'adresse_livraison.max' => 'L\'adresse de livraison ne peut pas dépasser 255 caractères.',
            'prix_total.required' => 'Le prix total est obligatoire.',
            'prix_total.numeric' => 'Le prix total doit être un nombre.',
            'prix_total.min' => 'Le prix total ne peut pas être négatif.'
        ];
    }
}