<?php
    // set document information
    $this->pdf->SetCreator(PDF_CREATOR);
    $this->pdf->SetAuthor('WT');
    $this->pdf->SetTitle('Evaluación ecográfica del crecimiento fetal');
    $this->pdf->SetSubject('');
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

    $html = '<h4 style="border-bottom:1px solid #000;text-align: center;">RESUMEN PROTOCOLO DE REFERENCIA Y CONTRARREFERENCIA PARA ECOGRAFÍA DOPPLER 11 - 14 SEMANAS</h4>';
    $this->pdf->writeHTMLCell('', '', '10', '', $html, 0, 1, 0, true, 'C', true);
    $this->pdf->Ln(4);

    $html = '<table><tbody><tr><td>Nombre del paciente: '.htmlentities($this->paciente->nombre . " " . $this->paciente->apellido).'</td><td>RUT (DNI): '.htmlentities($this->paciente->rut).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(1);
    //$html = '<table><tbody><tr><td>Edad materna</td><td>: '.htmlentities($this->solicitud->solicitud_ematerna).' años</td></tr></tbody></table>';
    //$this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    //$this->pdf->Ln(1);
    $html = '<table><tbody><tr><td>FUR referida o corregida</td><td>: '.$solicitud_fum.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(1);
    $html = '<table><tbody><tr><td>Motivo de exámen</td><td>: '.htmlentities($this->pre->pre_motivo).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(8);

    $html = '<h4><em>Respuesta final de profesional contrarreferente a solicitud de exámen ecográfico</em></h4>';
    $this->pdf->writeHTMLCell('', '', '10', '', $html, 0, 1, 0, true, 'L', true);
    $this->pdf->Ln(4);
    $html = '<table><tbody><tr><td style="width:170px"><em>Fecha de exámen:</em></td><td style="width:450px">'. $fecha.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $this->pdf->Ln(1);

    $html = '<h4><em>Respuesta final de profesional contrarreferente a solicitud de exámen ecográfico</em></h4>';
    $this->pdf->writeHTMLCell('', '', '10', '', $html, 0, 1, 0, true, 'L', true);
    $this->pdf->Ln(2);

    $html = '<table><tbody><tr><td>Fecha de exámen: '. $fecha .'</td><td>Edad gestacional: '. htmlentities($this->examen->examen_eg) .'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(1);
    $html = '<table><tbody><tr><td>Embrión: '. htmlentities($data->embrion)  .'</td><td>Frecuencia cardiaca fetal: '. htmlentities($data->fcf) .'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(1);
    $html = '<table><tbody><tr><td>Anatomía fetal: '.htmlentities($data->anatomia). ' '.htmlentities($data->anatomia_extra).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(4);
    $html = '<table><tbody><tr><td><strong><em>Biometría ecográfica</em></strong></td><td>Largo embrionario (LCN): *</td><td>'.htmlentities($data->lcn).' mm.</td><td></td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(2);
    $html = '<table><tbody><tr><td></td><td>DBP:</td><td>'.htmlentities($data->dbp).'</td><td></td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $html = '<table><tbody><tr><td></td><td>CC:</td><td>'.htmlentities($data->cc).'</td><td>Percentil: '.$data->cc_pct.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $html = '<table><tbody><tr><td></td><td>CA:</td><td>'.htmlentities($data->ca).'</td><td>Percentil: '.$data->ca_pct.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $html = '<table><tbody><tr><td></td><td>LF:</td><td>'.htmlentities($data->lf).'</td><td>Percentil: '.$data->lf_pct.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $html = '<table><tbody><tr><td></td><td>IP uterina derecha:</td><td>'.htmlentities($data->uterina_derecha).'</td><td>Percentil: '.$data->uterina_derecha_pct.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $html = '<table><tbody><tr><td></td><td>IP uterina izquierda:</td><td>'.htmlentities($data->uterina_izquierda).'</td><td>Percentil: '.$data->uterina_izquierda_pct.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $html = '<table><tbody><tr><td></td><td>IP uterina promedio: **</td><td colspan="2">'.htmlentities($data->uterinas).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $translucencia = "";
    if (strlen($data->translucencia_nucal) > 0){ $translucencia =  $data->translucencia_nucal . " mm"; }
    $this->pdf->Ln(4);
    $html = '<table><tbody><tr><td></td><td>Translucidez nucal: </td><td>'.htmlentities($data->translucidez_nucal).'</td><td>'. $translucencia .'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    if (strlen($data->hueso_nasal_valor) > 0){ $data->hueso_nasal_valor =  $data->hueso_nasal_valor . " mm"; }

    $html = '<table><tbody><tr><td></td><td>Hueso nasal: </td><td>'.htmlentities($data->hueso_nasal) .'</td><td>'. $data->hueso_nasal_valor .'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $html = '<table><tbody><tr><td></td><td>Ductus venoso: </td><td>'.htmlentities($data->ductus_venoso).'</td><td></td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $html = '<table><tbody><tr><td></td><td>Reflujo tricuspídeo: </td><td>'.htmlentities($data->reflujo_tricuspideo).'</td><td></td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);

    $this->pdf->Ln(4);

    $_html = strip_tags($data->comentariosexamen);
    $_html = str_replace("\n", "<br>", $_html);

    $html = '<table><tbody><tr><td style="width:170px"><strong><em>Comentarios y observaciones:</em></strong></td><td style="width:450px">' . $_html .'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(8);

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

    if ($edadGestacional < 181){
        $onceSemanas = 154 - $edadGestacional;
        $catorceSemanas = 181 - $edadGestacional;
        //sumar esos días a la fecha de exámen
        $onceSemanas =  date('d-m-Y', strtotime($this->examen->examen_fecha. ' + '.$onceSemanas.' days'));
        $catorceSemanas =  date('d-m-Y', strtotime($this->examen->examen_fecha. ' + '.$catorceSemanas.' days'));
        //$solicitud_fecha_examen =  $this->solicitud->solicitud_fecha. ' + '.$edadGestacional.' days';
        $html = '<p style="color:#0275d8;">* Exámen ecográfico para 22 - 26 semanas correspondería entre las fechas  '.$onceSemanas.'   al   '.$catorceSemanas .'</p>';
        $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'C', true);
        $this->pdf->Ln(4);
    }

    $html = '<table style="border-top:1px solid #000;border-bottom:1px solid #000;"><tbody><tr><td><p>Fecha de exámen: '. $fecha .'</p></td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '10', '', $html, 0, 1, 0, true, 'L', true);
    $this->pdf->Ln(1);
    $html = '<p><small>*Referencia para LCN Hadlock FP, Shan YP, Kanon JD y cols.: Radiology 182:501, 1992. <br>** Referencia para Doppler promedio de arterias uterinas: Gómes O., Figueras F., Fernandez S., Bennasar M, Martínez JM., <br>Puerto B., Gratacos E., UOG 2008; 32: 128-32 <br><br>Nota: Examenes ecográficos destinados a evaluar biometría fetal; edad gestacional, crecimiento fetal y/o flujometria Doppler de arterias uterinas. El rendimiento diagnóstico del examen ecográfico depende de múltiples factores tanto maternos como fetales, edad gestacional al momento del examen, posición fetal, interposición de partes fetales (manos, pies) o anexos (placenta, cordón umbilical), En las mejores series de detección de malformaciones fetales publicadas en la literatura nacional e internacional no alcanza el 100% y por lo tanto es importante correlacionar resultado obtenidos en función del contexto clínico de la paciente y antecedentes de gestaciones previas.</small><br>El software no dispone aún de algoritmos matemáticos que permitan ponderar grado de riesgo para cromosomopatía y preeclampsia.</p>';
    $this->pdf->writeHTMLCell('', '', '10', '', $html, 0, 1, 0, true, 'L', true);
    $this->pdf->Output('Informe.pdf', 'I');
    