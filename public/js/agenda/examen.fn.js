import {inputDate} from '../wetrust.js';
export class fn {
    static EG(data){
        let _FUM = new Date();
        _FUM.setTime(Date.parse(data.paciente.fum));
        _FUM = _FUM.getTime();
        let _fExamen = new Date();
        _fExamen.setTime(Date.parse(data.fecha));
        _fExamen = _fExamen.getTime();
        
        let diff = _fExamen - _FUM;
        if (diff > 0){
            let dias = diff/(1000*60*60*24);
            let semanas = Math.trunc(dias / 7);
        
            if (semanas > 42){
                return {semanas:42,dias:0,text:"42 semanas"};
            }else{
                dias = Math.trunc(dias - (semanas * 7));
                return {semanas:semanas,dias:dias,text:semanas + "." + dias + " semanas"};
            }
        }else{
            return {semanas:0,dias:0,text:"0 semanas"};
        }
    }
    static number(value){
        return value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    }
    static cut(data){
        let value = String(data.value);
        if (value.length > 0){
            return value.substring(0, data.digit);
        }else{
            return null;
        }
    }
    static volumenCirculo(uno,dos,tres){
        let volumen = ((parseInt(uno) * parseInt(dos) * parseInt(tres) *0.525) / 1000);
        volumen = volumen.toFixed(2);

        return {valor:volumen,text:volumen + " cm3"};
    }
    //arreglar
    static valCC(dof,dbp){
        var delta = parseFloat(1.60);
        let cc =  Math.round((parseInt(dof) + parseInt(dbp)) * delta);

        let ic = ((dbp / dof) * 100);
        ic =  Math.trunc(ic) + "%";

        return {ic:ic,cc:cc};
    }
    //
    static bvm(data){
        'use strict';
        let a = [], b = [];
        a[16]=23; a[17]=25; a[18]=27; a[19]=28; a[20]=29; a[21]=29; a[22]=30; a[23]=30; a[24]=30; a[25]=30; a[26]=30; a[27]=30; a[28]=30; a[29]=29; a[30]=29; a[31]=29; a[32]=29; a[33]=29; a[34]=28; a[35]=28; a[36]=27; a[37]=26; a[38]=24; a[39]=23; a[40]=21;
        b[16]=59; b[17]=62; b[18]=64; b[19]=66; b[20]=67; b[21]=68; b[22]=68; b[23]=68; b[24]=68; b[25]=68; b[26]=68; b[27]=69; b[28]=69; b[29]=69; b[30]=69; b[31]=70; b[32]=71; b[33]=72; b[34]=72; b[35]=72; b[36]=71; b[37]=70; b[38]=68; b[39]=66; b[40]=62;

        if (data.dataset.eg < 16 || data.dataset.eg > 40) {
            return {pct:0,text:""};
        }else {
            let uno = b[data.dataset.eg] - a[data.dataset.eg];
            let dos = data.value - a[data.dataset.eg];
            let resultado = parseInt(90 / (uno) * (dos) + 5);
            let texto = Math.trunc(resultado);
            if (texto > 99) {texto = '> 99';} 
            else if (texto < 1) {texto = '< 1';}

            return {pct:resultado,text:texto};
        }
    }
    static cc(data){
        'use strict';
        let a = [], b = [];
        a[12] = 64; a[13] = 74; a[14] = 88; a[15] = 100; a[16] = 113; a[17] = 126; a[18] = 137; a[19] = 149; a[20] = 161; a[21] = 172; a[22] = 183; a[23] = 194; a[24] = 204; a[25] = 214; a[26] = 224; a[27] = 233; a[28] = 242; a[29] = 250; a[30] = 258; a[31] = 267; a[32] = 274; a[33] = 280; a[34] = 287; a[35] = 293; a[36] = 299; a[37] = 303; a[38] = 308; a[39] = 311; a[40] = 315; a[41] = 318; a[42] = 322;
        b[12] = 81; b[13] = 94; b[14] = 106; b[15] = 120; b[16] = 135; b[17] = 150; b[18] = 165; b[19] = 179; b[20] = 193; b[21] = 206; b[22] = 219; b[23] = 232; b[24] = 243; b[25] = 256; b[26] = 268; b[27] = 279; b[28] = 290; b[29] = 300; b[30] = 310; b[31] = 319; b[32] = 328; b[33] = 336; b[34] = 343; b[35] = 351; b[36] = 358; b[37] = 363; b[38] = 368; b[39] = 373; b[40] = 377; b[41] = 382; b[42] = 387;
    
        if (data.dataset.eg < 12 || data.dataset.eg > 40) {
            return {pct:0,text:""};
        }
        else {
            let uno = b[data.dataset.eg] - a[data.dataset.eg];
            let dos = data.value - a[data.dataset.eg];
            let resultado = parseInt(95 / (uno) * (dos) + 3);
            let texto = Math.trunc(resultado);
            if (texto > 99) {texto = '> 99';} 
            else if (texto < 1) {texto = '< 1';}

            return {pct:resultado,text:texto};
        }
    }
    static ca(data){
        'use strict';
        let a = [], b = [];
        a[12] = 42; a[13] = 52; a[14] = 64; a[15] = 75;  a[16] = 86;  a[17] = 97; a[18] = 109; a[19] = 119; a[20] = 131; a[21] = 141; a[22] = 151; a[23] = 161; a[24] = 171; a[25] = 181; a[26] = 191; a[27] = 200; a[28] = 209; a[29] = 218; a[30] = 227; a[31] = 236; a[32] = 245; a[33] = 253; a[34] = 261; a[35] = 269; a[36] = 277; a[37] = 285; a[38] = 292; a[39] = 299; a[40] = 307; a[41] = 313; a[42] = 320;
        b[12] = 71; b[13] = 79; b[14] = 92; b[15] = 102; b[16] = 113; b[17] = 127; b[18] = 141; b[19] = 155; b[20] = 170; b[21] = 183; b[22] = 192; b[23] = 209; b[24] = 223; b[25] = 235; b[26] = 248; b[27] = 260; b[28] = 271; b[29] = 284; b[30] = 295; b[31] = 306; b[32] = 318; b[33] = 329; b[34] = 339; b[35] = 349; b[36] = 359; b[37] = 370; b[38] = 380; b[39] = 389; b[40] = 399; b[41] = 409; b[42] = 418;
    
        if (data.dataset.eg < 12 || data.dataset.eg > 40){
            return {pct:0,text:""};
        }
        else {
            let uno = b[data.dataset.eg] - a[data.dataset.eg];
            let dos = data.value - a[data.dataset.eg];
            let resultado = parseInt(95 / (uno) * (dos) + 3);
            let texto = Math.trunc(resultado);
            if (texto > 99) {texto = '> 99';} 
            else if (texto < 1) {texto = '< 1';}

            return {pct:resultado,text:texto};
        }
    }
    //arreglar
    static ccca(cc,ca,eg){
        'use strict';
        let ccca = fn.number(String(cc / ca))
        ccca = parseFloat(ccca).toFixed(1);

        let a = [], b = [];
        a[15] = 1.1; a[16] = 1.09; a[17] = 1.08; a[18] = 1.07; a[19] = 1.06; a[20] = 1.06; a[21] = 1.05; a[22] = 1.04; a[23] = 1.03; a[24] = 1.02; a[25] = 1.01; a[26] = 1; a[27] = 1; a[28] = 0.99; a[29] = 0.98; a[30] = 0.97; a[31] = 0.96; a[32] = 0.95; a[33] = 0.95; a[34] = 0.94; a[35] = 0.93; a[36] = 0.92; a[37] = 0.91; a[38] = 0.9; a[39] = 0.89; a[40] = 0.89;
        b[15] = 1.29; b[16] = 1.28; b[17] = 1.27; b[18] = 1.26; b[19] = 1.25; b[20] = 1.24; b[21] = 1.24; b[22] = 1.23; b[23] = 1.22; b[24] = 1.21; b[25] = 1.2; b[26] = 1.19; b[27] = 1.18; b[28] = 1.18; b[29] = 1.17; b[30] = 1.17; b[31] = 1.16; b[32] = 1.15; b[33] = 1.14; b[34] = 1.13; b[35] = 1.12; b[36] = 1.11; b[37] = 1.1; b[38] = 1.09; b[39] = 1.08; b[40] = 1.08;
    
        if (eg < 15 || eg > 40){
            return {pct:0,text:""};
        }
        else {
            var uno = b[eg] - a[eg];
            var dos = ccca - a[eg];
            var resultado = parseInt(95 / (uno) * (dos) + 3);
            let texto = Math.trunc(resultado);
            if (texto > 99) {texto = '> 99';} 
            else if (texto < 1) {texto = '< 1';}

            return { pct:resultado,text: ccca + ", percentil " + texto};
        }
    }
    //
    static lf(data){
        'use strict';
        let a = [], b = [];
        a[12] = 7;  a[13] = 9;  a[14] = 12; a[15] = 15; a[16] = 17; a[17] = 21; a[18] = 23; a[19] = 26; a[20] = 28; a[21] = 30; a[22] = 33; a[23] = 35; a[24] = 38; a[25] = 40; a[26] = 42; a[27] = 44; a[28] = 46; a[29] = 48; a[30] = 50; a[31] = 52; a[32] = 53; a[33] = 55; a[34] = 57; a[35] = 59; a[36] = 60; a[37] = 62; a[38] = 64; a[39] = 65; a[40] = 66; a[41] = 68; a[42] = 69;
        b[12] = 12; b[13] = 14; b[14] = 17; b[15] = 20; b[16] = 23; b[17] = 27; b[18] = 31; b[19] = 34; b[20] = 38; b[21] = 40; b[22] = 43; b[23] = 47; b[24] = 50; b[25] = 52; b[26] = 56; b[27] = 58; b[28] = 62; b[29] = 64; b[30] = 66; b[31] = 68; b[32] = 71; b[33] = 73; b[34] = 75; b[35] = 78; b[36] = 80; b[37] = 82; b[38] = 84; b[39] = 86; b[40] = 88; b[41] = 90; b[42] = 92;
    
        if (data.dataset.eg < 12 || data.dataset.eg > 40) {
            return {pct:0,text:""};
        }else {
            let uno = b[data.dataset.eg] - a[data.dataset.eg];
            let dos = data.value - a[data.dataset.eg];
            let resultado = parseInt(95 / (uno) * (dos) + 3);
            let texto = Math.trunc(resultado);
            if (texto > 99) {texto = '> 99';} 
            else if (texto < 1) {texto = '< 1';}

            return {pct:resultado,text:texto};
        }
    }
    static lh(data) {
        'use strict';
        let a = [], b = [];
        a[12] = 4.8; a[13] = 7.6; a[14] = 10.3; a[15] = 13.1; a[16] = 15.8;  a[17] = 18.5; a[18] = 21.2; a[19] = 23.8; a[20] = 26.3;  a[21] = 28.8; a[22] = 31.2; a[23] = 33.5; a[24] = 35.7;  a[25] = 37.9; a[26] = 39.9; a[27] = 41.9; a[28] = 43.7;  a[29] = 45.5; a[30] = 47.2; a[31] = 48.9; a[32] = 50.4;  a[33] = 52.1; a[34] = 53.4; a[35] = 54.8; a[36] = 56.2;  a[37] = 57.6; a[38] = 59.8; a[39] = 60.4; a[40] = 61.9;
        b[12] = 12.3; b[13] = 15.1; b[14] = 17.9; b[15] = 20.7; b[16] = 23.5; b[17] = 26.3; b[18] = 29.1; b[19] = 31.6; b[20] = 34.2; b[21] = 36.7; b[22] = 39.2; b[23] = 41.6; b[24] = 43.9; b[25] = 46.1; b[26] = 48.1; b[27] = 50.1; b[28] = 52.1; b[29] = 53.9; b[30] = 55.6; b[31] = 57.3; b[32] = 58.9; b[33] = 60.5; b[34] = 62.1; b[35] = 63.5; b[36] = 64.9; b[37] = 66.4; b[38] = 67.8; b[39] = 69.3; b[40] = 70.8;
        
        if (data.dataset.eg < 12 || data.dataset.eg > 40) {
            return {pct:0,text:""};
        }else {
            let uno = b[data.dataset.eg] - a[data.dataset.eg];
            let dos = data.value - a[data.dataset.eg];
            let resultado = parseInt(95 / (uno) * (dos) + 5);
            let texto = Math.trunc(resultado);
            if (texto > 99) {texto = '> 99';} 
            else if (texto < 1) {texto = '< 1';}

            return {pct:resultado,text:texto};
        }
    }
    static cb(data) {
        'use strict';
        let a = [], b = [];
        a[15] = 12;a[16] = 14;a[17] = 15;a[18] = 16;a[19] = 17;a[20] = 18; a[21] = 19;a[22] = 20;a[23] = 21;a[24] = 22;a[25] = 24; a[26] = 26;a[27] = 27;a[28] = 29;a[29] = 30;a[30] = 31; a[31] = 33;a[32] = 36;a[33] = 37;a[34] = 38;a[35] = 40; a[36] = 40;a[37] = 40;a[38] = 41;a[39] = 42;a[40] = 44;
        b[15] = 18;b[16] = 18;b[17] = 19;b[18] = 20;b[19] = 22; b[20] = 23;b[21] = 25;b[22] = 26;b[23] = 27;b[24] = 30; b[25] = 32;b[26] = 34;b[27] = 34;b[28] = 37;b[29] = 38; b[30] = 41;b[31] = 43;b[32] = 46;b[33] = 48;b[34] = 53; b[35] = 56;b[36] = 58;b[37] = 60;b[38] = 62;b[39] = 62; b[40] = 62;
    
        if (data.dataset.eg < 15 || data.dataset.eg > 40) {
            return {pct:0,text:""};
        }else {
            let uno = b[data.dataset.eg] - a[data.dataset.eg];
            let dos = data.value - a[data.dataset.eg];
            let resultado = parseInt(95 / (uno) * (dos) + 5);
            let texto = Math.trunc(resultado);
            if (texto > 99) {texto = '> 99';} 
            else if (texto < 1) {texto = '< 1';}

            return {pct:resultado,text:texto};
        }
    };
    static ut(data){
        'use strict';
        var a = [], b = [];
        a[10] = 1.23; a[11] = 1.18; a[12] = 1.11; a[13] = 1.05; a[14] = 0.99; a[15] = 0.94; a[16] = 0.89; a[17] = 0.85; a[18] = 0.81; a[19] = 0.78; a[20] = 0.74; a[21] = 0.71; a[22] = 0.69; a[23] = 0.66; a[24] = 0.64; a[25] = 0.62; a[26] = 0.6; a[27] = 0.58; a[28] = 0.56; a[29] = 0.55; a[30] = 0.54; a[31] = 0.52; a[32] = 0.51; a[33] = 0.51; a[34] = 0.51; a[35] = 0.49; a[36] = 0.48; a[37] = 0.48; a[38] = 0.47; a[39] = 0.47; a[40] = 0.47;
        b[10] = 2.84; b[11] = 2.71; b[12] = 2.53; b[13] = 2.38; b[14] = 2.24; b[15] = 2.11; b[16] = 1.99; b[17] = 1.88; b[18] = 1.79; b[19] = 1.71; b[20] = 1.61; b[21] = 1.54; b[22] = 1.47; b[23] = 1.41; b[24] = 1.35; b[25] = 1.3; b[26] = 1.25; b[27] = 1.21; b[28] = 1.17; b[29] = 1.13; b[30] = 1.11; b[31] = 1.06; b[32] = 1.04; b[33] = 1.01; b[34] = 0.99; b[35] = 0.97; b[36] = 0.95; b[37] = 0.94; b[38] = 0.92; b[39] = 0.91; b[40] = 0.91;
      
        if (data.dataset.eg < 10 || data.dataset.eg > 40){
            return {pct:0,text:""};
        }else {
            let uno = b[data.dataset.eg] - a[data.dataset.eg];
            let dos = data.value - a[data.dataset.eg];
            let resultado = 90 / (uno) * (dos) + 5;
            let texto = Math.trunc(resultado);
            if (texto > 99) {texto = '> 99';} 
            else if (texto < 1) {texto = '< 1';}

            return {pct:resultado,text:texto};
        }
    }
    static promut(prom,eg){
        'use strict';
        var a = [], b = [];
        a[10] = 1.23; a[11] = 1.18; a[12] = 1.11; a[13] = 1.05; a[14] = 0.99; a[15] = 0.94; a[16] = 0.89; a[17] = 0.85; a[18] = 0.81; a[19] = 0.78; a[20] = 0.74; a[21] = 0.71; a[22] = 0.69; a[23] = 0.66; a[24] = 0.64; a[25] = 0.62; a[26] = 0.6; a[27] = 0.58; a[28] = 0.56; a[29] = 0.55; a[30] = 0.54; a[31] = 0.52; a[32] = 0.51; a[33] = 0.51; a[34] = 0.51; a[35] = 0.49; a[36] = 0.48; a[37] = 0.48; a[38] = 0.47; a[39] = 0.47; a[40] = 0.47;
        b[10] = 2.84; b[11] = 2.71; b[12] = 2.53; b[13] = 2.38; b[14] = 2.24; b[15] = 2.11; b[16] = 1.99; b[17] = 1.88; b[18] = 1.79; b[19] = 1.71; b[20] = 1.61; b[21] = 1.54; b[22] = 1.47; b[23] = 1.41; b[24] = 1.35; b[25] = 1.3; b[26] = 1.25; b[27] = 1.21; b[28] = 1.17; b[29] = 1.13; b[30] = 1.11; b[31] = 1.06; b[32] = 1.04; b[33] = 1.01; b[34] = 0.99; b[35] = 0.97; b[36] = 0.95; b[37] = 0.94; b[38] = 0.92; b[39] = 0.91; b[40] = 0.91;
      
        if (eg < 10 || eg > 40){
            return {pct:0,text:""};
        }else {
            let uno = b[eg] - a[eg];
            let dos = prom - a[eg];
            let resultado = 90 / (uno) * (dos) + 5;
            let texto = Math.trunc(resultado);
            if (texto > 99) {texto = '> 99';} 
            else if (texto < 1) {texto = '< 1';}

            return {pct:resultado,text:texto};
        } 
    }
    static umb(data){
        'use strict';
        var a = [], b = [];
        a[20] = 0.97; a[21] = 0.95; a[22] = 0.94; a[23] = 0.92; a[24] = 0.9; a[25] = 0.89; a[26] = 0.87; a[27] = 0.85; a[28] = 0.82; a[29] = 0.8; a[30] = 0.78; a[31] = 0.75; a[32] = 0.73; a[33] = 0.7; a[34] = 0.67; a[35] = 0.65; a[36] = 0.62; a[37] = 0.58; a[38] = 0.55; a[39] = 0.52;a[40] = 0.49;
        b[20] = 1.6; b[21] = 1.56; b[22] = 1.53; b[23] = 1.5; b[24] = 1.46; b[25] = 1.43; b[26] = 1.4;	b[27] = 1.37; b[28] = 1.35; b[29] = 1.32; b[30] = 1.29; b[31] = 1.27; b[32] = 1.25; b[33] = 1.22; b[34] = 1.2; b[35] = 1.18; b[36] = 1.16; b[37] = 1.14; b[38] = 1.13; b[39] = 1.11; b[40] = 1.09;
    
        if (data.dataset.eg < 20 || data.dataset.eg > 40){
            return {pct:0,text:""};
        }else {
            let uno = b[data.dataset.eg] - a[data.dataset.eg];
            let dos = data.value - a[data.dataset.eg];
            var resultado = parseInt(90 / (uno) * (dos) + 5);
            let texto = Math.trunc(resultado);
            if (texto > 99) {texto = '> 99';} 
            else if (texto < 1) {texto = '< 1';}

            return {pct:resultado,text:texto};
        }
    }
    static cm(data){
        'use strict';
        var a = [], b = [];
        a[0] = 1.24; a[1] = 1.29; a[2] = 1.34; a[3] = 1.37; a[4] = 1.4; a[5] = 1.43; a[6] = 1.44; a[7] = 1.45; a[8] = 1.45; a[9] = 1.44; a[10] = 1.43; a[11] = 1.41; a[12] = 1.38; a[13] = 1.34;	a[14] = 1.3; a[15] = 1.25; a[16] = 1.19; a[17] = 1.13;	a[18] = 1.05; a[19] = 0.98; a[20] = 0.89;
        b[0] = 1.98; b[1] = 2.12; b[2] = 2.25; b[3] = 2.36; b[4] = 2.45; b[5] = 2.53; b[6] = 2.59; b[7] = 2.63; b[8] = 2.66; b[9] = 2.67; b[10] = 2.67;	b[11] = 2.65; b[12] = 2.62; b[13] = 2.56;	b[14] = 2.5; b[15] = 2.41; b[16] = 2.31; b[17] = 2.2; b[18] = 2.07; b[19] = 1.92; b[20] = 1.76;
        
        if (data.dataset.eg < 20 || data.dataset.eg > 40){
            return {pct:0,text:""};
        }else {
            let eg = data.dataset.eg;
            eg = eg - 20;
            var uno = b[eg] - a[eg];
            var dos = data.value - a[eg];
            var resultado = parseInt(90 / (uno) * (dos) + 5);

            let texto = Math.trunc(resultado);
            if (texto > 99) {texto = '> 99';} 
            else if (texto < 1) {texto = '< 1';}

            return {pct:resultado,text:texto};
        }
    }
    static cmau(promedio,eg){
        var a = [], b = [];
        a[20] = 0.78; a[21] = 0.87; a[22] = 0.95; a[23] = 1.02;a[24] = 1.09; a[25] = 1.15; a[26] = 1.2; a[27] = 1.24;a[28] = 1.28; a[29] = 1.31; a[30] = 1.33; a[31] = 1.35;a[32] = 1.36; a[33] = 1.36; a[34] = 1.36; a[35] = 1.34;a[36] = 1.32; a[37] = 1.3; a[38] = 1.26; a[39] = 1.22;a[40] = 1.18;
        b[20] = 1.68; b[21] = 1.88; b[22] = 2.06; b[23] = 2.22;b[24] = 2.36; b[25] = 2.49; b[26] = 2.6;	b[27] = 2.7;b[28] = 2.78; b[29] = 2.84; b[30] = 2.89; b[31] = 2.92;b[32] = 2.93; b[33] = 2.93; b[34] = 2.91; b[35] = 2.87;b[36] = 2.82; b[37] = 2.75; b[38] = 2.67; b[39] = 2.57;
        
        if (eg < 20 || eg > 40){
            return {pct:0,text:""};
        }else {
            let uno = b[eg] - a[eg];
            let dos = promedio - a[data.dataset.eg];
            var resultado = (90 / (uno) * (dos)) +5
            let texto = Math.trunc(resultado);
            if (texto > 99) {texto = '> 99';} 
            else if (texto < 1) {texto = '< 1';}

            return {pct:resultado,text:texto};
        }
    }
    //
    static pfe(lf, cc, ca,eg){
        cc = cc / 10;
        ca = ca / 10;
        lf = lf / 10;

        let psoP = Math.pow(10, (1.326 + 0.0107 * cc + 0.0438 * ca + 0.158 * lf - 0.00326 * ca * lf));
    
        if (isNaN(psoP) != true) {
            psoP = Math.trunc(psoP);
        }
        else{
            psoP = 0;
        }

        let pct10 = [], pct90 = [];
        pct10[0] = 97;pct10[1] = 121;pct10[2] = 150;pct10[3] = 185;pct10[4] = 227;pct10[5] = 275; pct10[6] = 331;pct10[7] = 398;pct10[8] = 471;pct10[9] = 556;pct10[10] = 652;pct10[11] = 758; pct10[12] = 876;pct10[13] = 1004;pct10[14] = 1145;pct10[15] = 1294;pct10[16] = 1453; pct10[17] = 1621;pct10[18] = 1794;pct10[19] = 1973;pct10[20] = 2154;pct10[21] = 2335; pct10[22] = 2513; pct10[23] = 2686; pct10[24] = 2851; pct10[25] = 2985;
        pct90[0] = 137;pct90[1] = 171;pct90[2] = 212;pct90[3] = 261;pct90[4] = 319; pct90[5] = 387;pct90[6] = 467;pct90[7] = 559;pct90[8] = 665;pct90[9] = 784; pct90[10] = 918;pct90[11] = 1068;pct90[12] = 1234;pct90[13] = 1416;pct90[14] = 1613; pct90[15] = 1824;pct90[16] = 2049;pct90[17] = 2285;pct90[18] = 2530; pct90[19] = 2781;pct90[20] = 3036;pct90[21] = 3291;pct90[22] = 3543;pct90[23] = 3786; pct90[24] = 4019;pct90[25] = 4234;

        if (eg < 15 || eg > 40 || psoP <= 0)
        {
            return {pct:0,text:""};
        }
        else {
            eg = eg - 15;
            eg = parseInt(eg);
            var uno = pct90[eg] - pct10[eg];
            var dos = psoP - pct10[eg];
            var resultado = (80 / (uno) * (dos)) + 10;

            let texto = Math.trunc(resultado);
            if (texto > 99) {texto = '> 99';} 
            else if (texto < 1) {texto = '< 1';}

            return {pct:resultado,text:psoP + ", percentil " + texto};
        }
    }
    //
    static egSaco(data) {
        'use strict';
        var a = [];
        a[5] =4.2; a[6] =4.3; a[7] =4.4; a[8] =4.5; a[9] =4.6; a[10] =5; a[11] =5.1; a[12] =5.2; a[13] =5.3; a[14] =5.4; a[15] =5.5; a[16] =5.6; a[17] =6; a[18] =6.1; a[19] =6.2; a[20] =6.3; a[21] =6.4; a[22] =6.5; a[23] =6.6; a[24] =7; a[25] =7.1; a[26] =7.2; a[27] =7.3; a[28] =7.4; a[29] =7.5; a[30] =7.6; a[31] =8; a[32] =8.1; a[33] =8.2; a[34] =8.3; a[35] =8.4; a[36] =8.5; a[37] =8.6; a[38] =9; a[39] =9.1; a[40] =9.2; a[41] =9.3; a[42] =9.4; a[43] =9.5; a[44] =9.6; a[45] =9.6; a[46] =10; a[47] =10.1; a[48] =10.2; a[49] =10.3; a[50] =10.4; a[51] =10.5; a[52] =11; a[53] =11.1; a[54] =11.2; a[55] =11.3; a[56] =11.4; a[57] =11.5; a[58] =11.6; a[59] =12; a[60] =12.1; a[61] =12.2;
        
        if (data.value < 5 || data.value > 61){
            return {value:0,text:""};
        }else {
            return {value:a[data.value],text:""};
        }
    };

    static lcn(data){
        let LCN = [[],[]];

        LCN[0][0] = 0.09; LCN[0][1] = 0.2; LCN[0][2] = 0.37; LCN[0][3] = 0.57; LCN[0][4] = 0.7; LCN[0][5] = 0.8; LCN[0][6] = 0.9; LCN[0][7] = 1; LCN[0][8] = 1.1; LCN[0][9] = 1.12;
        LCN[0][10] = 1.13; LCN[0][11] = 1.18; LCN[0][12] = 1.27; LCN[0][13] = 1.38; LCN[0][14] = 1.47; LCN[0][15] = 1.58; LCN[0][16] = 1.65; LCN[0][17] = 1.72; LCN[0][18] = 1.87; LCN[0][19] = 1.96;
        LCN[0][20] = 2.05; LCN[0][21] = 2.18; LCN[0][22] = 2.25; LCN[0][23] = 2.35; LCN[0][24] = 2.54; LCN[0][25] = 2.62; LCN[0][26] = 2.7; LCN[0][27] = 2.9; LCN[0][28] = 3.08; LCN[0][29] = 3.16;
        LCN[0][30] = 3.4; LCN[0][31] = 3.51; LCN[0][32] = 3.57; LCN[0][33] = 3.76; LCN[0][34] = 3.85; LCN[0][35] = 4.05; LCN[0][36] = 4.18; LCN[0][37] = 4.46; LCN[0][38] = 4.55; LCN[0][39] = 4.66;
        LCN[0][40] = 4.88; LCN[0][41] = 5.07; LCN[0][42] = 5.29; LCN[0][43] = 5.46; LCN[0][44] = 5.66; LCN[0][45] = 5.87; LCN[0][46] = 6.01; LCN[0][47] = 6.27; LCN[0][48] = 6.37; LCN[0][49] = 6.65;
        LCN[0][50] = 6.77; LCN[0][51] = 7.08; LCN[0][52] = 7.19; LCN[0][53] = 7.39; LCN[0][54] = 7.57; LCN[0][55] = 7.68; LCN[0][56] = 7.98; LCN[0][57] = 8.09; LCN[0][58] = 8.35; LCN[0][59] = 8.48;
        LCN[0][60] = 8.56; LCN[0][61] = 8.76; LCN[0][62] = 8.88; LCN[0][63] = 9.09;
        
        LCN[1][0] = 0; LCN[1][1] = 5.5; LCN[1][2] = 6; LCN[1][3] = 6.2; LCN[1][4] = 6.4; LCN[1][5] = 6.5; LCN[1][6] = 6.6; LCN[1][7] = 7.1; LCN[1][8] = 7.1; LCN[1][9] = 7.1;
        LCN[1][10] = 7.2; LCN[1][11] = 7.3; LCN[1][12] = 7.4; LCN[1][13] = 7.5; LCN[1][14] = 7.6; LCN[1][15] = 8; LCN[1][16] = 8.1; LCN[1][17] = 8.2; LCN[1][18] = 8.3; LCN[1][19] = 8.4;
        LCN[1][20] = 8.5; LCN[1][21] = 8.6; LCN[1][22] = 9; LCN[1][23] = 9.1; LCN[1][24] = 9.2; LCN[1][25] = 9.3; LCN[1][26] = 9.4; LCN[1][27] = 9.5; LCN[1][28] = 10; LCN[1][29] = 10.1;
        LCN[1][30] = 10.2; LCN[1][31] = 10.3; LCN[1][32] = 10.4; LCN[1][33] = 10.5; LCN[1][34] = 10.6; LCN[1][35] = 11; LCN[1][36] = 11.1; LCN[1][37] = 11.2; LCN[1][38] = 11.3; LCN[1][39] = 11.4;
        LCN[1][40] = 11.5; LCN[1][41] = 11.6; LCN[1][42] = 12; LCN[1][43] = 12.1; LCN[1][44] = 12.2; LCN[1][45] = 12.3; LCN[1][46] = 12.4; LCN[1][47] = 12.5; LCN[1][48] = 12.6; LCN[1][49] = 13;
        LCN[1][50] = 13.1; LCN[1][51] = 13.2; LCN[1][52] = 13.3; LCN[1][53] = 13.4; LCN[1][54] = 13.5; LCN[1][55] = 13.6; LCN[1][56] = 14; LCN[1][57] = 14.1; LCN[1][58] = 14.2; LCN[1][59] = 14.3;
        LCN[1][60] = 14.4; LCN[1][61] = 14.5; LCN[1][62] = 14.6; LCN[1][63] = 15;
        
        if (data.value < 0 || data.value > 90){
            let _fecha = new Date();
            _fecha.setTime(Date.parse(data.dataset.fur));
            _fecha.setDate(_fecha.getUTCDate() + 240);

            return {egLCN:0,fur:data.dataset.fur,fpp:inputDate(_fecha)};
        }else{

            let _lcn = data.value / 10;
            let eglcn = 0;

            for (let i = 1; i <= 63; i++) {
                if (LCN[0][i] >= _lcn) {
                    eglcn = LCN[1][i];
                    i = 63;
                }
            }

            let _fecha = new Date();
            _fecha.setTime(Date.parse(data.dataset.fecha));

            eglcn = eglcn.toString().split('.');

            if (eglcn.length == 1){
                eglcn = parseInt(eglcn[0]) * 7;
            }else if (eglcn.length == 2){
                eglcn = (parseInt(eglcn[0]) * 7) + parseInt(eglcn[1]);
            }
            
            _fecha.setDate(_fecha.getUTCDate() - eglcn);
            let fur = inputDate(_fecha);

            _fecha.setDate(_fecha.getUTCDate() + 240);
            
            let fpp = inputDate(_fecha);

            return {egLCN:eglcn,fur:fur,fpp:fpp};
        }
    }
}