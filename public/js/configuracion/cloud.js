import {data} from '../wetrust.js';
import {config} from './config.js';

export class cloud {
    static async getConfiguraciones(institucion_id){
        try {
            const from = await data.get(config.configuraciones + institucion_id);
            return from;
        } catch(e) {}
    }
    static async changeInstitucion(institucion_id){
        try {
            const from = await data.get(config.changeInstitucion + institucion_id);
            return from;
        } catch(e) {}
    }
    static async newNacionalidad(nacionalidad){
        try {
            const to = new FormData();
            to.append('nacionalidad', nacionalidad.nacionalidad);
            to.append('institucion_id', nacionalidad.institucion_id);
            to.append('modal', nacionalidad.modal);

            const from = await data.post(config.newNacionalidad, to);
            return from;
        } catch(e){}
    }
    static async newCiudad(ciudad){
        try {
            const to = new FormData();
            to.append('ciudad', ciudad.ciudad);
            to.append('institucion_id', ciudad.institucion_id);
            to.append('modal', ciudad.modal);

            const from = await data.post(config.newCiudad, to);
            return from;
        } catch(e){}
    }
    static async newLugar(lugar){
        try {
            const to = new FormData();
            to.append('lugar', lugar.lugar);
            to.append('institucion_id', lugar.institucion_id);
            to.append('modal', lugar.modal);

            const from = await data.post(config.newLugar, to);
            return from;
        } catch(e){}
    }
    static async newPatologia(patologia){
        try {
            const to = new FormData();
            to.append('patologia', patologia.patologia);
            to.append('institucion_id', patologia.institucion_id);
            to.append('modal', patologia.modal);

            const from = await data.post(config.newPatologia, to);
            return from;
        } catch(e){}
    }
    static async newAgenda(agenda){
        try {
            const to = new FormData();
            to.append('nombre', agenda.nombre);
            to.append('email', agenda.email);
            to.append('profesion', agenda.profesion);
            to.append('ciudad', agenda.ciudad);
            to.append('institucion_id', agenda.institucion_id);
            to.append('modal', agenda.modal);

            const from = await data.post(config.newAgenda, to);
            return from;
        } catch(e){}
    }
    static async changeMembrete(membrete){
        try {
            const to = new FormData();
            to.append('text', membrete.text);
            to.append('institucion_id', membrete.institucion_id);
            to.append('modal', membrete.modal);

            const from = await data.post(config.changeMembrete, to);
            return from;
        } catch(e){}
    }

    static async deleteNacionalidad(nacionalidad){
        try {
            const to = new FormData();
            to.append('id', nacionalidad.id);
            to.append('institucion_id', nacionalidad.institucion_id);
            to.append('modal', nacionalidad.modal);

            const from = await data.post(config.deleteNacionalidad, to);
            return from;

        } catch(e){}
    }
    static async deleteCiudad(ciudad){
        try {
            const to = new FormData();
            to.append('id', ciudad.id);
            to.append('institucion_id', nacionalidad.institucion_id);
            to.append('modal', ciudad.modal);

            const from = await data.post(config.deleteCiudad, to);
            return from;

        } catch(e){}
    }
    static async deleteLugar(lugar){
        try {
            const to = new FormData();
            to.append('id', lugar.id);
            to.append('institucion_id', nacionalidad.institucion_id);
            to.append('modal', lugar.modal);

            const from = await data.post(config.deleteLugar, to);
            return from;

        } catch(e){}
    }
    static async deletePatologia(patologia){
        try {
            const to = new FormData();
            to.append('id', patologia.id);
            to.append('institucion_id', nacionalidad.institucion_id);
            to.append('modal', patologia.modal);

            const from = await data.post(config.deletePatologia, to);
            return from;

        } catch(e){}
    }
    static async deleteAgenda(agenda){
        try {
            const to = new FormData();
            to.append('id', agenda.id);
            to.append('institucion_id', nacionalidad.institucion_id);
            to.append('modal', agenda.modal);

            const from = await data.post(config.deleteAgenda, to);
            return from;

        } catch(e){}
    }

    static async deleteMembrete(membrete){
        try {
            const to = new FormData();
            to.append('institucion_id', membrete.institucion_id);
            to.append('modal', membrete.modal);
            to.append('modalParent', membrete.modalParent);

            const from = await data.post(config.deleteMembrete, to);
            return from;

        } catch(e){} 
    }
}