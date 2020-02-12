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
                //header("Content-Type: application/pdf");

                $paciente = PacientesModel::getPaciente($examen->paciente_rut);
                $pre = PreModel::getPre($examen);
                $informe = "";

                if ($examen->examen_tipo == "0"){
                    $informe = 'pdf/dopplercrecimiento';
                }else if ($examen->examen_tipo == "1"){
                    $informe = 'pdf/dostres';
                }else if ($examen->examen_tipo == "2"){
                    $informe = 'pdf/oncecatorce';
                }else if ($examen->examen_tipo == "3"){
                    $informe = "pdf/ecoprecoz";
                }else if ($examen->examen_tipo == "4"){
                    $informe = 'pdf/gine';
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

    public function pdf($reserva_id = NULL)
    {
        $response = new stdClass();

        if ($reserva_id == NULL){
            $response->return = false;
        }else if (is_numeric($reserva_id)){

            $response->reserva_id = $reserva_id;
            $pre = PreModel::getPreReserva($response);

            if (empty($pre)){
                $response->return = false;
            }else{
                $response->pre_id = $pre->pre_id;
                $informe = ExamenModel::getExamenPre($response);
                $response->return = $informe->examen_id;
            }

        }

        $this->View->renderJSON($response);
    }
}
