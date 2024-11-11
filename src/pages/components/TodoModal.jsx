import { useState, useEffect } from "react";
import * as S from "../../styles/components/TodoModal.style";

export default function Modal({ onClose, onAdd, initialDate, existingTodo }) {
    const [date, setDate] = useState("");
    const [task, setTask] = useState("");

    // 오늘 날짜를 'YYYY-MM-DD' 형식으로 설정
    const today = new Date().toISOString().split("T")[0];

    useEffect(() => {
        if (existingTodo) {
            setDate(existingTodo.date); // 기존 할 일의 날짜 설정
            setTask(existingTodo.task); // 기존 할 일의 내용 설정
        } else if (initialDate) {
            setDate(initialDate); // 새로 추가할 때는 선택된 날짜 설정
        }
    }, [existingTodo, initialDate]);

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
                    min={today} // 오늘 날짜 이후만 선택 가능
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
