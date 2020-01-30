import {make, the, humanDate, inputDate} from '../wetrust.js';
import {cloud} from './cloud.js';
import {config} from './config.js';
import {fn} from './examen.fn.js';

export class dopcre {
    static interface(data){
        let modal = make.modal("Guardar");
        document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
        the(modal.titulo).innerHTML = config.dopcreTitulo;
        the(modal.titulo).classList.add("mx-auto");
        
        the(modal.contenido).innerHTML = config.dopcreHTML;
        the(modal.id).children[0].classList.add("h-100","modal-xl");
        the(modal.id).children[0].classList.remove("modal-lg");

        document.getElementsByName("fecha")[0].value = data.fecha;
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
        
        $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) { $(this).remove(); });
    }

    static save(){
        let modal = this.dataset.modal;
        $("#"+modal).modal("hide");
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
                resultado = 'disminuido';
            }else if (bvm.pct <= 90){
                resultado = 'normal';
            }else{
                resultado = 'aumentado';
            }

            document.getElementsByName("respuesta_liquido_clon")[0].value = resultado;
            document.getElementsByName("respuesta_liquido")[0].value = resultado;

        }else{
            document.getElementsByName("respuesta_liquido_clon")[0].value = 'no evaluado';
            document.getElementsByName("respuesta_liquido")[0].value = 'no evaluado';
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
                document.getElementsByName("respuesta_cc")[0].value = fn.valCC(dof,dbp);
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
        }
        else{
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
        }
        else{
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
        }
        else{
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
        }
        else{
            the("respuesta_lf_pct").innerHTML = ''; 
        }
    }
    //
    static pfe(){
        let cc = document.getElementsByName("respuesta_cc")[0].value;
        let ca = document.getElementsByName("respuesta_ca")[0].value;
        let lf = document.getElementsByName("respuesta_cc")[0].dataset.eg;
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
        }
        else{
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
        }
        else{
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
        }
        else{
            document.getElementsByName("respuesta_doppler_materno")[0].value = 'no evaluado';
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
    static interface(data){
        let modal = make.modal("Guardar");
        document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
        the(modal.titulo).innerHTML = config.segundoTitulo;
        the(modal.titulo).classList.add("mx-auto");
        the(modal.contenido).innerHTML = config.segundoHTML;
        the(modal.id).children[0].classList.add("h-100","modal-xl");
        the(modal.id).children[0].classList.remove("modal-lg");

        document.getElementsByName("fecha")[0].value = inputDate();
        document.getElementsByName("comentarios")[0].value = config.segundoComentarios;

        the(modal.button).onclick = segundo.save();
        segundo.selectBVM();
        segundo.selectFCF();

        $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) { $(this).remove(); });
    }

    static save(){
        
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
    static interface(data){
        let modal = make.modal("Guardar");
        document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
        the(modal.titulo).innerHTML = config.onceTitulo;
        the(modal.titulo).classList.add("mx-auto");
        the(modal.contenido).innerHTML = config.onceHTML;
        the(modal.id).children[0].classList.add("h-100","modal-xl");
        the(modal.id).children[0].classList.remove("modal-lg");

        document.getElementsByName("fecha")[0].value = inputDate();
        document.getElementsByName("comentarios")[0].value = config.onceComentarios;

        the(modal.button).onclick = once.save();
        segundo.selectFCF();

        $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) { $(this).remove(); });
    }

    static save(){
        
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

export class preco {
    static interface(data){
        let modal = make.modal("Guardar");
        document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
        the(modal.titulo).innerHTML = config.precoTitulo;
        the(modal.titulo).classList.add("mx-auto");
        the(modal.contenido).innerHTML = config.precoHTML;
        the(modal.id).children[0].classList.add("h-100","modal-xl");
        the(modal.id).children[0].classList.remove("modal-lg");

        document.getElementsByName("fecha")[0].value = inputDate();
        document.getElementsByName("comentarios")[0].value = config.precoComentarios;

        the(modal.button).onclick = preco.save();
        segundo.selectFCF();

        $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) { $(this).remove(); });
    }

    static save(){
        
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

export class ginec {
    static interface(data){
        let modal = make.modal("Guardar");
        document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
        the(modal.titulo).innerHTML = config.ginecTitulo;
        the(modal.titulo).classList.add("mx-auto");
        the(modal.contenido).innerHTML = config.ginecHTML;
        the(modal.id).children[0].classList.add("h-100","modal-xl");

        document.getElementsByName("fecha")[0].value = inputDate();
        document.getElementsByName("comentarios")[0].value = config.ginecComentarios;

        the(modal.button).onclick = ginec.save();

        $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) { $(this).remove(); });
    }

    static save(){
        
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

        the(modal.button).onclick = parto.save();
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