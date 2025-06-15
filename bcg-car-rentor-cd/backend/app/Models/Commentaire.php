<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Commentaire extends Model
{
    use HasFactory;

    protected $fillable = [
        "contenu",
        "note",
        "user_id",
        "aimee",
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}