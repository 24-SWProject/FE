import heic2any from "heic2any";
import * as S from "../styles/pages/Profile.style";
import { useForm } from "react-hook-form";
import Close from "./components/Close";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getGroupProfile, updateGroupProfile } from "../api/groupcrud";

export default function ProfileSet() {
    const [profileImageFile, setProfileImageFile] = useState(null);
    const [defaultData, setDefaultData] = useState(null);
    const [isFormValid, setIsFormValid] = useState(false);
    const navigate = useNavigate();

    const schema = yup.object().shape({
        nickname: yup.string().min(2).max(8).nullable(),
        datingDate: yup.date().max(new Date()).nullable(),
    });

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
    });

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

    useEffect(() => {
        if (defaultData) {
            setValue("nickname", defaultData.nickName || "");
            setValue("datingDate", defaultData.anniversary || "");
        }
    }, [defaultData, setValue]);

    useEffect(() => {
        const isNicknameChanged = watch("nickname") !== defaultData?.nickName;
        const isDateChanged = watch("datingDate") !== defaultData?.anniversary;
        const isImageChanged = !!profileImageFile;

        setIsFormValid(isNicknameChanged || isDateChanged || isImageChanged);
    }, [watch, profileImageFile, defaultData]);

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.type === "image/heic") {
                // HEIC 파일 변환
                try {
                    const convertedBlob = await heic2any({
                        blob: file,
                        toType: "image/jpeg", // 변환할 포맷
                    });

                    // Blob을 File로 변환
                    const convertedFile = new File(
                        [convertedBlob],
                        file.name.replace(/\.heic$/i, ".jpeg"),
                        { type: "image/jpeg" }
                    );

                    setProfileImageFile(convertedFile);
                } catch (error) {
                    console.error("HEIC 변환 실패:", error);
                    alert("HEIC 파일 변환에 실패했습니다. 다른 이미지 포맷을 사용해주세요.");
                }
            } else {
                // HEIC가 아닌 경우 그대로 사용
                setProfileImageFile(file);
            }
        }
    };

    const convertBase64ToFile = (base64String, fileName) => {
        const byteString = atob(base64String.split(",")[1]);
        const mimeString = base64String.split(",")[0].split(":")[1].split(";")[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);

        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new File([ab], fileName, { type: mimeString });
    };

    const onSubmit = async (data) => {
        try {
            let formattedDate = defaultData.anniversary;
            if (data.datingDate && data.datingDate !== defaultData.anniversary) {
                const localDate = new Date(data.datingDate);
                const kstDate = new Date(localDate.getTime() + 9 * 60 * 60 * 1000);
                formattedDate = kstDate.toISOString().split("T")[0];
            }

            let profileImgToSend = profileImageFile;
            if (!profileImgToSend && defaultData.profileImg) {
                profileImgToSend = convertBase64ToFile(
                    `data:image/jpeg;base64,${defaultData.profileImg}`,
                    "defaultProfile.jpg"
                );
            }

            const updatedData = {
                nickName: data.nickname !== defaultData.nickName ? data.nickname : defaultData.nickName,
                anniversary: formattedDate,
                profileImg: profileImgToSend,
            };

            console.log("전송 데이터:", updatedData);
            await updateGroupProfile(updatedData);
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
            <input
                id="imageUpload"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
            />

            <S.FormContainer onSubmit={handleSubmit(onSubmit)}>
                <S.InputField placeholder="Couple Nickname" {...register("nickname")} />
                {errors.nickname && <S.ErrorMessage>{errors.nickname.message}</S.ErrorMessage>}

                <label htmlFor="datingDate">사귄 날짜를 입력해주세요</label>
                <S.InputField id="datingDate" type="date" {...register("datingDate")} />
                {errors.datingDate && <S.ErrorMessage>{errors.datingDate.message}</S.ErrorMessage>}

                <S.SetButton type="submit" disabled={!isFormValid}>
                    수정하기
                </S.SetButton>
            </S.FormContainer>
        </S.ProfileContainer>
    );
}
