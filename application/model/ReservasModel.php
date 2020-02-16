<?php

class ReservasModel
{
    public static function getAllReservas($fecha, $ver, $institucion_id)
    {
        $database = DatabaseFactory::getFactory()->getConnection();
        $sql = "SELECT user_id, reserva_id, reserva_nombre, reserva_apellido, reserva_rut, reserva_dia, reserva_hora, reserva_minutos, reserva_visible, institucion_id FROM reservas WHERE user_id = :user_id AND reserva_dia = :reserva_dia AND reserva_visible = :reserva_visible AND institucion_id = :institucion_id ORDER BY reserva_hora, reserva_minutos";        
        $query = $database->prepare($sql);

        if ($fecha == NULL){
            $fecha = date("Y-m-d");
        }

        if ($ver == NULL || $ver == "1"){
            $ver = 1;
        }else if ($ver == "2"){
            $ver = 2;
        }else if ($ver == "3"){
            $ver = 3;
        }else{
            $ver = 0;  
        }

        if ($ver == 3){
            $sql = "SELECT user_id, reserva_id, reserva_nombre, reserva_apellido, reserva_rut, reserva_dia, reserva_hora, reserva_minutos, reserva_visible, institucion_id FROM reservas WHERE user_id = :user_id AND reserva_dia = :reserva_dia AND reserva_visible IN (0,1,2) AND institucion_id = :institucion_id ORDER BY reserva_hora, reserva_minutos";        
            $query = $database->prepare($sql);
            $query->execute(array(':user_id' => Session::get('user_id'), ':reserva_dia' => $fecha, ':institucion_id' => $institucion_id));
        }else{
            $query->execute(array(':user_id' => Session::get('user_id'), ':reserva_dia' => $fecha, ':reserva_visible' => $ver, ':institucion_id' => $institucion_id));
        }

        return $query->fetchAll();
    }

    public static function getReserva($data)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT user_id, reserva_id, reserva_nombre, reserva_apellido, reserva_rut, reserva_dia, reserva_hora, reserva_minutos FROM reservas WHERE user_id = :user_id AND reserva_id = :reserva_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':user_id' => Session::get('user_id'), ':reserva_id' => $data->id));

        return $query->fetch();
    }

    public static function createReserva($data)
    {

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "INSERT INTO reservas (user_id, reserva_nombre, reserva_apellido, reserva_rut, reserva_dia, reserva_hora, reserva_minutos, institucion_id) VALUES (:user_id, :reserva_nombre, :reserva_apellido, :reserva_rut, :reserva_dia, :reserva_hora, :reserva_minutos, :institucion_id)";
        $query = $database->prepare($sql);
        $query->execute(array(':reserva_nombre' => $data->nombre, ':reserva_apellido' => $data->apellido, ':reserva_rut' => $data->rut, ':reserva_dia' => $data->dia, ':reserva_hora' => $data->hora, ':reserva_minutos' => $data->minutos, ':institucion_id' => $data->institucion_id, ':user_id' => Session::get('user_id')));

        if ($query->rowCount() == 1) {
            return true;
        }

        return false;
    }

    public static function progressReserva($data)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "UPDATE reservas SET reserva_visible = 2 WHERE reserva_id = :reserva_id AND user_id = :user_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':reserva_id' => $data->id, ':user_id' => Session::get('user_id')));

        if ($query->rowCount() == 1) {
            return true;
        }

        return false;
    }

    public static function closeReserva($data)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "UPDATE reservas SET reserva_visible = 0 WHERE reserva_id = :reserva_id AND user_id = :user_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':reserva_id' => $data->id, ':user_id' => Session::get('user_id')));

        if ($query->rowCount() == 1) {
            return true;
        }

        return false;
    }

    public static function deleteReserva($data)
    {
        if (!$data->id) {
            return false;
        }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "DELETE FROM reservas WHERE reserva_id = :reserva_id AND user_id = :user_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':reserva_id' => $data->id, ':user_id' => Session::get('user_id')));

        if ($query->rowCount() == 1) {
            return true;
        }

        return false;
    }   
}