import * as turf from '@turf/turf';

export function addHotelsLayer(map, data) {
    if (map.getSource('hotels')) return;

    const hotels = turf.featureCollection(data.features);
    const buffers = turf.featureCollection(
        hotels.features.map(f => turf.buffer(f, 0.2, { units: 'kilometers' }))
    );

    map.addSource('hotels-buffer', {
        type: 'geojson',
        data: buffers
    });

    map.addLayer({
        id: 'hotels-buffer-layer',
        type: 'fill',
        source: 'hotels-buffer',
        paint: {
            'fill-color': '#4264fb',
            'fill-opacity': 0.5,
            'fill-emissive-strength': 0.5
        }
    });
    
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
            'circle-emissive-strength': 0.7
        },
    });
}
