import { useState, useEffect } from "react";
import * as S from "../../styles/components/TodoModal.style";

export default function TodoModal({ onClose, onAdd, existingTodo, isAnniversary, defaultDate }) {
    const [date, setDate] = useState(defaultDate || ""); // 기본값으로 선택된 날짜 사용
    const [task, setTask] = useState("");

    const today = new Date().toISOString().split("T")[0]; // 오늘 날짜

    useEffect(() => {
        if (existingTodo) {
            setDate(existingTodo.date);
            setTask(existingTodo.content);
        } else {
            setDate(defaultDate || ""); // 기본값으로 선택된 날짜 설정
            setTask("");
        }
    }, [existingTodo, defaultDate]);

    return (
        <S.ModalOverlay>
            <S.ModalContainer>
                <h3>{isAnniversary ? "기념일 보기" : existingTodo ? "일정 수정하기" : "일정 추가하기"}</h3>
                <label>날짜를 선택해주세요</label>
                <S.Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={today}
                    disabled={isAnniversary}
                />
                <S.Input
                    type="text"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder="할 일을 입력하세요"
                    disabled={isAnniversary}
                />
                {!isAnniversary && (
                    <S.ButtonContainer>
                        <S.Button onClick={() => onAdd({ date, task })}>
                            {existingTodo ? "수정하기" : "추가하기"}
                        </S.Button>
                        <S.Button onClick={onClose}>취소</S.Button>
                    </S.ButtonContainer>
                )}
            </S.ModalContainer>
        </S.ModalOverlay>
    );
}
