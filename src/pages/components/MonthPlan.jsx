import * as S from "../../styles/components/MonthPlan.style";

export default function MonthPlan({ todos, onEdit, onDelete }) {
    return (
        <S.PlanContainer>
            <S.Plus onClick={() => onEdit(null)} />
            {todos.map((todo, index) => (
                <S.TodoRow key={index}>
                    <S.Date>
                        {typeof todo.date === "object" && todo.date instanceof Date
                            ? todo.date.toISOString().split("T")[0] // YYYY-MM-DD 형식으로 변환
                            : todo.date}
                    </S.Date>
                    <S.Task>{todo.task}</S.Task>
                    <S.ActionButtons>
                        <button onClick={() => onEdit(index)}>✏️</button>
                        <button onClick={() => onDelete(index)}>🗑️</button>
                    </S.ActionButtons>
                </S.TodoRow>
            ))}
        </S.PlanContainer>
    );
}
