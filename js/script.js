let messageBox = document.getElementById("message-box");
let nameBox = document.getElementById("name-box");
let distanceBox = document.getElementById("distance-box");
let ageBox = document.getElementById("age-box");
let submitButton = document.getElementById("submit");
let refreshButton = document.getElementById("refresh");
let ticketName = document.getElementById("ticket-name");
let ticketType = document.getElementById("ticket-type");
let ticketCarriage = document.getElementById("ticket-carriage");
let ticketCode = document.getElementById("ticket-code");
let ticketPrice = document.getElementById("ticket-price");
let ticketFull = document.getElementById("ticket-full");
let distance = new Number;
const KM_COST = new Number(0.21);
const RATE = "La tariffa è di " + KM_COST + "€ al chilometro. Inoltre viene applicato uno sconto del 20% per i minorenni e del 40% per gli over 60";
let age = new String;
let userName = new String;
let ticketCost = new Number;

submit.addEventListener("click", start);
refresh.addEventListener("click", clean);

function start(){

    messageBox.innerHTML = RATE + "<br><br>Per favore, inserisci i tuoi dati";
    
    document.getElementsByClassName("row")[1].classList.remove("d-none");

    refreshButton.classList.remove("d-none");
    submitButton.textContent = "Calcola";
    submitButton.removeEventListener("click", start);
    submitButton.addEventListener("click", checkInput);
}

function checkInput(){

    distance = getPositiveInteger();
    userName = getString();
    
    if(Number.isNaN(distance) && userName.localeCompare("#error") == 0)
        messageBox.innerHTML = RATE + "<br><br>Errore. Inserisci valori validi";
    else if(Number.isNaN(distance))
        messageBox.innerHTML = RATE + "<br><br>Errore. La distanza deve essere un numero intero positivo. Riprova";
    else if(userName.localeCompare("#error") == 0)
        messageBox.innerHTML = RATE + "<br><br>Errore. Il nome può contenere soltanto lettere. Riprova";
    else
        showResult();

    clean();
}

function showResult(){

    let code = new Number;
    let carriage = new Number;

    if(!ticketFull.classList.contains("d-none"))
        ticketFull.classList.add("d-none");

    code = Math.floor(Math.random() * 10001) + 90000;
    carriage = Math.floor(Math.random() * 9) + 1;

    ticketCost = KM_COST * distance;

    age = ageBox.value;
    switch(age){

        case "adulto":
            ticketCost = ticketCost.toFixed(2);
            break;

        case "bambino":
            ticketFull.textContent = ticketCost + "€";
            ticketFull.classList.remove("d-none");
            ticketCost = ((ticketCost * 80) / 100).toFixed(2);
            break;

        case "over":
            ticketFull.textContent = ticketCost + "€";
            ticketFull.classList.remove("d-none");
            ticketCost = ((ticketCost * 60) / 100).toFixed(2);
            break;
    }

    messageBox.textContent = "Ecco il preventivo del tuo biglietto, " + userName + ". Grazie per averci scelto!"
    document.getElementsByClassName("row")[3].classList.remove("d-none");

    ticketName.textContent = userName;
    ticketType.textContent = age;
    ticketPrice.textContent = ticketCost + "€";
    ticketCode.textContent = code;
    ticketCarriage.textContent = carriage;
}

function getPositiveInteger(){

    let x = new Number(distanceBox.value);

    if(Number.isSafeInteger(+x) && x > 0)
        return x;
    else
        return NaN;
}

function getString(){

    let letters = new String;
    let s = new String;

    letters = /^[A-Z a-z]+$/;
    s = nameBox.value;

    if(!s.match(letters))
        s = "#error";

    return s;
}

function clean(){
    nameBox.value = distanceBox.value = "";
    ageBox.value = "adulto";
}