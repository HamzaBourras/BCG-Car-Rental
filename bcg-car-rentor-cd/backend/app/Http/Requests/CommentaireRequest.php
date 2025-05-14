<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CommentaireRequest extends FormRequest
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
            "contenu" => "required|max:50",
            "note" => "required|integer|min:1|max:5",
        ];
    }

    public function messages(): array
    {
        return [
            "contenu.required" => "le contenu du commentaire est obligatoire",
            "contenu.max" => "le commentaire ne doit pas dépasser 50 caractères",

            "note.required" => "la note du commentaire est obligatoire",
            "note.min" => "la note minimale du commentaire doit être au moins 1",
            "note.max" => "la note du commentaire ne doit pas dépasser 5"
        ];
    }
}