// Node.js webserver Steuerung

// init vewendete Pakete
const express = require('express');
const app = express();
const path = require('path');
const { send } = require('process');
var fs = require('fs');

app.use(express.static(path.join(__dirname, 'public')));

const bodyParser = require('body-parser');
app.use( bodyParser.json() );


////////////// Daten Einlesen \\\\\\\\\\\\\\\
var automatic = true;
var min_wintergarten = 28;
var max_wohnraum = 25;
var differenz = 5;

var active = [];
var deactive = [];

var temp_wohnraum = 0.00;
var temp_wintergarten = 0.00;


function temperaturenEinlesen(){
    var path1 ="/sys/bus/w1/devices/28-3c01f095db34/temperature"
    // "temperatursensor wintergarten"
    var path2 ="/sys/bus/w1/devices/28-0120632415ab/temperature"
    //"temperatursensor innenraum"

    try {
        temp_wintergarten = fs.readFileSync(path1, 'utf8')/1000;
        temp_wohnraum = fs.readFileSync(path2, 'utf8')/1000;
        console.log(temp_wohnraum);
        console.log(temp_wintergarten);
        return null;
    } catch(e) {
        console.log(e);
        return null;
    }
}


/////////// Daten in Datei/Datenbank speichern \\\\\\\\\
//https://www.it-swarm.com.de/de/javascript/einfache-moeglichkeit-json-unter-node.js-zu-speichern/1071101333/



/////////// HTTP Requests erstellen \\\\\\\\\\\

app.get("/data", function(req, res) {
    res.format({
        "application/json": function(){
            res.send(dataToJson())
        }
    })
})

function dataToJson(){
    temperaturenEinlesen()
    return {"automatic":automatic, "min_wintergarten":min_wintergarten, "max_wohnraum":max_wohnraum,
        "differenz":differenz, "temp_wohnraum": temp_wohnraum, "temp_wintergarten": temp_wintergarten};
}

app.get("/temps", function(req, res) {
    res.format({
        "application/json": function(){
            res.send(tempsToJson())
        }
    })
})

function tempsToJson(){
    return {"active": active, "deactive": deactive};
}

app.post("/data", function(req, res) {
    //TODO Sicherheitscheck ob Werte Sinn ergeben wenn nicht code 400 zurückgeben

    console.log(req.body.differenz);
    console.log(req.body.automatic);
    console.log(req.body.min_wintergarten);
    console.log(req.body.max_wohnraum);

    automatic = req.body.automatic;
    differenz = req.body.differenz;
    min_wintergarten = req.body.min_wintergarten;
    max_wohnraum = req.body.max_wohnraum;

    res.sendStatus(200);
})

//////////unused manuell change posts   falls freigabe im internet entfernen!
app.post("/automatic/on", function(req, res){
    automatic = true;
    res.sendStatus(200);
})

app.post("/automatic/off", function(req, res){
    automatic = false;
    res.sendStatus(200);
})

app.post("min_wintergarten/:temp", function(req, res){
    if(req.params["temp"] >15 && req.params["temp"]<50){
        min_wintergarten = req.params["temp"];
        res.sendStatus(200);
    } else{
        req.sendStatus(400);
    }
})

app.post("max_haus/:temp", function(req, res){
    if(req.params["temp"] >15 && req.params["temp"]<50){
        max_wohnraum = req.params["temp"];
        res.sendStatus(200);
    } else{
        req.sendStatus(400);
    }
})

app.post("differenz/:temp", function(req, res){
    if(req.params["temp"] >0){
        differenz = req.params["temp"];
        res.sendStatus(200);
    } else{
        req.sendStatus(400);
    }
})


//////////GIPO STEUERUNG \\\\\\\\\\\\
var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var luefter = new Gpio(17, 'out'); //use GPIO pin 17, and specify that it is output


async function steuerung(){
    if (automatic){
        temperaturenEinlesen()
        console.log("Temp wintergarten: " + temp_wintergarten + " Temp Wohnraum: " + temp_wohnraum)
        if(temp_wintergarten > min_wintergarten && temp_wohnraum < max_wohnraum){
            luefter.writeSync(0);
            const date = new Date().toString();
            active += ["AN: " + date.substring(0,21) + " Mode: auto; Außen: "
            + (Math.round(temp_wintergarten * 10) / 10) + "; Innen: " + (Math.round(temp_wohnraum * 10) / 10)
            + "<br/>"];
        }
        else {
            luefter.writeSync(1);
            const date = new Date().toString();
            active += ["AUS: " + date.substring(0,21) + " Mode: auto; Außen: "
            + (Math.round(temp_wintergarten * 10) / 10) + "; Innen: "
            + (Math.round(temp_wohnraum * 10) / 10) + "<br/>"];
        }
    }
}

setInterval(steuerung, 60000);

app.post("/man/off", function(req, res){
    luefter.write(1);
    const date = new Date().toString();
    active += ["AUS: " + date.substring(0,21) + " Mode: man; Außen: " + (Math.round(temp_wintergarten * 10) / 10)
    + "; Innen: "
    + (Math.round(temp_wohnraum * 10) / 10) + "<br/>"];
    res.sendStatus(200);
})
app.post("/man/on", function(req, res){
    luefter.write(0);
    const date = new Date().toString();
    active += ["AN: " + date.substring(0,21) + " Mode: man; Außen: " + (Math.round(temp_wintergarten * 10) / 10)
    + ", Innen: "
    + (Math.round(temp_wohnraum * 10) / 10) + "<br/>"];
    res.sendStatus(200);
})




/////////// Server initialisieren \\\\\\\\\\\\
const port = 3000;
app.listen(port, () => {
    console.log(`App listening at http://localhost: ${port}`);
});





