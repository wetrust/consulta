import {cloud} from './cloud.js';
import {config} from './config.js';
import {make, the, humanDate, inputDate} from '../wetrust.js';

export class view {
    ciudades = [];

    static configuracionesInterface(container, data){
        the(container).innerHTML = config.configuracionInterface;

        the(config.configuracionNacionalidadInterfaceNewButton).onclick = this.newNacionalidad;
        the(config.configuracionCiudadInterfaceNewButton).onclick = this.newCiudad;
        the(config.configuracionLugarInterfaceNewButton).onclick = this.newLugar;
        the(config.configuracionPatologiaInterfaceNewButton).onclick = this.newPatologia;
        the(config.configuracionAgendaInterfaceNewButton).onclick = this.newAgenda;
        the(config.configuracionMembreteInterfaceNewButton).onclick = this.changeMembrete;
        
        the("institucion.actual").onchange = this.changeInstitucion;

        view.tableNacionalidad(data[0]);
        view.tableCiudad(data[1]);
        view.tableLugar(data[2]);
        view.tablePatologia(data[3]);
        view.tableAgenda(data[4]);
        view.textMembrete(data[5]);
    }

    static newNacionalidad(){
        let modal = make.modal("Crear");
        document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
        the(modal.titulo).innerHTML = config.newNacionalidadTitulo;
        the(modal.titulo).classList.add("mx-auto","text-white");
        the(modal.contenido).innerHTML = config.newNacionalidadHTML;
        the(modal.contenido).classList.add("bg-light");

        $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) { $(this).remove(); });

        $("#"+modal.button).on("click", function(){
            let nacionalidad = {
                nacionalidad: the("input.nacionalidad").value,
                institucion_id: the("institucion.actual").value,
                modal: this.dataset.modal,
            }

            if(nacionalidad.nacionalidad.length < 1){
                make.alert('Escriba el nombre de una nacionalidad');
                return 0;
            }

            cloud.newNacionalidad(nacionalidad).then(function(data){
                if (data.return == true){
                    $("#"+data.modal).modal("hide");
                    view.tableNacionalidad(data.data);
                }else{
                    make.alert('Hubo un error al guardar');
                    $("#"+data.modal).modal("hide");
                }
            });
        });
    }

    static newCiudad(){
        let modal = make.modal("Crear");
        document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
        the(modal.titulo).innerHTML = config.newCiudadTitulo;
        the(modal.titulo).classList.add("mx-auto","text-white");
        the(modal.contenido).innerHTML = config.newCiudadHTML;
        the(modal.contenido).classList.add("bg-light");

        $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) { $(this).remove(); });

        $("#"+modal.button).on("click", function(){
            let ciudad = {
                ciudad: the("input.ciudad").value,
                institucion_id: the("institucion.actual").value,
                modal: this.dataset.modal,
            }
            
            if(ciudad.ciudad.length < 1){
                make.alert('Escriba el nombre de una ciudad');
                return 0;
            }

            cloud.newCiudad(ciudad).then(function(data){
                if (data.return == true){
                    $("#"+data.modal).modal("hide");
                    view.tableCiudad(data.data);
                }else{
                    make.alert('Hubo un error al guardar');
                    $("#"+data.modal).modal("hide");
                }
            });
        });
    }

    static newLugar(){
        let modal = make.modal("Crear");
        document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
        the(modal.titulo).innerHTML = config.newLugarTitulo;
        the(modal.titulo).classList.add("mx-auto","text-white");
        the(modal.contenido).innerHTML = config.newLugarHTML;
        the(modal.contenido).classList.add("bg-light");

        $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) { $(this).remove(); });

        $("#"+modal.button).on("click", function(){
            let lugar = {
                lugar: the("input.lugar").value,
                institucion_id: the("institucion.actual").value,
                modal: this.dataset.modal,
            }
            
            if(lugar.lugar.length < 1){
                make.alert('Escriba el nombre de un lugar');
                return 0;
            }

            cloud.newLugar(lugar).then(function(data){
                if (data.return == true){
                    $("#"+data.modal).modal("hide");
                    view.tableLugar(data.data);
                }else{
                    make.alert('Hubo un error al guardar');
                    $("#"+data.modal).modal("hide");
                }
            });
        });
    }

    static newPatologia(){
        let modal = make.modal("Crear");
        document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
        the(modal.titulo).innerHTML = config.newPatologiaTitulo;
        the(modal.titulo).classList.add("mx-auto","text-white");
        the(modal.contenido).innerHTML = config.newPatologiaHTML;
        the(modal.contenido).classList.add("bg-light");

        $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) { $(this).remove(); });

        $("#"+modal.button).on("click", function(){
            let patologia = {
                patologia: the("input.patologia").value,
                institucion_id: the("institucion.actual").value,
                modal: this.dataset.modal,
            }
            
            if(patologia.patologia.length < 1){
                make.alert('Escriba el nombre de una patología');
                return 0;
            }

            cloud.newPatologia(patologia).then(function(data){
                if (data.return == true){
                    $("#"+data.modal).modal("hide");
                    view.tablePatologia(data.data);
                }else{
                    make.alert('Hubo un error al guardar');
                    $("#"+data.modal).modal("hide");
                }
            });
        });
    }

    static newAgenda(){
        let modal = make.modal("Crear");
        document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
        the(modal.titulo).innerHTML = config.newAgendaTitulo;
        the(modal.titulo).classList.add("mx-auto","text-white");
        the(modal.contenido).innerHTML = config.newAgendaHTML;
        the(modal.contenido).classList.add("bg-light");

        $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) { $(this).remove(); });

        $("#"+modal.button).on("click", function(){
            let agenda = {
                nombre: the("input.agenda.nombre").value,
                email: the("input.agenda.email").value,
                profesion: the("input.agenda.profesion").value,
                ciudad: the("input.agenda.ciudad").value,
                institucion_id: the("institucion.actual").value,
                modal: this.dataset.modal,
            }
            
            if(agenda.nombre.length < 1){
                make.alert('Escriba el nombre del destinatario');
                return 0;
            }

            if(agenda.email.length < 1){
                make.alert('Escriba el E-Mail del destinatario');
                return 0;
            }

            cloud.newAgenda(agenda).then(function(data){
                if (data.return == true){
                    $("#"+data.modal).modal("hide");
                    view.tableAgenda(data.data);
                }else{
                    make.alert('Hubo un error al guardar');
                    $("#"+data.modal).modal("hide");
                }
            });
        });

        for (var i = 0; i < view.ciudades.length; i++) {
            let ciudad = the("input.agenda.ciudad");
            let opt = document.createElement('option');
            opt.appendChild( document.createTextNode(view.ciudades[i].ciudad_name) );
            opt.value = view.ciudades[i].ciudad_id;
            ciudad.appendChild(opt);
        }
        
    }

    static changeMembrete(){
        let modal = make.modal("Guardar");
        document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
        the(modal.titulo).innerHTML = config.changeMembreteTitulo;
        the(modal.titulo).classList.add("mx-auto","text-white");
        the(modal.contenido).innerHTML = config.changeMembreteHTML;
        the(modal.contenido).classList.add("bg-light");

        $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) { $(this).remove(); });

        the("membrete.change").value = the(config.configuracionMembreteView).value;

        $("#"+modal.button).on("click", function(){
            let membrete = {
                text: the("membrete.change").value,
                institucion_id: the("institucion.actual").value,
                modal: this.dataset.modal,
            }
            
            if(membrete.text.length < 1){
                make.alert('Escriba un mensaje para el membrete, si quiere borrar el membrete, use el botón borrar');
                return 0;
            }

            cloud.changeMembrete(membrete).then(function(data){
                if (data.return == true){
                    $("#"+data.modal).modal("hide");
                    view.textMembrete(data.data);
                }else{
                    make.alert('Hubo un error al guardar');
                    $("#"+data.modal).modal("hide");
                }
            });
        });
        
        the("membrete.eliminar").dataset.modal = modal.id;

        $("#membrete\\.eliminar").on("click", function(){
            let modal = make.modal("Eliminar");
            document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
            the(modal.titulo).innerHTML = config.deleteMembreteTitulo;
            the(modal.titulo).classList.add("mx-auto","text-white");
            the(modal.titulo).parentElement.classList.add("bg-danger");
            the(modal.contenido).innerHTML = config.deleteMembreteHTML;
            the(modal.contenido).classList.add("bg-light");

            the(modal.button).dataset.id = this.dataset.id;
            the(modal.button).dataset.modalParent = this.dataset.modal;

            $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) { $(this).remove(); });

            $("#"+modal.button).on("click", function(){
                let membrete = {
                    institucion_id: the("institucion.actual").value,
                    modal: this.dataset.modal,
                    modalParent: this.dataset.modalParent,
                }

                cloud.deleteMembrete(membrete).then(function(data){
                    if (data.return == true){
                        $("#"+data.modal).modal("hide");
                        $("#"+data.modalParent).modal("hide");
                        view.textMembrete(data.data);
                    }else{
                        make.alert('Hubo un error al eliminar');
                        $("#"+data.modal).modal("hide");
                        $("#"+data.modalParent).modal("hide");
                    }
                });
            });
        });
    }

    static changeInstitucion(){
        let institucion_id = this.value;

        cloud.changeInstitucion(institucion_id).then(function(data){
            if (data.response == true){
                cloud.getConfiguraciones(institucion_id).then(function(data){
                    view.tableNacionalidad(data[0]);
                    view.tableCiudad(data[1]);
                    view.tableLugar(data[2]);
                    view.tablePatologia(data[3]);
                    view.tableAgenda(data[4]);
                    view.textMembrete(data[5]);
                });
            }else{
                let modal = make.modal("Aceptar");
                document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
                the(modal.titulo).innerHTML = config.errorTitle;
                the(modal.titulo).classList.add("mx-auto","text-white");
                the(modal.titulo).parentElement.classList.add("bg-danger");
                the(modal.contenido).innerHTML = config.errorInstitucionHTML;
                the(modal.contenido).classList.add("bg-light");
        
                the(modal.button).dataset.id = this.dataset.id;
        
                $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) { 
                    $(this).remove();
                    location.reload();
                });
        
                $("#"+modal.button).on("click", function(){
                    location.reload(); 
                });
            }

        });
    }

    static tableNacionalidad(data){
        let table = config.configuracionNacionalidadInterfaceTableHead;

        table += '<tbody>';
        data.forEach(function(element) {
            table += '<tr><th scope="row">'+element.nacionalidad_id+'</td><td>'+element.nacionalidad_name+'</td><td><div class="btn-group"><button class="btn btn-outline-danger eliminar-nacionalidad" data-id="'+element.nacionalidad_id+'"><i class="fa fa-trash" aria-hidden="true"></i></button></div></td></tr>';
        });

        table += '</tbody>';
        the(config.configuracionNacionalidadInterfaceTable).innerHTML = table;

        let eliminarBtns = document.getElementsByClassName("eliminar-nacionalidad");
        for (var i=0; i < eliminarBtns.length; i++) { eliminarBtns[i].onclick = this.eliminarNacionalidad; }
    }

    static tableCiudad(data){
        let table = config.configuracionCiudadInterfaceTableHead;

        table += '<tbody>';
        view.ciudades = [];
        data.forEach(function(element) {
            table += '<tr><th scope="row">'+element.ciudad_id+'</td><td>'+element.ciudad_name+'</td><td><div class="btn-group"><button class="btn btn-outline-danger eliminar-ciudad" data-id="'+element.ciudad_id+'"><i class="fa fa-trash" aria-hidden="true"></i></button></div></td></tr>';
            let ciudad = {
                ciudad_id: element.ciudad_id,
                ciudad_name: element.ciudad_name
            }
            view.ciudades.push(ciudad);
        });

        table += '</tbody>';
        the(config.configuracionCiudadInterfaceTable).innerHTML = table;

        let eliminarBtns = document.getElementsByClassName("eliminar-ciudad");
        for (var i=0; i < eliminarBtns.length; i++) { eliminarBtns[i].onclick = this.eliminarCiudad; }
    }

    static tableLugar(data){
        let table = config.configuracionLugarInterfaceTableHead;

        table += '<tbody>';
        data.forEach(function(element) {
            table += '<tr><th scope="row">'+element.lugar_id+'</td><td>'+element.lugar_name+'</td><td><div class="btn-group"><button class="btn btn-outline-danger eliminar-lugar" data-id="'+element.lugar_id+'"><i class="fa fa-trash" aria-hidden="true"></i></button></div></td></tr>';
        });

        table += '</tbody>';
        the(config.configuracionLugarInterfaceTable).innerHTML = table;

        let eliminarBtns = document.getElementsByClassName("eliminar-lugar");
        for (var i=0; i < eliminarBtns.length; i++) { eliminarBtns[i].onclick = this.eliminarLugar; }
    }

    static tablePatologia(data){
        let table = config.configuracionPatologiaInterfaceTableHead;

        table += '<tbody>';
        data.forEach(function(element) {
            table += '<tr><th scope="row">'+element.patologia_id+'</td><td>'+element.patologia_name+'</td><td><div class="btn-group"><button class="btn btn-outline-danger eliminar-patologia" data-id="'+element.patologia_id+'"><i class="fa fa-trash" aria-hidden="true"></i></button></div></td></tr>';
        });

        table += '</tbody>';
        the(config.configuracionPatologiaInterfaceTable).innerHTML = table;

        let eliminarBtns = document.getElementsByClassName("eliminar-patologia");
        for (var i=0; i < eliminarBtns.length; i++) { eliminarBtns[i].onclick = this.eliminarPatologia; }
    }

    static tableAgenda(data){
        let table = config.configuracionAgendaInterfaceTableHead;

        table += '<tbody>';
        data.forEach(function(element) {
            table += '<tr><th scope="row">'+element.agenda_id+'</td><td>'+element.agenda_name+'</td><td>'+element.agenda_email+'</td><td>'+element.agenda_profesion+'</td><td>'+element.ciudad_name+'</td><td><div class="btn-group"><button class="btn btn-outline-danger eliminar-agenda" data-id="'+element.agenda_id+'"><i class="fa fa-trash" aria-hidden="true"></i></button></div></td></tr>';
        });

        table += '</tbody>';
        the(config.configuracionAgendaInterfaceTable).innerHTML = table;

        let eliminarBtns = document.getElementsByClassName("eliminar-agenda");
        for (var i=0; i < eliminarBtns.length; i++) { eliminarBtns[i].onclick = this.eliminarAgenda; }
    }

    static textMembrete(data){
        if (data.length == 1){
            the(config.configuracionMembreteView).value = data[0].membrete_text;
        }else{
            the(config.configuracionMembreteView).value = "";
        }
    }

    static eliminarNacionalidad(){
        let modal = make.modal("Eliminar");
        document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
        the(modal.titulo).innerHTML = config.deleteNacionalidadTitulo;
        the(modal.titulo).classList.add("mx-auto","text-white");
        the(modal.titulo).parentElement.classList.add("bg-danger");
        the(modal.contenido).innerHTML = config.deleteNacionalidadHTML;
        the(modal.contenido).classList.add("bg-light");

        the(modal.button).dataset.id = this.dataset.id;

        $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) { $(this).remove(); });

        $("#"+modal.button).on("click", function(){
            let nacionalidad = {
                id: this.dataset.id,
                institucion_id: the("institucion.actual").value,
                modal: this.dataset.modal
            }
            cloud.deleteNacionalidad(nacionalidad).then(function(data){
                if (data.return == true){
                    $("#"+data.modal).modal("hide");
                    view.tableNacionalidad(data.data);
                }else{
                    make.alert('Hubo un error al eliminar, ¿Este item fue creado por ud.?');
                    $("#"+data.modal).modal("hide");
                }
            });
        });
    }

    static eliminarCiudad(){
        let modal = make.modal("Eliminar");
        document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
        the(modal.titulo).innerHTML = config.deleteCiudadTitulo;
        the(modal.titulo).classList.add("mx-auto","text-white");
        the(modal.titulo).parentElement.classList.add("bg-danger");
        the(modal.contenido).innerHTML = config.deleteCiudadHTML;
        the(modal.contenido).classList.add("bg-light");

        the(modal.button).dataset.id = this.dataset.id;

        $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) { $(this).remove(); });

        $("#"+modal.button).on("click", function(){
            let ciudad = {
                id: this.dataset.id,
                institucion_id: the("institucion.actual").value,
                modal: this.dataset.modal
            }
            cloud.deleteCiudad(ciudad).then(function(data){
                if (data.return == true){
                    $("#"+data.modal).modal("hide");
                    view.tableCiudad(data.data);
                }else{
                    make.alert('Hubo un error al eliminar, ¿Este item fue creado por ud.?');
                    $("#"+data.modal).modal("hide");
                }
            });
        });
    }

    static eliminarLugar(){
        let modal = make.modal("Eliminar");
        document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
        the(modal.titulo).innerHTML = config.deleteLugarTitulo;
        the(modal.titulo).classList.add("mx-auto","text-white");
        the(modal.titulo).parentElement.classList.add("bg-danger");
        the(modal.contenido).innerHTML = config.deleteLugarHTML;
        the(modal.contenido).classList.add("bg-light");

        the(modal.button).dataset.id = this.dataset.id;

        $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) { $(this).remove(); });

        $("#"+modal.button).on("click", function(){
            let lugar = {
                id: this.dataset.id,
                institucion_id: the("institucion.actual").value,
                modal: this.dataset.modal
            }
            cloud.deleteLugar(lugar).then(function(data){
                if (data.return == true){
                    $("#"+data.modal).modal("hide");
                    view.tableLugar(data.data);
                }else{
                    make.alert('Hubo un error al eliminar, ¿Este item fue creado por ud.?');
                    $("#"+data.modal).modal("hide");
                }
            });
        });
    }

    static eliminarPatologia(){
        let modal = make.modal("Eliminar");
        document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
        the(modal.titulo).innerHTML = config.deletePatologiaTitulo;
        the(modal.titulo).classList.add("mx-auto","text-white");
        the(modal.titulo).parentElement.classList.add("bg-danger");
        the(modal.contenido).innerHTML = config.deletePatologiaHTML;
        the(modal.contenido).classList.add("bg-light");

        the(modal.button).dataset.id = this.dataset.id;

        $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) { $(this).remove(); });

        $("#"+modal.button).on("click", function(){
            let patologia = {
                id: this.dataset.id,
                institucion_id: the("institucion.actual").value,
                modal: this.dataset.modal
            }
            cloud.deletePatologia(patologia).then(function(data){
                if (data.return == true){
                    $("#"+data.modal).modal("hide");
                    view.tablePatologia(data.data);
                }else{
                    make.alert('Hubo un error al eliminar, ¿Este item fue creado por ud.?');
                    $("#"+data.modal).modal("hide");
                }
            });
        });
    }

    static eliminarAgenda(){
        let modal = make.modal("Eliminar");
        document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
        the(modal.titulo).innerHTML = config.deleteAgendaTitulo;
        the(modal.titulo).classList.add("mx-auto","text-white");
        the(modal.titulo).parentElement.classList.add("bg-danger");
        the(modal.contenido).innerHTML = config.deleteAgendaHTML;
        the(modal.contenido).classList.add("bg-light");

        the(modal.button).dataset.id = this.dataset.id;

        $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) { $(this).remove(); });

        $("#"+modal.button).on("click", function(){
            let agenda = {
                id: this.dataset.id,
                institucion_id: the("institucion.actual").value,
                modal: this.dataset.modal
            }
            cloud.deleteAgenda(agenda).then(function(data){
                if (data.return == true){
                    $("#"+data.modal).modal("hide");
                    view.tableAgenda(data.data);
                }else{
                    make.alert('Hubo un error al eliminar, ¿Este item fue creado por ud.?');
                    $("#"+data.modal).modal("hide");
                }
            });
        });
    }
}