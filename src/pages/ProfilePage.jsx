import * as S from "../styles/pages/Profile.style";
import { useForm } from "react-hook-form";
import Close from "./components/Close";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getGroupProfile, updateGroupProfile } from "../api/groupcrud";

export default function ProfileSet() {
    const [profileImageFile, setProfileImageFile] = useState(null);
    const [defaultData, setDefaultData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profileData = await getGroupProfile();
                setDefaultData(profileData || { nickName: null, anniversary: null, profileImg: null });
            } catch (error) {
                console.error("프로필 조회 실패:", error);
            }
        };

        fetchProfile();
    }, []);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log("선택된 파일:", file);
            setProfileImageFile(file);
        } else {
            console.error("파일 선택에 실패했습니다.");
        }
    };

    const onSubmit = async (event) => {
        event.preventDefault(); // 기본 폼 제출 동작 방지

        if (!profileImageFile && !defaultData) {
            alert("업로드할 파일이 없습니다.");
            return;
        }

        try {
            // FormData 생성
            const formData = new FormData();

            // 닉네임 및 날짜 추가
            const nickname = event.target.nickname.value || defaultData.nickName;
            const anniversary = event.target.datingDate.value || defaultData.anniversary;

            formData.append("nickName", nickname);
            formData.append("anniversary", anniversary);

            // 이미지 파일 추가
            if (profileImageFile) {
                formData.append("profileImg", profileImageFile);
            }

            console.log("전송 데이터:", Object.fromEntries(formData.entries()));

            // 서버로 전송
            await updateGroupProfile(formData);

            navigate("/main");
        } catch (error) {
            console.error("프로필 수정 실패:", error);
        }
    };

    if (!defaultData) {
        return <p>로딩 중...</p>;
    }

    return (
        <S.ProfileContainer>
            <Close />
            <S.Title>커플 프로필 설정</S.Title>
            <S.CoupleImage onClick={() => document.getElementById("imageUpload").click()}>
                {profileImageFile ? (
                    <img
                        src={URL.createObjectURL(profileImageFile)}
                        alt="프로필 이미지"
                        style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                    />
                ) : defaultData.profileImg ? (
                    <img
                        src={`data:image/jpeg;base64,${defaultData.profileImg}`}
                        alt="기본 프로필 이미지"
                        style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                    />
                ) : (
                    <span>이미지 선택</span>
                )}
            </S.CoupleImage>
            <input id="imageUpload" type="file" accept="image/*" style={{ display: "none" }} onChange={handleImageChange} />

            <S.FormContainer onSubmit={onSubmit}>
                <S.InputField name="nickname" placeholder="Couple Nickname" defaultValue={defaultData.nickName || ""} />
                <label htmlFor="datingDate">사귄 날짜를 입력해주세요</label>
                <S.InputField name="datingDate" id="datingDate" type="date" defaultValue={defaultData.anniversary || ""} />
                <S.SetButton type="submit">수정하기</S.SetButton>
            </S.FormContainer>
        </S.ProfileContainer>
    );
}
