export const config = {
    pacientes: 'api/pacientes',
    examenes: 'api/examenes/',
    interface: 'pacientes',
    deleteExamen: 'api/deleteExamen',
    pacientesInterface: '<div class="d-flex justify-content-between mb-3"> <button type="button" class="btn btn-primary" id="pacientes.nuevo">Nueva reserva</button></div><div class="table-responsive mt-2"> <table class="table table-striped table-bordered table-hover table-sm" id="pacientes.table"> <caption>Lista de pacientes</caption> </table></div>',
    pacientesInterfaceTableHead: '<thead><tr><th scope="col">Nombre</th><th scope="col">Apellido</th><th scope="col">RUT</th><th scope="col">Opciones</th></tr></thead>',
    pacientesInterfaceTable: 'pacientes.table',
    verExamenesTitulo: 'Exámenes del paciente',
    verExamenesHTML: '<div class="d-flex justify-content-between mb-3"> <button type="button" class="btn btn-primary" id="examenes.nuevo">Nuevo examen</button></div><div class="table-responsive mt-2"> <table class="table table-striped table-bordered table-hover table-sm" id="examenes.table"> <caption>Lista de exámenes</caption> </table></div>',
    verExamenesInterfaceTable: 'examenes.table',
    verExamenesInterfaceTableHead: '<thead><tr><th scope="col">Fecha</th><th scope="col">EG / Dia ciclo</th><th scope="col">Tipo</th><th scope="col">Opciones</th></tr></thead>',
    deleteExamenTitulo: 'Eliminar exámen',
    deleteExamenHTML: '<h4 class="text-center text-danger">Está seguro de eliminar el exámen</h4>',

}