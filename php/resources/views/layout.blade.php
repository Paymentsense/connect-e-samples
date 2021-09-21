<!doctype html>
<html lang="en">
    <head>
        <title>Connect-e PHP sample project - @yield('title')</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        @yield('stylesheets')
        @yield('scripts')
    </head>
    <body>
        <div class="container">
            @include('shared.nav')
            @yield('body')
        </div>
    </body>
</html>
