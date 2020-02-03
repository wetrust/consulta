<?php

class InformeController extends Controller
{
    /**
     * Construct this object by extending the basic Controller class
     */
    public function __construct()
    {
        parent::__construct();

        // this entire controller should only be visible/usable by logged in users, so we put authentication-check here
        Auth::checkAuthentication();
    }

    /**
     * Handles what happens when user moves to URL/index/index - or - as this is the default controller, also
     * when user moves to /index or enter your application at base level
     */
    public function get($examen_id = NULL)
    {
        if ($examen_id == NULL){
            $this->View->render('index/index');
        }else if (is_numeric($examen_id)){

            $examen = ExamenModel::getExamen($examen_id);

            if (!$examen) {
                return false;
            }else{
                header("Access-Control-Allow-Origin: *");
                header("Content-Type: application/pdf");

                $paciente = PacientesModel::getPaciente($examen->paciente_rut);
                $pre = PreModel::getPre($examen);
                $informe = "";

                if ($examen->examen_tipo == "0"){
                    $informe = 'pdf/dopplercrecimiento';
                }else if ($examen->examen_tipo == "1"){
                    $informe = "";
                }else if ($examen->examen_tipo == "2"){
                    $informe = "";
                }else if ($examen->examen_tipo == "3"){
                    $informe = "";
                }else if ($examen->examen_tipo == "4"){
                    $informe = "";
                }

                $this->View->renderWithoutHeaderAndFooter($informe, 
                array(
                    'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
                    'paciente' => $paciente,
                    'pre' => $pre,
                    'examen' => $examen
                ));
            }
        }
    }
}
