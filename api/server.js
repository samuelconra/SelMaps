const express = require('express');
const cors = require('cors');
const pool = require('./config_db');
const app = express();

// const HOST = '0.0.0.0';
const HOST = 'localhost';
const PORT = 3000; 

app.use(cors());

// GET HOTELS
app.get('/hotels', async (req, res) => {
    const result = await pool.query(`
            SELECT id, nombre, estrellas, direccion, precio, mascotas, estacionamiento, 
            ST_AsGeoJSON(coordenadas) AS coord FROM Hoteles;
    `);

    const geojson = {
        type: "FeatureCollection",
        features: result.rows.map(row => ({
            type: "Feature",
            geometry: JSON.parse(row.geom),
            properties: { id: row.id, nombre: row.nombre }
        }))
    };
    res.json(geojson);
});

// GET PARKS
app.get('/parks', async (req, res) => {
    const result = await pool.query(`
        SELECT id, nombre, accesible, ST_AsGeoJSON(coordenadas) AS coord FROM Parques;
    `);

    const geojson = {  
        type: "FeatureCollection",
        features: result.rows.map(row => ({
        type: "Feature",
        geometry: JSON.parse(row.geom), 
        properties: { id: row.id, nombre: row.nombre }
        }))
    };
    res.json(geojson);
});
  
app.listen(PORT, () => console.log(`API en http://${HOST}:${PORT}`));