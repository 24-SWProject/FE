import { useState, useEffect } from 'react';
import { RightArrow } from "../styles/components/RightArrow";
import * as S from "../styles/pages/Keword.style";
import Close from "./components/Close";
import PlaceChoice from "./components/PlaceChoice";

export default function GuChoice() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        const weatherDescription = localStorage.getItem('weatherDescription');
        
        // weatherDescription에 따른 메시지를 매핑하는 객체
        const weatherMessages = {
            "맑음": "오늘 하늘이 맑고 쾌청합니다. 야외 활동을 하기에 좋은 날이네요!",
            "구름 조금": "하늘에 약간의 구름이 있지만, 대체로 맑고 쾌청한 날씨입니다. 가벼운 산책이나 야외 활동을 즐기기에 딱 좋아요.",
            "드문드문 구름": "곳곳에 구름이 떠있어 하늘이 아름답습니다. 야외에서 여유롭게 시간을 보내기 좋은 날이에요.",
            "구름 많음": "구름이 많아 하늘이 흐리지만, 산책이나 가까운 곳을 가기엔 무리가 없을 날씨입니다. 가벼운 외출을 즐겨보세요.",
            "소나기": "소나기가 내리고 있습니다. 갑작스런 비에 대비해 우산을 챙기세요. 실내 활동을 추천합니다.",
            "비": "비가 내리고 있습니다. 외출 시 우산을 꼭 챙기세요. 실내에서 여유롭게 시간을 보내는 것도 좋겠습니다.",
            "뇌우": "천둥과 번개가 동반된 폭우가 내리고 있습니다. 외출은 피하고, 안전한 실내에서 휴식을 취하는 것이 좋겠어요.",
            "눈": "눈이 내리고 있습니다. 눈을 밟으며 산책하거나 눈사람을 만들어 보는 건 어떨까요? 따뜻한 옷차림을 잊지 마세요.",
            "안개": "안개가 자욱합니다. 시야가 좁아질 수 있으니 외출 시 주의가 필요합니다. 실내 활동을 추천드려요."
        };

        if (weatherDescription && weatherMessages[weatherDescription]) {
            setMessage(weatherMessages[weatherDescription]);
        } else {
            setMessage("날씨 정보를 불러오는 중입니다.");
        }
    }, []);

    return (
        <S.KeywordContainer>
            <Close />
            <S.Description>{message}</S.Description>
            <S.Question>데이트 하고 싶은 구를 선택해주세요 :)</S.Question>
            <PlaceChoice />
            <RightArrow />
        </S.KeywordContainer>
    );
}
