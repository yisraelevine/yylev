const cor = document.getElementById("cor");
const letch = document.getElementById("letch");
const eifa = document.getElementById("eifa");
const saha = document.getElementById("saha");
const hin = document.getElementById("hin");
const hisaron = document.getElementById("hisaron");
const kab = document.getElementById("kab");
const log = document.getElementById("log");
const rviait = document.getElementById("rviait");
const egg = document.getElementById("egg");
const zait = document.getElementById("zait");
const mesora = document.getElementById("mesora");
const kortov = document.getElementById("kortov");
const cm = document.getElementById("cm");

function calculator(num, id){
    num = parseFloat(num);
    if(id !== 1){
        cor.value = (num * 1).toFixed(2);
    }
    if(id !== 2){
        letch.value = (num * 2).toFixed(2);
    }
    if(id !== 3){
        eifa.value = (num * 10).toFixed(2);
    }
    if(id !== 4){
        saha.value = (num * 30).toFixed(2);
    }
    if(id !== 5){
        hin.value = (num * 60).toFixed(2);
    }
    if(id !== 6){
        hisaron.value = (num * 100).toFixed(2);
    }
    if(id !== 7){
        kab.value = (num * 180).toFixed(2);
    }
    if(id !== 8){
        log.value = (num * 720).toFixed(2);
    }
    if(id !== 9){
        rviait.value = (num * 2880).toFixed(2);
    }
    if(id !== 10){
        egg.value = (num * 4320).toFixed(2);
    }
    if(id !== 11){
        zait.value = (num * 8640).toFixed(2);
    }
    if(id !== 12){
        mesora.value = (num * 25920).toFixed(2);
    }
    if(id !== 13){
        kortov.value = (num * 46080).toFixed(2);
    }
    if(id !== 14){
        cm.value = (num * 248832).toFixed(2);
    }
}
function cor_action(){
    calculator(cor.value / 1, 1);
}
function letch_action(){
    calculator(letch.value / 2, 2);
}
function eifa_action(){
    calculator(eifa.value / 10, 3);
}
function saha_action(){
    calculator(saha.value / 30, 4);
}
function hin_action(){
    calculator(hin.value / 60, 5);
}
function hisaron_action(){
    calculator(hisaron.value / 100, 6);
}
function kab_action(){
    calculator(kab.value / 180, 7);
}
function log_action(){
    calculator(log.value / 720, 8);
}
function rviait_action(){
    calculator(rviait.value / 2880, 9);
}
function egg_action(){
    calculator(egg.value / 4320, 10);
}
function zait_action(){
    calculator(zait.value / 8640, 11);
}
function mesora_action(){
    calculator(mesora.value / 25920, 12);
}
function kortov_action(){
    calculator(kortov.value / 46080, 13);
}
function cm_action(){
    calculator(cm.value / 248832, 14);
}