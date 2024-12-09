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
            try {
                // HEIC 파일 변환
                let processedFile = file;
                if (/\.(heic)$/i.test(file.name)) {
                    const convertedBlob = await heic2any({ blob: file, toType: "image/jpeg" });
                    processedFile = new File([convertedBlob], file.name.replace(/\.heic$/i, ".jpeg"), {
                        type: "image/jpeg",
                    });
                }
    
                // 이미지 해상도 줄이기
                const resizedBlob = await resizeImage(processedFile);
                setProfileImageBlob(resizedBlob);
    
                // 미리보기 설정
                const reader = new FileReader();
                reader.onload = () => {
                    setProfileImage(reader.result); // Base64 URL
                };
                reader.readAsDataURL(resizedBlob);
            } catch (error) {
                console.error("이미지 처리 실패:", error);
                alert("이미지를 처리하는 데 실패했습니다.");
            }
        }
    };
    
    const resizeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const img = new Image();
                img.onload = () => {
                    const maxWidth = 1024; // 최대 너비
                    const maxHeight = 1024; // 최대 높이
                    let width = img.width;
                    let height = img.height;
    
                    // 비율 유지하며 크기 조정
                    if (width > height) {
                        if (width > maxWidth) {
                            height = Math.round((height * maxWidth) / width);
                            width = maxWidth;
                        }
                    } else {
                        if (height > maxHeight) {
                            width = Math.round((width * maxHeight) / height);
                            height = maxHeight;
                        }
                    }
    
                    const canvas = document.createElement("canvas");
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0, width, height);
    
                    canvas.toBlob(
                        (blob) => {
                            if (blob) {
                                resolve(blob);
                            } else {
                                reject(new Error("Blob 생성 실패"));
                            }
                        },
                        file.type // 원본 MIME 타입 유지
                    );
                };
                img.src = reader.result;
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
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
