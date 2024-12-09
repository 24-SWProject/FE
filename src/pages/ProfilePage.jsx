import * as S from "../styles/pages/Profile.style";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getGroupProfile, updateGroupProfile } from "../api/groupcrud";

export default function ProfileSet() {
    const [profileImageFile, setProfileImageFile] = useState(null);
    const [resizedImage, setResizedImage] = useState(null);
    const [defaultData, setDefaultData] = useState(null);
    const navigate = useNavigate();

    // 기본 프로필 데이터 가져오기
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

    // 이미지 선택 및 리사이즈 처리
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.src = e.target.result;
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");

                    // 최대 크기를 설정 (예: 1024x1024)
                    const maxWidth = 1024;
                    const maxHeight = 1024;
                    let width = img.width;
                    let height = img.height;

                    if (width > maxWidth || height > maxHeight) {
                        if (width > height) {
                            height *= maxWidth / width;
                            width = maxWidth;
                        } else {
                            width *= maxHeight / height;
                            height = maxHeight;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, 0, width, height);

                    canvas.toBlob(
                        (blob) => {
                            console.log("리사이즈된 이미지 Blob:", blob);
                            setResizedImage(blob); // 리사이즈된 Blob 저장
                        },
                        file.type,
                        0.8 // 품질 설정 (0.0 ~ 1.0)
                    );
                };
            };
            reader.readAsDataURL(file);
            setProfileImageFile(file); // 원본 파일 저장
        }
    };

    // 폼 제출 처리
    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            const formData = new FormData();
            const nickname = event.target.nickname.value || defaultData.nickName;
            const anniversary = event.target.datingDate.value || defaultData.anniversary;

            formData.append("nickName", nickname);
            formData.append("anniversary", anniversary);

            // 리사이즈된 이미지가 있으면 사용, 없으면 원본 이미지 사용
            if (resizedImage) {
                formData.append("profileImg", resizedImage, "resizedImage.jpg");
            } else if (profileImageFile) {
                formData.append("profileImg", profileImageFile);
            }

            console.log("전송 데이터:", Object.fromEntries(formData.entries()));

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
