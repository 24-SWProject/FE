import * as S from "../styles/pages/Profile.style";
import { useForm } from 'react-hook-form';
import Close from "./components/Close";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfileSet() {
    const [profileImage, setProfileImage] = useState(null); // 선택된 이미지 URL 저장
    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log("제출된 데이터: ", data);
        console.log("선택된 이미지 파일: ", profileImage);
        navigate('/main');
    };

    const schema = yup.object().shape({
        nickname: yup
            .string()
            .min(2, "닉네임은 최소 2자 이상이어야 합니다.")
            .max(8, "닉네임은 최대 8자 입니다.")
            .required("닉네임은 필수 입력사항입니다."),

        datingDate: yup
            .date()
            .max(new Date(), "사귄 날짜는 현재 날짜보다 과거여야 합니다.")
            .required("사귄 날짜는 필수 입력사항입니다."),
    });

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange"
    });

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setProfileImage(URL.createObjectURL(file)); // 선택된 이미지 미리보기 URL 설정
        }
    };

    return (
        <S.ProfileContainer>
            <Close />
            <S.Title>커플 프로필 설정</S.Title>
            <S.CoupleImage onClick={() => document.getElementById("imageUpload").click()}>
                {profileImage ? (
                    <img src={profileImage} alt="프로필 이미지" style={{ width: "100%", height: "100%", borderRadius: "50%" }} />
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
                <S.InputField 
                    placeholder="Couple Nickname" 
                    {...register("nickname")}
                />
                {errors.nickname && <S.ErrorMessage>{errors.nickname.message}</S.ErrorMessage>}

                <S.InputField
                    type="date" 
                    placeholder="Dating Date (YYYY-MM-DD)" 
                    {...register("datingDate")}
                />
                {errors.datingDate && <S.ErrorMessage>{errors.datingDate.message}</S.ErrorMessage>}

                <S.SetButton type="submit" disabled={!isValid} >프로필 설정</S.SetButton>
            </S.FormContainer>
        </S.ProfileContainer>
    );
}
