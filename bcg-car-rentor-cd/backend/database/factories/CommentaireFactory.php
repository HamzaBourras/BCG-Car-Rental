<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Commentaire>
 */
class CommentaireFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => \App\Models\User::factory(),
            "contenu" => $this->faker->randomElement([
                "Excellent service ! La voiture était propre, en bon état et le processus de réservation très simple. Je recommande vivement !",
                "Voiture conforme à la description, mais le délai de récupération était un peu long. Sinon, bonne expérience.",
                "Très bonne expérience ! Le personnel est sympathique et la voiture était en parfait état. Je referai appel à ce service.",
                "Tout s'est bien passé, sauf un léger problème avec le GPS qui ne fonctionnait pas correctement. À part ça, rien à redire.",
                "Rapport qualité-prix imbattable ! Facile à réserver, aucun souci avec la voiture et retour rapide. Super location !"
            ]),
            "note" => $this->faker->numberBetween(1, 5)
        ];
    }
}
