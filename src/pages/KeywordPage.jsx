import { useState } from 'react';
import * as S from "../styles/pages/Keword.style";
import Close from "./components/Close";
import { RightArrow } from '../styles/components/RightArrow';

export default function KeywordPage() {
    // 질문과 선택지를 정의한 기본 객체
    const initialQuestionsData = [
        { question: "실내와 실외 중 어디에서 데이트를 할 건가요?", choices: ["실내", "실외"] },
        { question: "오늘은 어떤 분위기의 데이트를 하고 싶나요?", choices: ["조용한", "활기찬", "로맨틱한", "캐주얼한", "자연친화적인"] },
        { question: "어느 시간대에 데이트를 할 건가요?", choices: ["오전", "오후", "저녁", "밤"] },
        { question: "데이트 할 때 어떤 음식을 먹고 싶나요?", choices: ["한식", "양식", "중식", "일식", "이색퓨전"] }
    ];

    const [questionsData, setQuestionsData] = useState(initialQuestionsData);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // 현재 질문 인덱스
    const [selectedChoice, setSelectedChoice] = useState(null); // 선택된 답변 인덱스
    const [answers, setAnswers] = useState([]); // 선택한 답변을 저장하는 배열

    // 선택한 답변을 관리하고 localStorage에 저장
    const handleChoiceClick = (index) => {
        setSelectedChoice(index);
        const currentAnswer = questionsData[currentQuestionIndex].choices[index];
        localStorage.setItem(`answer_${currentQuestionIndex}`, currentAnswer); // 답변을 localStorage에 저장
    };

    // 다음 질문으로 넘어가기
    const handleRightArrowClick = () => {
        const currentAnswer = questionsData[currentQuestionIndex].choices[selectedChoice];

        // 첫 번째 질문에서 "실내" 또는 "실외" 선택에 따라 마지막 질문을 추가
        if (currentQuestionIndex === 0) {
            if (currentAnswer === "실내") {
                setQuestionsData(prevQuestions => [
                    ...prevQuestions,
                    { question: "이 중 무엇을 하고 싶은가요?", choices: ["영화", "공연", "행사"] }
                ]);
            } else if (currentAnswer === "실외") {
                setQuestionsData(prevQuestions => [
                    ...prevQuestions,
                    { question: "이 중 어디를 가고 싶은가요?", choices: ["행사", "야경", "강변", "산", "포토존", "거리"] }
                ]);
            }
        }

        // 현재 답변을 저장하고 다음 질문으로 이동
        setAnswers([...answers, currentAnswer]);
        setSelectedChoice(null); // 선택 초기화

        if (currentQuestionIndex < questionsData.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1); // 다음 질문으로 이동
        } else {
            // 마지막 질문에 도달하면 완료 처리
            alert("모든 질문이 완료되었습니다!");
        }
    };

    return (
        <S.KeywordContainer>
            <Close />
            <S.Question>
                Q{currentQuestionIndex + 1}. {questionsData[currentQuestionIndex].question}
            </S.Question>
            {questionsData[currentQuestionIndex].choices.map((choice, index) => (
                <S.QBox
                    key={index}
                    isSelected={selectedChoice === index}
                    onClick={() => handleChoiceClick(index)}
                    style={{
                        backgroundColor: selectedChoice === index ? '#FFDA76' : '#FFFFFF'
                    }}
                >
                    {choice}
                </S.QBox>
            ))}
            <RightArrow onClick={handleRightArrowClick} />
        </S.KeywordContainer>
    );
}
