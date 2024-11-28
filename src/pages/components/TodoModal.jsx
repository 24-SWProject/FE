import { useState, useEffect } from "react";
import * as S from "../../styles/components/TodoModal.style";

export default function Modal({ onClose, onAdd, existingTodo }) {
    const [date, setDate] = useState(""); // 날짜 상태
    const [task, setTask] = useState(""); // 할 일 상태

    const today = new Date().toISOString().split("T")[0]; // 오늘 날짜

    useEffect(() => {
        if (existingTodo) {
            setDate(existingTodo.date); // 기존 일정의 날짜 설정
            setTask(existingTodo.content); // 기존 일정의 내용 설정
        } else {
            setDate(""); // 새 일정 초기화
            setTask("");
        }
    }, [existingTodo]);

    const handleAdd = () => {
        console.log("선택된 날짜:", date); // 디버깅용
        console.log("입력된 내용:", task); // 디버깅용

        if (!date || !task) {
            alert("날짜와 내용을 모두 입력해주세요.");
            return;
        }
        onAdd({ date, task }); // 부모 컴포넌트로 데이터 전달
    };

    return (
        <S.ModalOverlay>
            <S.ModalContainer>
                <h3>{existingTodo ? "일정 수정하기" : "일정 추가하기"}</h3>
                <S.Input
                    type="date"
                    value={date} // 상태에서 읽어옴
                    onChange={(e) => {
                        console.log("변경된 날짜:", e.target.value); // 디버깅용
                        setDate(e.target.value);
                    }}
                    min={today} // 오늘 이후 날짜만 가능
                />
                <S.Input
                    type="text"
                    value={task} // 상태에서 읽어옴
                    onChange={(e) => {
                        setTask(e.target.value);
                    }}
                    placeholder="할 일을 입력하세요"
                />
                <S.ButtonContainer>
                    <S.Button onClick={handleAdd}>{existingTodo ? "수정하기" : "추가하기"}</S.Button>
                    <S.Button onClick={onClose}>취소</S.Button>
                </S.ButtonContainer>
            </S.ModalContainer>
        </S.ModalOverlay>
    );
}
