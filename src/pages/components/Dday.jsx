import { useState } from "react";
import * as S from "../../styles/components/Dday.Style";

export default function DdayComponent() {
    return (
        <S.DdayContainer>
            <S.CoupleImage></S.CoupleImage>
            <S.DdayInfo>
                <h2>별명</h2>
                <p>D+날짜</p>
            </S.DdayInfo>
        </S.DdayContainer>
    );
}

export function InviteComponent() {
    const [isCopied, setIsCopied] = useState(false); // 초대 코드 복사 상태
    const [isClicked, setIsClicked] = useState(false); // 상대방 코드 입력 클릭 상태
    const [inviteCode, setInviteCode] = useState("XXXXXXX"); // 초대 코드 값
    const [coupleCode, setCoupleCode] = useState(""); // 입력된 커플 코드 값

    const handleCopyClick = () => {
        setIsCopied(true);
    };

    const handleSpanClick = () => {
        setIsClicked(true);
    };

    const handleInputChange = (e) => {
        setCoupleCode(e.target.value);
    };

    const handleConnectClick = () => {
        alert(`입력한 코드: ${coupleCode}`);
    };

    return (
        <S.DdayContainer className="Copy">
            <S.DdayInfo>
                {isCopied ? (
                    !isClicked ? (
                        <>
                            <h6>초대코드: {inviteCode}</h6>
                            <span onClick={handleSpanClick}>
                                상대방 코드 입력
                            </span>
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
                    <S.CopyButton onClick={handleCopyClick}>
                        COPY CODE
                    </S.CopyButton>
                )}
            </S.DdayInfo>
        </S.DdayContainer>
    );
}
