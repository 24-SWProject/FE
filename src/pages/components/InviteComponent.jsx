import { useState, useEffect, useCallback } from "react";
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

    // 그룹 코드 조회
    useEffect(() => {
        const fetchInviteCode = async () => {
            try {
                console.log("초대 코드를 가져오는 중...");
                const code = await getGroupCode();
                setInviteCode(code || "XXXXXXXX");
                console.log("초대 코드 가져옴:", code);
            } catch (error) {
                console.error("초대 코드 가져오기 실패:", error);
            }
        };
        fetchInviteCode();
    }, []);

    // Input 변경 핸들러
    const handleInputChange = (e) => {
        setCoupleCode(e.target.value);
    };

    // Connect 버튼 클릭 핸들러
    const handleConnectClick = useCallback(async () => {
        console.log("Connect button clicked with coupleCode:", coupleCode);
        try {
            const response = await joinGroup(coupleCode);
            if (response && response.status === 200) {
                console.log("그룹 참여 성공");
                setMessage("그룹에 성공적으로 참여했습니다!");
                onGroupJoin(); // 부모 컴포넌트의 상태 업데이트
            }
        } catch (error) {
            console.error("그룹 참여 중 오류:", error);
            setMessage(
                error.response?.data?.message || "그룹 참여 중 오류가 발생했습니다."
            );
        }
    }, [coupleCode, onGroupJoin]);

    return (
        <>
            <S.DdayContainer className="Copy">
                <S.DdayInfo>
                    {isCopied ? (
                        isClicked ? (
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
                        ) : (
                            <>
                                <h6>초대코드: {inviteCode}</h6>
                                <span onClick={() => setIsClicked(true)}>
                                    상대방 코드 입력
                                </span>
                            </>
                        )
                    ) : (
                        <h3>초대코드를 짝꿍에게 보내주세요 :)</h3>
                    )}
                    {!isCopied && (
                        <S.CopyButton
                            onClick={async () => {
                                try {
                                    await navigator.clipboard.writeText(inviteCode);
                                    setIsCopied(true);
                                    setShowModal(true);
                                    console.log("초대 코드가 클립보드에 복사됨");
                                } catch (error) {
                                    console.error("클립보드 복사 실패:", error);
                                    alert("클립보드 복사에 실패했습니다. 다시 시도해주세요.");
                                }
                            }}
                        >
                            COPY CODE
                        </S.CopyButton>
                    )}
                    {message && <p>{message}</p>}
                </S.DdayInfo>
            </S.DdayContainer>

            {/* Modal */}
            {showModal && (
                <M.ModalOverlay>
                    <M.ModalContainer>
                        <p>초대 코드가 클립보드에 복사되었습니다!</p>
                        <M.CopyButton onClick={() => setShowModal(false)}>확인</M.CopyButton>
                    </M.ModalContainer>
                </M.ModalOverlay>
            )}
        </>
    );
}
