<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>ReNews API - Bienvenida</title>
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
                <a href="<?= env('app.FrontendURL') ?>" target="_blank">
                    <img aria-label="Visit the frontend website!" src="/renews-logo.svg" alt="ReNews Logo"/>
                </a>
            </li>
        </ul>
    </div>
    <div class="heroe">
        <h1>Bienvenido a la página de inicio de la API de ReNews. </h1>
        <h2>
            Esta es una API RESTful desarrollada con PHP <?= phpversion(); ?> y CodeIgniter <?= CodeIgniter\CodeIgniter::CI_VERSION ?>
        </h2>
    </div>
</header>

<!-- CONTENT -->
<section class="content">
    <p> En unos segundos serás redirigido a la documentación de la API.</p>
    <span> Si no eres redirigido automáticamente,</span>
    <a href="/docs" class="button todocs">puedes cliquear aquí. </a>
    <br><br>
    <div id="spinner"></div>
</section>

<!-- FOOTER: DEBUG INFO -->
<footer>
    <div class="environment">
        <p>Página renderizada en {elapsed_time} segundos usando {memory_usage} MB de memoria.</p>
        <p>Entorno: <strong><?= ENVIRONMENT ?></strong> </p>
    </div>
</footer>

<!-- SCRIPTS -->
<script>
    setTimeout(() => {
        window.location.href = '/docs';
    }, 10000);
</script>
</body>
</html>
