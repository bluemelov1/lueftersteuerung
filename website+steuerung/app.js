// Node.js webserver Steuerung

// init vewendete Pakete
const express = require('express');
const app = express();
const path = require('path');
const { send } = require('process');
var fs = require('fs');
app.use(express.static(path.join(__dirname, 'public')));



////////////// Daten Einlesen \\\\\\\\\\\\\\\
var automatic = true;
var min_wintergarten = 23;
var max_wohnraum = 25;
var differenz = 5;


var temp_wohnraum = 7.34;
var temp_wintergarten = 5.232;


function temperaturenEinlesen(){
    // var path1 = "temperatursensor innnenraum"
    // var path2 = "temperatursensor wintergarten"

    try {  
        var data = fs.readFileSync('data.txt', 'utf8');
        console.log( parseFloat(data.toString()));   
        return data.toString(); 
    } catch(e) {
        console.log(e);
        return null;
    }
}

/// Logik für schaltungstechnik bei Automatikmodus hinzufügen 





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

app.post("/data", function(req, res) {
    
})

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

function dataToJson(){
    return {"automatic":automatic, "min_wintergarten":min_wintergarten, "max_wohnraum":max_wohnraum, "differenz":differenz, "temp_wohnraum": temp_wohnraum, "temp_wintergarten": temp_wintergarten};
}



// Requests Für Innentemperatur und Außentemperatur einfügen 






/////////// Server initialisieren \\\\\\\\\\\\
const port = 3000;
app.listen(port, () => {
    console.log(`App listening at http://localhost: ${port}`);
});