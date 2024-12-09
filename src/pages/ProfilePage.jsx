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
    const [compressedImage, setCompressedImage] = useState(null);
    const [defaultData, setDefaultData] = useState(null);
    const navigate = useNavigate();

    const schema = yup.object().shape({
        nickname: yup.string().min(2).max(8).nullable(),
        datingDate: yup.date().max(new Date()).nullable(),
    });

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
    });

    // Base64 → File 변환 함수
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

    // 프로필 데이터 가져오기
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

    // 기본 데이터 설정
    useEffect(() => {
        if (defaultData) {
            setValue("nickname", defaultData.nickName || "");
            setValue("datingDate", defaultData.anniversary || "");
        }
    }, [defaultData, setValue]);

    // 이미지 파일 선택 및 압축 처리
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

                    const maxWidth = 1024;
                    const maxHeight = 1024;
                    let width = img.width;
                    let height = img.height;

                    // 이미지 크기 조정
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

                    // Blob 형태로 압축된 이미지 생성
                    canvas.toBlob(
                        (blob) => {
                            setCompressedImage(blob); // 압축된 이미지 저장
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

    const onSubmit = async (data) => {
        try {
            let formattedDate = defaultData.anniversary;
            if (data.datingDate) {
                const localDate = new Date(data.datingDate);
                const kstDate = new Date(localDate.getTime() + 9 * 60 * 60 * 1000);
                formattedDate = kstDate.toISOString().split("T")[0];
            }

            const formData = new FormData();

            // 텍스트 데이터 추가
            formData.append("nickName", data.nickname || defaultData.nickName);
            formData.append("anniversary", formattedDate);

            if (compressedImage) {
                formData.append("profileImg", compressedImage, "compressedImage.jpg");
            } else if (defaultData.profileImg) {
                const base64Image = `data:image/jpeg;base64,${defaultData.profileImg}`;
                const blobFile = convertBase64ToFile(base64Image, "defaultProfile.jpg");
                formData.append("profileImg", blobFile);
            }

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

            <S.FormContainer onSubmit={handleSubmit(onSubmit)}>
                <S.InputField placeholder="Couple Nickname" {...register("nickname")} />
                {errors.nickname && <S.ErrorMessage>{errors.nickname.message}</S.ErrorMessage>}

                <label htmlFor="datingDate">사귄 날짜를 입력해주세요</label>
                <S.InputField id="datingDate" type="date" {...register("datingDate")} />
                {errors.datingDate && <S.ErrorMessage>{errors.datingDate.message}</S.ErrorMessage>}

                <S.SetButton type="submit">수정하기</S.SetButton>
            </S.FormContainer>
        </S.ProfileContainer>
    );
}
