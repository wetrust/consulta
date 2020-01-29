<div class="container">
    <h1>Agenda</h1>
    <!-- echo out the system feedback (error and success messages) -->
    <?php $this->renderFeedbackMessages(); ?>
    <div class="card shadow mt-3"><div class="card-body" id="agenda"><div class="text-center"><div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status"><span class="sr-only">Cargando...</span></div><p>Cargando, espere un momento..</p></div></div></div>
    <script src="js/jquery.rut.chileno.min.js"></script>
    <script type="module" src="js/agenda/app.js"></script>
</div>
