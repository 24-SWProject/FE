import * as S from "../styles/pages/Profile.style";
import { useForm } from "react-hook-form";
import Close from "./components/Close";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getGroupProfile, updateGroupProfile } from "../api/groupcrud"; // API 호출 함수

export default function ProfileSet() {
    const [profileImageFile, setProfileImageFile] = useState(null); // 선택된 이미지 파일 저장
    const [defaultData, setDefaultData] = useState(null); // 초기 데이터 저장
    const navigate = useNavigate();

    // 초기 데이터 가져오기
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profileData = await getGroupProfile(); // 그룹 프로필 조회
                setDefaultData(profileData || { nickName: null, anniversary: null, profileImg: null }); // 초기값 없으면 기본값 설정
                setProfileImageFile(null); // 초기 이미지 파일 상태
            } catch (error) {
                console.error("프로필 조회 실패:", error);
            }
        };

        fetchProfile();
    }, []);

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

    const { register, handleSubmit, setValue, formState: { errors, isValid } } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange"
    });

    // 초기 데이터 폼에 설정
    useEffect(() => {
        if (defaultData) {
            setValue("nickname", defaultData.nickName || ""); // 닉네임 기본값
            setValue("datingDate", defaultData.anniversary || undefined); // 날짜 기본값
        }
    }, [defaultData, setValue]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setProfileImageFile(file); // 선택된 이미지 파일 저장
        }
    };

    const onSubmit = async (data) => {
        try {
            // 날짜를 KST 기준으로 변환 (선택한 날짜가 없는 경우 이전 값 유지)
            let formattedDate = defaultData.anniversary;
            if (data.datingDate && data.datingDate !== defaultData.anniversary) {
                const localDate = new Date(data.datingDate);
                const kstDate = new Date(localDate.getTime() + 9 * 60 * 60 * 1000); // UTC+9로 변환
                formattedDate = kstDate.toISOString().split("T")[0]; // yyyy-MM-dd 형식으로 변환
            }
    
            // 전송할 데이터 객체 생성
            const updatedData = {
                nickName: data.nickname !== defaultData.nickName ? data.nickname : defaultData.nickName, // 닉네임 변경 시 업데이트, 그렇지 않으면 기존 값 유지
                anniversary: formattedDate, // 날짜 변경 시 업데이트, 그렇지 않으면 기존 값 유지
                profileImg: profileImageFile || defaultData.profileImg, // 새로운 이미지가 없으면 기존 이미지 유지
            };
    
            console.log("전송 데이터:", updatedData); // 디버깅용 데이터 확인
    
            await updateGroupProfile(updatedData); // 그룹 프로필 수정 API 호출
            console.log("그룹 프로필 수정 성공:", updatedData);
            navigate("/main");
        } catch (error) {
            console.error("프로필 수정 실패:", error);
        }
    };
    
    

    if (!defaultData) {
        return <p>로딩 중...</p>; // 초기 데이터 로딩 상태
    }

    return (
        <S.ProfileContainer>
            <Close />
            <S.Title>커플 프로필 설정</S.Title>
            <S.CoupleImage onClick={() => document.getElementById("imageUpload").click()}>
                {profileImageFile ? (
                    // 선택된 파일 미리보기
                    <img
                        src={URL.createObjectURL(profileImageFile)}
                        alt="프로필 이미지"
                        style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                    />
                ) : (
                    // 기본 프로필 이미지 표시
                    defaultData.profileImg ? (
                        <img
                            src={`data:image/jpeg;base64,${defaultData.profileImg}`}
                            alt="기본 프로필 이미지"
                            style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                        />
                    ) : (
                        <span>이미지 선택</span>
                    )
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

                <label htmlFor="datingDate">사귄 날짜를 입력해주세요</label>
                <S.InputField
                    id="datingDate"
                    type="date"
                    {...register("datingDate")}
                />

                {errors.datingDate && <S.ErrorMessage>{errors.datingDate.message}</S.ErrorMessage>}

                <S.SetButton type="submit" disabled={!isValid}>수정하기</S.SetButton>
            </S.FormContainer>
        </S.ProfileContainer>
    );
}