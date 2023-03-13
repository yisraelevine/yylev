translator = {
    "א": 1,
    "ב": 2,
    "ג": 3,
    "ד": 4,
    "ה": 5,
    "ו": 6,
    "ז": 7,
    "ח": 8,
    "ט": 9,
    "י": 10,
    "כ": 20,
    "ך": 20,
    "ל": 30,
    "מ": 40,
    "ם": 40,
    "נ": 50,
    "ן": 50,
    "ס": 60,
    "ע": 70,
    "פ": 80,
    "ף": 80,
    "צ": 90,
    "ץ": 90,
    "ק": 100,
    "ר": 200,
    "ש": 300,
    "ת": 400,
}
let letter
function makeGim(){
    let num = 0;
    // getting the input from html input
    let word = (document.getElementById("theInput").value).toString();
    // getting the first letter in "word"
    for (let i = 0; i < word.length; i++){
        letter = word[i];
        let num_1 = translator[letter];
        if(isFinite(num_1)) {
            num += parseInt(num_1);
        }
    }
    document.getElementById("output").innerText = num.toString();
}