CREATE TABLE Parques (
    id SERIAL PRIMARY KEY,
    nombre TEXT,
    direccion TEXT,
    accesible BOOLEAN,
    coordenadas GEOMETRY(Polygon, 4326)
);

CREATE TABLE Hoteles (
    id SERIAL PRIMARY KEY,
    nombre TEXT,
    estrellas INT,
    direccion TEXT,
    precio NUMERIC,
    mascotas BOOLEAN,
    estacionamiento BOOLEAN,
    coordenadas GEOMETRY(Point, 4326)
);

CREATE TABLE Atracciones (
    id SERIAL PRIMARY KEY,
    nombre TEXT,
    descripcion TEXT,
    direccion TEXT,
    horario TEXT,
    discapacidad BOOLEAN,
    coordenadas GEOMETRY(Point, 4326)
);