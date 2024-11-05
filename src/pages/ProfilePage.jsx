import * as S from "../styles/pages/Profile.style";
import { useForm } from 'react-hook-form';
import Close from "./components/Close";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export default function ProfileSet() {
    const onSubmit = (data) => {
        console.log("제출된 데이터: ",data);
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

    const {
        register,
        handleSubmit,
        formState: {errors, isValid},
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange"
    })

    return (
        <S.ProfileContainer>
            <Close />
            <S.Title>커플 프로필 설정</S.Title>
            <S.CoupleImage />
            <S.FormContainer onSubmit={handleSubmit(onSubmit)}>
                <S.InputField 
                    placeholder="Couple Nickname" 
                    {...register("nickname", { required: "닉네임을 입력해 주세요" })}
                />
                {errors.nickname && <S.ErrorMessage>{errors.nickname.message}</S.ErrorMessage>}

                <S.InputField
                    type="date" 
                    placeholder="Dating Date (YYYY-MM-DD)" 
                    {...register("datingDate", { required: "사귄 날짜를 입력해 주세요" })}
                />
                {errors.datingDate && <S.ErrorMessage>{errors.datingDate.message}</S.ErrorMessage>}
                <S.SetButton type="submit" disabled={!isValid}>프로필 설정</S.SetButton>
            </S.FormContainer>
            
        </S.ProfileContainer>
    );
}
