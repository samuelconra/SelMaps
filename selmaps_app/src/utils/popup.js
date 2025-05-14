import mapboxgl from 'mapbox-gl';

export const addPopUps = (map) => {
    const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });

    map.on('mouseenter', 'hotels-layer', e => {
        map.getCanvas().style.cursor = 'pointer';

        const coordinates = e.features[0].geometry.coordinates.slice();
        const properties = e.features[0].properties;
        console.log(properties.nombre);

        // Mostrar popup
        popup
            .setLngLat(coordinates)
            .setHTML(getHotelsPopupDesign(properties))
            .addTo(map);
    });

    map.on('mouseleave', 'hotels-layer', () => {
        map.getCanvas().style.cursor = '';
        const popups = document.getElementsByClassName('mapboxgl-popup');
        if (popups.length) popups[0].remove();
    });
}

const getHotelsPopupDesign = (properties) => {
    return `
        <h1>Hola</h1>
        <p>${properties.nombre}</p>
    `;
}