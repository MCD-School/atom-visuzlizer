var lantanidos = "#d0ff8b";
var actinidos = "#b6ff8a";
var noMetalicos = "#ab8ffe";
var metalAlcalinos = "#fec68d";
var alcalinoterros = "#ffe08c";
var otrosMetalaes = "#fff988";
var metalTransicion = "#ecff86";
var metaloides = "#90fe99";
var alogenos = "#fa8cfe";
var gasesNobles = "#8eddfe";
var elementosDesconocidos = "#c8c8c8";


var atomsList = {
    h:{
        ma: '1.00794',
        np: 1,
        nn: 1,
        en:'1312.0',
        el:'2.20',
        na:'1',
        sq:'H',
        nom:'Hidrogeno',
        con:[
            {
                nivel: 1,
                subNivel: 's',
                e: 1
            }
        ],
        pos:'1x1',
        col:noMetalicos,
        clase:'td-norm'
    },
    
    au:{
        ma: '196.9665',
        np: 79,
        nn: 118,
        en: '890.1',
        el: '2.54',
        na: '79',
        sq: 'Au',
        nom: 'Oro',
        con: [
            {
                type: 'Xe'
            },
            {
                nivel: 4,
                subNivel: 'f',
                e: 14 
            },
            {
                nivel: 5,
                subNivel: 'd',
                e: 10
            },
            {
                nivel: 6,
                subNivel: 's',
                e: 1
            },
        ],

        //[Xe] 4f14 5d10 6s1', nivel+forma+electrones
        pos: '6x11',
        col: metalTransicion,
        clase: 'td-norm'
    }


};


window['atomList'] = atomsList