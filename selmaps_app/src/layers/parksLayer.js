import * as turf from '@turf/turf';

export function addParksLayer(map, data) {
    if (map.getSource('parks')) return;

    const parks = turf.featureCollection(data.features);

    map.addSource('parks-source', {
        type: 'geojson',
        data: parks
    });

    map.addLayer({
        id: 'parks-layer',
        type: 'fill',
        source: 'parks-source',
        paint: {
            'fill-color': '#b2ffa5',
            'fill-opacity': 0.6,
            'fill-emissive-strength': 0.5,
        },
    });

    map.addLayer({
        id: 'outline',
        type: 'line',
        source: 'parks-source',
        layout: {},
        paint: {
            'line-color': '#000',
            'line-width': 3
        }
    });
}
