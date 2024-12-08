import { useState, useEffect } from "react";
import * as S from "../styles/pages/Record.style";
import Close from "./components/Close";
import RecordCalendar from "./components/RecordCalendar";
import MonthPlan from "./components/MonthPlan";
import TodoModal from "./components/TodoModal";
import { getSchedules, createSchedule, updateSchedule, deleteSchedule } from "../api/schedulecrud";
import { getGroupAnniv } from "../api/groupcrud";

export default function RecordPage() {
    const [isModalOpen, setModalOpen] = useState(false); // 모달 상태
    const [todos, setTodos] = useState([]); // 일정 목록
    const [selectedTodo, setSelectedTodo] = useState(null); // 선택된 일정 데이터
    const [selectedMonth, setSelectedMonth] = useState(() => {
        const today = new Date();
        return today.toISOString().slice(0, 7); // 기본값: 오늘 날짜의 월(YYYY-MM)
    });
    const [selectedDate, setSelectedDate] = useState(() => {
        const today = new Date();
        return today.toISOString().split("T")[0]; // 기본값: 오늘 날짜(YYYY-MM-DD)
    });

    useEffect(() => {
        if (selectedMonth) {
            fetchSchedules(selectedMonth);
        }
    }, [selectedMonth]);

    const fetchSchedules = async (month) => {
        try {
            const scheduleData = await getSchedules(month);
            const formattedSchedules = scheduleData.map((todo) => ({
                ...todo,
                date: todo.scheduleDate,
                isAnniversary: false,
            }));

            const anniversaryData = await getGroupAnniv();
            const milestones = anniversaryData?.milestones || [];
            const formattedAnniversaries = milestones
                .filter((anniv) => anniv.date.startsWith(month))
                .map((anniv) => ({
                    content: `${anniv.day}일 ❤️`,
                    date: anniv.date,
                    isAnniversary: true,
                }));

            setTodos([...formattedSchedules, ...formattedAnniversaries]);
        } catch (error) {
            console.error("일정 및 기념일 데이터를 불러오는 중 오류 발생:", error);
        }
    };

    const handleAddOrEditTodo = async (todo) => {
        try {
            if (selectedTodo && !selectedTodo.isAnniversary) {
                await updateSchedule(selectedTodo.id, {
                    id: selectedTodo.id,
                    content: todo.task,
                    scheduleDate: todo.date,
                });
            } else if (!selectedTodo) {
                await createSchedule(todo.task, todo.date);
            }
            fetchSchedules(selectedMonth); // 데이터 새로고침
            closeModal();
        } catch (error) {
            console.error("일정 추가/수정 중 오류 발생:", error);
        }
    };

    const handleDeleteTodo = async (id) => {
        try {
            await deleteSchedule(id);
            fetchSchedules(selectedMonth); // 데이터 새로고침
        } catch (error) {
            console.error("일정 삭제 중 오류 발생:", error);
        }
    };

    const openEditModal = (todo) => {
        setSelectedTodo(todo);
        setModalOpen(true);
    };

    const openAddModal = () => {
        setSelectedTodo(null);
        setModalOpen(true);
    };

    const closeModal = () => {
        setSelectedTodo(null);
        setModalOpen(false);
    };

    return (
        <S.RecordContainer>
            <Close />
            <RecordCalendar
                onDateChange={setSelectedMonth} // 선택된 월
                onDateSelect={setSelectedDate} // 선택된 날짜
            />
            <MonthPlan
                todos={todos}
                onAdd={openAddModal} // 일정 추가 모달
                onEdit={openEditModal} // 일정 수정 모달
                onDelete={(todo) => {
                    if (!todo.isAnniversary) {
                        handleDeleteTodo(todo.id);
                    } else {
                        alert("기념일은 삭제할 수 없습니다.");
                    }
                }}
            />
            {isModalOpen && (
                <TodoModal
                    onClose={closeModal}
                    onAdd={handleAddOrEditTodo}
                    existingTodo={selectedTodo}
                    isAnniversary={selectedTodo?.isAnniversary} // 기념일 여부
                    defaultDate={selectedDate} // 선택된 날짜 전달
                />
            )}
        </S.RecordContainer>
    );
}
