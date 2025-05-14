import mapboxgl from 'mapbox-gl';

export const addPopUps = (map) => {
    const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });

    const hotelEnter = e => {
        map.getCanvas().style.cursor = 'pointer';
        const coordinates = e.features[0].geometry.coordinates.slice();
        const properties = e.features[0].properties;

        popup
            .setLngLat(coordinates)
            .setHTML(getHotelsPopupDesign(properties))
            .addTo(map);
    };

    const hotelLeave = () => {
        map.getCanvas().style.cursor = '';
        popup.remove();
    };

    const attractionEnter = e => {
        map.getCanvas().style.cursor = 'pointer';
        const coordinates = e.features[0].geometry.coordinates.slice();
        const properties = e.features[0].properties;

        popup
            .setLngLat(coordinates)
            .setHTML(getAttractionsPopupDesign(properties))
            .addTo(map);
    };

    const attractionLeave = () => {
        map.getCanvas().style.cursor = '';
        popup.remove();
    };

    // No registrar aquí, solo retornar
    return {
        hotelEnter, hotelLeave,
        attractionEnter, attractionLeave
    };
};

const getHotelsPopupDesign = (props) => {
    return `
        <p class="indicator">Available</p>
        <div class="popup-hotel">
            <i class="fa-solid fa-hotel popupicon"></i>

            <div class="header">
                <h1>${props.nombre}</h1>

                <div class="stars">
                    <h2>${props.estrellas}</h2>
                    <i class="fa-solid fa-star"></i>
                </div>
            </div>

            <div class="content">
                <p>Address: <span>${props.direccion}</span></p>
                <p>Price: <span>${props.precio}</span></p>
            </div>

            <div class="icons">
                ${props.mascotas ? '<i class="fa-solid fa-dog"></i>' : ''}
                ${props.estacionamiento ? '<i class="fa-solid fa-square-parking"></i>' : ''}
            </div>
        </div>
    `
};

const getAttractionsPopupDesign = (props) => {
    return `
        <i class="fa-solid fa-wheelchair-move handicap"></i>
        <div class="popup-attraction">
            <i class="fa-solid fa-location-dot popupicon"></i>

            <h1>${props.nombre}</h1>

            <p>Description: <span>${props.descripcion}</span></p>
            <p>Address: <span>${props.direccion}</span></p>
            <p>Schedule: <span>${props.horario}</span></p>
        </div>
    `
};