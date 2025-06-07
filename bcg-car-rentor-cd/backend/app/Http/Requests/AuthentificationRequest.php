<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AuthentificationRequest extends FormRequest
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
        $url = $this->url();

        if (strpos($url, 'api/auth/inscrire') !== false) {
            return [
                "nom" => "required",
                "prenom" => "required",
                "email" => "required|email|unique:users",
                "telephone" => "required",
                "adresse" => "required",
                "password" => "required|min:8|max:10",
                "motpasseverif" => "required|same:password"
            ];
        }
        if (strpos($url, 'api/auth/connecter') !== false) {
            return [
                "email" => "required|email",
                "password" => "required|min:8|max:10",
            ];
        }

        if (strpos($url, 'api/auth/modifierProfile') !== false) {
            return [
                "prenom" => "required",
                "nom" => "required",
                "email" => "required|email",
                "telephone" => "required",
                "adresse" => "required",
                "password" => "required|min:8|max:10",
                "motpasseverif" => "required|same:password",
                "image" => "nullable|mimes:jpeg,png,jpg,gif|max:4096"
            ];
        }
    }


    public function messages(): array
    {
        return [
            "prenom.required" => "Le prénom est obligatoire.",
            "nom.required" => "Le nom est obligatoire.",
            "email.required" => "L'adresse e-mail est obligatoire.",
            "email.email" => "Veuillez entrer une adresse e-mail valide.",
            "email.unique" => "Cette adresse e-mail est déjà utilisée.",
            "telephone.required" => "Le numéro de téléphone est obligatoire.",
            "adresse.required" => "L'adresse e-mail est obligatoire.",
            "password.required" => "Le mot de passe est obligatoire.",
            "password.min" => "Le mot de passe doit contenir au moins :min caractères.",
            "password.max" => "Le mot de passe ne doit pas dépasser :max caractères.",
            "motpasseverif.required" => "La vérification du mot de passe est obligatoire.",
            "motpasseverif.same" => "Les mots de passe ne correspondent pas.",
            "image.image" => "Le fichier doit être une image.",
            "image.mimes" => "L'image doit être au format jpeg, png, jpg ou gif.",
            "image.max" => "L'image ne doit pas dépasser 4 Mo."
        ];
    }
}