// Node.js webserver Steuerung

// init vewendete Pakete
const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));



////////////// Daten Einlesen \\\\\\\\\\\\\\\



/////////// Daten in Datei/Datenbank speichern \\\\\\\\\


/////////// HTTP Requests erstellen \\\\\\\\\\\








/////////// Server initialisieren \\\\\\\\\\\\
const port = 3000;
app.listen(port, () => {
    console.log(`App listening at http://localhost: ${port}`);
});