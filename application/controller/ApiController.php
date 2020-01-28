<?php

class ApiController extends Controller
{

    function __construct()
    {
        parent::__construct();
        Auth::checkAuthentication();
    }
    
    public function buscarpaciente(){
        $paciente = trim(Request::get('url'), '/');
        $paciente = explode('/', $paciente);
        $paciente = $paciente[count($paciente)-1];
        $paciente = html_entity_decode($paciente);
        $paciente = Filter::XSSFilter($paciente);
        $paciente = str_replace("_", " ",$paciente); 
        $this->View->renderJSON(PacientesModel::findPacienteID($paciente));
    }

    public function newPacientes(){
        $data = new stdClass();
        $data->nombre = Request::post('nombre');
        $data->apellido = Request::post('apellido');
        $data->rut = Request::post('rut');
        $data->fum = Request::post('fum');
        $data->ciudad = Request::post('ciudad');
        $data->lugar = Request::post('lugar');
        $data->nacionalidad = Request::post('nacionalidad');
        $data->patologia = Request::post('patologia');
        $data->telefono = Request::post('telefono');
        $data->modal = Request::post('modal');

        $response = new stdClass();
        $response->return = PacientesModel::createPaciente($data);
        $response->modal = $data->modal;
        $response->rut = $data->rut;
        $this->View->renderJSON($response);
    }

    public function reservas($fecha = NULL){
        $this->View->renderJSON(ReservasModel::getAllReservas($fecha));
    }

    public function newReserva(){
        $data = new stdClass();
        $data->rut = Request::post('rut');
        $data->nombre = Request::post('nombre');
        $data->apellido = Request::post('apellido');
        $data->dia = Request::post('dia');
        $data->hora = Request::post('hora');
        $data->minutos = Request::post('minutos');
        $data->modal = Request::post('modal');

        $response = new stdClass();
        $response->return = ReservasModel::createReserva($data);
        $response->modal = $data->modal;
        $response->data = ReservasModel::getAllReservas($data->dia);
        $this->View->renderJSON($response);
    }

    public function deleteReserva(){
        $data = new stdClass();
        $data->id = Request::post('id');
        $data->fecha = Request::post('fecha');
        $data->modal = Request::post('modal');

        $response = new stdClass();
        $response->return = ReservasModel::deleteReserva($data);
        $response->data = ReservasModel::getAllReservas($data->fecha);
        $response->modal = $data->modal;

        $this->View->renderJSON($response);
    }

    public function createPre(){
        $data = new stdClass();
        $data->id = Request::post('id');
        $data->fecha = Request::post('fecha');
        $data->examen = Request::post('examen');
        $data->motivo = Request::post('motivo');
        $data->modal = Request::post('modal');

        $response = new stdClass();
        
        $pre = PreModel::createPre($data);
        $response->return = $pre->data;
        $response->examen = $data->examen;
        $response->data = ReservasModel::getAllReservas($data->fecha);
        $response->paciente = PacientesModel::getPaciente($pre->reserva_rut);
        $response->fecha = $data->fecha;
        $response->modal = $data->modal;

        $this->View->renderJSON($response);
    }

    public function configuraciones(){
        $data = array();
        $data[0] = ConfiguracionModel::getAllNacionalidades();
        $data[1] = ConfiguracionModel::getAllCiudades();
        $data[2] = ConfiguracionModel::getAllLugares();
        $data[3] = ConfiguracionModel::getAllPatologias();

        $this->View->renderJSON($data);
    }
    
    public function newNacionalidad(){
        $data = new stdClass();
        $data->nacionalidad = Request::post('nacionalidad');
        $data->modal = Request::post('modal');

        $response = new stdClass();
        $response->return = ConfiguracionModel::createNacionalidad($data);
        $response->data = ConfiguracionModel::getAllNacionalidades();
        $response->modal = $data->modal;
        $this->View->renderJSON($response);
    }

    public function newCiudad(){
        $data = new stdClass();
        $data->ciudad = Request::post('ciudad');
        $data->modal = Request::post('modal');

        $response = new stdClass();
        $response->return = ConfiguracionModel::createCiudad($data);
        $response->data = ConfiguracionModel::getAllCiudades();
        $response->modal = $data->modal;
        $this->View->renderJSON($response);
    }

    public function newLugar(){
        $data = new stdClass();
        $data->lugar = Request::post('lugar');
        $data->modal = Request::post('modal');

        $response = new stdClass();
        $response->return = ConfiguracionModel::createLugar($data);
        $response->data = ConfiguracionModel::getAllLugares();
        $response->modal = $data->modal;
        $this->View->renderJSON($response);
    }

    public function newPatologia(){
        $data = new stdClass();
        $data->patologia = Request::post('patologia');
        $data->modal = Request::post('modal');

        $response = new stdClass();
        $response->return = ConfiguracionModel::createPatologia($data);
        $response->data = ConfiguracionModel::getAllPatologias();
        $response->modal = $data->modal;
        $this->View->renderJSON($response);
    }

    public function deleteNacionalidad(){
        $data = new stdClass();
        $data->id = Request::post('id');
        $data->modal = Request::post('modal');

        $response = new stdClass();
        $response->return = ConfiguracionModel::deleteNacionalidad($data);
        $response->data = ConfiguracionModel::getAllNacionalidades();
        $response->modal = $data->modal;

        $this->View->renderJSON($response);
    }

    public function deleteCiudad(){
        $data = new stdClass();
        $data->id = Request::post('id');
        $data->modal = Request::post('modal');

        $response = new stdClass();
        $response->return = ConfiguracionModel::deleteCiudad($data);
        $response->data = ConfiguracionModel::getAllCiudades();
        $response->modal = $data->modal;

        $this->View->renderJSON($response);
    }

    public function deleteLugar(){
        $data = new stdClass();
        $data->id = Request::post('id');
        $data->modal = Request::post('modal');

        $response = new stdClass();
        $response->return = ConfiguracionModel::deleteLugar($data);
        $response->data = ConfiguracionModel::getAllLugares();
        $response->modal = $data->modal;

        $this->View->renderJSON($response);
    }

    public function deletePatologia(){
        $data = new stdClass();
        $data->id = Request::post('id');
        $data->modal = Request::post('modal');

        $response = new stdClass();
        $response->return = ConfiguracionModel::deletePatologia($data);
        $response->data = ConfiguracionModel::getAllPatologias();
        $response->modal = $data->modal;

        $this->View->renderJSON($response);
    }
}
