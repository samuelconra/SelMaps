const express = require('express');
const cors = require('cors');
const pool = require('./config_db');
const app = express();

// const HOST = '0.0.0.0';
const HOST = 'localhost';
const PORT = 3000; 

app.use(cors());

app.get('/locations', async (req, res) => {
//   const result = await pool.query(`
//     SELECT id, nombre, ST_AsGeoJSON(ubicacion) AS geom FROM ubicaciones;
//   `);
//   const geojson = {
//     type: "FeatureCollection",
//     features: result.rows.map(row => ({
//       type: "Feature",
//       geometry: JSON.parse(row.geom),
//       properties: { id: row.id, nombre: row.nombre }
//     }))
//   };
//   res.json(geojson);
});

app.get('/zones', async (req, res) => {
//   const result = await pool.query(`
//     SELECT id, nombre, ST_AsGeoJSON(ubicacion) AS geom FROM zonas;
//   `);
//   const geojson = {  
//     type: "FeatureCollection",
//     features: result.rows.map(row => ({
//       type: "Feature",
//       geometry: JSON.parse(row.geom), properties: { id: row.id, nombre: row.nombre }
//     }))
//   };
//   res.json(geojson);
});
  

app.listen(PORT, () => console.log(`Servidor en http://${HOST}:${PORT}`));