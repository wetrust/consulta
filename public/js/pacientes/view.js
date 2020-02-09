import {cloud} from './cloud.js';
import {config} from './config.js';
import {make, the, humanDate, inputDate} from '../wetrust.js';
import {informe} from '../agenda/examen.view.js'

export class view {
    static pacientesInterface(data){
        the(config.interface).innerHTML = config.pacientesInterface;

        //the(config.pacientesInterfaceNewButton).onclick = this.newNacionalidad;
        
        view.tablePacientes(data.return);
    }

    static tablePacientes(data){
        let table = config.pacientesInterfaceTableHead;

        table += '<tbody>';
        data.forEach(function(element) {
            table += '<tr><th>'+element.nombre+'</td><td>'+element.apellido+'</td><td>'+element.rut+'</td><td><div class="btn-group"><button class="btn btn-outline-primary ver" data-id="'+element.id+'"><i class="fa fa-folder" aria-hidden="true"></i></button><button class="btn btn-outline-danger eliminar" data-id="'+element.id+'"><i class="fa fa-trash" aria-hidden="true"></i></button></div></td></tr>';
        });

        table += '</tbody>';
        the(config.pacientesInterfaceTable).innerHTML = table;

        let verBtns = document.getElementsByClassName("ver");
        for (var i=0; i < verBtns.length; i++) { verBtns[i].onclick = this.verExamenes; }
    }

    static verExamenes(){
        let id = this.dataset.id;
        let modal = make.modal();

        document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
        the(modal.titulo).innerHTML = config.verExamenesTitulo;
        the(modal.titulo).classList.add("mx-auto");
        the(modal.contenido).innerHTML = config.verExamenesHTML;
        $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) { $(this).remove(); });

        cloud.getExamenes(id).then(function(data){
            view.examenesInterface(data);
        });
    }

    static examenesInterface(data){
        let table = config.verExamenesInterfaceTableHead;
        let examenes = ['1.- Doppler + Eco. crecimiento','2.- Ecografía 2° / 3° trimestre','3.- Ecografía 11 / 14 semanas','4.- Ecografía precoz de urgencia','5.- Ecografía Ginecológica','6.- Datos del parto y recién nacido'];
        table += '<tbody>';
        data.forEach(function(element) {
            table += '<tr><th>'+element.examen_fecha+'</td><td>'+element.examen_eg+'</td><td>'+examenes[element.examen_tipo]+'</td><td><div class="btn-group"><button class="btn btn-outline-primary informe" data-id="'+element.examen_id+'">Informe</button><button class="btn btn-outline-secondary ver" data-id="'+element.examen_id+'"><i class="fa fa-pencil" aria-hidden="true"></i></button><button class="btn btn-outline-danger eliminar" data-id="'+element.examen_id+'"><i class="fa fa-trash" aria-hidden="true"></i></button></div></td></tr>';
        });

        table += '</tbody>';
        the(config.verExamenesInterfaceTable).innerHTML = table;

        let informeBtns = document.getElementsByClassName("informe");
        for (var i=0; i < informeBtns.length; i++) { informeBtns[i].onclick = this.informeExamen; }

        //let verBtns = document.getElementsByClassName("ver");
        //for (var i=0; i < verBtns.length; i++) { verBtns[i].onclick = this.verExamenes; }
    }

    static informeExamen(){
        let data = {
            return: this.dataset.id
        }

        informe.interface(data);
    }

}