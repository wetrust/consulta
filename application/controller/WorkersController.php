<?php

class WorkersController extends Controller
{

    public function __construct(){
        parent::__construct();

        Auth::checkAdminAuthentication();
    }

    public function index($institucion_id = NULL){

        $all_Instituciones = InstitucionesModel::getAllInstituciones();
        $workers = [];

        if (count($all_Instituciones) > 0){
            if ($institucion_id == NULL){
                $workers = InstitucionesModel::getAllIU($all_Instituciones[0]->institucion_id);
                $institucion_id = $all_Instituciones[0]->institucion_id;
            }
            else{
                $workers = InstitucionesModel::getAllIU($institucion_id);
            }

            $users = UserModel::getPublicProfilesOfAllUsers();

            //eliminar los usuarios que ya están en la institución
            foreach ($workers as $user) {
                unset($users[$user->user_id]);
            }
            //

            $this->View->render('admin/workers/index', array(
                'instituciones' => $all_Instituciones,
                'workers' => $workers,
                'users' => $users,
                'institucion_id' => $institucion_id)
            );
        }else{
            Redirect::to("admin");
        }

    }

    public function create(){
        InstitucionesModel::createIU(Request::post('institucion_id'), Request::post('user_id'));
        Redirect::to('workers');
    }

    public function edit($institucion_id){
        $this->View->render('admin/workers/edit', array(
            'worker' => InstitucionesModel::getInstitucion($institucion_id)
        ));
    }

    public function editSave(){
        InstitucionesModel::updateInstitucion(Request::post('institucion_id'), Request::post('institucion_name'));
        Redirect::to('workers');
    }

    public function delete($institucion_id){
        InstitucionesModel::deleteIU($institucion_id);
        Redirect::to('workers');
    }
}
