import { cloud } from './cloud.js';
import { view } from './view.js';
import {inputDate} from '../wetrust.js';

let institucion_id = document.getElementById("institucion.actual").value;

cloud.getReservas(inputDate(),1,institucion_id).then(function( data ){
    view.reservasInterface("agenda", data );
});