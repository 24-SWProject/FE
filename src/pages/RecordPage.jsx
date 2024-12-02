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

    // 선택된 달의 일정 및 기념일 가져오기
    useEffect(() => {
        if (selectedMonth) {
            fetchSchedules(selectedMonth);
        }
    }, [selectedMonth]);

    const fetchSchedules = async (month) => {
        try {
            const scheduleData = await getSchedules(month); // 일정 조회
            const formattedSchedules = scheduleData.map((todo) => ({
                ...todo,
                date: todo.scheduleDate, // 일정 날짜
                isAnniversary: false, // 일반 일정
            }));

            const anniversaryData = await getGroupAnniv();
            const formattedAnniversaries = anniversaryData.milestones
                .filter((anniv) => anniv.date.startsWith(month)) // 해당 월의 기념일만
                .map((anniv) => ({
                    id: `anniv-${anniv.day}`, // 고유 ID 생성
                    content: `${anniv.day}일 ❤️`, // 기념일 내용
                    date: anniv.date,
                    isAnniversary: true, // 기념일 여부
                }));

            // 일정과 기념일 병합
            setTodos([...formattedSchedules, ...formattedAnniversaries]);
        } catch (error) {
            console.error("일정 및 기념일 데이터를 불러오는 중 오류 발생:", error);
        }
    };

    const handleAddOrEditTodo = async (todo) => {
        try {
            if (selectedTodo && !selectedTodo.isAnniversary) {
                // 일정 수정
                await updateSchedule(selectedTodo.id, {
                    id: selectedTodo.id,
                    content: todo.task,
                    scheduleDate: todo.date,
                });
            } else if (!selectedTodo) {
                // 일정 추가
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

    const closeModal = () => {
        setSelectedTodo(null);
        setModalOpen(false);
    };

    return (
        <S.RecordContainer>
            <Close />
            <RecordCalendar onDateChange={setSelectedMonth} /> {/* 달력에서 선택한 월 */}
            <MonthPlan
                todos={todos}
                onAdd={() => setModalOpen(true)} // 일정 추가 모달
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
                />
            )}
        </S.RecordContainer>
    );
}
