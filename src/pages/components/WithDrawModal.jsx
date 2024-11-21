import { useEffect } from "react";
import * as S from "../../styles/components/WithDrawModal.style";

export default function WithDrawModal({ message, onConfirm, onCancel }) {
    useEffect(() => {
        // 모달 열릴 때 스크롤 비활성화
        document.body.style.overflow = "hidden";
        return () => {
            // 모달 닫힐 때 스크롤 활성화
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <S.ModalOverlay>
            <S.ModalContainer>
                <p>{message}</p>
                <S.ButtonGroup>
                    <S.ModalButton cancel onClick={onCancel}>
                        취소
                    </S.ModalButton>
                    <S.ModalButton onClick={onConfirm}>
                        확인
                    </S.ModalButton>
                </S.ButtonGroup>
            </S.ModalContainer>
        </S.ModalOverlay>
    );
}
