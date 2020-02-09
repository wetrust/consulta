import {cloud} from './cloud.js';
import {view} from './view.js';

cloud.getPacientes().then(function(data){
    view.pacientesInterface(data);
});