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

    public static function getExamen($note_id)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT user_id, examen_id, pre_id, paciente_rut, examen_tipo, examen_fecha, examen_eg, examen_data FROM examen WHERE user_id = :user_id AND examen_id = :examen_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':user_id' => Session::get('user_id'), ':examen_id' => $note_id));


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
        }else{

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
    public static function deleteNote($note_id)
    {
        if (!$note_id) {
            return false;
        }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "DELETE FROM notes WHERE note_id = :note_id AND user_id = :user_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':note_id' => $note_id, ':user_id' => Session::get('user_id')));

        if ($query->rowCount() == 1) {
            return true;
        }

        // default return
        Session::add('feedback_negative', Text::get('FEEDBACK_NOTE_DELETION_FAILED'));
        return false;
    }
}
