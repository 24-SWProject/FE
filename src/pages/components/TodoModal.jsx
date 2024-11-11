import { useState } from "react";
import * as S from "../../styles/components/TodoModal.style"

export default function Modal({ onClose, onAdd }) {
    const [date, setDate] = useState("");
    const [task, setTask] = useState("");

    const handleAdd = () => {
        if (date && task) {
            onAdd({ date, task });
            onClose();
        }
    };

    return (
        <S.ModalOverlay>
            <S.ModalContainer>
                <h3>할 일 추가하기</h3>
                <S.Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="날짜를 입력하세요"
                />
                <S.Input
                    type="text"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder="할 일을 입력하세요"
                />
                <S.ButtonContainer>
                    <S.Button onClick={handleAdd}>등록하기</S.Button>
                    <S.Button onClick={onClose}>취소</S.Button>
                </S.ButtonContainer>
            </S.ModalContainer>
        </S.ModalOverlay>
    );
}