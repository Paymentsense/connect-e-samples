<?php

namespace App\Http\Middleware;

use Closure;
use Laravel\Lumen\Http\Request;

class RouteMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $pathInfo = $request->getPathInfo();
        $request->attributes->set('path', $pathInfo);

        return $next($request);
    }
}
