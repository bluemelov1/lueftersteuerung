# lueftersteuerung
Websteuerung eines Ventilators mit Thermosteuerung


# Website
Starten des Servers mit:
$ node app.js

Benötigte Bibliotheken:
-express


installieren mit:
npm install -s ${biblothek}



# Ansteuerung der GPIOs mit node.js für Lüfteraktivierung
https://www.w3schools.com/nodejs/nodejs_raspberrypi_webserver_websocket.asp



Python Script zum ansteuern des Lüfters aus app.js aufrufen und Parameter als Argumente übergeben
arg0 => 0 = aus; 1 = ein (automatik); 2 = ein(manuell)
arg1 => temp innen 
arg2 => temp außen

