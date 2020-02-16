<?php

class ApiController extends Controller
{

    function __construct(){
        parent::__construct();
        Auth::checkAuthentication();
    }
    
    public function buscarpaciente(){
        $paciente = trim(Request::get('url'), '/');
        $paciente = explode('/', $paciente);
        $institucion_id = $paciente[count($paciente)-1];
        $paciente = $paciente[count($paciente)-2];
        $paciente = html_entity_decode($paciente);
        $paciente = Filter::XSSFilter($paciente);
        $paciente = str_replace("_", " ",$paciente);

        $this->View->renderJSON(PacientesModel::findPacienteID($paciente, $institucion_id));
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
        $data->institucion_id = Request::post('institucion_id');
        $data->modal = Request::post('modal');

        $response = new stdClass();
        $response->return = PacientesModel::createPaciente($data);
        $response->modal = $data->modal;
        $response->rut = $data->rut;
        $this->View->renderJSON($response);
    }

    public function reservas($fecha = NULL,$ver = NULL,$institucion_id){
        $this->View->renderJSON(ReservasModel::getAllReservas($fecha,$ver,$institucion_id));
    }

    public function newReserva(){
        $data = new stdClass();
        $data->rut = Request::post('rut');
        $data->nombre = Request::post('nombre');
        $data->apellido = Request::post('apellido');
        $data->dia = Request::post('dia');
        $data->hora = Request::post('hora');
        $data->minutos = Request::post('minutos');
        $data->institucion_id = Request::post('institucion_id');
        $data->modal = Request::post('modal');

        $response = new stdClass();
        $response->return = ReservasModel::createReserva($data);
        $response->modal = $data->modal;
        $response->data = ReservasModel::getAllReservas($data->dia,$ver = NULL,$data->institucion_id);
        $this->View->renderJSON($response);
    }

    public function deleteReserva(){
        $data = new stdClass();
        $data->id = Request::post('id');
        $data->fecha = Request::post('fecha');
        $data->institucion_id = Request::post('institucion_id');
        $data->modal = Request::post('modal');

        $response = new stdClass();
        $response->return = ReservasModel::deleteReserva($data);
        $response->data = ReservasModel::getAllReservas($data->fecha,$ver = NULL,$data->institucion_id);
        $response->modal = $data->modal;

        $this->View->renderJSON($response);
    }

    public function createPre(){
        $data = new stdClass();
        $data->id = Request::post('id');
        $data->fecha = Request::post('fecha');
        $data->examen = Request::post('examen');
        $data->motivo = Request::post('motivo');
        $data->ver = Request::post("ver");
        $data->institucion_id = Request::post('institucion_id');
        $data->modal = Request::post('modal');

        $response = new stdClass();
        
        $pre = PreModel::createPre($data);
        $response->return = $pre->data;
        $response->examen = $data->examen;
        $response->data = ReservasModel::getAllReservas($data->fecha,$data->ver,$data->institucion_id);
        $response->paciente = PacientesModel::getPaciente($pre->reserva_rut);
        $response->fecha = $data->fecha;
        $response->modificar = false;
        $response->modal = $data->modal;

        $this->View->renderJSON($response);
    }

    public function configuraciones($institucion_id){
        $data = array();
        $data[0] = ConfiguracionModel::getAllNacionalidades($institucion_id);
        $data[1] = ConfiguracionModel::getAllCiudades($institucion_id);
        $data[2] = ConfiguracionModel::getAllLugares($institucion_id);
        $data[3] = ConfiguracionModel::getAllPatologias($institucion_id);
        $data[4] = ConfiguracionModel::getAllAgenda($institucion_id);
        $data[5] = ConfiguracionModel::getMembrete($institucion_id);

        $this->View->renderJSON($data);
    }
    
    public function newNacionalidad(){
        $data = new stdClass();
        $data->nacionalidad = Request::post('nacionalidad');
        $data->institucion_id = Request::post('institucion_id');
        $data->modal = Request::post('modal');

        $response = new stdClass();
        $response->return = ConfiguracionModel::createNacionalidad($data);
        $response->data = ConfiguracionModel::getAllNacionalidades($data->institucion_id);
        $response->modal = $data->modal;
        $this->View->renderJSON($response);
    }

    public function newCiudad(){
        $data = new stdClass();
        $data->ciudad = Request::post('ciudad');
        $data->institucion_id = Request::post('institucion_id');
        $data->modal = Request::post('modal');

        $response = new stdClass();
        $response->return = ConfiguracionModel::createCiudad($data);
        $response->data = ConfiguracionModel::getAllCiudades($data->institucion_id);
        $response->modal = $data->modal;
        $this->View->renderJSON($response);
    }

    public function newLugar(){
        $data = new stdClass();
        $data->lugar = Request::post('lugar');
        $data->institucion_id = Request::post('institucion_id');
        $data->modal = Request::post('modal');

        $response = new stdClass();
        $response->return = ConfiguracionModel::createLugar($data);
        $response->data = ConfiguracionModel::getAllLugares($data->institucion_id);
        $response->modal = $data->modal;
        $this->View->renderJSON($response);
    }

    public function newPatologia(){
        $data = new stdClass();
        $data->patologia = Request::post('patologia');
        $data->institucion_id = Request::post('institucion_id');
        $data->modal = Request::post('modal');

        $response = new stdClass();
        $response->return = ConfiguracionModel::createPatologia($data);
        $response->data = ConfiguracionModel::getAllPatologias($data->institucion_id);
        $response->modal = $data->modal;
        $this->View->renderJSON($response);
    }

    public function newAgenda(){
        $data = new stdClass();
        $data->nombre = Request::post('nombre');
        $data->email = Request::post('email');
        $data->profesion = Request::post('profesion');
        $data->ciudad = Request::post('ciudad');
        $data->institucion_id = Request::post('institucion_id');
        $data->modal = Request::post('modal');

        $response = new stdClass();
        $response->return = ConfiguracionModel::createAgenda($data);
        $response->data = ConfiguracionModel::getAllAgenda($data->institucion_id);
        $response->modal = $data->modal;
        $this->View->renderJSON($response);
    }

    public function changeMembrete(){
        $data = new stdClass();
        $data->text = Request::post('text');
        $data->institucion_id = Request::post('institucion_id');
        $data->modal = Request::post('modal');

        $response = new stdClass();

        $membrete = ConfiguracionModel::getMembrete($data->institucion_id);

        if (count($membrete) == 1){
            $response->return = ConfiguracionModel::updateMembrete($data);
        }else{
            $response->return = ConfiguracionModel::createMembrete($data);
        }
        
        $response->data = ConfiguracionModel::getMembrete($data->institucion_id);
        $response->modal = $data->modal;
        $this->View->renderJSON($response);
    }

    public function deleteNacionalidad(){
        $data = new stdClass();
        $data->id = Request::post('id');
        $data->institucion_id = Request::post('institucion_id');
        $data->modal = Request::post('modal');

        $response = new stdClass();
        $response->return = ConfiguracionModel::deleteNacionalidad($data);
        $response->data = ConfiguracionModel::getAllNacionalidades($data->institucion_id);
        $response->modal = $data->modal;

        $this->View->renderJSON($response);
    }

    public function deleteCiudad(){
        $data = new stdClass();
        $data->id = Request::post('id');
        $data->institucion_id = Request::post('institucion_id');
        $data->modal = Request::post('modal');

        $response = new stdClass();
        $response->return = ConfiguracionModel::deleteCiudad($data);
        $response->data = ConfiguracionModel::getAllCiudades($data->institucion_id);
        $response->modal = $data->modal;

        $this->View->renderJSON($response);
    }

    public function deleteLugar(){
        $data = new stdClass();
        $data->id = Request::post('id');
        $data->institucion_id = Request::post('institucion_id');
        $data->modal = Request::post('modal');

        $response = new stdClass();
        $response->return = ConfiguracionModel::deleteLugar($data);
        $response->data = ConfiguracionModel::getAllLugares($data->institucion_id);
        $response->modal = $data->modal;

        $this->View->renderJSON($response);
    }

    public function deletePatologia(){
        $data = new stdClass();
        $data->id = Request::post('id');
        $data->institucion_id = Request::post('institucion_id');
        $data->modal = Request::post('modal');

        $response = new stdClass();
        $response->return = ConfiguracionModel::deletePatologia($data);
        $response->data = ConfiguracionModel::getAllPatologias($data->institucion_id);
        $response->modal = $data->modal;

        $this->View->renderJSON($response);
    }

    public function deleteAgenda(){
        $data = new stdClass();
        $data->id = Request::post('id');
        $data->institucion_id = Request::post('institucion_id');
        $data->modal = Request::post('modal');

        $response = new stdClass();
        $response->return = ConfiguracionModel::deleteAgenda($data);
        $response->data = ConfiguracionModel::getAllAgenda($data->institucion_id);
        $response->modal = $data->modal;

        $this->View->renderJSON($response);
    }

    public function deleteMembrete(){
        $data = new stdClass();
        $data->institucion_id = Request::post('institucion_id');
        $data->modal = Request::post('modal');
        $data->modalParent = Request::post('modalParent');

        $response = new stdClass();
        $response->return = ConfiguracionModel::deleteMembrete($data);
        $response->data = ConfiguracionModel::getMembrete($data->institucion_id);
        $response->modal = $data->modal;
        $response->modalParent = $data->modalParent;

        $this->View->renderJSON($response);
    }

    public function getPre(){
        $data = new stdClass();
        $data->reserva_id = Request::post('id');
        $data->institucion_id = Request::post('institucion_id');
        $data->ver = Request::post('ver');

        $response = new stdClass();
        
        $pre = PreModel::getPreReserva($data);
        $response->return = $pre->pre_id;
        $response->examen = $pre->pre_examen;
        $response->data = ReservasModel::getAllReservas($pre->pre_fecha,$data->ver,$data->institucion_id);
        $response->paciente = PacientesModel::getPaciente($pre->paciente_rut);
        $response->fecha = $pre->pre_fecha;
        $response->modificar = false;

        $this->View->renderJSON($response);
    }

    public function getExamen($id = NULL){
        $response = new stdClass();
        
        $examen = ExamenModel::getExamen($id);

        $response->fecha = $examen->examen_fecha;
        $response->examen = $examen->examen_tipo;
        $response->return = $examen->pre_id;
        $response->data = $examen;
        $response->paciente = PacientesModel::getPaciente($examen->paciente_rut);
        $response->modificar = true;

        $this->View->renderJSON($response);
    }

    public function examenes($paciente_id = NULL){
        $this->View->renderJSON(ExamenModel::getAllExamenPaciente($paciente_id));
    }

    public function deleteExamen(){
        $data = new stdClass();
        $data->id = Request::post('id');
        $data->modal = Request::post('modal');
        $data->examen = ExamenModel::getExamen($data->id);

        $response = new stdClass();
        $response->return = ExamenModel::deleteExamen($data);
        $response->data = ExamenModel::getAllExamenRUT($data->examen->paciente_rut);
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

    public function updateDopcre(){
        $data = new stdClass();
        $data->examen_id = Request::post('id');
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
        $response->return = ExamenModel::updateExamen($data);
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

    public function updateDosTres(){
        $data = new stdClass();
        $data->examen_id = Request::post('id');
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
        $response->return = ExamenModel::updateExamen($data);
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

    public function updateGine(){
        $data = new stdClass();
        $data->examen_id = Request::post('id');
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
        $response->return = ExamenModel::updateExamen($data);
        //$response->data = ConfiguracionModel::getAllPatologias();
        $response->modal = $data->modal;
        $this->View->renderJSON($response);
    }

    public function newPreco(){
        $data = new stdClass();
        $data->pre_id = Request::post('pre_id');
        $data->examen = Request::post('examen');
        $data->fecha = Request::post('fecha');
        $data->eg = Request::post('eg');
        $data->utero_primertrimestre = Request::post('utero_primertrimestre');
        $data->saco_gestacional = Request::post('saco_gestacional');
        $data->saco = Request::post('saco');
        $data->saco_eg = Request::post('saco_eg');
        $data->saco_vitelino = Request::post('saco_vitelino');
        $data->saco_vitelino_mm = Request::post('saco_vitelino_mm');
        $data->embrion = Request::post('embrion');
        $data->lcn = Request::post('lcn');
        $data->lcn_eg = Request::post('lcn_eg');
        $data->fcf = Request::post('fcf');
        $data->furop = Request::post('furop');
        $data->fppactualizada = Request::post('fppactualizada');
        $data->anexo_izquierdo_primertrimestre = Request::post('anexo_izquierdo_primertrimestre');
        $data->anexo_derecho_primertrimestre = Request::post('anexo_derecho_primertrimestre');
        $data->douglas_primertrimestre = Request::post('douglas_primertrimestre');
        $data->comentariosexamen = Request::post('comentariosexamen');
        $data->modal = Request::post('modal');

        $response = new stdClass();
        $response->return = ExamenModel::createExamen($data);
        //$response->data = ConfiguracionModel::getAllPatologias();
        $response->modal = $data->modal;
        $this->View->renderJSON($response);
    }

    public function updatePreco(){
        $data = new stdClass();
        $data->examen_id = Request::post('id');
        $data->pre_id = Request::post('pre_id');
        $data->examen = Request::post('examen');
        $data->fecha = Request::post('fecha');
        $data->eg = Request::post('eg');
        $data->utero_primertrimestre = Request::post('utero_primertrimestre');
        $data->saco_gestacional = Request::post('saco_gestacional');
        $data->saco = Request::post('saco');
        $data->saco_eg = Request::post('saco_eg');
        $data->saco_vitelino = Request::post('saco_vitelino');
        $data->saco_vitelino_mm = Request::post('saco_vitelino_mm');
        $data->embrion = Request::post('embrion');
        $data->lcn = Request::post('lcn');
        $data->lcn_eg = Request::post('lcn_eg');
        $data->fcf = Request::post('fcf');
        $data->furop = Request::post('furop');
        $data->fppactualizada = Request::post('fppactualizada');
        $data->anexo_izquierdo_primertrimestre = Request::post('anexo_izquierdo_primertrimestre');
        $data->anexo_derecho_primertrimestre = Request::post('anexo_derecho_primertrimestre');
        $data->douglas_primertrimestre = Request::post('douglas_primertrimestre');
        $data->comentariosexamen = Request::post('comentariosexamen');
        $data->modal = Request::post('modal');

        $response = new stdClass();
        $response->return = ExamenModel::updateExamen($data);
        //$response->data = ConfiguracionModel::getAllPatologias();
        $response->modal = $data->modal;
        $this->View->renderJSON($response);
    }

    public function newOnce(){
        $data = new stdClass();
        $data->pre_id = Request::post('pre_id');
        $data->examen = Request::post('examen');
        $data->fecha = Request::post('fecha');
        $data->eg = Request::post('eg');
        $data->anatomia = Request::post('anatomia');
        $data->anatomia_extra = Request::post('anatomia_extra');
        $data->embrion = Request::post('embrion');
        $data->lcn = Request::post('lcn');
        $data->fcf = Request::post('fcf');
        $data->dbp = Request::post('dbp');
        $data->cc = Request::post('cc');
        $data->cc_pct = Request::post('cc_pct');
        $data->ca = Request::post('ca');
        $data->ca_pct = Request::post('ca_pct');
        $data->lf = Request::post('lf');
        $data->lf_pct = Request::post('lf_pct');
        $data->uterina_derecha = Request::post('uterina_derecha');
        $data->uterina_derecha_pct = Request::post('uterina_derecha_pct');
        $data->uterina_izquierda = Request::post('uterina_izquierda');
        $data->uterina_izquierda_pct = Request::post('uterina_izquierda_pct');
        $data->uterinas = Request::post('uterinas');
        $data->translucidez_nucal = Request::post('translucidez_nucal');
        $data->translucencia_nucal = Request::post('translucencia_nucal');
        $data->hueso_nasal = Request::post('hueso_nasal');
        $data->hueso_nasal_valor = Request::post('hueso_nasal_valor');
        $data->ductus_venoso = Request::post('ductus_venoso');
        $data->reflujo_tricuspideo = Request::post('reflujo_tricuspideo');
        $data->comentariosexamen = Request::post('comentariosexamen');
        $data->modal = Request::post('modal');

        $response = new stdClass();
        $response->return = ExamenModel::createExamen($data);
        //$response->data = ConfiguracionModel::getAllPatologias();
        $response->modal = $data->modal;
        $this->View->renderJSON($response);
    }

    public function updateOnce(){
        $data = new stdClass();
        $data->examen_id = Request::post('id');
        $data->pre_id = Request::post('pre_id');
        $data->examen = Request::post('examen');
        $data->fecha = Request::post('fecha');
        $data->eg = Request::post('eg');
        $data->anatomia = Request::post('anatomia');
        $data->anatomia_extra = Request::post('anatomia_extra');
        $data->embrion = Request::post('embrion');
        $data->lcn = Request::post('lcn');
        $data->fcf = Request::post('fcf');
        $data->dbp = Request::post('dbp');
        $data->cc = Request::post('cc');
        $data->cc_pct = Request::post('cc_pct');
        $data->ca = Request::post('ca');
        $data->ca_pct = Request::post('ca_pct');
        $data->lf = Request::post('lf');
        $data->lf_pct = Request::post('lf_pct');
        $data->uterina_derecha = Request::post('uterina_derecha');
        $data->uterina_derecha_pct = Request::post('uterina_derecha_pct');
        $data->uterina_izquierda = Request::post('uterina_izquierda');
        $data->uterina_izquierda_pct = Request::post('uterina_izquierda_pct');
        $data->uterinas = Request::post('uterinas');
        $data->translucidez_nucal = Request::post('translucidez_nucal');
        $data->translucencia_nucal = Request::post('translucencia_nucal');
        $data->hueso_nasal = Request::post('hueso_nasal');
        $data->hueso_nasal_valor = Request::post('hueso_nasal_valor');
        $data->ductus_venoso = Request::post('ductus_venoso');
        $data->reflujo_tricuspideo = Request::post('reflujo_tricuspideo');
        $data->comentariosexamen = Request::post('comentariosexamen');
        $data->modal = Request::post('modal');

        $response = new stdClass();
        $response->return = ExamenModel::updateExamen($data);
        //$response->data = ConfiguracionModel::getAllPatologias();
        $response->modal = $data->modal;
        $this->View->renderJSON($response);
    }

    public function newParto(){
        $data = new stdClass();
        $data->pre_id = Request::post('pre_id');
        $data->examen = Request::post('examen');
        $data->fecha = Request::post('fecha');
        $data->fechaParto = Request::post('fechaParto');
        $data->eg = Request::post('eg');
        $data->lugar = Request::post('lugar');
        $data->talla = Request::post('talla');
        $data->peso = Request::post('peso');
        $data->imc = Request::post('imc');
        $data->estado = Request::post('estado');
        $data->paridad = Request::post('paridad');
        $data->sexo = Request::post('sexo');
        $data->edad = Request::post('edad');
        $data->etnia = Request::post('etnia');
        $data->pesofetal = Request::post('pesofetal');
        $data->pctpeso = Request::post('pctpeso');
        $data->pctpesocorregido = Request::post('pctpesocorregido');
        $data->tallafetal = Request::post('tallafetal');
        $data->ipn = Request::post('ipn');
        $data->apgaruno = Request::post('apgaruno');
        $data->apgardos = Request::post('apgardos');
        $data->craneo = Request::post('craneo');
        $data->ipneg = Request::post('ipneg');
        $data->meconio = Request::post('meconio');
        $data->craneo = Request::post('craneo');
        $data->protocolo = Request::post('protocolo');
        $data->hipoglicemia = Request::post('hipoglicemia');
        $data->reciennacido = Request::post('reciennacido');
        $data->comentariosexamen = Request::post('comentariosexamen');
        $data->modal = Request::post('modal');

        $response = new stdClass();
        $response->return = ExamenModel::createExamen($data);
        //$response->data = ConfiguracionModel::getAllPatologias();
        $response->modal = $data->modal;
        $this->View->renderJSON($response);
    }
}
