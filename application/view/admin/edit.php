<div class="container">
    <h1>Modificar Instituciones</h1>
    <?php $this->renderFeedbackMessages(); ?>
    <?php if ($this->institucion) { ?>
    <form method="post" action="<?php echo Config::get('URL'); ?>admin/editSave">
        <!-- we use htmlentities() here to prevent user input with " etc. break the HTML -->
        <input type="hidden" name="institucion_id" value="<?php echo htmlentities($this->institucion->institucion_id); ?>" />
        <div class="form-group">
            <label>Cambiar el nombre:</label>
            <input type="text" class="form-control" name="institucion_name" value="<?php echo htmlentities($this->institucion->institucion_name); ?>">
        </div>
        <button type="submit" class="btn btn-primary">Cambiar</button>
    </form>
    <?php } else { ?>
    <div class="alert alert-danger" role="alert">Esta institucion no existe.</div>
    <?php } ?>
</div>