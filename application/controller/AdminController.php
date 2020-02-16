<?php

class AdminController extends Controller
{

    public function __construct(){
        parent::__construct();

        Auth::checkAdminAuthentication();
    }

    public function index(){
        $this->View->render('admin/index', array(
            'instituciones' => InstitucionesModel::getAllInstituciones())
        );
    }

    public function create(){
        InstitucionesModel::createInstitucion(Request::post('institucion_name'));
        Redirect::to('admin');
    }

    public function edit($institucion_id){
        $this->View->render('admin/edit', array(
            'institucion' => InstitucionesModel::getInstitucion($institucion_id)
        ));
    }

    public function editSave(){
        InstitucionesModel::updateInstitucion(Request::post('institucion_id'), Request::post('institucion_name'));
        Redirect::to('admin');
    }

    public function delete($institucion_id){
        InstitucionesModel::deleteInstitucion($institucion_id);
        Redirect::to('admin');
    }
}
