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



//Initiale Daten Abfragen 
window.onload = function () {

    anzeige_differenz = document.getElementById("diffferenz");
    anzeige_automatik = document.getElementById("automatic");
    anzeige_max_wohnraum = document.getElementById("max_temp_inside");
    anzeige_min_wintergarten = document.getElementById("min_temp_outside");

    const xhttp = new XMLHttpRequest();
    xhttp.onload = function (){
        let json = JSON.parse(this.response);
        console.log(json);
        anzeige_automatik.checked = json["automatic"];
        anzeige_differenz.value = json["differenz"];
        anzeige_max_wohnraum.value = json["max_wohnraum"];
        anzeige_min_wintergarten.value = json["min_wintergarten"];
        //temperaturanzeigen mit abfragen 

    }
    xhttp.open("GET", "data");
    xhttp.send();
}






//Modi: Automatik und Manuell
//Manuell -> On / off
//Automatik -> min_wintergarten  &&  max_wohnraum