import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "../styles/pages/Keyword.style";
import Close from "./components/Close";
import { RightArrow } from "../styles/components/RightArrow";
import { LeftArrow } from "../styles/components/LeftArrow";
import { recommendAI } from "../api/recommendcrud";
import LoadingSpinner from "./components/LoadingComponent";

export default function KeywordPage() {
    const navigate = useNavigate();
    const initialQuestionsData = [
        { question: "실내와 실외 중 어디에서 데이트를 할 건가요?", choices: ["실내", "실외"] },
        { question: "오늘은 어떤 분위기의 데이트를 하고 싶나요?", choices: ["조용한", "활기찬", "로맨틱한", "캐주얼한", "자연친화적인"] },
        { question: "어느 시간대에 데이트를 할 건가요?", choices: ["오전", "오후", "저녁", "밤"] },
        { question: "데이트 할 때 어떤 음식을 먹고 싶나요?", choices: ["한식", "양식", "중식", "일식", "이색퓨전"] }
    ];

    const [questionsData, setQuestionsData] = useState(initialQuestionsData);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedChoice, setSelectedChoice] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const savedAnswers = JSON.parse(localStorage.getItem("answers")) || [];
        setAnswers(savedAnswers);
    }, []);

    const handleChoiceClick = (index) => {
        setSelectedChoice(index);
        const currentAnswer = questionsData[currentQuestionIndex].choices[index];

        const existingAnswers = JSON.parse(localStorage.getItem("answers")) || [];
        const updatedAnswers = [...existingAnswers];
        updatedAnswers[currentQuestionIndex + 1] = currentAnswer;
        setAnswers(updatedAnswers);
        localStorage.setItem("answers", JSON.stringify(updatedAnswers));
    };

    const handleLeftArrowClick = () => {
        if (currentQuestionIndex === 0) {
            navigate("/choice");
        } else {
            setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
            setSelectedChoice(null);
        }
    };

    const handleRightArrowClick = () => {
        if (selectedChoice === null) return;

        const currentAnswer = questionsData[currentQuestionIndex].choices[selectedChoice];
        const updatedAnswers = [...answers];
        updatedAnswers[currentQuestionIndex + 1] = currentAnswer;
        setAnswers(updatedAnswers);
        localStorage.setItem("answers", JSON.stringify(updatedAnswers));
        setSelectedChoice(null);

        // 마지막 질문 추가
        if (currentQuestionIndex === questionsData.length - 1) {
            const indoorOutdoorAnswer = updatedAnswers[1]; // 두 번째 질문의 답변
            if (indoorOutdoorAnswer === "실내") {
                setQuestionsData((prevQuestions) => [
                    ...prevQuestions,
                    { question: "이 중 무엇을 하고 싶은가요?", choices: ["영화", "공연", "축제"] }
                ]);
            } else if (indoorOutdoorAnswer === "실외") {
                setQuestionsData((prevQuestions) => [
                    ...prevQuestions,
                    { question: "이 중 어디를 가고 싶은가요?", choices: ["야경", "강변", "산", "포토존", "거리"] }
                ]);
            }
        }

        // 다음 질문으로 이동
        if (currentQuestionIndex < questionsData.length) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        } else {
            console.log("모든 질문이 완료되었습니다!", updatedAnswers);
        }
    };

    const handleAiRecommendation = async () => {
        if (answers.length < questionsData.length) {
            alert("모든 질문에 답해주세요.");
            return;
        }

        setLoading(true);
        try {
            const response = await recommendAI(answers);
            const { llm_response } = response;

            localStorage.removeItem("answers");
            navigate("/AIAnswer", { state: { aiAnswer: llm_response } });
        } catch (error) {
            console.error("AI 추천 요청 실패:", error);
            alert("AI 추천 요청에 실패했습니다. 다시 시도해주세요.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading ? (
                <LoadingSpinner text="AI 추천 코스를 생성 중입니다..." />
            ) : (
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
                        >
                            {choice}
                        </S.QBox>
                    ))}
                    <LeftArrow onClick={handleLeftArrowClick} />
                    {currentQuestionIndex < questionsData.length && selectedChoice !== null && (
                        <RightArrow onClick={handleRightArrowClick} />
                    )}
                    {currentQuestionIndex === questionsData.length && (
                        <S.SetButton onClick={handleAiRecommendation}>AI 코스 추천 받기</S.SetButton>
                    )}
                </S.KeywordContainer>
            )}
        </>
    );
}
