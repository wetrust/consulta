import {data} from '../wetrust.js';
import {config} from './config.js';

export class cloud {
    static async getReservas(fecha, ver, institucion_id){
        try {
            const from = await data.get(config.reservas + fecha + "/" + ver + "/" + institucion_id);
            return from;
        } catch(e) {}
    }
    static async findPaciente(paciente, institucion_id){
        try {
            const from = await data.get(config.findPacientes + paciente +"/" +institucion_id);
            from.paciente = paciente;
            return from;
        } catch(e) {}
    }   
    static async newPaciente(paciente){
        try {
            const to = new FormData();
            to.append('nombre', paciente.nombre);
            to.append('apellido', paciente.apellido);
            to.append('rut', paciente.rut);
            to.append('fum', paciente.fum);
            to.append('nacionalidad', paciente.nacionalidad);
            to.append('ciudad', paciente.ciudad);
            to.append('lugar', paciente.lugar);
            to.append('patologia', paciente.patologia);
            to.append('telefono', paciente.telefono);
            to.append('modal', paciente.modal);
            to.append('institucion_id', paciente.institucion_id);
            to.append('reservas', paciente.reservas);

            const from = await data.post(config.new, to);
            return from;
        } catch(e){}
    }
    static async newReserva(reserva){
        try {
            const to = new FormData();
            to.append('rut', reserva.rut);
            to.append('nombre', reserva.nombre);
            to.append('apellido', reserva.apellido);
            to.append('dia', reserva.dia);
            to.append('hora', reserva.hora);
            to.append('minutos', reserva.minutos);
            to.append('institucion_id', reserva.institucion_id);
            to.append('modal', reserva.modal);

            const from = await data.post(config.newReserva, to);
            return from;
        } catch(e){}
    }
    static async deleteReserva(reserva){
        try {
            const to = new FormData();
            to.append('id', reserva.id);
            to.append('fecha', reserva.fecha);
            to.append('institucion_id', reserva.institucion_id);
            to.append('modal', reserva.modal);

            const from = await data.post(config.deleteReserva, to);
            return from;

        } catch(e){}
    }
    static async createPre(pre){
        try {
            const to = new FormData();
            to.append('id', pre.id);
            to.append('fecha', pre.fecha);
            to.append('examen', pre.examen);
            to.append('motivo', pre.motivo);
            to.append('ver', pre.ver);
            to.append('institucion_id', pre.institucion_id);
            to.append('modal', pre.modal);

            const from = await data.post(config.preparar, to);
            return from;
        } catch(e){}
    }
    static async getPre(reserva){
        try {
            const to = new FormData();
            to.append('id', reserva.id);
            to.append('institucion_id', reserva.institucion_id);
            to.append('ver', reserva.ver);

            const from = await data.post(config.getPre, to);
            return from;

        } catch(e){}
    }

    static async examenUp(save){
        try {
            const to = new FormData();
            let server = "";

            to.append('pre_id', save.pre_id);
            to.append('examen', save.examen);
            to.append('fecha', save.fecha);
            to.append('eg', save.eg);

            if ('id' in save == true){
                to.append('id', save.id);
            }

            if (save.examen == 0){
                if ('id' in save == true){
                    server = config.updateDopcre;
                }else{
                    server = config.newDopcre;
                }

                to.append('presentacion', save.presentacion);
                to.append('dorso', save.dorso);
                to.append('sexo_fetal', save.sexo_fetal);
                to.append('placenta_insercion', save.placenta_insercion);
                to.append('placenta', save.placenta);
                to.append('liquido', save.liquido);
                to.append('bvm', save.bvm);
                to.append('fcf', save.fcf);
                to.append('anatomia', save.anatomia);
                to.append('anatomia_extra', save.anatomia_extra);
                to.append('dbp', save.dbp);
                to.append('dof', save.dof);
                to.append('cc', save.cc);
                to.append('cc_pct', save.cc_pct);
                to.append('ca', save.ca);
                to.append('ca_pct', save.ca_pct);
                to.append('lf', save.lf);
                to.append('lf_pct', save.lf_pct);
                to.append('ccca', save.ccca);
                to.append('pfe', save.pfe);
                to.append('uterina_derecha', save.uterina_derecha);
                to.append('uterina_derecha_pct', save.uterina_derecha_pct);
                to.append('uterina_izquierda', save.uterina_izquierda);
                to.append('uterina_izquierda_pct', save.uterina_izquierda_pct);
                to.append('uterinas', save.uterinas);
                to.append('umbilical', save.umbilical);
                to.append('umbilical_pct', save.umbilical_pct);
                to.append('cm', save.cm);
                to.append('cm_pct', save.cm_pct);
                to.append('cmau', save.cmau);
                to.append('hipotesis', save.hipotesis);
                to.append('doppler_materno', save.doppler_materno);
                to.append('doppler_fetal', save.doppler_fetal);
            }else if (save.examen == 1){
                if ('id' in save == true){
                    server = config.updateDosTres;
                }else{
                    server = config.newDosTres;
                }

                to.append('presentacion', save.presentacion);
                to.append('dorso', save.dorso);
                to.append('sexo_fetal', save.sexo_fetal);
                to.append('placenta_insercion', save.placenta_insercion);
                to.append('placenta', save.placenta);
                to.append('liquido', save.liquido);
                to.append('bvm', save.bvm);
                to.append('fcf', save.fcf);
                to.append('anatomia', save.anatomia);
                to.append('anatomia_extra', save.anatomia_extra);
                to.append('atrio_posterior', save.atrio_posterior);
                to.append('atrio_posterior_mm', save.atrio_posterior_mm);
                to.append('cerebelo_text', save.cerebelo_text);
                to.append('cerebelo_mm', save.cerebelo_mm);
                to.append('cisterna_m', save.cisterna_m);
                to.append('cisterna_m_mm', save.cisterna_m_mm);
                to.append('dbp', save.dbp);
                to.append('dof', save.dof);
                to.append('ic', save.ic);
                to.append('cc', save.cc);
                to.append('cc_pct', save.cc_pct);
                to.append('ca', save.ca);
                to.append('ca_pct', save.ca_pct);
                to.append('lf', save.lf);
                to.append('lf_pct', save.lf_pct);
                to.append('lh', save.lf);
                to.append('lh_pct', save.lf_pct);
                to.append('cerebelo', save.lf);
                to.append('cerebelo_pct', save.lf_pct);
                to.append('pfe', save.pfe);
                to.append('ccca', save.ccca);
                to.append('uterina_derecha', save.uterina_derecha);
                to.append('uterina_derecha_pct', save.uterina_derecha_pct);
                to.append('uterina_izquierda', save.uterina_izquierda);
                to.append('uterina_izquierda_pct', save.uterina_izquierda_pct);
                to.append('uterinas', save.uterinas);
            }else if (save.examen == 2){
                if ('id' in save == true){
                    server = config.updateOnce;
                }else{
                    server = config.newOnce;
                }
                to.append('anatomia', save.anatomia);
                to.append('anatomia_extra', save.anatomia_extra);
                to.append('embrion', save.embrion);
                to.append('lcn', save.lcn);
                to.append('fcf', save.fcf);
                to.append('dbp', save.dbp);
                to.append('cc', save.cc);
                to.append('cc_pct', save.cc_pct);
                to.append('ca', save.ca);
                to.append('ca_pct', save.ca_pct);
                to.append('lf', save.lf);
                to.append('lf_pct', save.lf_pct);
                to.append('uterina_derecha', save.uterina_derecha);
                to.append('uterina_derecha_pct', save.uterina_derecha_pct);
                to.append('uterina_izquierda', save.uterina_izquierda);
                to.append('uterina_izquierda_pct', save.uterina_izquierda_pct);
                to.append('uterinas', save.uterinas);
                to.append('translucidez_nucal', save.translucidez_nucal);
                to.append('translucencia_nucal', save.translucencia_nucal);
                to.append('hueso_nasal', save.hueso_nasal);
                to.append('hueso_nasal_valor', save.hueso_nasal_valor);
                to.append('ductus_venoso', save.ductus_venoso);
                to.append('reflujo_tricuspideo', save.reflujo_tricuspideo);
            }else if (save.examen == 3){
                if ('id' in save == true){
                    server = config.updatePreco;
                }else{
                    server = config.newPreco;
                }

                to.append('utero_primertrimestre', save.utero_primertrimestre);
                to.append('saco_gestacional', save.saco_gestacional);
                to.append('saco', save.saco);
                to.append('saco_eg', save.saco_eg);
                to.append('saco_vitelino', save.saco_vitelino);
                to.append('saco_vitelino_mm', save.saco_vitelino_mm);
                to.append('embrion', save.embrion);
                to.append('lcn', save.lcn);
                to.append('lcn_eg', save.lcn_eg);
                to.append('fcf', save.fcf);
                to.append('furop', save.furop);
                to.append('fppactualizada', save.fppactualizada);
                to.append('anexo_izquierdo_primertrimestre', save.anexo_izquierdo_primertrimestre);
                to.append('anexo_derecho_primertrimestre', save.anexo_derecho_primertrimestre);
                to.append('douglas_primertrimestre', save.douglas_primertrimestre);
            }else if (save.examen == 4){
                if ('id' in save == true){
                    server = config.updateGine;
                }else{
                    server = config.newGine;
                }
                
                to.append('utero_uno', save.utero_uno);
                to.append('utero_dos', save.utero_dos);
                to.append('utero_tres', save.utero_tres);
                to.append('utero_cuatro', save.utero_cuatro);
                to.append('endometrio_uno', save.endometrio_uno);
                to.append('endometrio_dos', save.endometrio_dos);
                to.append('anexial', save.anexial);
                to.append('oi_uno', save.oi_uno);
                to.append('oi_dos', save.oi_dos);
                to.append('oi_tres', save.oi_tres);
                to.append('oi_cuatro', save.oi_cuatro);
                to.append('oi_cinco', save.oi_cinco);
                to.append('od_uno', save.od_uno);
                to.append('od_dos', save.od_dos);
                to.append('od_tres', save.od_tres);
                to.append('od_cuatro', save.od_cuatro);
                to.append('od_cinco', save.od_cinco);
                to.append('douglas', save.douglas);
                to.append('douglas_com', save.douglas_com);
            }else if (save.examen == 5){
                if ('id' in save == true){
                    server = config.updateParto;
                }else{
                    server = config.newParto;
                }

                to.append('fechaParto', save.fechaParto);
                to.append('eg', save.eg);
                to.append('lugar', save.lugar);
                to.append('talla', save.talla);
                to.append('peso', save.peso);
                to.append('imc', save.imc);
                to.append('estado', save.estado);
                to.append('paridad', save.paridad);
                to.append('sexo', save.sexo);
                to.append('edad', save.edad);
                to.append('etnia', save.etnia);
                to.append('pesofetal', save.pesofetal);
                to.append('pctpeso', save.pctpeso);
                to.append('pctpesocorregido', save.pctpesocorregido);
                to.append('tallafetal', save.tallafetal);
                to.append('ipn', save.ipn);
                to.append('apgaruno', save.apgaruno);
                to.append('apgardos', save.apgardos);
                to.append('craneo', save.craneo);
                to.append('ipneg', save.ipneg);
                to.append('meconio', save.meconio);
                to.append('craneo', save.craneo);
                to.append('protocolo', save.protocolo);
                to.append('hipoglicemia', save.hipoglicemia);
                to.append('reciennacido', save.reciennacido);
            }

            to.append('comentariosexamen', save.comentariosexamen);
            to.append('modal', save.modal);

            const from = await data.post(server, to);
            return from;
        } catch(e){}
    }
    
    static async getConfiguraciones(institucion_id){
        try {
            const from = await data.get(config.configuraciones + institucion_id);
            return from;
        } catch(e) {}
    }
    static async getInforme(id, institucion_id){
        try {
            const from = await data.get(config.getInforme + id + "/"+ institucion_id);
            return from;
        } catch(e) {}
    }  
}