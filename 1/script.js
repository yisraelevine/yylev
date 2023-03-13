function calculator(num, id){
    if(id !== 1){
        document.getElementById("cor").value = parseFloat((num)).toFixed(2);
    }
    if(id !== 2){
        document.getElementById("letch").value = (num * 2).toFixed(2);
    }
    if(id !== 3){
        document.getElementById("eifa").value = (num * 10).toFixed(2);
    }
    if(id !== 4){
        document.getElementById("saha").value = (num * 30).toFixed(2);
    }
    if(id !== 5){
        document.getElementById("hin").value = (num * 60).toFixed(2);
    }
    if(id !== 6){
        document.getElementById("hisaron").value = (num * 100).toFixed(2);
    }
    if(id !== 7){
        document.getElementById("kab").value = (num * 180).toFixed(2);
    }
    if(id !== 8){
        document.getElementById("log").value = (num * 720).toFixed(2);
    }
    if(id !== 9){
        document.getElementById("rviait").value = (num * 2880).toFixed(2);
    }
    if(id !== 10){
        document.getElementById("egg").value = (num * 4320).toFixed(2);
    }
    if(id !== 11){
        document.getElementById("zait").value = (num * 8640).toFixed(2);
    }
    if(id !== 12){
        document.getElementById("mesora").value = (num * 25920).toFixed(2);
    }
    if(id !== 13){
        document.getElementById("kortov").value = (num * 46080).toFixed(2);
    }
    if(id !== 14){
        document.getElementById("cm").value = (num * 248832).toFixed(2);
    }
}
function cor_action(){
    calculator(parseFloat(document.getElementById("cor").value), 1);
}
function letch_action(){
    calculator(parseFloat(document.getElementById("letch").value) / 2, 2);
}
function eifa_action(){
    calculator(parseFloat(document.getElementById("eifa").value) / 10, 3);
}
function saha_action(){
    calculator(parseFloat(document.getElementById("saha").value) / 30, 4);
}
function hin_action(){
    calculator(parseFloat(document.getElementById("hin").value) / 60, 5);
}
function hisaron_action(){
    calculator(parseFloat(document.getElementById("hisaron").value) / 100, 6);
}
function kab_action(){
    calculator(parseFloat(document.getElementById("kab").value) / 180, 7);
}
function log_action(){
    calculator(parseFloat(document.getElementById("log").value) / 720, 8);
}
function rviait_action(){
    calculator(parseFloat(document.getElementById("rviait").value) / 2880, 9);
}
function egg_action(){
    calculator(parseFloat(document.getElementById("egg").value) / 4320, 10);
}
function zait_action(){
    calculator(parseFloat(document.getElementById("zait").value) / 8640, 11);
}
function mesora_action(){
    calculator(parseFloat(document.getElementById("mesora").value) / 25920, 12);
}
function kortov_action(){
    calculator(parseFloat(document.getElementById("kortov").value) / 46080, 13);
}
function cm_action(){
    calculator(parseFloat(document.getElementById("cm").value) / 248832, 14);
}