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

    $html = '<h3>RESUMEN PROTOCOLO DE REFERENCIA Y CONTRARREFERENCIA PARA ECOGRAFÍA GINECOLÓGICA</h3>';
    $this->pdf->writeHTMLCell('', '', '10', '', $html, 0, 1, 0, true, 'C', true);
    $this->pdf->Ln(4);

    $html = '<h4><em>Formulario referencia para evaluación ecográfica gineco-obstétrica</em></h4>';
    $this->pdf->writeHTMLCell('', '', '10', '', $html, 0, 1, 0, true, 'L', true);
    $this->pdf->Ln(2);
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
    $html = '<table><tbody><tr><td style="width:170px"><strong>Fecha de exámen:</strong></td><td style="width:450px">'. $fecha.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $this->pdf->Ln(1);

    $eg = $this->examen->examen_eg;
    $txt = "";
    if ($eg < 36){
        $txt = "Días del ciclo mestrual";
    }else if ($eg < 86){
        $txt = "Días de atraso mestrual";
    }else{
        $txt = "Días de amenorrea";
    }

    $html = '<table><tbody><tr><td style="width:170px"><strong>'.$txt.':</strong></td><td style="width:450px">'.htmlentities($eg).' dias</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(4);
    $html = '<table><tbody><tr><td style="background-color:#f7fafb;width:170px;"><strong>Útero:</strong></td><td style="background-color:#f7fafb;width:450px;">'. $data->utero_cuatro.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $html = '<table><tbody><tr><td style="background-color:#f7fafb;width:170px;"></td><td style="background-color:#f7fafb;width:450px;">'. $data->utero_uno.' x '. $data->utero_dos.' x '. $data->utero_tres.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $this->pdf->Ln(1);
    $html = '<table><tbody><tr><td style="width:170px"><strong>Endometrio:</strong></td><td style="width:450px">'. $data->endometrio_dos.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $this->pdf->Ln(4);
    $html = '<table><tbody><tr><td style="background-color:#f7fafb;width:170px;"><strong>Anexial</strong></td><td style="background-color:#f7fafb;width:450px;">'. $data->anexial.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $this->pdf->Ln(1);
    $html = '<table><tbody><tr><td style="width:170px"><strong>Ovario Izquierdo:</strong></td><td style="width:450px">'. $data->oi_cinco.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $html = '<table><tbody><tr><td style="background-color:#f7fafb;width:170px;"></td><td style="background-color:#f7fafb;width:450px;">'. $data->oi_uno.' x '. $data->oi_dos.' x '. $data->oi_tres.', Volumen: '. $data->oi_cuatro.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $this->pdf->Ln(4);
    $html = '<table><tbody><tr><td style="width:170px"><strong>Ovario Derecho:</strong></td><td style="width:450px">'. $data->od_cinco.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $html = '<table><tbody><tr><td style="background-color:#f7fafb;width:170px;"></td><td style="background-color:#f7fafb;width:450px;">'. $data->od_uno.' x '. $data->od_dos.' x '. $data->od_tres.', Volumen: '. $data->od_cuatro.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $this->pdf->Ln(4);
    $html = '<table><tbody><tr><td style="width:170px"><strong>Douglas:</strong></td><td style="width:450px">'. $data->douglas.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $this->pdf->Ln(4);

    $_html = strip_tags($data->comentariosexamen);
    $_html = strtoupper($_html);
    $_html = str_replace("\n", "<br>", $_html);
    $html = '<table><tbody><tr><td style="width:170px"><strong><em>Comentarios y observaciones:</em></strong></td><td style="width:450px">' . $_html .'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(8);

    $html = '<table><tbody><tr><td style="width:450px"></td><td>Ecografista: '.htmlentities(Session::get('user_name')).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(4);
    $html = '<table style="border-top:1px solid #000;border-bottom:1px solid #000;"><tbody><tr><td><p>Fecha de exámen: '. $fecha .'</p></td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '10', '', $html, 0, 1, 0, true, 'L', true);
    $this->pdf->Ln(4);
    $html = '<p>Informe generado desde software crecimientofetal.cl, el objetivo de este es favorecer análisis preeliminar de los datos, la interpretación de los resultados es responsabilidad fundamentalmente del profesional referente a exámen ecográfico.<br>Profesional quien finalmente evaluará clínicamente la información contenida en este exámen.</p>';
    $this->pdf->writeHTMLCell('', '', '10', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Output('Informe.pdf', 'I');