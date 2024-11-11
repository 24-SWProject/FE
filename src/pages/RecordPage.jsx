import { useState } from "react";
import * as S from "../styles/pages/Record.style";
import CalendarComponent from "./components/CalendarComponent";
import Close from "./components/Close";
import MonthPlan from "./components/MonthPlan";
import Modal from "./components/TodoModal";
import RecordCalendar from "./components/RecordCalendar";

export default function RecordPage() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [todos, setTodos] = useState([]);
    const [editIndex, setEditIndex] = useState(null);

    const handleAddOrEditTodo = (todo) => {
        const formattedDate = new Date(todo.date).toLocaleDateString("ko-KR", {
            month: "long",
            day: "numeric",
        });
    
        const newTodo = { ...todo, date: formattedDate };
    
        if (editIndex !== null) {
            // Edit mode
            const updatedTodos = [...todos];
            updatedTodos[editIndex] = newTodo;
            setTodos(updatedTodos);
        } else {
            // Add mode
            setTodos([...todos, newTodo]);
        }
    
        setModalOpen(false);
        setEditIndex(null);
    };

    const handleEditTodo = (index) => {
        setEditIndex(index);
        setModalOpen(true);
    };

    const handleDeleteTodo = (index) => {
        const updatedTodos = todos.filter((_, i) => i !== index);
        setTodos(updatedTodos);
    };

    return (
        <S.RecordContainer>
            <Close />
            <RecordCalendar />
            <MonthPlan todos={todos} onEdit={handleEditTodo} onDelete={handleDeleteTodo} />
            {isModalOpen && (
                <Modal
                    onClose={() => setModalOpen(false)}
                    onAdd={handleAddOrEditTodo}
                    existingTodo={editIndex !== null ? todos[editIndex] : null} // existingTodo 전달
                />
            )}
        </S.RecordContainer>
    );
}
