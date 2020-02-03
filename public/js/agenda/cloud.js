import {data} from '../wetrust.js';
import {config} from './config.js';

export class cloud {
    static async getReservas(fecha, ver){
        try {
            const from = await data.get(config.reservas + fecha + "/" + ver);
            return from;
        } catch(e) {}
    }
    static async findPaciente(paciente){
        try {
            const from = await data.get(config.findPacientes + paciente);
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
            to.append('modal', pre.modal);

            const from = await data.post(config.preparar, to);
            return from;
        } catch(e){}
    }

    static async createExamen(save){
        try {
            const to = new FormData();
            to.append('pre_id', save.pre_id);
            to.append('examen', save.examen);
            to.append('fecha', save.fecha);
            to.append('eg', save.eg);
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
            to.append('comentariosexamen', save.comentariosexamen);
            to.append('modal', save.modal);

            const from = await data.post(config.newDopcre, to);
            return from;
        } catch(e){}
    }
    
    static async getConfiguraciones(){
        try {
            const from = await data.get(config.configuraciones);
            return from;
        } catch(e) {}
    }
}