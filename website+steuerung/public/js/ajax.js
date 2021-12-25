// Asynchrone Ajax serveranfragen und befehle
let temp_haus;
let temp_wintergarten;
let min_wintergarten;
let max_wohnraum;
let differenz;
let automatik;



//Initiale Daten Abfragen 
window.onload = function () {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function (){
        let json = JSON.parse(this.response);
        console.log(json);
    }
    xhttp.open("GET", "data");
    xhttp.send();
    
}


//Modi: Automatik und Manuell
//Manuell -> On / off
//Automatik -> min_wintergarten  &&  max_wohnraum