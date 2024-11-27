import { useState, useEffect } from "react";
import * as S from "../../styles/components/Dday.Style";
import { getGroupCode, joinGroup } from "../../api/groupcrud";

export function InviteComponent() {
    const [isCopied, setIsCopied] = useState(false); // 초대 코드 복사 상태
    const [isClicked, setIsClicked] = useState(false); // 상대방 코드 입력 클릭 상태
    const [inviteCode, setInviteCode] = useState("XXXXXXXX"); // 초대 코드 값
    const [coupleCode, setCoupleCode] = useState(""); // 입력된 커플 코드 값
    const [message, setMessage] = useState(""); // API 응답 메시지

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

    const handleCopyClick = () => {
        setIsCopied(true);
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
            setMessage(`그룹에 성공적으로 참여했습니다! (ID: ${response.id})`);
        } catch (error) {
            setMessage(
                error.response?.data?.message || "그룹 참여 중 오류가 발생했습니다."
            );
        }
    };

    return (
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
                    <S.CopyButton onClick={handleCopyClick}>SHOW CODE</S.CopyButton>
                )}
                {message && <p>{message}</p>} {/* 응답 메시지 표시 */}
            </S.DdayInfo>
        </S.DdayContainer>
    );
}
