import { cloud } from './cloud.js';
import { view } from './view.js';
import {inputDate} from '../wetrust.js';

cloud.getReservas(inputDate(),1).then(function( data ){
    view.reservasInterface("agenda", data );
});