<!doctype html>
<html lang="es">
<head>
    <title>Agenda Medica</title>
    <!-- META -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- send empty favicon fallback to prevent user's browser hitting the server for lots of favicon requests resulting in 404s -->
    <link rel="icon" href="data:;base64,=">
    <!-- CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <link rel="stylesheet" href="<?php echo Config::get('URL'); ?>css/font-awesome.min.css">
    <link rel="stylesheet" href="<?php echo Config::get('URL'); ?>css/style.css" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
</head>
<body class="<?php if (Session::userIsLoggedIn()) { echo (Session::get('user_color') == 2) ? "night": ((Session::get('user_color') == 1) ? "night" : "light"); } else { echo "night";}?>">
    <!-- navbar -->
    <nav class="navbar navbar-expand-lg">
        <div class="container">
            <a class="navbar-brand" href="<?php echo Config::get('URL'); ?>">Agenda Médica</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarHome" aria-controls="navbarHome" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarHome">
                <?php if (Session::userIsLoggedIn()) { ?>    
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item <?php if (View::checkForActiveController($filename, "index")) { echo 'active'; } ?>">
                            <a class="nav-link" href="<?php echo Config::get('URL'); ?>">Agenda</a>
                        </li>
                        <li class="nav-item <?php if (View::checkForActiveController($filename, "pacientes")) { echo 'active'; } ?>">
                            <a class="nav-link" href="<?php echo Config::get('URL'); ?>">Pacientes</a>
                        </li>
                        <li class="nav-item <?php if (View::checkForActiveController($filename, "configuracion")) { echo 'active'; } ?>">
                            <a class="nav-link" href="<?php echo Config::get('URL'); ?>configuracion">Configuracion</a>
                        </li>
                    </ul>
                    <ul class="navbar-nav">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarUser" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Usuario: <?php echo Session::get('user_name'); ?> </a>
                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarUser">
                                <a class="dropdown-item" href="<?php echo Config::get('URL'); ?>user/changePassword">Cambiar Nombre</a>
                                <a class="dropdown-item" href="<?php echo Config::get('URL'); ?>user/edituseremail">Cambiar E-Mail</a>
                                <a class="dropdown-item" href="<?php echo Config::get('URL'); ?>user/changePassword">Cambiar Contraseña</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="<?php echo Config::get('URL'); ?>user/changeColor">Color: <?php echo (Session::get('user_color') == "2") ? "Automático" : ((Session::get('user_color') == "1") ? "Noche" : "Día"); ?></a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="<?php echo Config::get('URL'); ?>login/logout">Salir</a>
                            </div>
                        </li>
                    </ul>
                <?php } ?>
            </div>
        </div>
    </nav>