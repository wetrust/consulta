<?php

/**
 * InstitucionesModel
 * This is basically a simple CRUD (Create/Read/Update/Delete) demonstration.
 */
class InstitucionesModel
{
    /**
     * Get all notes (notes are just example data that the user has created)
     * @return array an array with several objects (the results)
     */
    public static function getAllInstituciones()
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT user_id, institucion_id, institucion_name FROM instituciones WHERE user_id = :user_id";
        $query = $database->prepare($sql);
        $query->execute(array(':user_id' => Session::get('user_id')));

        // fetchAll() is the PDO method that gets all result rows
        return $query->fetchAll();
    }

    /**
     * Get a single note
     * @param int $institucion_id id of the specific note
     * @return object a single object (the result)
     */
    public static function getInstitucion($institucion_id)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT user_id, institucion_id, institucion_name FROM instituciones WHERE institucion_id = :institucion_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':institucion_id' => $institucion_id));

        // fetch() is the PDO method that gets a single result
        return $query->fetch();
    }

    /**
     * Set a note (create a new one)
     * @param string $note_text note text that will be created
     * @return bool feedback (was the note created properly ?)
     */
    public static function createInstitucion($institucion_name)
    {
        if (!$institucion_name || strlen($institucion_name) == 0) {
            return false;
        }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "INSERT INTO instituciones (institucion_name, user_id) VALUES (:institucion_name, :user_id)";
        $query = $database->prepare($sql);
        $query->execute(array(':institucion_name' => $institucion_name, ':user_id' => Session::get('user_id')));

        if ($query->rowCount() == 1) {
            return true;
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
    public static function updateInstitucion($institucion_id, $institucion_name)
    {
        if (!$note_id || !$institucion_name) {
            return false;
        }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "UPDATE instituciones SET institucion_name = :institucion_name WHERE institucion_id = :institucion_id AND user_id = :user_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':institucion_id' => $institucion_id, ':institucion_name' => $institucion_name, ':user_id' => Session::get('user_id')));

        if ($query->rowCount() == 1) {
            return true;
        }

        return false;
    }

    /**
     * Delete a specific note
     * @param int $note_id id of the note
     * @return bool feedback (was the note deleted properly ?)
     */
    public static function deleteInstitucion($institucion_id)
    {
        if (!$institucion_id) {
            return false;
        }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "DELETE FROM instituciones WHERE institucion_id = :institucion_id AND user_id = :user_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':institucion_id' => $institucion_id, ':user_id' => Session::get('user_id')));

        if ($query->rowCount() == 1) {
            return true;
        }

        // default return
        return false;
    }

    /**
     * Get all notes (notes are just example data that the user has created)
     * @return array an array with several objects (the results)
     */
    public static function getAllIU($institucion_id)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT instituciones_usuarios.iu_id, instituciones_usuarios.institucion_id, instituciones.institucion_name, instituciones_usuarios.user_id, users.user_name FROM instituciones_usuarios INNER JOIN instituciones ON instituciones.institucion_id = instituciones_usuarios.institucion_id INNER JOIN users ON users.user_id = instituciones_usuarios.user_id WHERE instituciones_usuarios.institucion_id = :institucion_id";
        $query = $database->prepare($sql);
        $query->execute(array(':institucion_id' => $institucion_id));

        // fetchAll() is the PDO method that gets all result rows
        return $query->fetchAll();
    }

    public static function getAllIUUser()
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT instituciones_usuarios.iu_id, instituciones_usuarios.institucion_id, instituciones.institucion_name FROM instituciones_usuarios INNER JOIN instituciones ON instituciones.institucion_id = instituciones_usuarios.institucion_id WHERE instituciones_usuarios.user_id = :user_id";
        $query = $database->prepare($sql);
        $query->execute(array(':user_id' => Session::get('user_id')));

        // fetchAll() is the PDO method that gets all result rows
        return $query->fetchAll();
    }


    /**
     * Get a single note
     * @param int $institucion_id id of the specific note
     * @return object a single object (the result)
     */
    public static function getIU($iu_id)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT iu_id, institucion_id, user_id FROM instituciones_usuarios WHERE iu_id = :iu_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':iu_id' => $iu_id));

        // fetch() is the PDO method that gets a single result
        return $query->fetch();
    }

    /**
     * Set a note (create a new one)
     * @param string $note_text note text that will be created
     * @return bool feedback (was the note created properly ?)
     */
    public static function createIU($institucion_id, $user_id)
    {
        if (!$institucion_id || strlen($institucion_id) == 0) {
            return false;
        }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "INSERT INTO instituciones_usuarios (institucion_id, user_id) VALUES (:institucion_id, :user_id)";
        $query = $database->prepare($sql);
        $query->execute(array(':institucion_id' => $institucion_id, ':user_id' => $user_id));

        if ($query->rowCount() == 1) {
            return true;
        }

        // default return
        return false;
    }

    /**
     * Delete a specific note
     * @param int $note_id id of the note
     * @return bool feedback (was the note deleted properly ?)
     */
    public static function deleteIU($iu_id)
    {
        if (!$iu_id) {
            return false;
        }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "DELETE FROM instituciones_usuarios WHERE iu_id = :iu_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':iu_id' => $iu_id));

        if ($query->rowCount() == 1) {
            return true;
        }

        // default return
        return false;
    }
}
