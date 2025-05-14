import * as turf from '@turf/turf';

export function addAttractionsLayer(map, data) {
    if (map.getSource('attractions')) return;

    const attractions = turf.featureCollection(data.features);

    map.addSource('attractions-source', {
        type: 'geojson',
        data: attractions
    });

    map.addLayer({
        id: 'attractions-layer',
        type: 'circle',
        source: 'attractions-source',
        paint: {
            'circle-color': '#ffca27',
            'circle-radius': 6,
            'circle-stroke-width': 2,
            'circle-stroke-color': '#ffffff',
            'circle-emissive-strength': 0.6
        },
    });
}
