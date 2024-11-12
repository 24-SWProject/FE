import { useEffect, useState } from 'react';
import { Map, Polygon, MapTypeControl, ZoomControl } from 'react-kakao-maps-sdk';

const PlaceChoice = () => {
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [polygons, setPolygons] = useState([]);

    useEffect(() => {
        fetch('./seoul_gson.geojson') // public 폴더 내 위치 확인
            .then((response) => response.json())
            .then((data) => {
                const loadedPolygons = data.features.map((feature) => {
                    const districtName = feature.properties.SIG_KOR_NM;
                    const path = feature.geometry.coordinates[0].map(
                        (coord) => ({ lat: coord[1], lng: coord[0] })
                    );
                    return { name: districtName, path };
                });
                setPolygons(loadedPolygons);
            })
            .catch((error) => console.error('Error loading GeoJSON data:', error));
    }, []);

    return (
        <div style={{ width: '90%', aspectRatio: '4/3', margin: 'auto', marginTop: '10px'}}>
            <Map
                appkey={import.meta.env.VITE_KAKAO_MAP_API}
                center={{ lat: 37.5665, lng: 126.9780 }}
                level={9} // mapLevel을 줌 레벨로 설정
                style={{ width: '100%', height: '100%' }}
            >
                {polygons.map((polygon, index) => (
                    <Polygon
                        key={index}
                        path={polygon.path}
                        strokeWeight={1}
                        strokeColor="#ccc"
                        strokeOpacity={0.8}
                        fillColor={selectedDistrict === polygon.name ? '#FFDA76' : '#fff'}
                        fillOpacity={0.5}
                        onClick={() => setSelectedDistrict(polygon.name)}
                    />
                ))}
                <MapTypeControl position={"TOPRIGHT"} />
                <ZoomControl position={"RIGHT"} />
            </Map>
            {selectedDistrict && <p style={{ color: 'white' }}>{selectedDistrict}</p>}
        </div>
    );
};

export default PlaceChoice;
