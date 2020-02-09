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

    public function pacientes(){
        $response = new stdClass();
        $response->return = PacientesModel::getAllPacientes();
        $this->View->renderJSON($response);
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

    public function reservas($fecha = NULL,$ver = NULL){
        $this->View->renderJSON(ReservasModel::getAllReservas($fecha,$ver));
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
        $response->data = ReservasModel::getAllReservas($data->dia,$ver = NULL);
        $this->View->renderJSON($response);
    }

    public function deleteReserva(){
        $data = new stdClass();
        $data->id = Request::post('id');
        $data->fecha = Request::post('fecha');
        $data->modal = Request::post('modal');

        $response = new stdClass();
        $response->return = ReservasModel::deleteReserva($data);
        $response->data = ReservasModel::getAllReservas($data->fecha,$ver = NULL);
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
        $response->data = ReservasModel::getAllReservas($data->fecha,$ver = NULL);
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

    public function examenes($paciente_id = NULL){
        $this->View->renderJSON(ExamenModel::getAllExamenPaciente($paciente_id));
    }

    public function deleteExamen(){
        $data = new stdClass();
        $data->id = Request::post('id');
        $data->modal = Request::post('modal');

        $response = new stdClass();
        $response->return = ExamenModel::deleteExamen($data);
        $response->data = ExamenModel::getAllLugares();
        $response->modal = $data->modal;

        $this->View->renderJSON($response);
    }

    public function newDopcre(){
        $data = new stdClass();
        $data->pre_id = Request::post('pre_id');
        $data->examen = Request::post('examen');
        $data->fecha = Request::post('fecha');
        $data->eg = Request::post('eg');
        $data->presentacion = Request::post('presentacion');
        $data->dorso = Request::post('dorso');
        $data->sexo_fetal = Request::post('sexo_fetal');
        $data->placenta_insercion = Request::post('placenta_insercion');
        $data->placenta = Request::post('placenta');
        $data->liquido = Request::post('liquido');
        $data->bvm = Request::post('bvm');
        $data->fcf = Request::post('fcf');
        $data->anatomia = Request::post('anatomia');
        $data->anatomia_extra = Request::post('anatomia_extra');
        $data->dbp = Request::post('dbp');
        $data->dof = Request::post('dof');
        $data->cc = Request::post('cc');
        $data->cc_pct = Request::post('cc_pct');
        $data->ca = Request::post('ca');
        $data->ca_pct = Request::post('ca_pct');
        $data->lf = Request::post('lf');
        $data->lf_pct = Request::post('lf_pct');
        $data->ccca = Request::post('ccca');
        $data->pfe = Request::post('pfe');
        $data->uterina_derecha = Request::post('uterina_derecha');
        $data->uterina_derecha_pct = Request::post('uterina_derecha_pct');
        $data->uterina_izquierda = Request::post('uterina_izquierda');
        $data->uterina_izquierda_pct = Request::post('uterina_izquierda_pct');
        $data->uterinas = Request::post('uterinas');
        $data->umbilical = Request::post('umbilical');
        $data->umbilical_pct = Request::post('umbilical_pct');
        $data->cm = Request::post('cm');
        $data->cm_pct = Request::post('cm_pct');
        $data->cmau = Request::post('cmau');
        $data->hipotesis = Request::post('hipotesis');
        $data->doppler_materno = Request::post('doppler_materno');
        $data->doppler_fetal = Request::post('doppler_fetal');
        $data->comentariosexamen = Request::post('comentariosexamen');
        $data->modal = Request::post('modal');

        $response = new stdClass();
        $response->return = ExamenModel::createExamen($data);
        //$response->data = ConfiguracionModel::getAllPatologias();
        $response->modal = $data->modal;
        $this->View->renderJSON($response);
    }

    public function newDosTres(){
        $data = new stdClass();

        $data->pre_id = Request::post('pre_id');
        $data->examen = Request::post('examen');
        $data->fecha = Request::post('fecha');
        $data->eg = Request::post('eg');
        $data->presentacion = Request::post('presentacion');
        $data->dorso = Request::post('dorso');
        $data->sexo_fetal = Request::post('sexo_fetal');
        $data->placenta_insercion = Request::post('placenta_insercion');
        $data->placenta = Request::post('placenta');
        $data->liquido = Request::post('liquido');
        $data->bvm = Request::post('bvm');
        $data->fcf = Request::post('fcf');
        $data->anatomia = Request::post('anatomia');
        $data->anatomia_extra = Request::post('anatomia_extra');
        $data->atrio_posterior = Request::post('atrio_posterior');
        $data->atrio_posterior_mm = Request::post('atrio_posterior_mm');
        $data->cerebelo_text = Request::post('cerebelo_text');
        $data->cerebelo_mm = Request::post('cerebelo_mm');
        $data->cisterna_m = Request::post('cisterna_m');
        $data->cisterna_m_mm = Request::post('cisterna_m_mm');
        $data->dbp = Request::post('dbp');
        $data->dof = Request::post('dof');
        $data->ic = Request::post('ic');
        $data->cc = Request::post('cc');
        $data->cc_pct = Request::post('cc_pct');
        $data->ca = Request::post('ca');
        $data->ca_pct = Request::post('ca_pct');
        $data->lf = Request::post('lf');
        $data->lf_pct = Request::post('lf_pct');
        $data->lh = Request::post('lh');
        $data->lh_pct = Request::post('lh_pct');
        $data->cerebelo = Request::post('cerebelo');
        $data->cerebelo_pct = Request::post('cerebelo_pct');
        $data->ccca = Request::post('ccca');
        $data->pfe = Request::post('pfe');
        $data->uterina_derecha = Request::post('uterina_derecha');
        $data->uterina_derecha_pct = Request::post('uterina_derecha_pct');
        $data->uterina_izquierda = Request::post('uterina_izquierda');
        $data->uterina_izquierda_pct = Request::post('uterina_izquierda_pct');
        $data->uterinas = Request::post('uterinas');
        $data->comentariosexamen = Request::post('comentariosexamen');
        $data->modal = Request::post('modal');

        $response = new stdClass();
        $response->return = ExamenModel::createExamen($data);
        //$response->data = ConfiguracionModel::getAllPatologias();
        $response->modal = $data->modal;
        $this->View->renderJSON($response);
    }

    public function newGine(){
        $data = new stdClass();

        $data->pre_id = Request::post('pre_id');
        $data->examen = Request::post('examen');
        $data->fecha = Request::post('fecha');
        $data->eg = Request::post('eg');
        $data->utero_uno = Request::post('utero_uno');
        $data->utero_dos = Request::post('utero_dos');
        $data->utero_tres = Request::post('utero_tres');
        $data->utero_cuatro = Request::post('utero_cuatro');
        $data->endometrio_uno = Request::post('endometrio_uno');
        $data->endometrio_dos = Request::post('endometrio_dos');
        $data->anexial = Request::post('anexial');
        $data->oi_uno = Request::post('oi_uno');
        $data->oi_dos = Request::post('oi_dos');
        $data->oi_tres = Request::post('oi_tres');
        $data->oi_cuatro = Request::post('oi_cuatro');
        $data->oi_cinco = Request::post('oi_cinco');
        $data->od_uno = Request::post('od_uno');
        $data->od_dos = Request::post('od_dos');
        $data->od_tres = Request::post('od_tres');
        $data->od_cuatro = Request::post('od_cuatro');
        $data->od_cinco = Request::post('od_cinco');
        $data->douglas = Request::post('douglas');
        $data->douglas_com = Request::post('douglas_com');
        $data->comentariosexamen = Request::post('comentariosexamen');
        $data->modal = Request::post('modal');

        $response = new stdClass();
        $response->return = ExamenModel::createExamen($data);
        //$response->data = ConfiguracionModel::getAllPatologias();
        $response->modal = $data->modal;
        $this->View->renderJSON($response);
    }
}
