<?php

class ExamenModel
{

    public static function getAllNotes()
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT user_id, note_id, note_text FROM notes WHERE user_id = :user_id";
        $query = $database->prepare($sql);
        $query->execute(array(':user_id' => Session::get('user_id')));

        // fetchAll() is the PDO method that gets all result rows
        return $query->fetchAll();
    }

    public static function getAllExamenPaciente($id)
    {
        if ($id == NULL){
            $data = new stdClass();
            return $data;
        }else if (is_numeric($id) == true && $id > 0){
            $paciente = PacientesModel::getPacienteID($id);
    
            return self::getAllExamenRUT($paciente->rut);
        }
    }

    public static function getAllExamenRUT($rut)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT user_id, examen_id, pre_id, paciente_rut, examen_tipo, examen_fecha, examen_eg, examen_data FROM examen WHERE user_id = :user_id AND paciente_rut = :paciente_rut";
        $query = $database->prepare($sql);
        $query->execute(array(':user_id' => Session::get('user_id'), ':paciente_rut' => $rut));

        return $query->fetchAll();
    }

    public static function getExamenPre($data)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT user_id, examen_id, pre_id, paciente_rut, examen_tipo, examen_fecha, examen_eg, examen_data FROM examen WHERE user_id = :user_id AND pre_id = :pre_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':user_id' => Session::get('user_id'), ':pre_id' => $data->pre_id));


        return $query->fetch();
    }

    public static function getExamen($examen_id)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT user_id, examen_id, pre_id, paciente_rut, examen_tipo, examen_fecha, examen_eg, examen_data FROM examen WHERE user_id = :user_id AND examen_id = :examen_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':user_id' => Session::get('user_id'), ':examen_id' => $examen_id));


        return $query->fetch();
    }

    public static function createExamen($data)
    {
        if (!$data) {
            return false;
        }

        $pre = PreModel::getPre($data);
       
        $_examen = new stdClass();
        
        if ($data->examen == 0){
            $_examen->presentacion = $data->presentacion;
            $_examen->dorso = $data->dorso;
            $_examen->sexo_fetal = $data->sexo_fetal;
            $_examen->placenta_insercion = $data->placenta_insercion;
            $_examen->placenta = $data->placenta;
            $_examen->liquido = $data->liquido;
            $_examen->bvm = $data->bvm;
            $_examen->fcf = $data->fcf;
            $_examen->anatomia = $data->anatomia;
            $_examen->anatomia_extra = $data->anatomia_extra;
            $_examen->dbp = $data->dbp;
            $_examen->dof = $data->dof;
            $_examen->cc = $data->cc;
            $_examen->cc_pct = $data->cc_pct;
            $_examen->ca = $data->ca;
            $_examen->ca_pct = $data->ca_pct;
            $_examen->lf = $data->lf;
            $_examen->lf_pct = $data->lf_pct;
            $_examen->ccca = $data->ccca;
            $_examen->pfe = $data->pfe;
            $_examen->uterina_derecha = $data->uterina_derecha;
            $_examen->uterina_derecha_pct = $data->uterina_derecha_pct;
            $_examen->uterina_izquierda = $data->uterina_izquierda;
            $_examen->uterina_izquierda_pct = $data->uterina_izquierda_pct;
            $_examen->uterinas = $data->uterinas;
            $_examen->umbilical = $data->umbilical;
            $_examen->umbilical_pct = $data->umbilical_pct;
            $_examen->cm = $data->cm;
            $_examen->cm_pct = $data->cm_pct;
            $_examen->cmau = $data->cmau;
            $_examen->hipotesis = $data->hipotesis;
            $_examen->doppler_materno = $data->doppler_materno;
            $_examen->doppler_fetal = $data->doppler_fetal;
            $_examen->comentariosexamen = $data->comentariosexamen;

        }else if ($data->examen == 1){

            $_examen->presentacion = $data->presentacion;
            $_examen->dorso = $data->dorso;
            $_examen->sexo_fetal = $data->sexo_fetal;
            $_examen->placenta_insercion = $data->placenta_insercion;
            $_examen->placenta = $data->placenta;
            $_examen->liquido = $data->liquido;
            $_examen->bvm = $data->bvm;
            $_examen->fcf = $data->fcf;
            $_examen->anatomia = $data->anatomia;
            $_examen->anatomia_extra = $data->anatomia_extra;
            $_examen->atrio_posterior = $data->atrio_posterior;
            $_examen->atrio_posterior_mm = $data->atrio_posterior_mm;
            $_examen->cerebelo_text = $data->cerebelo_text;
            $_examen->cerebelo_mm = $data->cerebelo_mm;
            $_examen->cisterna_m = $data->cisterna_m;
            $_examen->cisterna_m_mm = $data->cisterna_m_mm;
            $_examen->dbp = $data->dbp;
            $_examen->dof = $data->dof;
            $_examen->ic= $data->ic;
            $_examen->cc = $data->cc;
            $_examen->cc_pct = $data->cc_pct;
            $_examen->ca = $data->ca;
            $_examen->ca_pct = $data->ca_pct;
            $_examen->lf = $data->lf;
            $_examen->lf_pct = $data->lf_pct;
            $_examen->lh = $data->lh;
            $_examen->lh_pct = $data->lh_pct;
            $_examen->cerebelo = $data->cerebelo;
            $_examen->cerebelo_pct = $data->cerebelo_pct;
            $_examen->ccca = $data->ccca;
            $_examen->pfe = $data->pfe;
            $_examen->uterina_derecha = $data->uterina_derecha;
            $_examen->uterina_derecha_pct = $data->uterina_derecha_pct;
            $_examen->uterina_izquierda = $data->uterina_izquierda;
            $_examen->uterina_izquierda_pct = $data->uterina_izquierda_pct;
            $_examen->uterinas = $data->uterinas;
            $_examen->comentariosexamen = $data->comentariosexamen;
        }else if ($data->examen == 3){
            $_examen->utero_primertrimestre = $data->utero_primertrimestre;
            $_examen->saco_gestacional = $data->saco_gestacional;
            $_examen->saco = $data->saco;
            $_examen->saco_eg = $data->saco_eg;
            $_examen->saco_vitelino = $data->saco_vitelino;
            $_examen->saco_vitelino_mm = $data->saco_vitelino_mm;
            $_examen->embrion = $data->embrion;
            $_examen->lcn = $data->lcn;
            $_examen->lcn_eg = $data->lcn_eg;
            $_examen->fcf = $data->fcf;
            $_examen->furop = $data->furop;
            $_examen->fppactualizada = $data->fppactualizada;
            $_examen->anexo_izquierdo_primertrimestre = $data->anexo_izquierdo_primertrimestre;
            $_examen->anexo_derecho_primertrimestre = $data->anexo_derecho_primertrimestre;
            $_examen->douglas_primertrimestre = $data->douglas_primertrimestre;
            $_examen->comentariosexamen = $data->comentariosexamen;
        }else if ($data->examen == 4){
            $_examen->utero_uno = $data->utero_uno;
            $_examen->utero_dos = $data->utero_dos;
            $_examen->utero_tres = $data->utero_tres;
            $_examen->utero_cuatro = $data->utero_cuatro;
            $_examen->endometrio_uno = $data->endometrio_uno;
            $_examen->endometrio_dos = $data->endometrio_dos;
            $_examen->anexial = $data->anexial;
            $_examen->oi_uno = $data->oi_uno;
            $_examen->oi_dos = $data->oi_dos;
            $_examen->oi_tres = $data->oi_tres;
            $_examen->oi_cuatro = $data->oi_cuatro;
            $_examen->oi_cinco = $data->oi_cinco;
            $_examen->od_uno = $data->od_uno;
            $_examen->od_dos = $data->od_dos;
            $_examen->od_tres = $data->od_tres;
            $_examen->od_cuatro = $data->od_cuatro;
            $_examen->od_cinco = $data->od_cinco;
            $_examen->douglas = $data->douglas;
            $_examen->douglas_com = $data->douglas_com;
            $_examen->comentariosexamen = $data->comentariosexamen;
        }

        $_examen = json_encode($_examen);

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "INSERT INTO examen (pre_id, paciente_rut, examen_tipo, examen_fecha, examen_eg, examen_data, user_id) VALUES (:pre_id, :paciente_rut, :examen_tipo, :examen_fecha, :examen_eg, :examen_data, :user_id)";
        $query = $database->prepare($sql);
        $query->execute(array(':pre_id' => $pre->pre_id, ':paciente_rut' => $pre->paciente_rut, ':examen_tipo' => $data->examen, ':examen_fecha' => $data->fecha, ':examen_eg' => $data->eg, ':examen_data' => $_examen, ':user_id' => Session::get('user_id')));

        if ($query->rowCount() == 1) {
            return $database->lastInsertId();
        }

        // default return
        return false;
    }

    public static function updateExamen($data){
        if (!$data) {
            return false;
        }

        $pre = PreModel::getPre($data);
       
        $_examen = new stdClass();
        
        if ($data->examen == 0){
            $_examen->presentacion = $data->presentacion;
            $_examen->dorso = $data->dorso;
            $_examen->sexo_fetal = $data->sexo_fetal;
            $_examen->placenta_insercion = $data->placenta_insercion;
            $_examen->placenta = $data->placenta;
            $_examen->liquido = $data->liquido;
            $_examen->bvm = $data->bvm;
            $_examen->fcf = $data->fcf;
            $_examen->anatomia = $data->anatomia;
            $_examen->anatomia_extra = $data->anatomia_extra;
            $_examen->dbp = $data->dbp;
            $_examen->dof = $data->dof;
            $_examen->cc = $data->cc;
            $_examen->cc_pct = $data->cc_pct;
            $_examen->ca = $data->ca;
            $_examen->ca_pct = $data->ca_pct;
            $_examen->lf = $data->lf;
            $_examen->lf_pct = $data->lf_pct;
            $_examen->ccca = $data->ccca;
            $_examen->pfe = $data->pfe;
            $_examen->uterina_derecha = $data->uterina_derecha;
            $_examen->uterina_derecha_pct = $data->uterina_derecha_pct;
            $_examen->uterina_izquierda = $data->uterina_izquierda;
            $_examen->uterina_izquierda_pct = $data->uterina_izquierda_pct;
            $_examen->uterinas = $data->uterinas;
            $_examen->umbilical = $data->umbilical;
            $_examen->umbilical_pct = $data->umbilical_pct;
            $_examen->cm = $data->cm;
            $_examen->cm_pct = $data->cm_pct;
            $_examen->cmau = $data->cmau;
            $_examen->hipotesis = $data->hipotesis;
            $_examen->doppler_materno = $data->doppler_materno;
            $_examen->doppler_fetal = $data->doppler_fetal;
            $_examen->comentariosexamen = $data->comentariosexamen;
        }else if ($data->examen == 1){
            $_examen->presentacion = $data->presentacion;
            $_examen->dorso = $data->dorso;
            $_examen->sexo_fetal = $data->sexo_fetal;
            $_examen->placenta_insercion = $data->placenta_insercion;
            $_examen->placenta = $data->placenta;
            $_examen->liquido = $data->liquido;
            $_examen->bvm = $data->bvm;
            $_examen->fcf = $data->fcf;
            $_examen->anatomia = $data->anatomia;
            $_examen->anatomia_extra = $data->anatomia_extra;
            $_examen->atrio_posterior = $data->atrio_posterior;
            $_examen->atrio_posterior_mm = $data->atrio_posterior_mm;
            $_examen->cerebelo_text = $data->cerebelo_text;
            $_examen->cerebelo_mm = $data->cerebelo_mm;
            $_examen->cisterna_m = $data->cisterna_m;
            $_examen->cisterna_m_mm = $data->cisterna_m_mm;
            $_examen->dbp = $data->dbp;
            $_examen->dof = $data->dof;
            $_examen->ic= $data->ic;
            $_examen->cc = $data->cc;
            $_examen->cc_pct = $data->cc_pct;
            $_examen->ca = $data->ca;
            $_examen->ca_pct = $data->ca_pct;
            $_examen->lf = $data->lf;
            $_examen->lf_pct = $data->lf_pct;
            $_examen->lh = $data->lh;
            $_examen->lh_pct = $data->lh_pct;
            $_examen->cerebelo = $data->cerebelo;
            $_examen->cerebelo_pct = $data->cerebelo_pct;
            $_examen->ccca = $data->ccca;
            $_examen->pfe = $data->pfe;
            $_examen->uterina_derecha = $data->uterina_derecha;
            $_examen->uterina_derecha_pct = $data->uterina_derecha_pct;
            $_examen->uterina_izquierda = $data->uterina_izquierda;
            $_examen->uterina_izquierda_pct = $data->uterina_izquierda_pct;
            $_examen->uterinas = $data->uterinas;
            $_examen->comentariosexamen = $data->comentariosexamen;
        }else if ($data->examen == 3){
            $_examen->utero_primertrimestre = $data->utero_primertrimestre;
            $_examen->saco_gestacional = $data->saco_gestacional;
            $_examen->saco = $data->saco;
            $_examen->saco_eg = $data->saco_eg;
            $_examen->saco_vitelino = $data->saco_vitelino;
            $_examen->saco_vitelino_mm = $data->saco_vitelino_mm;
            $_examen->embrion = $data->embrion;
            $_examen->lcn = $data->lcn;
            $_examen->lcn_eg = $data->lcn_eg;
            $_examen->fcf = $data->fcf;
            $_examen->furop = $data->furop;
            $_examen->fppactualizada = $data->fppactualizada;
            $_examen->anexo_izquierdo_primertrimestre = $data->anexo_izquierdo_primertrimestre;
            $_examen->anexo_derecho_primertrimestre = $data->anexo_derecho_primertrimestre;
            $_examen->douglas_primertrimestre = $data->douglas_primertrimestre;
            $_examen->comentariosexamen = $data->comentariosexamen;
        }else if ($data->examen == 4){
            $_examen->utero_uno = $data->utero_uno;
            $_examen->utero_dos = $data->utero_dos;
            $_examen->utero_tres = $data->utero_tres;
            $_examen->utero_cuatro = $data->utero_cuatro;
            $_examen->endometrio_uno = $data->endometrio_uno;
            $_examen->endometrio_dos = $data->endometrio_dos;
            $_examen->anexial = $data->anexial;
            $_examen->oi_uno = $data->oi_uno;
            $_examen->oi_dos = $data->oi_dos;
            $_examen->oi_tres = $data->oi_tres;
            $_examen->oi_cuatro = $data->oi_cuatro;
            $_examen->oi_cinco = $data->oi_cinco;
            $_examen->od_uno = $data->od_uno;
            $_examen->od_dos = $data->od_dos;
            $_examen->od_tres = $data->od_tres;
            $_examen->od_cuatro = $data->od_cuatro;
            $_examen->od_cinco = $data->od_cinco;
            $_examen->douglas = $data->douglas;
            $_examen->douglas_com = $data->douglas_com;
            $_examen->comentariosexamen = $data->comentariosexamen;
        }

        $_examen = json_encode($_examen);

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "UPDATE examen SET pre_id = :pre_id, paciente_rut = :paciente_rut, examen_tipo = :examen_tipo, examen_fecha = :examen_fecha, examen_eg = :examen_eg, examen_data = :examen_data WHERE examen_id = :examen_id AND user_id = :user_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':examen_id' => $data->examen_id, ':pre_id' => $pre->pre_id, ':paciente_rut' => $pre->paciente_rut, ':examen_tipo' => $data->examen, ':examen_fecha' => $data->fecha, ':examen_eg' => $data->eg, ':examen_data' => $_examen, ':user_id' => Session::get('user_id')));

        if ($query->rowCount() == 1) {
            return $data->examen_id;
        }

        return false;
    }

    /**
     * Update an existing note
     * @param int $note_id id of the specific note
     * @param string $note_text new text of the specific note
     * @return bool feedback (was the update successful ?)
     */
    public static function updateNote($note_id, $note_text)
    {
        if (!$note_id || !$note_text) {
            return false;
        }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "UPDATE notes SET note_text = :note_text WHERE note_id = :note_id AND user_id = :user_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':note_id' => $note_id, ':note_text' => $note_text, ':user_id' => Session::get('user_id')));

        if ($query->rowCount() == 1) {
            return true;
        }

        Session::add('feedback_negative', Text::get('FEEDBACK_NOTE_EDITING_FAILED'));
        return false;
    }

    /**
     * Delete a specific note
     * @param int $note_id id of the note
     * @return bool feedback (was the note deleted properly ?)
     */
    public static function deleteExamen($data)
    {
        if (!$data) {
            return false;
        }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "DELETE FROM examen WHERE examen_id = :examen_id AND user_id = :user_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':examen_id' => $data->id, ':user_id' => Session::get('user_id')));

        if ($query->rowCount() == 1) {
            return true;
        }

        // default return
        return false;
    }
}
