import { useState, useEffect } from "react";
import * as S from "../../styles/components/Dday.Style";
import { getGroupCode, joinGroup } from "../../api/groupcrud";
import * as M from "../../styles/components/WithDrawModal.style";

export function InviteComponent({ onGroupJoin }) {
    const [isCopied, setIsCopied] = useState(false); // 초대 코드 복사 상태
    const [isClicked, setIsClicked] = useState(false); // 상대방 코드 입력 클릭 상태
    const [inviteCode, setInviteCode] = useState("XXXXXXXX"); // 초대 코드 값
    const [coupleCode, setCoupleCode] = useState(""); // 입력된 커플 코드 값
    const [message, setMessage] = useState(""); // API 응답 메시지
    const [showModal, setShowModal] = useState(false); // Modal 표시 상태

    // 그룹 코드 조회 및 상태 업데이트
    useEffect(() => {
        const fetchInviteCode = async () => {
            try {
                const code = await getGroupCode();
                setInviteCode(code); // 초대 코드 업데이트
            } catch (error) {
                console.error("초대 코드 가져오기 실패:", error);
            }
        };
        fetchInviteCode();
    }, []);

    const handleCopyClick = async () => {
        try {
            await navigator.clipboard.writeText(inviteCode); // 초대 코드를 클립보드에 복사
            setIsCopied(true);
            setShowModal(true); // Modal 표시
        } catch (error) {
            console.error("클립보드 복사 실패:", error);
            alert("클립보드 복사에 실패했습니다. 다시 시도해주세요.");
        }
    };

    const handleSpanClick = () => {
        setIsClicked(true);
    };

    const handleInputChange = (e) => {
        setCoupleCode(e.target.value);
    };

    const handleConnectClick = async () => {
        try {
            const response = await joinGroup(coupleCode); // 입력한 코드로 그룹 참여 요청
            if (response && response.status === 200) {
                onGroupJoin(); // MainPage에서 상태 업데이트
                setTimeout(() => {
                    window.location.reload(); // 성공 후 페이지 새로고침
                }, 500);
            }
        } catch (error) {
            setMessage(
                error.response?.data?.message || "그룹 참여 중 오류가 발생했습니다."
            );
        }
    };

    const closeModal = () => {
        setShowModal(false); // Modal 닫기
    };

    return (
        <>
            <S.DdayContainer className="Copy">
                <S.DdayInfo>
                    {isCopied ? (
                        !isClicked ? (
                            <>
                                <h6>초대코드: {inviteCode}</h6>
                                <span onClick={handleSpanClick}>상대방 코드 입력</span>
                            </>
                        ) : (
                            <>
                                <h6>상대방의 초대코드를 입력해주세요 :)</h6>
                                <S.InputWrapper>
                                    <S.CoupleCodeInput
                                        type="text"
                                        placeholder="코드 입력"
                                        value={coupleCode}
                                        onChange={handleInputChange}
                                    />
                                    <S.ConnectButton onClick={handleConnectClick}>
                                        연결
                                    </S.ConnectButton>
                                </S.InputWrapper>
                            </>
                        )
                    ) : (
                        <h3>초대코드를 짝꿍에게 보내주세요 :)</h3>
                    )}
                    {!isCopied && (
                        <S.CopyButton onClick={handleCopyClick}>COPY CODE</S.CopyButton>
                    )}
                    {message && <p>{message}</p>}
                </S.DdayInfo>
            </S.DdayContainer>

            {/* Modal Component */}
            {showModal && (
                <M.ModalOverlay>
                    <M.ModalContainer>
                        <p>초대 코드가 클립보드에 복사되었습니다!</p>
                        <M.CopyButton onClick={closeModal}>확인</M.CopyButton>
                    </M.ModalContainer>
                </M.ModalOverlay>
            )}
        </>
    );
}
