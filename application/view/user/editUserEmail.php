<div class="container">
    <h1>Cambiar email</h1>
    <hr>
    <!-- echo out the system feedback (error and success messages) -->
    <?php $this->renderFeedbackMessages(); ?>
    <div class="d-flex p-2 justify-content-center">
        <div class="card">
            <div class="card-body">
                <form action="<?php echo Config::get('URL'); ?>user/editUserEmail_action" method="post">
                <div class="form-group">
                        <label>E-Mail actual:</label>
                        <input type="email" class="form-control" value="<?= $this->email; ?>"disabled>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Nuevo E-Mail:</label>
                        <input type="email" class="form-control" name="user_email" aria-describedby="emailHelp" placeholder="Escriba un nuevo email" required>
                        <small id="emailHelp" class="form-text text-muted">No compartimos su correo con nadien.</small>
                    </div>
                    <button type="submit" class="btn btn-primary">Guardar</button>
                </form>
            </div>
        </div>
    </div>
</div>
