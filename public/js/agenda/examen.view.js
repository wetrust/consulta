import {make, the, humanDate, inputDate} from '../wetrust.js';
import {cloud} from './cloud.js';
import {config} from './config.js';
import {fn} from './examen.fn.js';

export class dopcre {
    modificar = false;
    examen_id = 0;

    static interface(data){
        let modal = make.modal("Guardar");
        document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
        the(modal.titulo).innerHTML = config.dopcreTitulo;
        the(modal.titulo).classList.add("mx-auto");
        
        the(modal.contenido).innerHTML = config.dopcreHTML;
        the(modal.id).children[0].classList.add("h-100","modal-xl");
        the(modal.id).children[0].classList.remove("modal-lg");

        document.getElementsByName("fecha")[0].value = data.fecha;
        document.getElementsByName("fecha")[0].dataset.examen = data.examen;
        document.getElementsByName("fecha")[0].dataset.pre = data.return;
        document.getElementsByName("fum")[0].value = data.paciente.fum;
        document.getElementsByName("comentarios")[0].value = config.dopcreComentarios;

        the(modal.button).onclick = dopcre.save;
        dopcre.selectFCF();

        let EG = fn.EG(data);
        document.getElementsByName("eg")[0].value = EG.text;

        document.getElementsByName("respuesta_bvm")[0].oninput = dopcre.valBVM;
        document.getElementsByName("respuesta_bvm")[0].dataset.eg = EG.semanas;
        document.getElementsByName("respuesta_dbp")[0].oninput = dopcre.valCC;
        document.getElementsByName("respuesta_dof")[0].oninput = dopcre.valCC;
        document.getElementsByName("respuesta_cc")[0].dataset.eg = EG.semanas;
        document.getElementsByName("respuesta_cc")[0].oninput = dopcre.cc;
        document.getElementsByName("respuesta_ca")[0].dataset.eg = EG.semanas;
        document.getElementsByName("respuesta_ca")[0].oninput = dopcre.ca;
        document.getElementsByName("respuesta_lf")[0].dataset.eg = EG.semanas;
        document.getElementsByName("respuesta_lf")[0].oninput = dopcre.lf;
        document.getElementsByName("respuesta_uterina_derecha")[0].dataset.eg = EG.semanas;
        document.getElementsByName("respuesta_uterina_derecha")[0].oninput = dopcre.utd;
        document.getElementsByName("respuesta_uterina_izquierda")[0].dataset.eg = EG.semanas;
        document.getElementsByName("respuesta_uterina_izquierda")[0].oninput = dopcre.uti;
        document.getElementsByName("respuesta_umbilical")[0].dataset.eg = EG.semanas;
        document.getElementsByName("respuesta_umbilical")[0].oninput = dopcre.umb;
        document.getElementsByName("respuesta_cm")[0].dataset.eg = EG.semanas;
        document.getElementsByName("respuesta_cm")[0].oninput = dopcre.cm;
        
        if (data.modificar == true){
            dopcre.modificar = true;
            dopcre.examen_id = data.data.examen_id;
            data.data.examen_data = JSON.parse(data.data.examen_data);
            document.getElementsByName("respuesta_presentacion")[0].value = data.data.examen_data.presentacion;
            document.getElementsByName("respuesta_dorso")[0].value = data.data.examen_data.dorso;
            document.getElementsByName("respuesta_sexo_fetal")[0].value = data.data.examen_data.sexo_fetal;
            document.getElementsByName("respuesta_placenta_insercion")[0].value = data.data.examen_data.placenta_insercion;
            document.getElementsByName("respuesta_placenta")[0].value = data.data.examen_data.placenta;
            document.getElementsByName("respuesta_bvm")[0].value = data.data.examen_data.bvm;
            document.getElementsByName("respuesta_bvm")[0].oninput();
            document.getElementsByName("respuesta_fcf")[0].value = data.data.examen_data.fcf;
            document.getElementsByName("respuesta_anatomia")[0].value = data.data.examen_data.anatomia;
            document.getElementsByName("respuesta_anatomia_extra")[0].value = data.data.examen_data.anatomia_extra;
            document.getElementsByName("respuesta_dbp")[0].value = data.data.examen_data.dbp;
            document.getElementsByName("respuesta_dof")[0].value = data.data.examen_data.dof;
            document.getElementsByName("respuesta_cc")[0].value = data.data.examen_data.cc;
            document.getElementsByName("respuesta_cc")[0].oninput();
            document.getElementsByName("respuesta_ca")[0].value = data.data.examen_data.ca;
            document.getElementsByName("respuesta_ca")[0].oninput();
            document.getElementsByName("respuesta_lf")[0].value = data.data.examen_data.lf;
            document.getElementsByName("respuesta_lf")[0].oninput();
            document.getElementsByName("respuesta_uterina_derecha")[0].value = data.data.examen_data.uterina_derecha;
            document.getElementsByName("respuesta_uterina_derecha")[0].oninput();
            document.getElementsByName("respuesta_uterina_izquierda")[0].value = data.data.examen_data.uterina_izquierda;
            document.getElementsByName("respuesta_uterina_izquierda")[0].oninput();
            document.getElementsByName("respuesta_umbilical")[0].value = data.data.examen_data.umbilical;
            document.getElementsByName("respuesta_umbilical")[0].oninput();
            document.getElementsByName("respuesta_cm")[0].value = data.data.examen_data.cm;
            document.getElementsByName("respuesta_cm")[0].oninput();
            document.getElementsByName("respuesta_hipotesis")[0].value = data.data.examen_data.hipotesis;
            document.getElementsByName("respuesta_doppler_materno")[0].value = data.data.examen_data.doppler_materno;
            document.getElementsByName("respuesta_doppler_fetal")[0].value = data.data.examen_data.doppler_fetal;
            document.getElementsByName("comentarios")[0].value = data.data.examen_data.comentariosexamen;
        }

        $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) { $(this).remove(); });
    }

    static save(){
        var save = {
            pre_id: document.getElementsByName("fecha")[0].dataset.pre,
            examen: document.getElementsByName("fecha")[0].dataset.examen,
            fecha: document.getElementsByName("fecha")[0].value,
            eg: document.getElementsByName("respuesta_bvm")[0].dataset.eg,
            presentacion: document.getElementsByName("respuesta_presentacion")[0].value,
            dorso: document.getElementsByName("respuesta_dorso")[0].value,
            sexo_fetal: document.getElementsByName("respuesta_sexo_fetal")[0].value,
            placenta_insercion: document.getElementsByName("respuesta_placenta_insercion")[0].value,
            placenta: document.getElementsByName("respuesta_placenta")[0].value,
            liquido: document.getElementsByName("respuesta_liquido")[0].innerHTML,
            bvm: document.getElementsByName("respuesta_bvm")[0].value,
            fcf: document.getElementsByName("respuesta_fcf")[0].value,
            anatomia:  document.getElementsByName("respuesta_anatomia")[0].value,
            anatomia_extra: document.getElementsByName("respuesta_anatomia_extra")[0].value,
            dbp: document.getElementsByName("respuesta_dbp")[0].value,
            dof: document.getElementsByName("respuesta_dof")[0].value,
            cc: document.getElementsByName("respuesta_cc")[0].value,
            cc_pct: the("respuesta_cc_pct").innerHTML,
            ca: document.getElementsByName("respuesta_ca")[0].value,
            ca_pct: the("respuesta_ca_pct").innerHTML,
            lf: document.getElementsByName("respuesta_lf")[0].value,
            lf_pct: the("respuesta_lf_pct").innerHTML,
            ccca: document.getElementsByName("respuesta_ccca")[0].innerHTML,
            pfe: document.getElementsByName("respuesta_pfe")[0].innerHTML,
            uterina_derecha: document.getElementsByName("respuesta_uterina_derecha")[0].value,
            uterina_derecha_pct: the("respuesta_uterina_derecha_percentil").innerHTML,
            uterina_izquierda: document.getElementsByName("respuesta_uterina_izquierda")[0].value,
            uterina_izquierda_pct: the("respuesta_uterina_izquierda_percentil").innerHTML,
            uterinas: document.getElementsByName("respuesta_uterinas")[0].value,
            umbilical: document.getElementsByName("respuesta_umbilical")[0].value,
            umbilical_pct: the("respuesta_umbilical_percentil").innerHTML,
            cm: document.getElementsByName("respuesta_cm")[0].value,
            cm_pct: the("respuesta_cm_percentil").innerHTML,
            cmau: document.getElementsByName("respuesta_cmau")[0].value,
            hipotesis: document.getElementsByName("respuesta_hipotesis")[0].value,
            doppler_materno: document.getElementsByName("respuesta_doppler_materno")[0].value,
            doppler_fetal: document.getElementsByName("respuesta_doppler_fetal")[0].value,
            comentariosexamen: document.getElementsByName("comentarios")[0].value,
            modal: this.dataset.modal
        }

        if (dopcre.modificar == true){
            save.id = dopcre.examen_id;
        }

        cloud.examenUp(save).then(function(data){
            if (data.return == false){
                make.alert('Hubo un error al crear el exámen, intente otra vez');
            }else{
                $("#"+data.modal).modal("hide");
                informe.interface(data);
            }
        });
    }

    static selectFCF(){
        let semanas =  document.getElementsByName("respuesta_fcf")[0];
        let opt = document.createElement('option');
        opt.appendChild( document.createTextNode("Sin actividad cardiaca") );
        opt.value = 0; 
        semanas.appendChild(opt);

        opt = document.createElement('option');
        opt.appendChild( document.createTextNode("(+) inicial") );
        opt.value = 1; 
        semanas.appendChild(opt);

        opt = document.createElement('option');
        opt.appendChild( document.createTextNode("< 90") );
        opt.value = 2; 
        semanas.appendChild(opt);

        for (var i = 90; i < 181; i++) {
            opt = document.createElement('option');
            opt.appendChild( document.createTextNode(i) );
            opt.value = i; 
            semanas.appendChild(opt);
        }

        opt = document.createElement('option');
        opt.appendChild( document.createTextNode("> 180") );
        opt.value = 181; 
        semanas.appendChild(opt);
    }

    static valBVM(){
        this.value = fn.number(this.value);
        let value = String(this.value);

        if (value.length > 0){
            let cut = Object;
            cut.digit = 3;
            cut.value = value;
            this.value = fn.cut(cut);

            let bvm = fn.bvm(this);
            let resultado = "";

            if (bvm.pct <= 10){
                resultado = 'Disminuido';
            }else if (bvm.pct <= 90){
                resultado = 'Normal';
            }else{
                resultado = 'Aumentado';
            }

            document.getElementsByName("respuesta_liquido_clon")[0].value = resultado;
            document.getElementsByName("respuesta_liquido")[0].value = resultado;

        }else{
            document.getElementsByName("respuesta_liquido_clon")[0].value = 'No evaluado';
            document.getElementsByName("respuesta_liquido")[0].value = 'No evaluado';
        }
    }

    //mejorar
    static valCC(){
        this.value = fn.number(this.value);
        let value = String(this.value);

        if (value.length > 0){
            let cut = Object;
            cut.digit = 3;
            cut.value = value;
            this.value = fn.cut(cut);

            let dof = document.getElementsByName("respuesta_dof")[0].value;
            let dbp = document.getElementsByName("respuesta_dbp")[0].value;

            if (String(dof).length > 0 && String(dbp).length > 0){
                let valCC = fn.valCC(dof,dbp);
                document.getElementsByName("respuesta_cc")[0].value = valCC.cc;
                document.getElementsByName("respuesta_cc")[0].oninput();
            }
        }
    }
    //
    static cc(){
        this.value = fn.number(this.value);
        let value = String(this.value);

        if (value.length > 0){
            let cut = Object;
            cut.digit = 3;
            cut.value = value;
            this.value = fn.cut(cut);

            let cc = fn.cc(this);
            the("respuesta_cc_pct").innerHTML = cc.text;
            //mejorar
            dopcre.ccca();
            dopcre.pfe();
            //
        }else{
            the("respuesta_cc_pct").innerHTML = ''; 
        }
    }
    static ca(e){
        this.value = fn.number(this.value);
        let value = String(this.value);

        if (value.length > 0){
            let cut = Object;
            cut.digit = 3;
            cut.value = value;
            this.value = fn.cut(cut);

            let ca = fn.ca(this);
            the("respuesta_ca_pct").innerHTML = ca.text;
            //mejorar
            dopcre.ccca();
            dopcre.pfe();
            //
        }else{
            the("respuesta_ca_pct").innerHTML = ''; 
        }
    }
    static ccca(){
        let cc = document.getElementsByName("respuesta_cc")[0].value;
        let ca = document.getElementsByName("respuesta_ca")[0].value;
        let eg = document.getElementsByName("respuesta_cc")[0].dataset.eg;

        if (String(cc).length > 0 && String(ca).length > 0){
            let ccca = fn.ccca(cc,ca,eg);
            document.getElementsByName("respuesta_ccca")[0].value = ccca.text;
        }else{
            document.getElementsByName("respuesta_ccca")[0].value = ''; 
        }
    }
    static lf(e){
        this.value = fn.number(this.value);
        let value = String(this.value);

        if (value.length > 0){
            let cut = Object;
            cut.digit = 3;
            cut.value = value;
            this.value = fn.cut(cut);

            let lf = fn.lf(this);
            dopcre.pfe();
            the("respuesta_lf_pct").innerHTML = lf.text;
        }else{
            the("respuesta_lf_pct").innerHTML = ''; 
        }
    }
    //
    static pfe(){
        let cc = document.getElementsByName("respuesta_cc")[0].value;
        let ca = document.getElementsByName("respuesta_ca")[0].value;
        let lf = document.getElementsByName("respuesta_lf")[0].value;
        let eg = document.getElementsByName("respuesta_cc")[0].dataset.eg;

        if (String(cc).length > 0 && String(ca).length > 0 && String(lf).length > 0 ){
            let pfex = fn.pfe(lf, cc, ca,eg);
            document.getElementsByName("respuesta_pfe")[0].value = pfex.text;

            let estado = "";

            if(pfex.pct < 4){
                estado = ("Disminuido < p3");
            }else if(pfex.pct < 11){
                estado = ("Disminuido < p10");
            }else if(pfex.pct < 26){
                estado = ("Normal p10 - p 25");
            }else if(pfex.pct < 76){
                estado = ("Normal p26 - p 75");
            }else if(pfex.pct < 91){
                estado = ("Normal p76 - p90");
            }else if(pfex.pct > 90){
                estado = ("Grande > p90");
            }

            document.getElementsByName("respuesta_hipotesis")[0].value = estado;

        }else{
            document.getElementsByName("respuesta_pfe")[0].value = '';
            document.getElementsByName("respuesta_hipotesis")[0].value = 'no evaluado';
        }
    }
    //
    static utd(e){
        this.value = fn.number(this.value);
        let value = String(this.value);

        if (value.length > 0){
            let cut = Object;
            cut.digit = 3;
            cut.value = value;
            this.value = fn.cut(cut);

            let ut = fn.ut(this);
            the("respuesta_uterina_derecha_percentil").innerHTML = ut.text;
            dopcre.promut();
        }else{
            the("respuesta_uterina_derecha_percentil").innerHTML = ''; 
        }
    }
    static uti(e){
        this.value = fn.number(this.value);
        let value = String(this.value);

        if (value.length > 0){
            let cut = Object;
            cut.digit = 3;
            cut.value = value;
            this.value = fn.cut(cut);

            let ut = fn.ut(this);
            the("respuesta_uterina_izquierda_percentil").innerHTML = ut.text;
            dopcre.promut();
        }else{
            the("respuesta_uterina_izquierda_percentil").innerHTML = ''; 
        }
    }
    //promedio uterinas
    static promut(){
        let utd = document.getElementsByName("respuesta_uterina_derecha")[0].value;
        let uti = document.getElementsByName("respuesta_uterina_izquierda")[0].value;
        let eg = document.getElementsByName("respuesta_uterina_izquierda")[0].dataset.eg;

        if (String(utd).length > 0 && String(uti).length > 0){
            let promedio =  (parseFloat(utd) + parseFloat(uti) ) / 2;
            let prut = fn.promut(promedio, eg);
            document.getElementsByName("respuesta_uterinas")[0].value = promedio + ", percentil " + prut.text;
        
            if(prut.pct < 95){
                document.getElementsByName("respuesta_doppler_materno")[0].value = 'Normal (< p95)';
            }else if(prut.pct > 95){
                document.getElementsByName("respuesta_doppler_materno")[0].value = 'Alterado (> p95)';
            }
        }else{
            document.getElementsByName("respuesta_doppler_materno")[0].value = 'No evaluado';
        }
    }
    //
    static umb(e){
        this.value = fn.number(this.value);
        let value = String(this.value);

        if (value.length > 0){
            let cut = Object;
            cut.digit = 3;
            cut.value = value;
            this.value = fn.cut(cut);

            let umb = fn.umb(this);
            the("respuesta_umbilical_percentil").innerHTML = umb.text;
        }
        else{
            the("respuesta_umbilical_percentil").innerHTML = ''; 
        }
    }
    static cm(){
        this.value = fn.number(this.value);
        let value = String(this.value);

        if (value.length > 0){
            let cut = Object;
            cut.digit = 3;
            cut.value = value;
            this.value = fn.cut(cut);

            let cm = fn.cm(this);
            the("respuesta_cm_percentil").innerHTML = cm.text;
        }
        else{
            the("respuesta_cm_percentil").innerHTML = ''; 
        }
    }
    //
    static cmau(){
        let cm = document.getElementsByName("respuesta_cm")[0].value;
        let au = document.getElementsByName("respuesta_umbilical")[0].value;
        let eg = document.getElementsByName("respuesta_umbilical")[0].dataset.eg;

        if (String(cm).length > 0 && String(au).length > 0){
            let promedio =  (parseFloat(cm) + parseFloat(au) ) / 2;
            let prut = fn.cmau(promedio, eg);
            the("respuesta_cmau").value = promedio + ", percentil " + prut.text;
        }
        else{
            the("respuesta_cmau").value = ''; 
        }
    }
    //
}

export class segundo {
    modificar = false;
    examen_id = 0;

    static interface(data){
        let modal = make.modal("Guardar");
        document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
        the(modal.titulo).innerHTML = config.segundoTitulo;
        the(modal.titulo).classList.add("mx-auto");
        the(modal.contenido).innerHTML = config.segundoHTML;
        the(modal.id).children[0].classList.add("h-100","modal-xl");
        the(modal.id).children[0].classList.remove("modal-lg");

        document.getElementsByName("fecha")[0].value = data.fecha;
        document.getElementsByName("fecha")[0].dataset.examen = data.examen;
        document.getElementsByName("fecha")[0].dataset.pre = data.return;
        document.getElementsByName("fum")[0].value = data.paciente.fum;
        document.getElementsByName("comentarios")[0].value = config.segundoComentarios;

        the(modal.button).onclick = segundo.save;
        segundo.selectBVM();
        segundo.selectFCF();

        let EG = fn.EG(data);
        document.getElementsByName("eg")[0].value = EG.text;
        document.getElementsByName("respuesta_dbp")[0].oninput = segundo.valCC;
        document.getElementsByName("respuesta_dof")[0].oninput = segundo.valCC;
        document.getElementsByName("respuesta_cc")[0].dataset.eg = EG.semanas;
        document.getElementsByName("respuesta_cc")[0].oninput = segundo.cc;
        document.getElementsByName("respuesta_ca")[0].dataset.eg = EG.semanas;
        document.getElementsByName("respuesta_ca")[0].oninput = segundo.ca;
        document.getElementsByName("respuesta_lf")[0].dataset.eg = EG.semanas;
        document.getElementsByName("respuesta_lf")[0].oninput = segundo.lf;
        document.getElementsByName("respuesta_lh")[0].dataset.eg = EG.semanas;
        document.getElementsByName("respuesta_lh")[0].oninput = segundo.lh;
        document.getElementsByName("respuesta_cerebelo")[0].dataset.eg = EG.semanas;
        document.getElementsByName("respuesta_cerebelo")[0].oninput = segundo.cb;
        document.getElementsByName("respuesta_uterina_derecha")[0].dataset.eg = EG.semanas;
        document.getElementsByName("respuesta_uterina_derecha")[0].oninput = segundo.utd;
        document.getElementsByName("respuesta_uterina_izquierda")[0].dataset.eg = EG.semanas;
        document.getElementsByName("respuesta_uterina_izquierda")[0].oninput = segundo.uti;

        if (data.modificar == true){
            segundo.modificar = true;
            segundo.examen_id = data.data.examen_id;
            data.data.examen_data = JSON.parse(data.data.examen_data);
            document.getElementsByName("respuesta_presentacion")[0].value = data.data.examen_data.presentacion;
            document.getElementsByName("respuesta_dorso")[0].value = data.data.examen_data.dorso;
            document.getElementsByName("respuesta_sexo_fetal")[0].value = data.data.examen_data.sexo_fetal;
            document.getElementsByName("respuesta_placenta_insercion")[0].value = data.data.examen_data.placenta_insercion;
            document.getElementsByName("respuesta_placenta")[0].value = data.data.examen_data.placenta;
            document.getElementsByName("respuesta_bvm")[0].value = data.data.examen_data.bvm;
            document.getElementsByName("respuesta_fcf")[0].value = data.data.examen_data.fcf;
            document.getElementsByName("respuesta_anatomia")[0].value = data.data.examen_data.anatomia;
            document.getElementsByName("respuesta_anatomia_extra")[0].value = data.data.examen_data.anatomia_extra;
            document.getElementsByName("respuesta_atrio_posterior")[0].value = data.data.examen_data.atrio_posterior;
            document.getElementsByName("respuesta_atrio_posterior_mm")[0].value = data.data.examen_data.atrio_posterior_mm;
            document.getElementsByName("respuesta_cerebelo_text")[0].value = data.data.examen_data.cerebelo_text;
            document.getElementsByName("respuesta_cerebelo_mm")[0].value = data.data.examen_data.cerebelo_mm;
            document.getElementsByName("respuesta_cisterna_m")[0].value = data.data.examen_data.cisterna_m;
            document.getElementsByName("respuesta_cisterna_m_mm")[0].value = data.data.examen_data.cisterna_m_mm;
            document.getElementsByName("respuesta_dbp")[0].value = data.data.examen_data.dbp;
            document.getElementsByName("respuesta_dof")[0].value = data.data.examen_data.dof;
            document.getElementsByName("respuesta_ic")[0].value = data.data.examen_data.ic;
            document.getElementsByName("respuesta_cc")[0].value = data.data.examen_data.cc;
            document.getElementsByName("respuesta_cc")[0].oninput();
            document.getElementsByName("respuesta_ca")[0].value = data.data.examen_data.ca;
            document.getElementsByName("respuesta_ca")[0].oninput();
            document.getElementsByName("respuesta_lf")[0].value = data.data.examen_data.lf;
            document.getElementsByName("respuesta_lf")[0].oninput();
            document.getElementsByName("respuesta_lh")[0].value = data.data.examen_data.lh;
            document.getElementsByName("respuesta_lh")[0].oninput();
            document.getElementsByName("respuesta_cerebelo")[0].value = data.data.examen_data.cerebelo;
            document.getElementsByName("respuesta_cerebelo")[0].oninput();
            document.getElementsByName("respuesta_uterina_derecha")[0].value = data.data.examen_data.uterina_derecha;
            document.getElementsByName("respuesta_uterina_derecha")[0].oninput();
            document.getElementsByName("respuesta_uterina_izquierda")[0].value = data.data.examen_data.uterina_izquierda;
            document.getElementsByName("respuesta_uterina_izquierda")[0].oninput();
            document.getElementsByName("comentarios")[0].value = data.data.examen_data.comentariosexamen;
        }

        $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) { $(this).remove(); });
    }

    static save(){
        var save = {
            pre_id: document.getElementsByName("fecha")[0].dataset.pre,
            examen: document.getElementsByName("fecha")[0].dataset.examen,
            fecha: document.getElementsByName("fecha")[0].value,
            eg: document.getElementsByName("respuesta_cc")[0].dataset.eg,
            presentacion: document.getElementsByName("respuesta_presentacion")[0].value,
            dorso: document.getElementsByName("respuesta_dorso")[0].value,
            sexo_fetal: document.getElementsByName("respuesta_sexo_fetal")[0].value,
            placenta_insercion: document.getElementsByName("respuesta_placenta_insercion")[0].value,
            placenta: document.getElementsByName("respuesta_placenta")[0].value,
            liquido: document.getElementsByName("respuesta_liquido")[0].innerHTML,
            bvm: document.getElementsByName("respuesta_bvm")[0].value,
            fcf: document.getElementsByName("respuesta_fcf")[0].value,
            anatomia:  document.getElementsByName("respuesta_anatomia")[0].value,
            anatomia_extra: document.getElementsByName("respuesta_anatomia_extra")[0].value,
            atrio_posterior: document.getElementsByName("respuesta_atrio_posterior")[0].value,
            atrio_posterior_mm: document.getElementsByName("respuesta_atrio_posterior_mm")[0].value,
            cerebelo_text: document.getElementsByName("respuesta_cerebelo_text")[0].value,
            cerebelo_mm: document.getElementsByName("respuesta_cerebelo_mm")[0].value,
            cisterna_m: document.getElementsByName("respuesta_cisterna_m")[0].value,
            cisterna_m_mm: document.getElementsByName("respuesta_cisterna_m_mm")[0].value,
            dbp: document.getElementsByName("respuesta_dbp")[0].value,
            dof: document.getElementsByName("respuesta_dof")[0].value,
            ic: document.getElementsByName("respuesta_ic")[0].value,
            cc: document.getElementsByName("respuesta_cc")[0].value,
            cc_pct: the("respuesta_cc_pct").innerHTML,
            ca: document.getElementsByName("respuesta_ca")[0].value,
            ca_pct: the("respuesta_ca_pct").innerHTML,
            lf: document.getElementsByName("respuesta_lf")[0].value,
            lf_pct: the("respuesta_lf_pct").innerHTML,
            lh: document.getElementsByName("respuesta_lh")[0].value,
            lh_pct: the("respuesta_lh_pct").innerHTML,
            cerebelo: document.getElementsByName("respuesta_cerebelo")[0].value,
            cerebelo_pct: the("respuesta_cerebelo_pct").innerHTML,
            pfe: document.getElementsByName("respuesta_pfe")[0].innerHTML,
            ccca: document.getElementsByName("respuesta_ccca")[0].innerHTML,
            uterina_derecha: document.getElementsByName("respuesta_uterina_derecha")[0].value,
            uterina_derecha_pct: the("respuesta_uterina_derecha_percentil").innerHTML,
            uterina_izquierda: document.getElementsByName("respuesta_uterina_izquierda")[0].value,
            uterina_izquierda_pct: the("respuesta_uterina_izquierda_percentil").innerHTML,
            uterinas: document.getElementsByName("respuesta_uterinas")[0].value,
            comentariosexamen: document.getElementsByName("comentarios")[0].value,
            modal: this.dataset.modal
        }

        if (segundo.modificar == true){
            save.id = segundo.examen_id;
        }

        cloud.examenUp(save).then(function(data){
            if (data.return == false){
                make.alert('Hubo un error al crear el exámen, intente otra vez');
            }else{
                $("#"+data.modal).modal("hide");
                informe.interface(data);
            }
        });
    }
    //mejorar
    static valCC(){
        this.value = fn.number(this.value);
        let value = String(this.value);

        if (value.length > 0){
            let cut = Object;
            cut.digit = 3;
            cut.value = value;
            this.value = fn.cut(cut);

            let dof = document.getElementsByName("respuesta_dof")[0].value;
            let dbp = document.getElementsByName("respuesta_dbp")[0].value;

            if (String(dof).length > 0 && String(dbp).length > 0){
                let valCC = fn.valCC(dof,dbp);
                document.getElementsByName("respuesta_ic")[0].value = valCC.ic;
                document.getElementsByName("respuesta_cc")[0].value = valCC.cc;
                document.getElementsByName("respuesta_cc")[0].oninput();
            }else{
                document.getElementsByName("respuesta_ic")[0].value = '';
            }
        }
    }
    //
    static cc(){
        this.value = fn.number(this.value);
        let value = String(this.value);

        if (value.length > 0){
            let cut = Object;
            cut.digit = 3;
            cut.value = value;
            this.value = fn.cut(cut);

            let cc = fn.cc(this);
            the("respuesta_cc_pct").innerHTML = cc.text;
            //mejorar
            segundo.ccca();
            segundo.pfe();
            //
        }else{
            the("respuesta_cc_pct").innerHTML = ''; 
        }
    }
    static ca(e){
        this.value = fn.number(this.value);
        let value = String(this.value);

        if (value.length > 0){
            let cut = Object;
            cut.digit = 3;
            cut.value = value;
            this.value = fn.cut(cut);

            let ca = fn.ca(this);
            the("respuesta_ca_pct").innerHTML = ca.text;
            //mejorar
            segundo.ccca();
            segundo.pfe();
            //
        }else{
            the("respuesta_ca_pct").innerHTML = ''; 
        }
    }
    static ccca(){
        let cc = document.getElementsByName("respuesta_cc")[0].value;
        let ca = document.getElementsByName("respuesta_ca")[0].value;
        let eg = document.getElementsByName("respuesta_cc")[0].dataset.eg;

        if (String(cc).length > 0 && String(ca).length > 0){
            let ccca = fn.ccca(cc,ca,eg);
            document.getElementsByName("respuesta_ccca")[0].value = ccca.text;
        }else{
            document.getElementsByName("respuesta_ccca")[0].value = '';
        }
    }
    static lf(e){
        this.value = fn.number(this.value);
        let value = String(this.value);

        if (value.length > 0){
            let cut = Object;
            cut.digit = 3;
            cut.value = value;
            this.value = fn.cut(cut);

            let lf = fn.lf(this);
            segundo.pfe();
            the("respuesta_lf_pct").innerHTML = lf.text;
        }else{
            the("respuesta_lf_pct").innerHTML = ''; 
        }
    }
    static lh(e){
        this.value = fn.number(this.value);
        let value = String(this.value);

        if (value.length > 0){
            let cut = Object;
            cut.digit = 3;
            cut.value = value;
            this.value = fn.cut(cut);

            let lh = fn.lh(this);
            the("respuesta_lh_pct").innerHTML = lh.text;
        }else{
            the("respuesta_lh_pct").innerHTML = ''; 
        }
    }
    static cb(e){
        this.value = fn.number(this.value);
        let value = String(this.value);

        if (value.length > 0){
            let cut = Object;
            cut.digit = 3;
            cut.value = value;
            this.value = fn.cut(cut);

            let cb = fn.cb(this);
            the("respuesta_cerebelo_pct").innerHTML = cb.text;
        }else{
            the("respuesta_cerebelo_pct").innerHTML = ''; 
        }
    }
    static pfe(){
        let cc = document.getElementsByName("respuesta_cc")[0].value;
        let ca = document.getElementsByName("respuesta_ca")[0].value;
        let lf = document.getElementsByName("respuesta_lf")[0].value;
        let eg = document.getElementsByName("respuesta_cc")[0].dataset.eg;

        if (String(cc).length > 0 && String(ca).length > 0 && String(lf).length > 0 ){
            let pfex = fn.pfe(lf, cc, ca,eg);
            document.getElementsByName("respuesta_pfe")[0].value = pfex.text;

        }else{
            document.getElementsByName("respuesta_pfe")[0].value = '';
        }
    }
    static utd(e){
        this.value = fn.number(this.value);
        let value = String(this.value);

        if (value.length > 0){
            let cut = Object;
            cut.digit = 3;
            cut.value = value;
            this.value = fn.cut(cut);

            let ut = fn.ut(this);
            the("respuesta_uterina_derecha_percentil").innerHTML = ut.text;
            segundo.promut();
        }else{
            the("respuesta_uterina_derecha_percentil").innerHTML = ''; 
        }
    }
    static uti(e){
        this.value = fn.number(this.value);
        let value = String(this.value);

        if (value.length > 0){
            let cut = Object;
            cut.digit = 3;
            cut.value = value;
            this.value = fn.cut(cut);

            let ut = fn.ut(this);
            the("respuesta_uterina_izquierda_percentil").innerHTML = ut.text;
            segundo.promut();
        }else{
            the("respuesta_uterina_izquierda_percentil").innerHTML = ''; 
        }
    }
    //promedio uterinas
    static promut(){
        let utd = document.getElementsByName("respuesta_uterina_derecha")[0].value;
        let uti = document.getElementsByName("respuesta_uterina_izquierda")[0].value;
        let eg = document.getElementsByName("respuesta_uterina_izquierda")[0].dataset.eg;

        if (String(utd).length > 0 && String(uti).length > 0){
            let promedio =  (parseFloat(utd) + parseFloat(uti) ) / 2;
            let prut = fn.promut(promedio, eg);
            document.getElementsByName("respuesta_uterinas")[0].value = promedio + ", percentil " + prut.text;
        
        }else{
            document.getElementsByName("respuesta_uterinas")[0].value = '';
        }
    }

    static selectBVM(){
        let semanas =  document.getElementsByName("respuesta_bvm")[0];
        let opt = document.createElement('option');
        opt.appendChild( document.createTextNode("< 10") );
        opt.value = 0; 
        semanas.appendChild(opt);

        for (var i = 10; i < 161; i++) {
            opt = document.createElement('option');
            opt.appendChild( document.createTextNode(i) );
            opt.value = i; 
            semanas.appendChild(opt);
        }

        opt = document.createElement('option');
        opt.appendChild( document.createTextNode("> 160") );
        opt.value = 161; 
        semanas.appendChild(opt);
    }

    static selectFCF(){
        let semanas =  document.getElementsByName("respuesta_fcf")[0];
        let opt = document.createElement('option');
        opt.appendChild( document.createTextNode("Sin actividad cardiaca") );
        opt.value = 0; 
        semanas.appendChild(opt);

        opt = document.createElement('option');
        opt.appendChild( document.createTextNode("(+) inicial") );
        opt.value = 1; 
        semanas.appendChild(opt);

        opt = document.createElement('option');
        opt.appendChild( document.createTextNode("< 90") );
        opt.value = 2; 
        semanas.appendChild(opt);

        for (var i = 90; i < 181; i++) {
            opt = document.createElement('option');
            opt.appendChild( document.createTextNode(i) );
            opt.value = i; 
            semanas.appendChild(opt);
        }

        opt = document.createElement('option');
        opt.appendChild( document.createTextNode("> 180") );
        opt.value = 181; 
        semanas.appendChild(opt);
    }
}

export class once {
    modificar = false;
    examen_id = 0;

    static interface(data){
        let modal = make.modal("Guardar");
        document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
        the(modal.titulo).innerHTML = config.onceTitulo;
        the(modal.titulo).classList.add("mx-auto");
        the(modal.contenido).innerHTML = config.onceHTML;
        the(modal.id).children[0].classList.add("h-100","modal-xl");
        the(modal.id).children[0].classList.remove("modal-lg");

        document.getElementsByName("fecha")[0].value = data.fecha;
        document.getElementsByName("fecha")[0].dataset.examen = data.examen;
        document.getElementsByName("fecha")[0].dataset.pre = data.return;
        document.getElementsByName("fum")[0].value = data.paciente.fum;
        document.getElementsByName("comentariosexamen")[0].value = config.onceComentarios;

        let EG = fn.EG(data);
        document.getElementsByName("eg")[0].value = EG.text;

        the(modal.button).onclick = once.save;
        once.selectFCF();

        document.getElementsByName("respuesta_anatomia")[0].onchange = once.anatomia;
        document.getElementsByName("respuesta_embrion")[0].onchange = once.embrion;
        document.getElementsByName("respuesta_lcn")[0].oninput = once.lcn;
        document.getElementsByName("respuesta_cc")[0].oninput = once.cc;
        document.getElementsByName("respuesta_cc")[0].dataset.eg = EG.semanas;
        document.getElementsByName("respuesta_ca")[0].oninput = once.ca;
        document.getElementsByName("respuesta_ca")[0].dataset.eg = EG.semanas;
        document.getElementsByName("respuesta_lf")[0].oninput = once.lf;
        document.getElementsByName("respuesta_lf")[0].dataset.eg = EG.semanas;
        document.getElementsByName("respuesta_uterina_derecha")[0].dataset.eg = EG.semanas;
        document.getElementsByName("respuesta_uterina_derecha")[0].oninput = once.utd;
        document.getElementsByName("respuesta_uterina_izquierda")[0].dataset.eg = EG.semanas;
        document.getElementsByName("respuesta_uterina_izquierda")[0].oninput = once.uti;
        document.getElementsByName("respuesta_translucidez_nucal")[0].onchange = once.translucidez;
        document.getElementsByName("respuesta_translucencia_nucal")[0].oninput = once.translucencia;
        document.getElementsByName("respuesta_hueso_nasal")[0].onchange = once.hueso;
        document.getElementsByName("respuesta_hueso_nasal_valor")[0].oninput = once.hueso_valor;

        if (data.modificar == true){
            once.modificar = true;
            once.examen_id = data.data.examen_id;
            data.data.examen_data = JSON.parse(data.data.examen_data);
            document.getElementsByName("respuesta_anatomia")[0].value = data.data.examen_data.anatomia;
            document.getElementsByName("respuesta_anatomia")[0].onchange();
            document.getElementsByName("respuesta_anatomia_extra")[0].value = data.data.examen_data.anatomia_extra;
            document.getElementsByName("respuesta_embrion")[0].value = data.data.examen_data.embrion;
            document.getElementsByName("respuesta_embrion")[0].onchange();
            document.getElementsByName("respuesta_lcn")[0].value = data.data.examen_data.lcn;
            document.getElementsByName("respuesta_lcn")[0].oninput();
            document.getElementsByName("respuesta_fcf")[0].value = data.data.examen_data.fcf;
            document.getElementsByName("respuesta_dbp")[0].value = data.data.examen_data.dbp;
            document.getElementsByName("respuesta_cc")[0].value = data.data.examen_data.cc;
            document.getElementsByName("respuesta_cc")[0].oninput();
            document.getElementsByName("respuesta_ca")[0].value = data.data.examen_data.ca;
            document.getElementsByName("respuesta_ca")[0].oninput();
            document.getElementsByName("respuesta_lf")[0].value = data.data.examen_data.lf;
            document.getElementsByName("respuesta_lf")[0].oninput();
            document.getElementsByName("respuesta_uterina_derecha")[0].value = data.data.examen_data.uterina_derecha;
            document.getElementsByName("respuesta_uterina_derecha")[0].oninput();
            document.getElementsByName("respuesta_uterina_izquierda")[0].value = data.data.examen_data.uterina_izquierda;
            document.getElementsByName("respuesta_uterina_izquierda")[0].oninput();
            document.getElementsByName("respuesta_translucidez_nucal")[0].value = data.data.examen_data.translucidez_nucal;
            document.getElementsByName("respuesta_translucidez_nucal")[0].onchange();
            document.getElementsByName("respuesta_translucencia_nucal")[0].value = data.data.examen_data.translucencia_nucal;
            document.getElementsByName("respuesta_hueso_nasal")[0].value = data.data.examen_data.hueso_nasal;
            document.getElementsByName("respuesta_hueso_nasal")[0].onchange();
            document.getElementsByName("respuesta_hueso_nasal_valor")[0].value = data.data.examen_data.hueso_nasal_valor;
            document.getElementsByName("respuesta_ductus_venoso")[0].value = data.data.examen_data.ductus_venoso;
            document.getElementsByName("respuesta_reflujo_tricuspideo")[0].value = data.data.examen_data.reflujo_tricuspideo;
            document.getElementsByName("comentariosexamen")[0].value = data.data.examen_data.comentariosexamen;
        }

        $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) { $(this).remove(); });
    }

    static save(){
        var save = {
            pre_id: document.getElementsByName("fecha")[0].dataset.pre,
            examen: document.getElementsByName("fecha")[0].dataset.examen,
            fecha: document.getElementsByName("fecha")[0].value,
            eg: document.getElementsByName("respuesta_cc")[0].dataset.eg,
            anatomia: document.getElementsByName("respuesta_anatomia")[0].value,
            anatomia_extra: document.getElementsByName("respuesta_anatomia_extra")[0].value,
            embrion: document.getElementsByName("respuesta_embrion")[0].value,
            lcn: document.getElementsByName("respuesta_lcn")[0].value,
            fcf: document.getElementsByName("respuesta_fcf")[0].value,
            dbp: document.getElementsByName("respuesta_dbp")[0].value,
            cc: document.getElementsByName("respuesta_cc")[0].value,
            cc_pct: the("respuesta_cc_pct").innerHTML,
            ca: document.getElementsByName("respuesta_ca")[0].value,
            ca_pct: the("respuesta_ca_pct").innerHTML,
            lf: document.getElementsByName("respuesta_lf")[0].value,
            lf_pct: the("respuesta_lf_pct").innerHTML,
            uterina_derecha: document.getElementsByName("respuesta_uterina_derecha")[0].value,
            uterina_derecha_pct: the("respuesta_uterina_derecha_percentil").innerHTML,
            uterina_izquierda: document.getElementsByName("respuesta_uterina_izquierda")[0].value,
            uterina_izquierda_pct: the("respuesta_uterina_izquierda_percentil").innerHTML,
            uterinas: document.getElementsByName("respuesta_uterinas")[0].value,
            translucidez_nucal: document.getElementsByName("respuesta_translucidez_nucal")[0].value,
            translucencia_nucal: document.getElementsByName("respuesta_translucencia_nucal")[0].value,
            hueso_nasal: document.getElementsByName("respuesta_hueso_nasal")[0].value,
            hueso_nasal_valor: document.getElementsByName("respuesta_hueso_nasal_valor")[0].value,
            ductus_venoso: document.getElementsByName("respuesta_ductus_venoso")[0].value,
            reflujo_tricuspideo: document.getElementsByName("respuesta_reflujo_tricuspideo")[0].value,
            comentariosexamen: document.getElementsByName("comentariosexamen")[0].value,
            modal: this.dataset.modal
        }

        if (once.modificar == true){
            save.id = once.examen_id;
        }

        cloud.examenUp(save).then(function(data){
            if (data.return == false){
                make.alert('Hubo un error al crear el exámen, intente otra vez');
            }else{
                $("#"+data.modal).modal("hide");
                informe.interface(data);
            }
        });
    }

    static selectFCF(){
        let semanas =  document.getElementsByName("respuesta_fcf")[0];
        let opt = document.createElement('option');
        opt.appendChild( document.createTextNode("Sin actividad cardiaca") );
        opt.value = 0; 
        semanas.appendChild(opt);

        opt = document.createElement('option');
        opt.appendChild( document.createTextNode("(+) inicial") );
        opt.value = 1; 
        semanas.appendChild(opt);

        opt = document.createElement('option');
        opt.appendChild( document.createTextNode("< 90") );
        opt.value = 2; 
        semanas.appendChild(opt);

        for (var i = 90; i < 181; i++) {
            opt = document.createElement('option');
            opt.appendChild( document.createTextNode(i) );
            opt.value = i; 
            semanas.appendChild(opt);
        }

        opt = document.createElement('option');
        opt.appendChild( document.createTextNode("> 180") );
        opt.value = 181; 
        semanas.appendChild(opt);
    }
    static anatomia(){
        if (this.value == "hallazgos ecográficos compatibles con:"){
            document.getElementsByName("respuesta_anatomia_extra")[0].classList.remove("d-none");
        }else{
            document.getElementsByName("respuesta_anatomia_extra")[0].classList.add("d-none");
        }
    }
    static embrion(){
        if (this.value == "no se observa aun"){
            document.getElementsByName("respuesta_lcn")[0].parentElement.classList.add("d-none");
            document.getElementsByName("respuesta_lcn")[0].value = "";
            document.getElementsByName("respuesta_lcn_eg")[0].value = "";
            document.getElementsByName("respuesta_lcn_eg")[0].parentElement.classList.add("d-none");
            document.getElementsByName("respuesta_fcf")[0].parentElement.classList.add("d-none");
            document.getElementsByName("respuesta_fcf")[0].value = 0;
        }else if (this.value == "no se observa"){
            document.getElementsByName("respuesta_lcn")[0].parentElement.classList.add("d-none");
            document.getElementsByName("respuesta_lcn")[0].value = "";
            document.getElementsByName("respuesta_lcn_eg")[0].value = "";
            document.getElementsByName("respuesta_lcn_eg")[0].parentElement.classList.add("d-none");
            document.getElementsByName("respuesta_fcf")[0].parentElement.classList.add("d-none");
            document.getElementsByName("respuesta_fcf")[0].value = 0;
        }else{
            document.getElementsByName("respuesta_lcn")[0].parentElement.classList.remove("d-none");
            document.getElementsByName("respuesta_lcn_eg")[0].parentElement.classList.remove("d-none");
            document.getElementsByName("respuesta_lcn_eg")[0].value = "Ingrese LCN";
            if (this.value == "act. no evidenciable" || this.value == "act. card. y corp. (-)"){
                document.getElementsByName("respuesta_fcf")[0].parentElement.classList.add("d-none");
                document.getElementsByName("respuesta_fcf")[0].value=0;
                if (this.value == "act. card. y corp. (-)"){
                    //esta muerto
                    document.getElementsByName("respuesta_lcn_eg")[0].value = "";
                    document.getElementsByName("respuesta_lcn_eg")[0].parentElement.classList.add("d-none");
                }
            }
            else if (this.value == "act. card. inicial"){
                document.getElementsByName("respuesta_fcf")[0].value = "(+) inicial";
            }
            else{
                document.getElementsByName("respuesta_fcf")[0].parentElement.classList.remove("d-none");
                document.getElementsByName("respuesta_fcf")[0].value = "140";
            }
        }
    }
    static lcn(){
        this.value = fn.number(this.value);
        let value = String(this.value);

        if (value.length > 0){
            let cut = Object;
            cut.digit = 3;
            cut.value = value;
            this.value = fn.cut(cut);

            let lcn = fn.lcn(this);

            document.getElementsByName("respuesta_lcn_eg")[0].value = lcn.egLCN;
        }else{
            document.getElementsByName("respuesta_lcn_eg")[0].value = 'Ingrese LCN';
        }
    }
    static cc(){
        this.value = fn.number(this.value);
        let value = String(this.value);

        if (value.length > 0){
            let cut = Object;
            cut.digit = 3;
            cut.value = value;
            this.value = fn.cut(cut);

            let cc = fn.cc(this);
            the("respuesta_cc_pct").innerHTML = cc.text;
        }else{
            the("respuesta_cc_pct").innerHTML = ''; 
        }
    }
    static ca(e){
        this.value = fn.number(this.value);
        let value = String(this.value);

        if (value.length > 0){
            let cut = Object;
            cut.digit = 3;
            cut.value = value;
            this.value = fn.cut(cut);

            let ca = fn.ca(this);
            the("respuesta_ca_pct").innerHTML = ca.text;
        }else{
            the("respuesta_ca_pct").innerHTML = ''; 
        }
    }
    static lf(e){
        this.value = fn.number(this.value);
        let value = String(this.value);

        if (value.length > 0){
            let cut = Object;
            cut.digit = 3;
            cut.value = value;
            this.value = fn.cut(cut);

            let lf = fn.lf(this);
            the("respuesta_lf_pct").innerHTML = lf.text;
        }else{
            the("respuesta_lf_pct").innerHTML = ''; 
        }
    }
    static utd(e){
        this.value = fn.number(this.value);
        let value = String(this.value);

        if (value.length > 0){
            let cut = Object;
            cut.digit = 3;
            cut.value = value;
            this.value = fn.cut(cut);

            let ut = fn.ut(this);
            the("respuesta_uterina_derecha_percentil").innerHTML = ut.text;
            segundo.promut();
        }else{
            the("respuesta_uterina_derecha_percentil").innerHTML = ''; 
        }
    }
    static uti(e){
        this.value = fn.number(this.value);
        let value = String(this.value);

        if (value.length > 0){
            let cut = Object;
            cut.digit = 3;
            cut.value = value;
            this.value = fn.cut(cut);

            let ut = fn.ut(this);
            the("respuesta_uterina_izquierda_percentil").innerHTML = ut.text;
            segundo.promut();
        }else{
            the("respuesta_uterina_izquierda_percentil").innerHTML = ''; 
        }
    }
    //promedio uterinas
    static promut(){
        let utd = document.getElementsByName("respuesta_uterina_derecha")[0].value;
        let uti = document.getElementsByName("respuesta_uterina_izquierda")[0].value;
        let eg = document.getElementsByName("respuesta_uterina_izquierda")[0].dataset.eg;

        if (String(utd).length > 0 && String(uti).length > 0){
            let promedio =  (parseFloat(utd) + parseFloat(uti) ) / 2;
            let prut = fn.promut(promedio, eg);
            document.getElementsByName("respuesta_uterinas")[0].value = promedio + ", percentil " + prut.text;
        
        }else{
            document.getElementsByName("respuesta_uterinas")[0].value = '';
        }
    }
    //
    static translucidez(){
        if (this.value == "medible"){
            the("translucencia").classList.remove("d-none");
        }else{
            the("translucencia").classList.add("d-none");
            document.getElementsByName("respuesta_translucencia_nucal")[0].value = "";
        }
    }
    static translucencia(){
        this.value = fn.number(this.value);
        let value = String(this.value);

        if (value.length > 0){
            let cut = Object;
            cut.digit = 3;
            cut.value = value;
            this.value = fn.cut(cut);
        }
    }
    static hueso(){
        if (this.value == "visible"){
            the("huesonasal").classList.remove("d-none");
        }else{
            the("huesonasal").classList.add("d-none");
            document.getElementsByName("respuesta_hueso_nasal_valor")[0].value = "";
        }
    }
    static hueso_valor(){
        this.value = fn.number(this.value);
        let value = String(this.value);

        if (value.length > 0){
            let cut = Object;
            cut.digit = 3;
            cut.value = value;
            this.value = fn.cut(cut);
        }
    }
}

export class preco {
    modificar = false;
    examen_id = 0;
    
    static interface(data){
        let modal = make.modal("Guardar");
        document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
        the(modal.titulo).innerHTML = config.precoTitulo;
        the(modal.titulo).classList.add("mx-auto");
        the(modal.contenido).innerHTML = config.precoHTML;
        the(modal.id).children[0].classList.add("h-100","modal-xl");
        the(modal.id).children[0].classList.remove("modal-lg");

        document.getElementsByName("fecha")[0].value = data.fecha;
        document.getElementsByName("fecha")[0].dataset.examen = data.examen;
        document.getElementsByName("fecha")[0].dataset.pre = data.return;
        document.getElementsByName("fum")[0].value = data.paciente.fum;
        document.getElementsByName("respuesta_furop")[0].value = data.paciente.fum;

        let _fecha = new Date();
        _fecha.setTime(Date.parse(data.paciente.fum));
        _fecha.setDate(_fecha.getUTCDate() + 240);

        document.getElementsByName("respuesta_fppactualizada")[0].value = inputDate(_fecha);

        let EG = fn.EG(data);
        document.getElementsByName("eg")[0].value = EG.text;
        document.getElementsByName("eg")[0].dataset.eg = EG.semanas;

        document.getElementsByName("respuesta_saco")[0].oninput = preco.saco;
        document.getElementsByName("respuesta_saco_vitelino")[0].onchange = preco.vitelino;
        document.getElementsByName("respuesta_embrion")[0].onchange = preco.embrion;
        document.getElementsByName("respuesta_lcn")[0].oninput = preco.lcn;
        document.getElementsByName("respuesta_lcn")[0].dataset.fecha = data.fecha;
        document.getElementsByName("respuesta_lcn")[0].dataset.fum = data.paciente.fum;
        document.getElementsByName("comentarios")[0].value = config.precoComentarios;

        the(modal.button).onclick = preco.save;
        preco.selectFCF();

        if (data.modificar == true){
            preco.modificar = true;
            preco.examen_id = data.data.examen_id;
            data.data.examen_data = JSON.parse(data.data.examen_data);
            document.getElementsByName("respuesta_utero_primertrimestre")[0].value = data.data.examen_data.utero_primertrimestre;
            document.getElementsByName("respuesta_saco_gestacional")[0].value = data.data.examen_data.saco_gestacional;
            document.getElementsByName("respuesta_saco")[0].value = data.data.examen_data.saco;
            document.getElementsByName("respuesta_saco")[0].oninput();
            document.getElementsByName("respuesta_saco_vitelino")[0].value = data.data.examen_data.saco_vitelino;
            document.getElementsByName("respuesta_saco_vitelino_mm")[0].value = data.data.examen_data.saco_vitelino_mm;
            document.getElementsByName("respuesta_saco_vitelino")[0].onchange();
            document.getElementsByName("respuesta_embrion")[0].value = data.data.examen_data.embrion;
            document.getElementsByName("respuesta_embrion")[0].onchange();
            document.getElementsByName("respuesta_lcn")[0].value = data.data.examen_data.lcn;
            document.getElementsByName("respuesta_lcn")[0].oninput();
            document.getElementsByName("respuesta_fcf")[0].value = data.data.examen_data.fcf;
            document.getElementsByName("respuesta_anexo_izquierdo_primertrimestre")[0].value = data.data.examen_data.anexo_izquierdo_primertrimestre;
            document.getElementsByName("respuesta_anexo_derecho_primertrimestre")[0].value = data.data.examen_data.anexo_derecho_primertrimestre;
            document.getElementsByName("respuesta_douglas_primertrimestre")[0].value = data.data.examen_data.douglas_primertrimestre;
            document.getElementsByName("comentarios")[0].value = data.data.examen_data.comentariosexamen;
        }

        $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) { $(this).remove(); });
    }

    static save(){
        var save = {
            pre_id: document.getElementsByName("fecha")[0].dataset.pre,
            examen: document.getElementsByName("fecha")[0].dataset.examen,
            fecha: document.getElementsByName("fecha")[0].value,
            eg: document.getElementsByName("eg")[0].dataset.eg,
            utero_primertrimestre: document.getElementsByName("respuesta_utero_primertrimestre")[0].value,
            saco_gestacional: document.getElementsByName("respuesta_saco_gestacional")[0].value,
            saco: document.getElementsByName("respuesta_saco")[0].value,
            saco_eg: document.getElementsByName("respuesta_saco_eg")[0].value,
            saco_vitelino: document.getElementsByName("respuesta_saco_vitelino")[0].value,
            saco_vitelino_mm: document.getElementsByName("respuesta_saco_vitelino_mm")[0].value,
            embrion: document.getElementsByName("respuesta_embrion")[0].value,
            lcn: document.getElementsByName("respuesta_lcn")[0].value,
            lcn_eg: document.getElementsByName("respuesta_lcn_eg")[0].value,
            fcf: document.getElementsByName("respuesta_fcf")[0].value,
            furop: document.getElementsByName("respuesta_furop")[0].value,
            fppactualizada: document.getElementsByName("respuesta_fppactualizada")[0].value,
            anexo_izquierdo_primertrimestre: document.getElementsByName("respuesta_anexo_izquierdo_primertrimestre")[0].value,
            anexo_derecho_primertrimestre: document.getElementsByName("respuesta_anexo_derecho_primertrimestre")[0].value,
            douglas_primertrimestre: document.getElementsByName("respuesta_douglas_primertrimestre")[0].value,
            comentariosexamen: document.getElementsByName("comentarios")[0].value,
            modal: this.dataset.modal
        }

        if (preco.modificar == true){
            save.id = preco.examen_id;
        }

        cloud.examenUp(save).then(function(data){
            if (data.return == false){
                make.alert('Hubo un error al crear el exámen, intente otra vez');
            }else{
                $("#"+data.modal).modal("hide");
                informe.interface(data);
            }
        });
    }

    static selectFCF(){
        let semanas =  document.getElementsByName("respuesta_fcf")[0];
        let opt = document.createElement('option');
        opt.appendChild( document.createTextNode("Sin actividad cardiaca") );
        opt.value = 0; 
        semanas.appendChild(opt);

        opt = document.createElement('option');
        opt.appendChild( document.createTextNode("(+) inicial") );
        opt.value = 1; 
        semanas.appendChild(opt);

        opt = document.createElement('option');
        opt.appendChild( document.createTextNode("< 90") );
        opt.value = 2; 
        semanas.appendChild(opt);

        for (var i = 90; i < 181; i++) {
            opt = document.createElement('option');
            opt.appendChild( document.createTextNode(i) );
            opt.value = i; 
            semanas.appendChild(opt);
        }

        opt = document.createElement('option');
        opt.appendChild( document.createTextNode("> 180") );
        opt.value = 181; 
        semanas.appendChild(opt);
    }

    static saco(){
        this.value = fn.number(this.value);
        let value = String(this.value);

        if (value.length > 0){
            let cut = Object;
            cut.digit = 3;
            cut.value = value;
            this.value = fn.cut(cut);

            let saco = fn.egSaco(this);
            document.getElementsByName("respuesta_saco_eg")[0].value = saco.value;
        }else{
            document.getElementsByName("respuesta_saco_eg")[0].value = ''; 
        }
    }

    static vitelino(){
        if (this.value == "presente"){
            document.getElementsByName("respuesta_saco_vitelino_mm")[0].parentElement.parentElement.classList.remove("d-none"); 
        }else{
            document.getElementsByName("respuesta_saco_vitelino_mm")[0].parentElement.parentElement.classList.add("d-none"); 
        }
    }

    static embrion(){
        if (this.value == "no se observa aun"){
            document.getElementsByName("respuesta_lcn")[0].parentElement.classList.add("d-none");
            document.getElementsByName("respuesta_lcn")[0].value = "";
            document.getElementsByName("respuesta_lcn_eg")[0].value = "";
            document.getElementsByName("respuesta_lcn_eg")[0].parentElement.classList.add("d-none");
            document.getElementsByName("respuesta_fcf")[0].parentElement.classList.add("d-none");
            document.getElementsByName("respuesta_fcf")[0].value = 0;
            document.getElementsByName("comentarios")[0].value = "Gestación intrauterina única, exploración anexial de aspecto normal";
        }else if (this.value == "no se observa"){
            document.getElementsByName("respuesta_lcn")[0].parentElement.classList.add("d-none");
            document.getElementsByName("respuesta_lcn")[0].value = "";
            document.getElementsByName("respuesta_lcn_eg")[0].value = "";
            document.getElementsByName("respuesta_lcn_eg")[0].parentElement.classList.add("d-none");
            document.getElementsByName("respuesta_fcf")[0].parentElement.classList.add("d-none");
            document.getElementsByName("respuesta_fcf")[0].value = 0;
            document.getElementsByName("comentarios")[0].value = "Gestación de " + document.getElementsByName("eg")[0].value+" en referencia a ecografías previas.";
        }else{
            document.getElementsByName("respuesta_lcn")[0].parentElement.classList.remove("d-none");
            document.getElementsByName("respuesta_lcn_eg")[0].parentElement.classList.remove("d-none");
            document.getElementsByName("respuesta_lcn_eg")[0].value = "Ingrese LCN";
            if (this.value == "act. no evidenciable" || this.value == "act. card. y corp. (-)"){
                document.getElementsByName("respuesta_fcf")[0].parentElement.classList.add("d-none");
                document.getElementsByName("respuesta_fcf")[0].value=0;
                if (this.value == "act. card. y corp. (-)"){
                    //esta muerto
                    document.getElementsByName("respuesta_lcn_eg")[0].value = "";
                    document.getElementsByName("respuesta_lcn_eg")[0].parentElement.classList.add("d-none");
                    document.getElementsByName("comentarios")[0].value = "Evaluación ecográfica compatible con aborto retenido.\nSe sugiere reevaluar en .....";
                }
            }
            else if (this.value == "act. card. inicial"){
                document.getElementsByName("respuesta_fcf")[0].value = "(+) inicial";
            }
            else{
                document.getElementsByName("respuesta_fcf")[0].parentElement.classList.remove("d-none");
                document.getElementsByName("respuesta_fcf")[0].value = "140";
                document.getElementsByName("comentarios")[0].value = "gestacion intrauterina compatible con....";
            }
        }
    }

    static lcn(){
        this.value = fn.number(this.value);
        let value = String(this.value);

        if (value.length > 0){
            let cut = Object;
            cut.digit = 3;
            cut.value = value;
            this.value = fn.cut(cut);

            let lcn = fn.lcn(this);

            document.getElementsByName("respuesta_furop")[0].value = lcn.fur;
            document.getElementsByName("respuesta_fppactualizada")[0].value = lcn.fpp;
            document.getElementsByName("respuesta_lcn_eg")[0].value = lcn.egLCN;
        }else{
            document.getElementsByName("respuesta_furop")[0].value = this.dataset.fur;

            let _fecha = new Date();
            _fecha.setTime(Date.parse(data.dataset.fur));
            _fecha.setDate(_fecha.getUTCDate() + 240);

            document.getElementsByName("respuesta_fppactualizada")[0].value = inputDate(_fecha);
            document.getElementsByName("respuesta_lcn_eg")[0].value = 'Ingrese LCN';
        }
    }
}

export class ginec {
    modificar = false;
    examen_id = 0;

    static interface(data){
        let modal = make.modal("Guardar");
        document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
        the(modal.titulo).innerHTML = config.ginecTitulo;
        the(modal.titulo).classList.add("mx-auto");
        the(modal.contenido).innerHTML = config.ginecHTML;
        the(modal.id).children[0].classList.add("h-100","modal-xl");


        document.getElementsByName("fecha")[0].value = data.fecha;
        document.getElementsByName("fecha")[0].dataset.examen = data.examen;
        document.getElementsByName("fecha")[0].dataset.pre = data.return;
        document.getElementsByName("fum")[0].value = data.paciente.fum;

        document.getElementsByName("utero_uno")[0].oninput = ginec.number;
        document.getElementsByName("utero_dos")[0].oninput = ginec.number;
        document.getElementsByName("utero_tres")[0].oninput = ginec.number;
        document.getElementsByName("endometrio_uno")[0].oninput = ginec.number;

        document.getElementsByName("oi_uno")[0].oninput = ginec.oi;
        document.getElementsByName("oi_dos")[0].oninput = ginec.oi;
        document.getElementsByName("oi_tres")[0].oninput = ginec.oi;

        document.getElementsByName("od_uno")[0].oninput = ginec.od;
        document.getElementsByName("od_dos")[0].oninput = ginec.od;
        document.getElementsByName("od_tres")[0].oninput = ginec.od;

        document.getElementsByName("douglas")[0].onchange = ginec.douglas;

        let EG = fn.EG(data);
        let diaCiclo = (EG.semanas *7)+ EG.dias;

        document.getElementsByName("eg")[0].value = diaCiclo;
        let txt = "";

        if (diaCiclo < 36){
            txt = "Días del ciclo mestrual";
        }else if (diaCiclo < 86){
            txt = "Días de atraso mestrual";
        }else{
            txt = "Días de amenorrea";
        }
        document.getElementsByName("eg")[0].parentElement.children[0].children[0].innerHTML = txt;

        document.getElementsByName("comentariosexamen")[0].value = config.ginecComentarios;

        the(modal.button).onclick = ginec.save;

        if (data.modificar == true){
            ginec.modificar = true;
            ginec.examen_id = data.data.examen_id;
            data.data.examen_data = JSON.parse(data.data.examen_data);
            document.getElementsByName("utero_uno")[0].value = data.data.examen_data.utero_uno;
            document.getElementsByName("utero_dos")[0].value = data.data.examen_data.utero_dos;
            document.getElementsByName("utero_tres")[0].value = data.data.examen_data.utero_tres;
            document.getElementsByName("utero_cuatro")[0].value = data.data.examen_data.utero_cuatro;
            document.getElementsByName("endometrio_uno")[0].value = data.data.examen_data.endometrio_uno;
            document.getElementsByName("endometrio_dos")[0].value = data.data.examen_data.endometrio_dos;
            document.getElementsByName("anexial")[0].value = data.data.examen_data.anexial;
            document.getElementsByName("oi_uno")[0].value = data.data.examen_data.oi_uno;
            document.getElementsByName("oi_dos")[0].value = data.data.examen_data.oi_dos;
            document.getElementsByName("oi_tres")[0].value = data.data.examen_data.oi_tres;
            document.getElementsByName("oi_cuatro")[0].value = data.data.examen_data.oi_cuatro;
            document.getElementsByName("oi_cinco")[0].value = data.data.examen_data.oi_cinco;
            document.getElementsByName("od_uno")[0].value = data.data.examen_data.od_uno;
            document.getElementsByName("od_dos")[0].value = data.data.examen_data.od_dos;
            document.getElementsByName("od_tres")[0].value = data.data.examen_data.od_tres;
            document.getElementsByName("od_cuatro")[0].value = data.data.examen_data.od_cuatro;
            document.getElementsByName("od_cinco")[0].value = data.data.examen_data.od_cinco;
            document.getElementsByName("douglas")[0].value = data.data.examen_data.douglas;
            the("douglas_com").value = data.data.examen_data.douglas_com;
            document.getElementsByName("comentariosexamen")[0].value = data.data.examen_data.comentariosexamen;
        }

        $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) { $(this).remove(); });
    }

    static save(){
        var save = {
            pre_id: document.getElementsByName("fecha")[0].dataset.pre,
            examen: document.getElementsByName("fecha")[0].dataset.examen,
            fecha: document.getElementsByName("fecha")[0].value,
            eg: document.getElementsByName("eg")[0].value,
            utero_uno: document.getElementsByName("utero_uno")[0].value,
            utero_dos: document.getElementsByName("utero_dos")[0].value,
            utero_tres: document.getElementsByName("utero_tres")[0].value,
            utero_cuatro: document.getElementsByName("utero_cuatro")[0].value,
            endometrio_uno: document.getElementsByName("endometrio_uno")[0].value,
            endometrio_dos: document.getElementsByName("endometrio_dos")[0].value,
            anexial: document.getElementsByName("anexial")[0].value,
            oi_uno: document.getElementsByName("oi_uno")[0].value,
            oi_dos:  document.getElementsByName("oi_dos")[0].value,
            oi_tres: document.getElementsByName("oi_tres")[0].value,
            oi_cuatro: document.getElementsByName("oi_cuatro")[0].value,
            oi_cinco: document.getElementsByName("oi_cinco")[0].value,
            od_uno: document.getElementsByName("od_uno")[0].value,
            od_dos:  document.getElementsByName("od_dos")[0].value,
            od_tres: document.getElementsByName("od_tres")[0].value,
            od_cuatro: document.getElementsByName("od_cuatro")[0].value,
            od_cinco: document.getElementsByName("od_cinco")[0].value,
            douglas: document.getElementsByName("douglas")[0].value,
            douglas_com: the("douglas_com").value,
            comentariosexamen: document.getElementsByName("comentariosexamen")[0].value,
            modal: this.dataset.modal
        }

        if (ginec.modificar == true){
            save.id = ginec.examen_id;
        }
        cloud.examenUp(save).then(function(data){
            if (data.return == false){
                make.alert('Hubo un error al crear el exámen, intente otra vez');
            }else{
                $("#"+data.modal).modal("hide");
                informe.interface(data);
            }
        });
    }

    static number(){
        this.value = fn.number(this.value);
        let value = String(this.value);

        if (value.length > 0){
            let cut = Object;
            cut.digit = 3;
            cut.value = value;
            this.value = fn.cut(cut);
        }
    }

    static oi(e){
        this.value = fn.number(this.value);
        let value = String(this.value);

        if (value.length > 0){
            let cut = Object;
            cut.digit = 3;
            cut.value = value;
            this.value = fn.cut(cut);

            let oi_uno = document.getElementsByName("oi_uno")[0].value;
            let oi_dos = document.getElementsByName("oi_dos")[0].value;
            let oi_tres = document.getElementsByName("oi_tres")[0].value;

            if (String(oi_uno).length > 0 && String(oi_dos).length > 0 && String(oi_tres).length > 0){
                let volumen = fn.volumenCirculo(oi_uno,oi_dos,oi_tres);
                document.getElementsByName("oi_cuatro")[0].value = volumen.text;
            }
        }else{
            document.getElementsByName("oi_cuatro")[0].value = ''; 
        }
    }

    static od(e){
        this.value = fn.number(this.value);
        let value = String(this.value);

        if (value.length > 0){
            let cut = Object;
            cut.digit = 3;
            cut.value = value;
            this.value = fn.cut(cut);

            let od_uno = document.getElementsByName("od_uno")[0].value;
            let od_dos = document.getElementsByName("od_dos")[0].value;
            let od_tres = document.getElementsByName("od_tres")[0].value;

            if (String(od_uno).length > 0 && String(od_dos).length > 0 && String(od_tres).length > 0){
                let volumen = fn.volumenCirculo(od_uno,od_dos,od_tres);
                document.getElementsByName("od_cuatro")[0].value = volumen.text;
            }
        }else{
            document.getElementsByName("od_cuatro")[0].value = ''; 
        }
    }

    static douglas(e){
        if (this.value == "Ocupado"){
            the("douglas_com").parentElement.classList.remove("d-none");
        }
        else{
            the("douglas_com").parentElement.classList.add("d-none");
        }
    }
}

export class parto {
    static interface(data){
        let modal = make.modal("Guardar");
        document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
        the(modal.titulo).innerHTML = config.partoTitulo;
        the(modal.titulo).classList.add("mx-auto");
        the(modal.contenido).innerHTML = config.partoHTML;
        the(modal.id).children[0].classList.add("h-100","modal-xl");
        the(modal.id).children[0].classList.remove("modal-lg");

        document.getElementsByName("fecha")[0].value = inputDate();
        document.getElementsByName("comentarios")[0].value = config.partoComentarios;

        the(modal.button).onclick = parto.save;
        parto.selectEdad();
        parto.selectPeso();
        parto.selectTalla();

        $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) { $(this).remove(); });
    }

    static save(){
        
    }

    static selectEdad(){
        let semanas =  document.getElementsByName("edad")[0];
        let opt = document.createElement('option');

        for (var i = 10; i < 70; i++) {
            opt = document.createElement('option');
            opt.appendChild( document.createTextNode(i + " años") );
            opt.value = i; 
            semanas.appendChild(opt);
        }
    }

    static selectPeso(){
        let semanas =  document.getElementsByName("peso")[0];
        let opt = document.createElement('option');

        for (var i = 35; i < 135; i++) {
            opt = document.createElement('option');
            opt.appendChild( document.createTextNode(i + " kg") );
            opt.value = i; 
            semanas.appendChild(opt);
        }
    }

    static selectTalla(){
        let semanas =  document.getElementsByName("talla")[0];
        let opt = document.createElement('option');

        for (var i = 134; i < 188; i++) {
            opt = document.createElement('option');
            opt.appendChild( document.createTextNode(i + " cms") );
            opt.value = i; 
            semanas.appendChild(opt);
        }
    }
}

export class informe {
    static interface(data){
        let modal = make.modal();
        document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
        the(modal.titulo).innerHTML = "Informe";
        the(modal.titulo).classList.add("mx-auto");
        the(modal.contenido).innerHTML = '<iframe class="embed-responsive-item w-100 h-100" src="informe/get/'+data.return+'"></iframe>';
        the(modal.id).children[0].classList.add("h-100","modal-xl");
        the(modal.id).children[0].classList.remove("modal-lg");

        $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) { $(this).remove(); });
    }
}