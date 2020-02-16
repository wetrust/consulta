<div class="container">
    <h1>Cambiar mi nombre</h1>
    <hr>
    <!-- echo out the system feedback (error and success messages) -->
    <?php $this->renderFeedbackMessages(); ?>
    <div class="d-flex p-2 justify-content-center">
        <div class="card">
            <div class="card-body">
                <form action="<?php echo Config::get('URL'); ?>user/editUserName_action" method="post">
                    <div class="form-group">
                        <label>Nuevo nombre:</label>
                        <input type="text" class="form-control" name="user_name" placeholder="Escriba su nombre" required>
                    </div>
                    <!-- set CSRF token at the end of the form -->
                    <input type="hidden" name="csrf_token" value="<?= Csrf::makeToken(); ?>" />
                    <button type="submit" class="btn btn-primary">Guardar</button>
                </form>
            </div>
        </div>
    </div>
</div>