import {cloud} from './cloud.js';
import {config} from './config.js';
import {make, the, humanDate, inputDate} from '../wetrust.js';
import {dopcre, segundo, once, preco, ginec, parto, informe} from './examen.view.js';

export class view {
    static reservasInterface(container, data){
        the(container).innerHTML = config.reservasInterface;
        the(config.reservasInterfaceNewButton).onclick = this.newReserva;

        the(config.reservasInterfaceSearch).value = inputDate();
        the("institucion.actual").onchange = this.changeInstitucion;

        view.tableReservas(data);
        view.buscarReservas();
        view.viewReservas();
    }

    static changeInstitucion(){
        $("#reservas\\.buscar").trigger("change");
    }

    static newReserva(){
        let modal = make.modal("Reservar hora");
        document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
        the(modal.titulo).innerHTML = config.newReservaTitulo;
        the(modal.titulo).classList.add("mx-auto");
        the(modal.contenido).innerHTML = config.newReservaHTML;

        $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) { $(this).remove(); });

        the("rut").dataset.modal = modal.id;

        $("#"+modal.button).on("click", function(){
            let reserva = {
                rut: the("rut").value,
                nombre: the("nombre").value,
                apellido: the("apellido").value,
                dia: the("dia").value,
                hora: the("hora").value,
                minutos: the("minutos").value,
                institucion_id: the("institucion.actual").value,
                modal: this.dataset.modal
            }

            if(reserva.rut.length < 8){ make.alert('RUT no corresponde a Chile'); return 0; }

            cloud.newReserva(reserva).then(function(data){
                if (data.return == true){ the(config.reservasInterfaceVer).value = 1; $("#"+data.modal).modal("hide"); view.tableReservas(data.data); }
            });
        });

        the("dia").value = the(config.reservasInterfaceSearch).value;

        view.rutValidador();
        view.selectHoras();
        view.selectMinutos();
    }

    static newPaciente(_rut){
        let modal = make.modal("Crear");
        document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
        the(modal.titulo).classList.add("mx-auto");
        the(modal.titulo).innerHTML = config.newPacientesTitulo;
        the(modal.contenido).innerHTML = config.newPacientesHTML;

        $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) { $(this).remove(); });

        document.getElementsByName("rut")[0].value = _rut;

        $("#"+modal.button).on("click", function(){
            let paciente = {
                nombre: document.getElementsByName("nombre")[0].value,
                apellido: document.getElementsByName("apellido")[0].value,
                rut: the("rut").value,
                fum: the("fum").value,
                nacionalidad: the("nacionalidad").value,
                ciudad: the("ciudad").value,
                lugar: the("lugar").value,
                patologia: the("patologia").value,
                telefono: the("telefono").value,
                institucion_id: the("institucion.actual").value,
                modal: this.dataset.modal,
            }
            
            //validador de teléfono
            paciente.telefono = (paciente.telefono == "") ? 0 : parseInt(paciente.telefono);

            if(paciente.telefono > 99999999999999){
                alert('El teléfono excede 14 dígitos');
                return 0;
            }

            cloud.newPaciente(paciente).then(function(data){
                if (data.return == true){
                    $("#"+data.modal).modal("hide");
                    $("#rut").trigger("blur");
                }
            });
        });

        the("fum").value = inputDate();

        view.calcularEG();
        view.selectSemanas();
        view.selectDias();
        view.calcularFUM();
        view.cargarConfiguracion();
        $("#fum").trigger("change");
    }

    static editPaciente(){
        let id = this.dataset.id;

        let modal = make.modal("Guardar");
        document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
        the(modal.titulo).innerHTML = config.updatePacientesTitulo;
        the(modal.contenido).innerHTML = config.updatePacientesHTML;

        $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) { $(this).remove(); });

        $("#"+modal.button).on("click", function(){
            let paciente = {
                id: the("id").value,
                nombre: the("nombre").value,
                apellido: the("apellido").value,
                rut: the("rut").value,
                fum: the("fum").value,
                ciudad: the("ciudad").value,
                lugar: the("lugar").value,
                telefono: the("telefono").value,
                modal: this.dataset.modal
            }

            //validador de teléfono
            paciente.telefono = (paciente.telefono == "") ? 0 : parseInt(paciente.telefono);

            if(paciente.telefono > 99999999999999)
            {
                alert('El teléfono excede 14 dígitos');
                return 0;
            }

            cloud.updatePaciente(paciente).then(function(data){
                if (data.return == true){
                    $("#"+data.modal).modal("hide");
                    location.reload();
                }else if (data.return == false){
                    alert('No hay cambios que guardar');
                }
            });
        });

        view.rutValidador();
        view.calcularEG();
        view.selectSemanas();
        view.selectDias();
        view.calcularFUM();

        cloud.getPaciente(id).then(function(data){
            the("id").value = data.id;
            the("nombre").value = data.nombre;
            the("apellido").value = data.apellido;
            the("rut").value = data.rut;
            the("fum").value = data.fum;
            the("ciudad").value = data.ciudad;
            the("lugar").value = data.lugar;
            the("telefono").value = data.telefono;

            $("#fum").trigger("change");
        });
    }

    static eliminarPaciente(){
        let paciente = { id: this.dataset.id }
        cloud.deletePaciente(paciente).then(function(data){
            if (data.return == true){ location.reload(); }
        });
    }

    static eliminarReserva(){
        let modal = make.modal("Eliminar");
        document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
        the(modal.titulo).innerHTML = config.deleteReservaTitulo;
        the(modal.titulo).classList.add("mx-auto");
        the(modal.titulo).parentElement.classList.add("bg-danger");
        the(modal.contenido).innerHTML = config.deleteReservaHTML;

        the(modal.button).dataset.id = this.dataset.id;

        $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) { $(this).remove(); });

        $("#"+modal.button).on("click", function(){
            let reserva = {
                id: this.dataset.id,
                fecha: the(config.reservasInterfaceSearch).value,
                institucion_id: the("institucion.actual").value,
                modal: this.dataset.modal
            }
            cloud.deleteReserva(reserva).then(function(data){
                if (data.return == true){
                    the(config.reservasInterfaceVer).value = 1;
                    $("#"+data.modal).modal("hide");
                    view.tableReservas(data.data);
                }else{
                    make.alert('Hubo un error al eliminar');
                }
            });
        });
    }

    static verPreparar(){
        let reserva_id = this.dataset.id;
        let modal = make.modal("Crear examen");

        document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
        the(modal.titulo).innerHTML = config.verPrepararTitulo;
        the(modal.titulo).classList.add("mx-auto");
        the(modal.contenido).innerHTML = config.verPrepararHTML;
        $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) { $(this).remove(); });

        the(modal.button).dataset.reserva = reserva_id;

        $("#"+modal.button).on("click", function(){
            let pre = {
                id: this.dataset.reserva,
                fecha: the(config.reservasInterfaceSearch).value,
                examen: the(config.verPrepararExamenButton).value,
                motivo: the(config.verPrepararMotivo).value,
                ver: the("reservas.ver").value,
                institucion_id: the("institucion.actual").value,
                modal: this.dataset.modal
            }

            cloud.createPre(pre).then(function(data){
                if (data.return == false){
                    make.alert('Hubo un error al eliminar');
                }else{
                    $("#"+data.modal).modal("hide");
                    view.tableReservas(data.data);

                    if (data.examen == "0"){
                        dopcre.interface(data);
                    }else if (data.examen == "1"){
                        segundo.interface(data);
                    }else if (data.examen == "2"){
                        once.interface(data);
                    }else if (data.examen == "3"){
                        preco.interface(data);
                    }else if (data.examen == "4"){
                        ginec.interface(data);
                    }else if (data.examen == "5"){
                        parto.interface(data);
                    }
                }
            });
        });
    }

    static tableReservas(data){
        let table = config.reservasInterfaceTableHead;

        table += '<tbody>';
        data.forEach(function(element) {
            let _visibleStr = ["Realizado", "Solicitado", "En espera"];
            let _visible = _visibleStr[parseInt(element.reserva_visible)];
            let _reserva_dia = new Date();
            _reserva_dia.setTime(Date.parse(element.reserva_dia));

            table += '<tr><td>'+humanDate(_reserva_dia)+'</td><td>'+element.reserva_hora+'</td><td>'+element.reserva_minutos+'</td><td>'+element.reserva_rut+'</td><td>'+element.reserva_nombre+'</td><td>'+element.reserva_apellido+'</td><td></td><td>'+_visible+'</td>';
            if (element.reserva_visible == "0"){
                table += '<td class="tabla-reservas"><div class="btn-group"><button class="btn btn-outline-agenda informe-reserva" data-id="'+element.reserva_id+'">Informe</button><button class="btn btn-outline-danger eliminar-reserva" data-id="'+element.reserva_id+'"><i class="fa fa-trash" aria-hidden="true"></i></button></div></td></tr>';
            }else if (element.reserva_visible == "1"){
                table += '<td class="tabla-reservas"><div class="btn-group"><button class="btn btn-outline-agenda examen-reserva" data-id="'+element.reserva_id+'">Examen</button><button class="btn btn-outline-agenda modificar" data-id="'+element.reserva_id+'"><i class="fa fa-pencil" aria-hidden="true"></i></button><button class="btn btn-outline-danger eliminar-reserva" data-id="'+element.reserva_id+'"><i class="fa fa-trash" aria-hidden="true"></i></button></div></td></tr>';
            }else{
                table += '<td class="tabla-reservas"><div class="btn-group"><button class="btn btn-outline-agenda process-reserva" data-id="'+element.reserva_id+'">Examen</button><button class="btn btn-outline-agenda modificar" data-id="'+element.reserva_id+'"><i class="fa fa-pencil" aria-hidden="true"></i></button><button class="btn btn-outline-danger eliminar-reserva" data-id="'+element.reserva_id+'"><i class="fa fa-trash" aria-hidden="true"></i></button></div></td></tr>';
            }
        });

        table += '</tbody>';
        the(config.reservasInterfaceTable).innerHTML = table;

        let examenBtns = document.getElementsByClassName("examen-reserva");
        for (var i=0; i < examenBtns.length; i++) { examenBtns[i].onclick = this.verPreparar; }

        let processBtns = document.getElementsByClassName("process-reserva");
        for (var i=0; i < processBtns.length; i++) { processBtns[i].onclick = this.verExamen; }

        let informeBtns = document.getElementsByClassName("informe-reserva");
        for (var i=0; i < informeBtns.length; i++) { informeBtns[i].onclick = this.informeExamen; }

        let eliminarBtns = document.getElementsByClassName("eliminar-reserva");
        for (var i=0; i < eliminarBtns.length; i++) { eliminarBtns[i].onclick = this.eliminarReserva; }
    }

    static verExamen(){
        let reserva = {
            id: this.dataset.id,
            institucion_id: the("institucion.actual").value,
            ver: the("reservas.ver").value
        }

        cloud.getPre(reserva).then(function(data){
            if (data.return == false){
                make.alert('Hubo un error al obtener datos');
            }else{
                view.tableReservas(data.data);

                if (data.examen == "0"){
                    dopcre.interface(data);
                }else if (data.examen == "1"){
                    segundo.interface(data);
                }else if (data.examen == "2"){
                    once.interface(data);
                }else if (data.examen == "3"){
                    preco.interface(data);
                }else if (data.examen == "4"){
                    ginec.interface(data);
                }else if (data.examen == "5"){
                    parto.interface(data);
                }
            }
        });
    }

    static rutValidador(){
        $('#rut').rut({
            fn_error : function(input){
                $(input).removeClass("is-valid").addClass("is-invalid");
                input.closest('.rut-container').find('span').remove();
                input.closest('.rut-container').append('<span class="invalid-feedback">Rut incorrecto</span>');
                the("nombre").value = "";
                the("apellido").value = "";
            },
            fn_validado : function(input){
                $(input).removeClass("is-invalid").addClass("is-valid");
                input.closest('.rut-container').find('span').remove();
                input.closest('.rut-container').append('<span class="valid-feedback">Rut correcto</span>');
                
                let institucion_id = the("institucion.actual").value;
                cloud.findPaciente(input[0].value,institucion_id).then(function(data){
                    if (data.length > 0){
                        the("nombre").value = data[0].nombre;
                        the("apellido").value = data[0].apellido;
                    }else{
                        view.newPaciente(input[0].value);

                    }
                });
            },
            placeholder: false
        });
    }

    static calcularEG(){
        $("#fum").on("change", function(){
            let fum = new Date();
            fum.setTime(Date.parse(this.value));
            fum = fum.getTime();
            let fee = new Date();
            fee = fee.getTime();
    
            //la fecha de mestruación si puede ser antes de la fecha de exámen
            let diff = fee - fum;
    
            if (diff > 0){
                let dias = Math.abs(diff/(1000*60*60*24));
                let semanas = Math.trunc(dias / 7);
                
                dias = Math.trunc(dias - (semanas * 7));
    
                document.getElementById("semanas").value = semanas;
                document.getElementById("dias").value = dias;
            }
            else{
                document.getElementById("semanas").value = 0;
                document.getElementById("dias").value = 0;
            }
        });
    }

    static selectSemanas(){
        for (var i = 0; i < 43; i++) {
            let semanas = the("semanas");
            let opt = document.createElement('option');
            opt.appendChild( document.createTextNode(i) );
            opt.value = i; 
            semanas.appendChild(opt);
        }
    }

    static selectDias(){
        for (var i = 0; i < 7; i++) {
            let dias = the("dias");
            let opt = document.createElement('option');
            opt.appendChild( document.createTextNode(i) );
            opt.value = i; 
            dias.appendChild(opt);
        }
    }

    static selectHoras(){
        for (var i = 1; i < 25; i++) {
            let hora = the("hora");
            let opt = document.createElement('option');
            opt.appendChild( document.createTextNode(i) );
            opt.value = i; 
            hora.appendChild(opt);
        }
    }

    static selectMinutos(){
        for (var i = 0; i < 4; i++) {
            let minutos = the("minutos");
            let opt = document.createElement('option');
            opt.appendChild( document.createTextNode(i * 15) );
            opt.value = i * 15; 
            minutos.appendChild(opt);
        }
    }

    static calcularFUM(){
        $("#semanas, #dias").on("change", function(){
            let semanas = parseInt(the("semanas").value);
            let dias = parseInt(the("dias").value);
    
            semanas = 7 * semanas;
    
            let fum = new Date();
            dias = (semanas + dias)*(1000*60*60*24);
            fum.setTime(fum.getTime() - dias);
    
            the("fum").value = inputDate(fum);
        });
    }

    static buscarReservas(){
        $("#reservas\\.buscar").on("change", function(){
            let institucion_id = the("institucion.actual").value;
            cloud.getReservas(this.value, the(config.reservasInterfaceVer).value,institucion_id).then(function(data){
                view.tableReservas(data);
            });
        });
    }

    static viewReservas(){
        $("#reservas\\.ver").on("change", function(){
            let institucion_id = the("institucion.actual").value;
            cloud.getReservas(the(config.reservasInterfaceSearch).value, this.value,institucion_id).then(function(data){
                view.tableReservas(data);
            });
        }); 
    }

    static cargarConfiguracion(){
        let institucion_id = the("institucion.actual").value;

        cloud.getConfiguraciones(institucion_id).then(function(data){
            if (data.length > 0){
                data[0].forEach(function(element) {
                    let nacionalidad = the("nacionalidad");
                    let opt = document.createElement('option');
                    opt.appendChild( document.createTextNode(element.nacionalidad_name) );
                    opt.value = element.nacionalidad_id;
                    nacionalidad.appendChild(opt);
                });

                data[1].forEach(function(element) {
                    let ciudad = the("ciudad");
                    let opt = document.createElement('option');
                    opt.appendChild( document.createTextNode(element.ciudad_name) );
                    opt.value = element.ciudad_id;
                    ciudad.appendChild(opt);
                });

                data[2].forEach(function(element) {
                    let lugar = the("lugar");
                    let opt = document.createElement('option');
                    opt.appendChild( document.createTextNode(element.lugar_name) );
                    opt.value = element.lugar_id;
                    lugar.appendChild(opt);
                });

                data[3].forEach(function(element) {
                    let patologia = the("patologia");
                    let opt = document.createElement('option');
                    opt.appendChild( document.createTextNode(element.patologia_name) );
                    opt.value = element.patologia_id;
                    patologia.appendChild(opt);
                });
            }else{
                make.alert("Hubo un problema al obtener la configuración, vuelva a cargar la página");
            }
        });
    }

    static informeExamen(){
        let id = this.dataset.id;
        let institucion_id = the("institucion.actual").value;

        cloud.getInforme(id,institucion_id).then(function(data){
            if (data.return == false){
                make.alert('Hubo un error al obtener el informe, intente otra vez');
            }else{
                informe.interface(data);
            }
        });
    }
}