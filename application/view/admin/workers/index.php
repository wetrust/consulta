<div class="container">
    <h1>Usuarios en las instituciones</h1>
    <hr>
    <!-- echo out the system feedback (error and success messages) -->
    <?php $this->renderFeedbackMessages(); ?>
    <div class="row">
        <div class="col-2">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Menú</h5>
                    <ul class="nav flex-column">
                        <li class="nav-item">
                            <a class="nav-link" href="admin">Instituciones</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" href="workers">Usuarios de las instituciones</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="col-10">
            <div class="accordion" id="accordionExample">
                <div class="card mb-2">
                    <div class="card-header" id="headingOne">
                        <h2 class="mb-0">
                            <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            <i class="fa fa-plus" aria-hidden="true"></i> Añadir un usuario a una institucion
                            </button>
                        </h2>
                    </div>
                    <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                        <div class="card-body">
                            <form method="post" action="<?php echo Config::get('URL');?>workers/create">
                                <div class="form-group">
                                    <label>Nombre de la institucion:</label>
                                    <?php if ($this->instituciones) { ?>
                                        <select class="form-control" name="institucion_id">
                                        <?php foreach($this->instituciones as $key => $value) { ?>
                                            <option value="<?= $value->institucion_id; ?>" <?= ($value->institucion_id == $this->institucion_id) ? "selected" : ""; ?>><?= $value->institucion_name; ?></option>
                                        <?php } ?>
                                        </select>
                                    <?php } ?>
                                </div>
                                <div class="form-group">
                                    <label>Nombre de usuario:</label>
                                    <?php if ($this->users) { ?>
                                        <select class="form-control" name="user_id">
                                        <?php foreach($this->users as $key => $value) { ?>
                                            <option value="<?= $value->user_id; ?>"><?= $value->user_name; ?></option>
                                        <?php } ?>
                                        </select>
                                    <?php } ?>
                                </div>
                                <button type="submit" class="btn btn-primary">Crear</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-4">
                            <h5 class="card-title">Nombre de la institucion</h5>
                        </div>
                        <div class="col-8">
                            <?php if ($this->instituciones) { ?>
                                <select class="form-control" id="select.institucion">
                                <?php foreach($this->instituciones as $key => $value) { ?>
                                    <option value="<?= $value->institucion_id; ?>" <?= ($value->institucion_id == $this->institucion_id) ? "selected" : ""; ?>><?= $value->institucion_name; ?></option>
                                <?php } ?>
                                </select>
                            <?php } ?>
                        </div>
                    </div>
                    <hr>
                    <h5 class="card-title my-3">Usuarios que están en esta institucion:</h5>
                    <?php if ($this->workers) { ?>
                    <table class="table table-bordered mt-2">
                        <thead class="thead-dark">
                            <tr>
                                <th>Id</th>
                                <th>Nombre del usuario</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach($this->workers as $key => $value) { ?>
                            <tr>
                                <td><?= $value->iu_id; ?></td>
                                <td><?= htmlentities($value->user_name); ?></td>
                                <td><div class="btn-group"><a class="btn btn-outline-danger" href="<?= Config::get('URL') . 'workers/delete/' . $value->iu_id; ?>"><i class="fa fa-trash" aria-hidden="true"></i></a></div></td>
                            </tr>
                            <?php } ?>
                        </tbody>
                    </table>
                    <?php } else { ?>
                    <div class="alert alert-info mt-2" role="alert">No hay usuarios en esta institucion</div>
                    <?php } ?>
                </div>
            </div>
        </div>
    </div>
</div>
<script>
    document.getElementById("select.institucion").onchange = changeInstitucion;

    function changeInstitucion(){
        let institucion_id = this.value;

        window.location.href = "workers/index/" + institucion_id;
    }
</script>