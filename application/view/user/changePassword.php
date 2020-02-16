<div class="container">
    <h1>Cambiar contraseña</h1>
    <hr>
    <!-- echo out the system feedback (error and success messages) -->
    <?php $this->renderFeedbackMessages(); ?>
    <div class="d-flex p-2 justify-content-center">
        <div class="card">
            <div class="card-body">
                <form method="post" action="<?php echo Config::get('URL'); ?>user/changePassword_action" name="new_password_form">
                    <div class="form-group">
                        <label>Escriba su contraseña actual:</label>
                        <input type="password" class="form-control" name='user_password_current' pattern=".{6,}" required autocomplete="off">
                    </div>
                    <div class="form-group">
                        <label>Escriba la nueva contraseña:</label>
                        <input type="password" class="form-control" name='user_password_new' pattern=".{6,}" required autocomplete="off">
                    </div>
                    <div class="form-group">
                        <label>Repita la nueva contraseña:</label>
                        <input type="password" class="form-control" name='user_password_repeat' pattern=".{6,}" required autocomplete="off">
                    </div>
                    <button type="submit" name="submit_new_password" class="btn btn-primary">Guardar</button>
                </form>
            </div>
        </div>
    </div>
</div>