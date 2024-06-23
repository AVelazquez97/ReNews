<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Swagger Docs UI</title>
    <meta name="description" content="Simple RESTful api made with CodeIgniter <?= CodeIgniter\CodeIgniter::CI_VERSION ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/svg+xml" href="/renews-ico.svg" />
    <!-- STYLES -->
    <link rel="stylesheet" href="/styles.css">
</head>
<body>

<!-- HEADER: MENU + HEROE SECTION -->
<header>
    <div class="menu">
        <ul>
            <li class="logo">
                <a href="https://renews.alexisvelazquez.tech" target="_blank">
                    <img aria-label="Visit the frontend website!" src="/renews-logo.svg" alt="ReNews Logo"/>
                </a>
            </li>
        </ul>
    </div>
</header>

<section>
    <div class="heroe">
        <h1>Documentación de la API de ReNews desarrollada con Swagger. </h1>
        <h2>
            Página en construcción...
        </h2>
    </div>
</section>

<!-- FOOTER: DEBUG INFO -->
<footer>
    <div class="environment">
        <p>Página renderizada en {elapsed_time} segundos usando {memory_usage} MB de memoria.</p>
        <p>Entorno: <strong><?= ENVIRONMENT ?></strong> </p>
    </div>
</footer>

</body>
</html>