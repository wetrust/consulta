<div class="container">
    <h1>Instituciones</h1>
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
                            <a class="nav-link active" href="admin">Instituciones</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="workers">Usuarios de las instituciones</a>
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
                            <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne"><i class="fa fa-plus" aria-hidden="true"></i> Crear Institucion </button>
                        </h2>
                    </div>
                    <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                        <div class="card-body">
                            <form method="post" action="<?php echo Config::get('URL');?>admin/create">
                                <div class="form-group">
                                    <label>Nombre de la institucion:</label>
                                    <input type="text" class="form-control" name="institucion_name" autocomplete="off">
                                </div>
                                <button type="submit" class="btn btn-primary">Crear</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Instituciones en el sistema</h5>
                    <?php if ($this->instituciones) { ?>
                    <table class="table table-bordered mt-2">
                        <thead class="thead-dark">
                            <tr>
                                <th>Id</th>
                                <th>Nombre de la institucion</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach($this->instituciones as $key => $value) { ?>
                            <tr>
                                <td><?= $value->institucion_id; ?></td>
                                <td><?= htmlentities($value->institucion_name); ?></td>
                                <td><div class="btn-group"><a class="btn btn-outline-agenda" href="<?= Config::get('URL') . 'admin/edit/' . $value->institucion_id; ?>"><i class="fa fa-pencil" aria-hidden="true"></i></a> <a class="btn btn-outline-danger" href="<?= Config::get('URL') . 'admin/delete/' . $value->institucion_id; ?>"><i class="fa fa-trash" aria-hidden="true"></i></a></div></td>
                            </tr>
                            <?php } ?>
                        </tbody>
                    </table>
                    <?php } else { ?>
                    <div class="alert alert-info mt-2" role="alert">No hay instituciones</div>
                    <?php } ?>
                </div>
            </div>
        </div>
    </div>
</div>