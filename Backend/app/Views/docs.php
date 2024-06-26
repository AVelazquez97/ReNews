<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>ReNews API - Swagger Docs</title>
    <meta name="description" content="Simple RESTful api made with CodeIgniter <?= CodeIgniter\CodeIgniter::CI_VERSION ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/svg+xml" href="/renews-ico.svg" />
    <link rel="icon" type="image/png" href="/swagger/favicon-32x32.png" sizes="32x32" />
    <link rel="icon" type="image/png" href="/swagger/favicon-16x16.png" sizes="16x16" />
    <!-- STYLES -->
    <link rel="stylesheet" href="/styles.css">
    <link rel="stylesheet" type="text/css" href="/swagger/swagger-ui.css" />
</head>
<body>

<!--<header>-->
<!--    <div class="menu">-->
<!--        <ul>-->
<!--            <li class="logo">-->
<!--                <a href="--><?php //= env('app.FrontendURL') ?><!--" target="_blank">-->
<!--                    <img aria-label="Visit the frontend website!" src="/renews-logo.svg" alt="ReNews Logo"/>-->
<!--                </a>-->
<!--            </li>-->
<!--        </ul>-->
<!--    </div>-->
<!--</header>-->

<div id="swagger-ui"></div>

<!-- FOOTER: DEBUG INFO -->
<footer>
    <div class="environment">
        <p>Página renderizada en {elapsed_time} segundos usando {memory_usage} MB de memoria.</p>
        <p>Entorno: <strong><?= ENVIRONMENT ?></strong> </p>
    </div>
</footer>

<script src="/swagger/swagger-ui-bundle.js"></script>
<script src="/swagger/swagger-ui-standalone-preset.js"></script>
<script src="/swagger/swagger-initializer.js" charset="UTF-8"> </script>
</body>
</html>