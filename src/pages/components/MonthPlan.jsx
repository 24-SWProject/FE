import * as S from "../../styles/components/MonthPlan.style";

export default function MonthPlan({ todos, onAdd, onEdit, onDelete }) {
    return (
        <S.PlanContainer>
            <S.Plus onClick={onAdd} /> {/* 일정 추가 버튼 */}
            {todos.map((todo) => (
                <S.TodoRow key={todo.id}>
                    <S.Date>{todo.date}</S.Date>
                    <S.Task>{todo.content}</S.Task>
                    {todo.isAnniversary ? (
                        <S.ActionButtons /> // 기념일일 경우 빈 ActionButtons 표시
                    ) : (
                        <S.ActionButtons>
                            <button onClick={() => onEdit(todo)}>✏️</button>
                            <button onClick={() => onDelete(todo)}>🗑️</button>
                        </S.ActionButtons>
                    )}
                </S.TodoRow>
            ))}
        </S.PlanContainer>
    );
}
