<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;


class EnsureIsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Vérifie si l'utilisateur est authentifié ET a le rôle admin
        if (!auth()->user()->isAdmin()) {
            return response()->json([
                'message' => 'Accès non autorisé'
            ], 403);
        }
        return $next($request);
    }
}
