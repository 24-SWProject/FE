import * as S from "../../styles/components/MonthPlan.style";

export default function MonthPlan({ todos, onAdd, onEdit, onDelete }) {
    return (
        <S.PlanContainer>
            <S.Plus onClick={onAdd} /> {/* Plus 버튼에서 onAdd 호출 */}
            {todos.map((todo) => (
                <S.TodoRow key={todo.id}>
                    <S.Date>{todo.date}</S.Date>
                    <S.Task>{todo.content}</S.Task>
                    <S.ActionButtons>
                        <button onClick={() => onEdit(todo)}>✏️</button>
                        <button onClick={() => onDelete(todo)}>🗑️</button>
                    </S.ActionButtons>
                </S.TodoRow>
            ))}
        </S.PlanContainer>
    );
}
