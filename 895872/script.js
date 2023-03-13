function Event1(){
    let num1 = document.getElementById("TextBox1").value,
        num2 = document.getElementById("TextBox2").value,
        num3 = ((num1 / num2).toFixed(5)).toString();
    if(num3 === "NaN" || num3 === "Infinity"){
        num3 = 0.00000.toFixed(5)
    }
    document.getElementById("label_showing_kd").innerHTML = num3;
}