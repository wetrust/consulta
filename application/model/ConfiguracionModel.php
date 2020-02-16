<?php

class ConfiguracionModel
{
    public static function getAllNacionalidades($institucion_id){
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT nacionalidad_id, nacionalidad_name, institucion_id FROM c_nacionalidad WHERE institucion_id = :institucion_id";
        $query = $database->prepare($sql);
        $query->execute(array(':institucion_id' => $institucion_id));

        return $query->fetchAll();
    }

    public static function getAllCiudades($institucion_id){
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT user_id, ciudad_id, ciudad_name, institucion_id FROM c_ciudad WHERE institucion_id = :institucion_id";
        $query = $database->prepare($sql);
        $query->execute(array(':institucion_id' => $institucion_id));

        return $query->fetchAll();
    }

    public static function getAllLugares($institucion_id){
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT user_id, lugar_id, lugar_name, institucion_id FROM c_lugar WHERE institucion_id = :institucion_id";
        $query = $database->prepare($sql);
        $query->execute(array(':institucion_id' => $institucion_id));

        return $query->fetchAll();
    }

    public static function getAllPatologias($institucion_id){
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT user_id, patologia_id, patologia_name, institucion_id FROM c_patologia WHERE institucion_id = :institucion_id";
        $query = $database->prepare($sql);
        $query->execute(array(':institucion_id' => $institucion_id));

        return $query->fetchAll();
    }

    public static function getAllAgenda($institucion_id){
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT c_agenda.user_id, c_agenda.agenda_id, c_agenda.agenda_name, c_agenda.agenda_email, c_agenda.agenda_profesion, c_agenda.agenda_ciudad, c_ciudad.ciudad_name, c_agenda.institucion_id FROM c_agenda INNER JOIN c_ciudad ON c_agenda.agenda_ciudad = c_ciudad.ciudad_id WHERE c_agenda.institucion_id = :institucion_id";
        $query = $database->prepare($sql);
        $query->execute(array(':institucion_id' => $institucion_id));

        return $query->fetchAll();
    }

    public static function getMembrete($institucion_id){
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT membrete_id, membrete_text, institucion_id FROM membrete WHERE institucion_id = :institucion_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':institucion_id' => $institucion_id));

        return $query->fetchAll();
    }

    public static function createNacionalidad($data){
        if (!$data->nacionalidad || strlen($data->nacionalidad) == 0) {
            return false;
        }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "INSERT INTO c_nacionalidad (nacionalidad_name, institucion_id, user_id) VALUES (:nacionalidad_name, :institucion_id, :user_id)";
        $query = $database->prepare($sql);
        $query->execute(array(':nacionalidad_name' => $data->nacionalidad, ':institucion_id' => $data->institucion_id, ':user_id' => Session::get('user_id')));

        if ($query->rowCount() == 1) {
            return true;
        }

        return false;
    }

    public static function createCiudad($data){
        if (!$data->ciudad || strlen($data->ciudad) == 0) {
            return false;
        }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "INSERT INTO c_ciudad (ciudad_name, institucion_id, user_id) VALUES (:ciudad_name, :institucion_id, :user_id)";
        $query = $database->prepare($sql);
        $query->execute(array(':ciudad_name' => $data->ciudad, ':institucion_id' => $data->institucion_id, ':user_id' => Session::get('user_id')));

        if ($query->rowCount() == 1) {
            return true;
        }

        return false;
    }

    public static function createLugar($data){
        if (!$data->lugar || strlen($data->lugar) == 0) {
            return false;
        }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "INSERT INTO c_lugar (lugar_name, institucion_id, user_id) VALUES (:lugar_name, :institucion_id, :user_id)";
        $query = $database->prepare($sql);
        $query->execute(array(':lugar_name' => $data->lugar, ':institucion_id' => $data->institucion_id, ':user_id' => Session::get('user_id')));

        if ($query->rowCount() == 1) {
            return true;
        }

        return false;
    }

    public static function createPatologia($data){
        if (!$data->patologia || strlen($data->patologia) == 0) {
            return false;
        }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "INSERT INTO c_patologia (patologia_name, institucion_id, user_id) VALUES (:patologia_name, :institucion_id, :user_id)";
        $query = $database->prepare($sql);
        $query->execute(array(':patologia_name' => $data->patologia, ':institucion_id' => $data->institucion_id, ':user_id' => Session::get('user_id')));

        if ($query->rowCount() == 1) {
            return true;
        }

        return false;
    }

    public static function createAgenda($data){
        if (!$data->nombre || strlen($data->nombre) == 0) {
            return false;
        }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "INSERT INTO c_agenda (agenda_name, agenda_email, agenda_profesion, agenda_ciudad, institucion_id, user_id) VALUES (:agenda_name, :agenda_email, :agenda_profesion, :agenda_ciudad, :institucion_id, :user_id)";
        $query = $database->prepare($sql);
        $query->execute(array(':agenda_name' => $data->nombre, ':agenda_email' => $data->email, ':agenda_profesion' => $data->profesion, ':agenda_ciudad' => $data->ciudad, ':institucion_id' => $data->institucion_id, ':user_id' => Session::get('user_id')));

        if ($query->rowCount() == 1) {
            return true;
        }

        return false;
    }

    public static function createMembrete($data){
        if (!$data->text || strlen($data->text) == 0) {
            return false;
        }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "INSERT INTO membrete (membrete_text, institucion_id) VALUES (:membrete_text, :institucion_id)";
        $query = $database->prepare($sql);
        $query->execute(array(':membrete_text' => $data->text, ':institucion_id' => $data->institucion_id));

        if ($query->rowCount() == 1) {
            return true;
        }

        return false;
    }

    public static function updateMembrete($data){
        if (!$data->text || strlen($data->text) == 0) {
            return false;
        }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "UPDATE membrete SET membrete_text = :membrete_text WHERE institucion_id = :institucion_id";
        $query = $database->prepare($sql);
        $query->execute(array(':membrete_text' => $data->text, ':institucion_id' => $data->institucion_id));

        if ($query->rowCount() == 1) {
            return true;
        }

        return false;
    }

    public static function deleteNacionalidad($data){
        if (!$data->id) { return false; }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "DELETE FROM c_nacionalidad WHERE nacionalidad_id = :nacionalidad_id AND user_id = :user_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':nacionalidad_id' => $data->id, ':user_id' => Session::get('user_id')));

        if ($query->rowCount() == 1) {
            return true;
        }

        return false;
    }

    public static function deleteCiudad($data){
        if (!$data->id) { return false; }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "DELETE FROM c_ciudad WHERE ciudad_id = :ciudad_id AND user_id = :user_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':ciudad_id' => $data->id, ':user_id' => Session::get('user_id')));

        if ($query->rowCount() == 1) {
            return true;
        }

        return false;
    }

    public static function deleteLugar($data){
        if (!$data->id) { return false; }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "DELETE FROM c_lugar WHERE lugar_id = :lugar_id AND user_id = :user_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':lugar_id' => $data->id, ':user_id' => Session::get('user_id')));

        if ($query->rowCount() == 1) {
            return true;
        }

        return false;
    }

    public static function deletePatologia($data){
        if (!$data->id) { return false; }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "DELETE FROM c_patologia WHERE patologia_id = :patologia_id AND user_id = :user_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':patologia_id' => $data->id, ':user_id' => Session::get('user_id')));

        if ($query->rowCount() == 1) {
            return true;
        }

        return false;
    }

    public static function deleteAgenda($data){
        if (!$data->id) { return false; }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "DELETE FROM c_agenda WHERE agenda_id = :agenda_id AND user_id = :user_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':agenda_id' => $data->id, ':user_id' => Session::get('user_id')));

        if ($query->rowCount() == 1) {
            return true;
        }

        return false;
    }

    public static function deleteMembrete($data){
        if (!$data->institucion_id) { return false; }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "DELETE FROM membrete WHERE institucion_id = :institucion_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':institucion_id' => $data->institucion_id));

        if ($query->rowCount() == 1) {
            return true;
        }

        return false;
    }
}