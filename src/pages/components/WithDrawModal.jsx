import * as S from "../../styles/components/WithDrawModal.style";

export default function WithDrawModal({ message, onConfirm, onCancel }) {
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
