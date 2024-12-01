import { useState, useEffect } from "react";
import * as S from "../../styles/components/Dday.Style";
import { getGroupProfile, getGroupAnniv } from "../../api/groupcrud";

export default function DdayComponent() {
    const [profile, setProfile] = useState(null); // 그룹 프로필 데이터
    const [anniversaryData, setAnniversaryData] = useState(null); // 기념일 데이터
    const [error, setError] = useState(null); // 에러 상태

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 그룹 프로필 조회
                const profileData = await getGroupProfile();
                setProfile(profileData);

                // 그룹 기념일 조회
                const annivData = await getGroupAnniv();
                setAnniversaryData(annivData);
            } catch (err) {
                console.error("데이터 가져오기 실패:", err);
                setError("데이터를 불러오는 데 실패했습니다.");
            }
        };

        fetchData();
    }, []);

    if (error) {
        return <p>{error}</p>; // 에러 메시지 표시
    }

    if (!profile || !anniversaryData) {
        return <p>로딩 중...</p>; // 로딩 상태 표시
    }

    return (
        <S.DdayContainer>
            {/* 프로필 이미지 */}
            <S.CoupleImage>
                <img
                    src={`data:image/jpeg;base64,${profile.profileImg}`} // Base64 데이터 렌더링
                    alt={`${profile.nickName}의 프로필`}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} // 이미지 스타일링
                />
            </S.CoupleImage>
            {/* 기념일 정보 */}
            <S.DdayInfo>
                <h2>{profile.nickName || "별명 없음"}</h2>
                <p>D +{anniversaryData.currentDay || 0}❤️</p>
            </S.DdayInfo>
        </S.DdayContainer>
    );
}
