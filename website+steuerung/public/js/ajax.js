// Asynchrone Ajax serveranfragen und befehle
let temp_haus;
let temp_wintergarten;
let min_wintergarten;
let max_wohnraum;
let differenz;
let automatik;

let anzeige_differenz;
let anzeige_min_wintergarten;
let anzeige_max_wohnraum;
let anzeige_automatik;
let anzeige_temp_wohnraum;
let anzeige_temp_wintergarten;


//Initiale Daten Abfragen 
window.onload = function () {

    anzeige_differenz = document.getElementById("diffferenz");
    anzeige_automatik = document.getElementById("automatic");
    anzeige_max_wohnraum = document.getElementById("max_temp_inside");
    anzeige_min_wintergarten = document.getElementById("min_temp_outside");

    anzeige_temp_wohnraum = document.getElementById("temp_inside");
    anzeige_temp_wintergarten = document.getElementById("temp_outside");

    const xhttp = new XMLHttpRequest();
    xhttp.onload = function (){
        let json = JSON.parse(this.response);
        console.log(json);
        anzeige_automatik.checked = json["automatic"];
        anzeige_differenz.value = json["differenz"];
        anzeige_max_wohnraum.value = json["max_wohnraum"];
        anzeige_min_wintergarten.value = json["min_wintergarten"];
        anzeige_temp_wohnraum.innerHTML = json["temp_wohnraum"];
        anzeige_temp_wintergarten.innerHTML = json["temp_wintergarten"];

    }
    xhttp.open("GET", "data");
    xhttp.send();
}


function datenSenden(){
    let mode = "on";
    if(anzeige_automatik.checked){
        mode = "on";
    } else {
        mode = "off";
    }
    const xhttp1 = new XMLHttpRequest();
    xhttp1.onload = function(){
        console.log(this.response);
    }
    xhttp1.open("POST", "automatic/" + mode);
    xhttp1.send();


    differenz = anzeige_differenz.value;
    const xhttp2 = new XMLHttpRequest();
    xhttp2.onload = function (){
        console.log(this.response);
    }
    xhttp2.open("POST", "differenz/"+differenz);
    xhttp2.send();

}





//Modi: Automatik und Manuell
//Manuell -> On / off
//Automatik -> min_wintergarten  &&  max_wohnraum