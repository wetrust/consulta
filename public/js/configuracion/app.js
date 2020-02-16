import {cloud} from './cloud.js';
import {view} from './view.js';

let institucion_id = document.getElementById("institucion.actual").value;

cloud.getConfiguraciones(institucion_id).then(function(data){
    view.configuracionesInterface("configuracion",data);
});