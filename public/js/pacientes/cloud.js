import {data} from '../wetrust.js';
import {config} from './config.js';

export class cloud {
    static async getPacientes(){
        try {
            const from = await data.get(config.pacientes);
            return from;
        } catch(e) {}
    }
    static async getExamenes(id){
        try {
            const from = await data.get(config.examenes + id);
            return from;
        } catch(e) {}
    }
    static async deleteExamen(examen){
        try {
            const to = new FormData();
            to.append('id', examen.id);
            to.append('modal', examen.modal);

            const from = await data.post(config.deleteExamen, to);
            return from;

        } catch(e){}
    }
}