import * as S from "../styles/pages/Profile.style";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";
import { getGroupProfile, updateGroupProfile } from "../api/groupcrud";

export default function ProfileSet() {
    const [profileImageFile, setProfileImageFile] = useState(null); // 새로 선택된 파일
    const [compressedImage, setCompressedImage] = useState(null); // 압축된 파일
    const [defaultData, setDefaultData] = useState(null); // 서버에서 받은 기본 데이터
    const navigate = useNavigate();

    // Base64 데이터를 Blob으로 변환
    const convertBase64ToBlob = (base64String) => {
        const byteString = atob(base64String.split(",")[1]);
        const mimeString = base64String.split(",")[0].split(":")[1].split(";")[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);

        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ab], { type: mimeString });
    };

    // 초기 데이터 가져오기
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

    // 이미지 파일 변경 처리
    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const options = {
                    maxSizeMB: 1, // 1MB 이하로 압축
                    maxWidthOrHeight: 1024, // 최대 크기 1024px
                    useWebWorker: true,
                };
                const compressedFile = await imageCompression(file, options);
                console.log("압축된 파일:", compressedFile);

                setProfileImageFile(file); // 원본 파일 저장
                setCompressedImage(compressedFile); // 압축된 파일 저장
            } catch (error) {
                console.error("이미지 압축 실패:", error);
            }
        } else {
            console.error("파일 선택에 실패했습니다.");
        }
    };

    const onSubmit = async (event) => {
        event.preventDefault(); // 기본 폼 제출 동작 방지

        try {
            const formData = new FormData();
            const nickname = event.target.nickname.value || defaultData.nickName;
            const anniversary = event.target.datingDate.value || defaultData.anniversary;

            formData.append("nickName", nickname);
            formData.append("anniversary", anniversary);

            if (compressedImage) {
                // 새로 선택된 사진이 있을 경우 압축된 사진 사용
                formData.append("profileImg", compressedImage);
            } else if (defaultData.profileImg) {
                // 기존 base64 이미지를 blob으로 변환하여 사용
                const blobImage = convertBase64ToBlob(`data:image/jpeg;base64,${defaultData.profileImg}`);
                formData.append("profileImg", blobImage, "defaultProfile.jpg");
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
