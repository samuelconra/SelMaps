const express = require('express');
const cors = require('cors');
const pool = require('./config_db');
const app = express();

// node server.js
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
            geometry: JSON.parse(row.coord),
            properties: {
                id: row.id,
                nombre: row.nombre,
                estrellas: row.estrellas,
                direccion: row.direccion,
                precio: row.precio,
                mascotas: row.mascotas,
                estacionamiento: row.estacionamiento
            }
        }))
    };
    res.json(geojson);
});

// GET ATRACTIONS
app.get('/attractions', async (req, res) => {
    const result = await pool.query(`
            SELECT id, nombre, descripcion, direccion, horario, discapacidad, 
            ST_AsGeoJSON(coordenadas) AS coord FROM Atracciones;
    `);

    const geojson = {
        type: "FeatureCollection",
        features: result.rows.map(row => ({
            type: "Feature",
            geometry: JSON.parse(row.coord),
            properties: {
                id: row.id,
                nombre: row.nombre,
                descripcion: row.descripcion,
                direccion: row.direccion,
                horario: row.horario,
                discapacidad: row.discapacidad
            }
        }))
    };
    res.json(geojson);
});

// GET PARKS
app.get('/parks', async (req, res) => {
    const result = await pool.query(`
        SELECT id, nombre, direccion, descripcion, accesible, ST_AsGeoJSON(coordenadas) AS coord FROM Parques;
    `);

    const geojson = {  
        type: "FeatureCollection",
        features: result.rows.map(row => ({
            type: "Feature",
            geometry: JSON.parse(row.coord), 
            properties: {
                id: row.id,
                nombre: row.nombre,
                direccion: row.direccion,
                descripcion: row.descripcion,
                accesible: row.accesible
            }
        }))
    };
    res.json(geojson);
});
  
app.listen(PORT, () => console.log(`API en http://${HOST}:${PORT}`));