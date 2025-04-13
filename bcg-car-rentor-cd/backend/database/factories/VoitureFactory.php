<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Voiture>
 */
class VoitureFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'modele' => $this->faker->word,
            'marque' => $this->faker->company,
            'matricule' => strtoupper($this->faker->bothify('??-###-??')),
            'nombre_place' => $this->faker->numberBetween(2, 7),
            'prix_jour' => $this->faker->randomFloat(2, 50, 500),
            'vitesse_max' => $this->faker->numberBetween(120, 300),
            'couleur' => $this->faker->safeColorName,
            'type_carburant' => $this->faker->randomElement(['Essence', 'Diesel', 'Électrique', 'Hybride']),
            'kilometrage' => $this->faker->numberBetween(1000, 200000),
            'image' => $this->faker->randomElement([
                'images_voitures/Renault Clio 5.jpg',
                'images_voitures/fiat-maroc-500.png',
                'images_voitures/Dacia-Spring.png'
            ]),
        ];
    }
}
