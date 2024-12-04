import { useState, useEffect, useCallback } from "react";
import * as S from "../../styles/components/Dday.Style";
import { getGroupCode, joinGroup } from "../../api/groupcrud";
import * as M from "../../styles/components/WithDrawModal.style";

export function InviteComponent({ onGroupJoin }) {
    const [isCopied, setIsCopied] = useState(false); // 초대 코드 복사 상태
    const [inviteCode, setInviteCode] = useState("XXXXXXXX"); // 초대 코드 값
    const [coupleCode, setCoupleCode] = useState(""); // 입력된 커플 코드 값
    const [message, setMessage] = useState(""); // API 응답 메시지
    const [showModal, setShowModal] = useState(false); // Modal 표시 상태

    // 그룹 코드 조회
    useEffect(() => {
        const fetchInviteCode = async () => {
            try {
                const code = await getGroupCode();
                setInviteCode(code || "XXXXXXXX");
            } catch (error) {
                console.error("초대 코드 가져오기 실패:", error);
            }
        };
        fetchInviteCode();
    }, []);

    const handleCopyInviteCode = async () => {
        try {
            await navigator.clipboard.writeText(inviteCode);
            setIsCopied(true);
            setShowModal(true);
            console.log("초대 코드 복사 성공:", inviteCode);
        } catch (error) {
            console.error("초대 코드 복사 실패:", error);
            alert("클립보드 복사에 실패했습니다.");
        }
    };

    const handleConnectClick = useCallback(async () => {
        try {
            const response = await joinGroup(coupleCode);
            if (response && response.status === 200) {
                setMessage("그룹에 성공적으로 참여했습니다!");
                onGroupJoin();
            } else {
                setMessage("그룹 참여에 실패했습니다.");
            }
        } catch (error) {
            setMessage(error.response?.data?.message || "API 호출 중 오류 발생");
        }
    }, [coupleCode, onGroupJoin]);

    return (
        <>
            <S.DdayContainer>
                <S.DdayInfo>
                    <h3>초대코드를 짝꿍에게 보내주세요 :)</h3>
                    <p>초대코드: {inviteCode}</p>
                    <S.CopyButton onClick={handleCopyInviteCode}>
                        {isCopied ? "Copied!" : "COPY CODE"}
                    </S.CopyButton>
                    <h6>상대방의 초대코드를 입력해주세요 :)</h6>
                    <S.InputWrapper>
                        <S.CoupleCodeInput
                            type="text"
                            placeholder="코드 입력"
                            value={coupleCode}
                            onChange={(e) => setCoupleCode(e.target.value)}
                        />
                        <S.ConnectButton onClick={handleConnectClick}>
                            연결
                        </S.ConnectButton>
                    </S.InputWrapper>
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
