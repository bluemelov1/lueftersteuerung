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
let man_on;
let man_off;

//Initiale Daten Abfragen 
window.onload = function () {

    anzeige_differenz = document.getElementById("diffferenz");
    anzeige_automatik = document.getElementById("automatic");
    anzeige_max_wohnraum = document.getElementById("max_temp_inside");
    anzeige_min_wintergarten = document.getElementById("min_temp_outside");

    anzeige_temp_wohnraum = document.getElementById("temp_inside");
    anzeige_temp_wintergarten = document.getElementById("temp_outside");
    man_off = document.getElementById("deactivate_button")
    man_on = document.getElementById("activate_button")

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

        man_off.disabled = json["automatic"];
        man_on.disabled = json["automatic"];
    }
    xhttp.open("GET", "data");
    xhttp.send();

    let temp_wintergarten;
    let temp_wohnraum;
    let active;
    let deactive;

    const xhttp2 = new XMLHttpRequest();
    xhttp2.onload = function (){
        let json = JSON.parse(this.response);
        console.log(json);
        active_temps = json["active_temps"];
        deactive_temps = json["deactive_temps"];
        document.getElementById("active").innerHTML = "Aktivierungszeiten: <br/>" + json["active"];
    }
    xhttp2.open("GET", "temps");
    xhttp2.send();



}


function datenSenden(){
    let min_wintergarten = anzeige_min_wintergarten.value;
    let max_wohnraum = anzeige_max_wohnraum.value;
    let differenz = anzeige_differenz.value;
    let automatik = anzeige_automatik.checked;
    let data = {};
    data["automatic"] = automatik;
    data["min_wintergarten"] = min_wintergarten;
    data["max_wohnraum"] = max_wohnraum;
    data["differenz"] = differenz;

    console.log(data);

    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        console.log(xhttp.response);
        console.log(xhttp.response === "OK");

        if(xhttp.response === "OK"){
            let anzeige = document.getElementById("transport");
            anzeige.style.backgroundColor = "lightgreen";
            anzeige.textContent = "Neue Werte erfolgreich übernommen";
            setTimeout(function(){
                let anzeige1 = document.getElementById("transport");
                anzeige1.style.backgroundColor = "";
                anzeige1.textContent = "";
            },5000);
        } else {
            let anzeige = document.getElementById("transport");
            anzeige.style.backgroundColor = "lightred";
            alert("Fehler bei der Übertragung")
            setTimeout(function(){
                location.reload();
            },5000);
        }
    }
    xhttp.open("POST", "data");
    xhttp.setRequestHeader('Content-type', "application/json");
    xhttp.send(JSON.stringify(data, null, ' '));
}

function on(){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        if(xhttp.response === "OK"){
            let anzeige = document.getElementById("transport");
            anzeige.style.backgroundColor = "lightgreen";
            anzeige.textContent = "Erfolgreich aktiviert";
            setTimeout(function(){
                let anzeige1 = document.getElementById("transport");
                anzeige1.style.backgroundColor = "";
                anzeige1.textContent = "";
            },5000);
        } else {
            let anzeige = document.getElementById("transport");
            anzeige.style.backgroundColor = "lightred";
            alert("Fehler bei der Übertragung")
            setTimeout(function(){
                location.reload();
            },5000);
        }
    }
    xhttp.open("POST", "man/on");
    xhttp.send(JSON.stringify(null, null, ' '));
}


function off(){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        if(xhttp.response === "OK"){
            let anzeige = document.getElementById("transport");
            anzeige.style.backgroundColor = "lightgreen";
            anzeige.textContent = "Erfolgreich deaktiviert";
            setTimeout(function(){
                let anzeige1 = document.getElementById("transport");
                anzeige1.style.backgroundColor = "";
                anzeige1.textContent = "";
            },5000);
        } else {
            let anzeige = document.getElementById("transport");
            anzeige.style.backgroundColor = "lightred";
            alert("Fehler bei der Übertragung")
            setTimeout(function(){
                location.reload();
            },5000);
        }
    }
    xhttp.open("POST", "man/off");
    xhttp.send(JSON.stringify(null, null, ' '));
}




//Modi: Automatik und Manuell
//Manuell -> On / off
//Automatik -> min_wintergarten  &&  max_wohnraum