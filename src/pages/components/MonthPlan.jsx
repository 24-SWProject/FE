import * as S from "../../styles/components/MonthPlan.style";

export default function MonthPlan({ todos, onEdit, onDelete }) {
    return (
        <S.PlanContainer>
            <S.Plus onClick={() => onEdit(null)} />
            {todos.map((todo, index) => (
                <S.TodoRow key={index}>
                    <S.Date>
                        {typeof todo.date === "object" && todo.date instanceof Date
                            ? todo.date.toLocaleDateString("ko-KR", {
                                  month: "2-digit",
                                  day: "2-digit",
                              })
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
