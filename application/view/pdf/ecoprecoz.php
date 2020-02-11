<?php
    // set document information
    $this->pdf->SetCreator(PDF_CREATOR);
    $this->pdf->SetAuthor('WT');
    $this->pdf->SetTitle('Evaluación ecográfica del crecimiento fetal');
    $this->pdf->SetSubject('TCPDF Tutorial');
    $this->pdf->SetKeywords('TCPDF, PDF, example, test, guide');

    // set default header data
    //$pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, PDF_HEADER_TITLE.' 009', PDF_HEADER_STRING);

    // set header and footer fonts
    //$pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
    //$pdf->setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));

    // set default monospaced font
    $this->pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

    // set margins
    $this->pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP+5, PDF_MARGIN_RIGHT);
    $this->pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
    $this->pdf->SetFooterMargin(PDF_MARGIN_FOOTER);
    $this->pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

    // -------------------------------------------------------------------

    // add a page
    $this->pdf->AddPage('P', 'LETTER');

    // set JPEG quality
    $this->pdf->setJPEGQuality(90);

    $this->pdf->SetFont('Helvetica', '', 9);
    
    $fecha = explode("-", $this->examen->examen_fecha);
    $fecha = $fecha[2] . "-". $fecha[1]. "-". $fecha[0];

    $solicitud_fum = explode("-", $this->paciente->fum);
    $solicitud_fum = $solicitud_fum[2] . "-". $solicitud_fum[1]. "-". $solicitud_fum[0];

    $data = json_decode($this->examen->examen_data);
    
    $html = '<h3>EVALUACIÓN ECOGRÁFICA OBSTÉTRICA PRECOZ (EDADES GESTACIONALES &lt; 11 SEMANAS)</h3>';
    $this->pdf->writeHTMLCell('', '', '10', '', $html, 0, 1, 0, true, 'C', true);
    $this->pdf->Ln(4);

    $html = '<table><tbody><tr><td>Nombre del paciente: '.htmlentities($this->paciente->nombre . " " . $this->paciente->apellido).'</td><td>RUT (DNI): '.htmlentities($this->paciente->rut).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(1);
    //$html = '<table><tbody><tr><td>Edad materna</td><td>: '.htmlentities($this->solicitud->solicitud_ematerna).' años</td></tr></tbody></table>';
    //$this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    //$this->pdf->Ln(1);
    $html = '<table><tbody><tr><td>Fecha solicitud de ecografía</td><td>: '.$fecha.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(1);
    $html = '<table><tbody><tr><td>FUR referida o corregida</td><td>: '.$solicitud_fum.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(1);
    $html = '<table><tbody><tr><td>Motivo de exámen</td><td>: '.htmlentities($this->pre->pre_motivo).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(4);

    $html = '<h4><em>Respuesta final de profesional contrarreferente a solicitud de exámen ecográfico</em></h4>';
    $this->pdf->writeHTMLCell('', '', '10', '', $html, 0, 1, 0, true, 'L', true);
    $this->pdf->Ln(2);
    $html = '<table><tbody><tr><td>Fecha de exámen: '. $fecha.'</td></tr><tr><td>Edad gestacional (Ege): '. $this->examen->examen_eg.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $this->pdf->Ln(4);
    $html = '<table><tbody><tr><td><strong>Descripción:</strong></td><td>Utero:</td><td>'. $data->utero_primertrimestre.'</td><td></td><td></td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $this->pdf->Ln(1);
    if ($data->saco > 0){
        $html = '<table><tbody><tr><td></td><td>Saco gestacional:</td><td>'. $data->saco_gestacional.'</td><td>promedio de saco:</td><td>'. $data->saco . ' mm.</td></tr></tbody></table>';
        $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
        $this->pdf->Ln(1);
    }else{
        $html = '<table><tbody><tr><td></td><td>Saco gestacional:</td><td>'. $data->saco_gestacional.'</td><td></td><td></td></tr></tbody></table>';
        $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
        $this->pdf->Ln(1);  
    }

    if ($data->saco_vitelino_mm > 0){
        $html = '<table><tbody><tr><td></td><td>Saco vitelino:</td><td>'. $data->saco_vitelino.'</td><td>medida de saco vitelino:</td><td>'. $data->saco_vitelino_mm . ' mm.</td></tr></tbody></table>';
        $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
        $this->pdf->Ln(1);
    }else{
        $html = '<table><tbody><tr><td></td><td>Saco vitelino:</td><td>'. $data->saco_vitelino.'</td><td></td><td></td></tr></tbody></table>';
        $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
        $this->pdf->Ln(1);  
    }

    if ($data->fcf > 0){
        $html = '<table><tbody><tr><td></td><td>Embrión:</td><td>'. $data->embrion.'</td><td>frecuencia cardiaca fetal:</td><td>'. $data->fcf.'</td></tr></tbody></table>';
    }else{
        $html = '<table><tbody><tr><td></td><td>Embrión:</td><td>'. $data->embrion.'</td><td></td><td></td></tr></tbody></table>';
    }
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $this->pdf->Ln(1);
    
    if ($data->lcn != ""){
        $html = '<table><tbody><tr><td></td><td>Largo embrionario (LCN):</td><td>'.$data->lcn.' mm.</td><td></td><td></td></tr></tbody></table>';
        $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
        $this->pdf->Ln(1);

        //fecha del examen
        $fExamen = strtotime($this->examen->examen_fecha);
        //convertir eg a dias
        $egXLCN = $data->lcn_eg;

        if ($egXLCN != ""){
            $egXLCN = str_replace(",", ".",$egXLCN);
            $egXLCN = explode(".", $egXLCN);

            if (is_array($egXLCN) == true){
                if (count($egXLCN) == 1){
                    $egXLCN = $egXLCN[0] * 7;
                }else if (count($egXLCN) == 2){
                    $egXLCN = ($egXLCN[0] * 7) + $egXLCN[1];
                }
            }else{
                $egXLCN = $egXLCN * 7; 
            }
        }
    
        $furlcn = strtotime("-". strval($egXLCN) . "day", $fExamen);
        $fpplcn = date("Y-m-d", strtotime("+240 day", $furlcn));
        $furlcn = date("Y-m-d", strtotime("-". strval($egXLCN) . "day", $fExamen));
        $furlcn = explode("-", $furlcn);
        $furlcn = $furlcn[2] . "-". $furlcn[1]. "-". $furlcn[0];
        $fpplcn = explode("-", $fpplcn);
        $fpplcn = $fpplcn[2] . "-". $fpplcn[1]. "-". $fpplcn[0];
    }
    $html = '<table><tbody><tr><td></td><td>Anexo izquierdo:</td><td>'. $data->anexo_izquierdo_primertrimestre.'</td><td></td><td></td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $this->pdf->Ln(1);
    $html = '<table><tbody><tr><td></td><td>Anexo derecho:</td><td>'. $data->anexo_derecho_primertrimestre.'</td><td></td><td></td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $this->pdf->Ln(1);
    $html = '<table><tbody><tr><td></td><td>Douglas:</td><td>'. $data->douglas_primertrimestre.'</td><td></td><td></td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $this->pdf->Ln(4);

    $embrion = array("act. card. inicial", "con act. cardiaca (+)", "act. card. y corp. (+)");

    if ($data->lcn != "" && in_array($data->embrion, $embrion) == true){
        $html = '<table><tbody><tr><td></td><td><strong>Ege según LCN:</strong></td><td>'. $data->lcn_eg.' semanas*</td><td></td><td></td></tr></tbody></table>';
        $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
        $this->pdf->Ln(1);
        //fecha del examen
        $fExamen = strtotime($this->examen->examen_fecha);
        //convertir eg a dias
        $egXLCN = $data->lcn_eg;
        if ($egXLCN != ""){
            $egXLCN = str_replace(",", ".",$egXLCN);
            $egXLCN = explode(".", $egXLCN);

            if (is_array($egXLCN) == true){
                if (count($egXLCN) == 1){
                    $egXLCN = $egXLCN[0] * 7;
                }else if (count($egXLCN) == 2){
                    $egXLCN = ($egXLCN[0] * 7) + $egXLCN[1];
                }
            }else{
                $egXLCN = $egXLCN * 7; 
            }
        }
        $furlcn = strtotime("-". strval($egXLCN) . "day", $fExamen);
        $fpplcn = date("Y-m-d", strtotime("+240 day", $furlcn));
        $furlcn = date("Y-m-d", strtotime("-". strval($egXLCN) . "day", $fExamen));
        $furlcn = explode("-", $furlcn);
        $furlcn = $furlcn[2] . "-". $furlcn[1]. "-". $furlcn[0];
        $fpplcn = explode("-", $fpplcn);
        $fpplcn = $fpplcn[2] . "-". $fpplcn[1]. "-". $fpplcn[0];
        $html = '<table><tbody><tr><td></td><td><strong>FUR asignada:</strong></td><td>'. $furlcn.'</td><td></td><td></td></tr></tbody></table>';
        $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
        $this->pdf->Ln(1);
        $html = '<table><tbody><tr><td></td><td><strong>FPP asignada:</strong></td><td>'. $fpplcn.'</td><td></td><td></td></tr></tbody></table>';
        $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
        $this->pdf->Ln(4);
    }

    $_html = strip_tags($data->comentariosexamen);
    $_html = str_replace("\n", "<br>", $_html);

    if ($data->saco_eg && $data->lcn == "" && $data->embrion == "no se observa aun"){
        $_html .= "<br>- <strong>Calculo inicial</strong> de edad gestacional según promedio de saco = ". $data->saco_eg ." semanas<br>- Se sugiere agendar nuevo exámen para determinación de edad gestacional mediante largo embrionario (LCN)<br>";
    }

    $html = '<table><tbody><tr><td style="width:170px"><strong><em>Comentarios y observaciones:</em></strong></td><td style="width:450px">' . $_html .'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(12);

    $html = '<table><tbody><tr><td style="width:450px"></td><td>Ecografista: '.htmlentities(Session::get('user_name')).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(4);

    $edadGestacional = str_replace(",", ".",$this->examen->examen_eg);
    $edadGestacional = explode(".", $edadGestacional);

    if (is_array($edadGestacional) == true){
        if (count($edadGestacional) == 1){
            $edadGestacional = intval($edadGestacional[0]) * 7;
        }else if (count($edadGestacional) == 2){
            $edadGestacional = (intval($edadGestacional[0]) * 7) + intval($edadGestacional[1]);
        }
    }else{
        $edadGestacional = intval($edadGestacional) * 7; 
    }

    if ($data->lcn != ""){
        //determinar cuantos días faltan para las 12 semanas
        $onceSemanas = 77 - $edadGestacional;
        $catorceSemanas = 97 - $edadGestacional;
        //sumar esos días a la fecha de exámen
        $onceSemanas =  date('d-m-Y', strtotime($this->examen->examen_fecha. ' + '.$onceSemanas.' days'));
        $catorceSemanas =  date('d-m-Y', strtotime($this->examen->examen_fecha. ' + '.$catorceSemanas.' days'));
        //$solicitud_fecha_examen =  $this->solicitud->solicitud_fecha. ' + '.$edadGestacional.' days';

        $html = '<p style="color:#0275d8;">* Exámen ecográfico para 11 - 14 semanas correspondería entre las fechas  '.$onceSemanas.'   al   '.$catorceSemanas .'</p>';
        $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'C', true);
        $this->pdf->Ln(4);
    }

    $html = '<table style="border-top:1px solid #000;border-bottom:1px solid #000;"><tbody><tr><td><p>Fecha de exámen: '. $fecha .'</p></td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '10', '', $html, 0, 1, 0, true, 'L', true);
    $html = '<p><small><br>*Referencia Edad menstrual por LCN Hadlock FP, Shan YP, Kanon JD y cols.: Radiology 182:501, 1992. <br><br>Informe generado desde software crecimientofetal.cl, el objetivo de este es favorecer análisis preeliminar de los datos, la interpretación de los resultados es responsabilidad fundamentalmente del profesional referente a exámen ecográfico. Profesional quien finalmente evaluará clínicamente la información contenida en este exámen.</small> <br><br>Nota: El examen ecográfico durante la <strong>gestación inicial normal</strong> (menor a 11 semanas), se realiza fundamentalmente con el propósito de: confirmación de embarazo, localización intrauterina del saco gestacional, confirmación de vitalidad embrio/fetal,  determinar si es embarazo único o múltiple, y fundamentalmente determinación de la edad gestacional ecográfica.</p>';
    $this->pdf->writeHTMLCell('', '', '10', '', $html, 0, 1, 0, true, 'L', true);

    $this->pdf->Output('Informe.pdf', 'I');