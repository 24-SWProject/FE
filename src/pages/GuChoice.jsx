import { useState, useEffect } from 'react';
import { Map, Polygon, MapTypeControl, ZoomControl } from 'react-kakao-maps-sdk';
import { RightArrow } from "../styles/components/RightArrow";
import * as S from "../styles/pages/Keword.style";
import Close from "./components/Close";
import { useNavigate } from 'react-router-dom';

export default function GuChoice() {
    const [message, setMessage] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [polygons, setPolygons] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const weatherDescription = localStorage.getItem('weatherDescription');

        // 날씨 설명에 따른 메시지 매핑 객체
        const weatherMessages = {
            "Clear": "오늘 하늘이 맑고 쾌청합니다. \n야외 활동을 하기에 좋은 날이네요!",
            "few clouds": "하늘에 약간의 구름이 있지만, 대체로 맑고 쾌청한 날씨입니다. \n가벼운 산책이나 야외 활동을 즐기기에 딱 좋아요.",
            "scattered clouds": "곳곳에 구름이 떠있어 하늘이 아름답습니다. \n야외에서 여유롭게 시간을 보내기 좋은 날이에요.",
            "Clouds": "구름이 있어 하늘이 흐리지만, 산책이나 가까운 곳을 가기엔 무리가 없을 날씨입니다. \n가벼운 외출을 즐겨보세요.",
            "shower rain": "소나기가 내리고 있습니다. \n갑작스런 비에 대비해 우산을 챙기세요. 실내 활동을 추천합니다.",
            "Rain": "비가 내리고 있습니다. 외출 시 우산을 꼭 챙기세요. \n실내에서 여유롭게 시간을 보내는 것도 좋겠습니다.",
            "Thunderstorm": "천둥과 번개가 동반된 폭우가 내리고 있습니다. \n외출은 피하고, 안전한 실내에서 휴식을 취하는 것이 좋겠어요.",
            "Snow": "눈이 내리고 있습니다. 눈을 밟으며 산책하거나 눈사람을 만들어 보는 건 어떨까요? \n따뜻한 옷차림을 잊지 마세요.",
            "Atmosphere": "안개가 자욱합니다. \n시야가 좁아질 수 있으니 외출 시 주의가 필요합니다. \n 실내 활동을 추천드려요.",
            "Extreme" : "오늘은 날씨가 매우 안 좋습니다. \n 데이트는 다음으로 미루는 게 어떨까요?"
        };

        setMessage(weatherMessages[weatherDescription] || "날씨 정보를 불러오는 중입니다.");
    }, []);

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

    const handleRightArrowClick = () => {
        if (selectedDistrict) {
            navigate("/keyword"); // 선택된 구가 있을 때만 이동
            localStorage.removeItem('weatherDescription');
        } else {
            alert("구를 선택해주세요.");
        }
    };

    return (
        <S.KeywordContainer>
            <Close />
            <S.Description>{message}</S.Description>
            <S.Question>데이트 하고 싶은 구를 선택해주세요 :) </S.Question>
            <div style={{ width: '90%', aspectRatio: '4/3', margin: '0 auto', marginTop: '10px'}}>
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
                            strokeColor="#888"
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
            <RightArrow onClick={handleRightArrowClick} />
        </S.KeywordContainer>
    );
}
