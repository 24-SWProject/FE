import { useState } from "react";
import * as S from "../../styles/components/Dday.Style";
import * as M from "../../styles/components/WithDrawModal.style";
import { joinGroup, getGroupCode } from "../../api/groupcrud";

export function InviteComponent({ onGroupJoin }) {
    const [coupleCode, setCoupleCode] = useState("");
    const [inviteCode, setInviteCode] = useState("XXXXXXXX"); // 초대 코드
    const [message, setMessage] = useState("");
    const [isCopied, setIsCopied] = useState(false); // 초대 코드 복사 여부
    const [showModal, setShowModal] = useState(false); // Modal 표시 여부

    // 초대 코드 가져오기
    const fetchInviteCode = async () => {
        try {
            const code = await getGroupCode();
            setInviteCode(code || "코드 불러오기 실패");
            console.log("초대 코드 가져옴:", code);
        } catch (error) {
            console.error("초대 코드 가져오기 실패:", error);
        }
    };

    useState(() => {
        fetchInviteCode(); // 컴포넌트 마운트 시 초대 코드 가져오기
    }, []);

    const handleInputChange = (e) => {
        setCoupleCode(e.target.value);
    };

    const handleConnectClick = async () => {
        try {
            const response = await joinGroup(coupleCode);
            if (response.status === 200) {
                console.log("그룹 연결 성공:", response);
                setMessage("그룹에 성공적으로 참여했습니다!");
                onGroupJoin(); // 상태 변경
            }
        } catch (error) {
            console.error("그룹 연결 실패:", error);
            setMessage(
                error.response?.data?.message || "그룹 연결 중 오류가 발생했습니다."
            );
        }
    };

    const handleCopyCode = async () => {
        try {
            await navigator.clipboard.writeText(inviteCode);
            setIsCopied(true);
            setShowModal(true); // Modal 표시
            console.log("초대 코드가 클립보드에 복사됨");
        } catch (error) {
            console.error("클립보드 복사 실패:", error);
            alert("클립보드 복사에 실패했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <>
            <S.DdayContainer>
                <S.DdayInfo>
                    {isCopied ? (
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
                            <h3>초대코드를 짝꿍에게 보내주세요 :)</h3>
                            <S.CopyButton onClick={handleCopyCode}>
                                초대 코드 복사
                            </S.CopyButton>
                        </>
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
