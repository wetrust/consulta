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
}