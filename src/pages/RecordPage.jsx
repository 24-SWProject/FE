import { useState, useEffect } from "react";
import * as S from "../styles/pages/Record.style";
import Close from "./components/Close";
import RecordCalendar from "./components/RecordCalendar";
import MonthPlan from "./components/MonthPlan";
import Modal from "./components/TodoModal";
import { getSchedules, createSchedule, updateSchedule, deleteSchedule } from "../api/schedulecrud";

export default function RecordPage() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [todos, setTodos] = useState([]); // 일정 목록
    const [selectedTodo, setSelectedTodo] = useState(null); // 수정할 일정 저장
    const [selectedMonth, setSelectedMonth] = useState(() => {
        const today = new Date();
        return today.toISOString().slice(0, 7); // 기본값: 오늘 날짜의 월(YYYY-MM)
    });

    // 선택된 달의 일정을 가져오기
    useEffect(() => {
        if (selectedMonth) {
            fetchSchedules(selectedMonth);
        }
    }, [selectedMonth]);

    const fetchSchedules = async (month) => {
        try {
            const data = await getSchedules(month); // YYYY-MM 형식으로 전달
            const formattedTodos = data.map((todo) => ({
                ...todo,
                date: todo.scheduleDate, // 이미 YYYY-MM-DD 형식으로 제공
            }));
            setTodos(formattedTodos);
        } catch (error) {
            console.error("일정 데이터를 불러오는 중 오류 발생:", error);
        }
    };

    const handleAddOrEditTodo = async (todo) => {
        try {
            if (selectedTodo) {
                await updateSchedule(selectedTodo.id, {
                    id: todo.id,
                    content: todo.task,
                    scheduleDate: todo.date,
                });
            } else {
                await createSchedule(todo.task, todo.date);
            }
            fetchSchedules(selectedMonth); // 변경 후 선택된 달의 일정 다시 조회
            closeModal();
        } catch (error) {
            console.error("일정 추가/수정 중 오류 발생:", error);
        }
    };

    const handleDeleteTodo = async (id) => {
        try {
            await deleteSchedule(id);
            fetchSchedules(selectedMonth); // 삭제 후 선택된 달의 일정 다시 조회
        } catch (error) {
            console.error("일정 삭제 중 오류 발생:", error);
        }
    };

    const handleAddTodo = () => {
        setSelectedTodo(null);
        setModalOpen(true);
    };

    const handleEditTodo = (todo) => {
        setSelectedTodo(todo);
        setModalOpen(true);
    };

    const closeModal = () => {
        setSelectedTodo(null);
        setModalOpen(false);
    };

    return (
        <S.RecordContainer>
            <Close />
            <RecordCalendar onDateChange={setSelectedMonth} /> {/* 날짜 변경 핸들러 전달 */}
            <MonthPlan
                todos={todos}
                onAdd={handleAddTodo}
                onEdit={handleEditTodo}
                onDelete={(todo) => handleDeleteTodo(todo.id)}
            />
            {isModalOpen && (
                <Modal
                    onClose={closeModal}
                    onAdd={handleAddOrEditTodo}
                    existingTodo={selectedTodo}
                />
            )}
        </S.RecordContainer>
    );
}
