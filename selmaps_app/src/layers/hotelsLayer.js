import * as turf from '@turf/turf';

export function addHotelsLayer(map, data) {
    if (map.getSource('hotels')) return;

    const hotels = turf.featureCollection(data.features);

    map.addSource('hotels-source', {
        type: 'geojson',
        data: hotels
    });

    map.addLayer({
        id: 'hotels-layer',
        type: 'circle',
        source: 'hotels-source',
        paint: {
            'circle-color': '#4264fb',
            'circle-radius': 6,
            'circle-stroke-width': 2,
            'circle-stroke-color': '#ffffff',
            'circle-emissive-strength': 0.6
        },
    });
}
