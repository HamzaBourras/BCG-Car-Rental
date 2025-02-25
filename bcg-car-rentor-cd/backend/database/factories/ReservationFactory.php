<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Reservation>
 */
class ReservationFactory extends Factory
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
            'voiture_id' => \App\Models\Voiture::factory(),
            'date_debut' => $this->faker->dateTimeBetween('+1 days', '+7 days'),
            'date_fin' => $this->faker->dateTimeBetween('+8 days', '+14 days'),
            'prix_total' => $this->faker->randomFloat(2, 50, 500),
            'statut_paiement' => $this->faker->boolean,
        ];
    }
}
