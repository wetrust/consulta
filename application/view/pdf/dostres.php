<?php
    // set document information
    $this->pdf->SetCreator(PDF_CREATOR);
    $this->pdf->SetAuthor('WT');
    $this->pdf->SetTitle('Evaluación ecográfica del crecimiento fetal');
    $this->pdf->SetSubject('TCPDF Tutorial');
    $this->pdf->SetKeywords('TCPDF, PDF, example, test, guide');

    // set default monospaced font
    $this->pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);
    // set margins
    $this->pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP+5, PDF_MARGIN_RIGHT);
    $this->pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
    $this->pdf->SetFooterMargin(PDF_MARGIN_FOOTER);
    $this->pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);
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


    $html = '<h4 style="border-bottom:2px double #000;text-align: center;">RESUMEN PROTOCOLO DE REFERENCIA Y CONTRARREFERENCIA PARA ECOGRAFÍA OBSTÉTRICA DE CRECIMIENTO</h4>';
    $this->pdf->writeHTMLCell('', '', '10', '', $html, 0, 1, 0, true, 'C', true);
    $this->pdf->Ln(2);
    $html = '<h4><em>Datos de referencia para evaluación ecográfica.</em></h4>';
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

    $html = '<h4><em>Respuesta de profesional contrarreferente a solicitud de exámen ecográfico</em></h4>';
    $this->pdf->writeHTMLCell('', '', '10', '', $html, 0, 1, 0, true, 'L', true);
    $this->pdf->Ln(2);
    
    $html = '<table><tbody><tr><td>Edad Gestacional: '. htmlentities($this->examen->examen_eg) .'</td><td>Feto en presentación: '.htmlentities($data->presentacion).'</td><td>Dorso Fetal: '.htmlentities($data->dorso).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(1);
    $html = '<table><tbody><tr><td>Frecuencia cardiaca fetal: '.htmlentities($data->fcf).'</td><td>Sexo: '.htmlentities($data->sexo_fetal).'</td><td>Placenta: '.htmlentities($data->placenta).', '.$data->placenta_insercion.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(1);
    $html = '<table><tbody><tr><td style="background-color:#f7fafb;">Líquido amniótico *</td><td style="background-color:#f7fafb;">Cualitativo: '.htmlentities($data->liquido).'</td><td style="background-color:#f7fafb;">BVM: '.htmlentities($data->bvm).' mm.</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(4);
    //$html = '<table><tbody><tr><td>Anatomía fetal: '.htmlentities($data->anatomia)." ".htmlentities($this->solicitud_resultado->anatomia_extra).'</td></tr></tbody></table>';
    $html = '<table><tbody><tr><td>Anatomía fetal: '.htmlentities($data->anatomia).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(1);

    if ($data->anatomia == "de aspecto general normal"){
        $atrio = htmlentities($data->atrio_posterior);
        if ($data->atrio_posterior_mm > 0){
            $atrio .=', '.$data->atrio_posterior_mm . " mm";
        }
        $cisterna = htmlentities($data->cisterna_m);
        if ($data->cisterna_m_mm > 0){
            $cisterna .=', '.$data->cisterna_m_mm . " mm";
        }
        $html = '<table><tbody><tr><td>Atrio posterior: '. $atrio.'</td><td>Cerebelo: '.htmlentities($data->cerebelo_text).'</td><td>Cist. magna: '.$cisterna.'</td></tr></tbody></table>';
        $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
        $this->pdf->Ln(4);
    }

    $html = '<table><tbody><tr><td><strong><em>Biometría ecográfica **</em></strong></td><td>DBP (Hadlock):</td><td>'. $data->dbp.' mm.</td><td></td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $this->pdf->Ln(1);
    $html = '<table><tbody><tr><td></td><td>DOF (Jeanty):</td><td>'. $data->dof.' mm</td><td></td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $html = '<table><tbody><tr><td></td><td>Índice Cefálico (IC):</td><td>'. $data->ic.'</td><td>(IC 70 a 86 %)</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $html = '<table><tbody><tr><td></td><td>CC (Hadlock):</td><td>'. $data->cc.' mm.</td><td>Percentil: '. $data->cc_pct.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $html = '<table><tbody><tr><td></td><td>CA (Hadlock):</td><td>'. $data->ca. ' mm.</td><td>Percentil: '. $data->ca_pct.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $html = '<table><tbody><tr><td></td><td>LF (Hadlock):</td><td>'. $data->lf.' mm.</td><td>Percentil: '. $data->lf_pct.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $html = '<table><tbody><tr><td></td><td>LH (Jeanty):</td><td>'. $data->lh.' mm.</td><td>Percentil: '. $data->lh_pct.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $html = '<table><tbody><tr><td></td><td>Cerebelo (Hill) ***:</td><td>'. $data->cerebelo.' mm.</td><td>Percentil: '. $data->cerebelo_pct.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $this->pdf->Ln(4);
    $html = '<table><tbody><tr><td></td><td>Peso fetal estimado ****</td><td colspan="2">'. $data->pfe.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $html = '<table><tbody><tr><td></td><td>Índice Cc / Ca ****</td><td colspan="2">'. $data->ccca.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    //if (property_exists($this,"respuesta_ajuste")){
    //    if ($this->respuesta_ajuste == 1){
    //        $html = '<table><tbody><tr><td></td><td>Edad gest. ecográfica (Bp50)</td><td>'. $this->respuesta_eg_p50.' semanas</td><td>(cálculo de Bp50, excluye CA)</td></tr></tbody></table>';
    //        $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    //        $this->pdf->Ln(4);
    //    }
    //}
    $this->pdf->Ln(4);
    if (property_exists($data,"uterinas")){
        if ($data->uterinas != ""){
            $html = '<table><tbody><tr><td></td><td style="background-color:#eceeef;">Doppler uterinas (promedio)</td><td style="background-color:#eceeef;" colspan="2">'. $data->uterinas.'</td></tr></tbody></table>';
            $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
            $this->pdf->Ln(4);
        }
    }
    
    $_html = strip_tags($data->comentariosexamen);
    $_html = str_replace("\n", "<br>", $_html);
    $html = '<table><tbody><tr><td style="width:170px"><strong><em>Comentarios y observaciones:</em></strong></td><td style="width:450px">' . $_html .'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(8);
    
    $html = '<table><tbody><tr><td style="width:450px"></td><td>Ecografista: '.htmlentities(Session::get('user_name')).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(4);
    $html = '<table style="border-top:1px solid #000;border-bottom:1px solid #000;"><tbody><tr><td><p>Fecha de exámen: '. $fecha .'</p></td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '10', '', $html, 0, 1, 0, true, 'L', true);
    $html = '<p><br><small>* Referencia para Liq. Amniotico BVM, Magann EF. Sanderson M. Martin JN y col. Am J Obstet Gynecol 1982: 1581, 2000<br>** Referencia para biometrías según gráfica de Hadlock y col. 1984<br>*** Diámetro cerebeloso transverso Hill LM. y col. Obstet Gynecol. 1990; 75(6) : 981-5<br>**** Gráfica de referencia para PFE y Cc/Ca, Hadlock F P y col. 1991; Radiology 181 : 129 - 133 (Normalidad Pct 10 a 90) <br><br>Informe generado desde software crecimientofetal.cl, el objetivo de este es favorecer análisis preeliminar de los datos, la interpretación de los resultados es responsabilidad fundamentalmente del profesional referente a exámen ecográfico. Profesional quien finalmente evaluará clínicamente la información contenida en este exámen. <br><br>Nota: Examen ecográfico destinado a evaluar biometría fetal; a objeto de valorar edad gestacional , crecimiento fetal y evaluación general de la morfología fetal. El rendimiento diagnóstico del examen ecográfico morfológico depende de múltiples factores tanto maternos como fetales, edad gestacional al momento del examen, posición fetal, interposición de partes fetales (manos, pies) o anexos (placenta, cordón umbilical), En las mejores series de detección de malformaciones fetales publicadas en la literatura nacional e internacional no alcanza el 100% y por lo tanto es importante correlacionar resultado obtenidos en función del contexto clínico de la paciente y antecedentes de gestaciones previas.</small></p>';
    $this->pdf->writeHTMLCell('', '', '10', '', $html, 0, 1, 0, true, 'L', true);

    $this->pdf->Output('Informe.pdf', 'I');