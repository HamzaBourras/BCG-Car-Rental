<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('voitures', function (Blueprint $table) {
            $table->id();
            $table->string("modele");
            $table->string("marque");
            $table->string("matricule");
            $table->integer("nombre_place");
            $table->float("prix_jour");
            $table->integer("vitesse_max");
            $table->string("couleur");
            $table->string("type_carburant");
            $table->integer("kilometrage");
            $table->string("image");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('voitures');
    }
};
