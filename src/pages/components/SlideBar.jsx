import { useState } from "react";
import * as S from "../../styles/components/SlideBar.style";

export default function SlideBar() {
    const [isOpen, setIsOpen] = useState(false);

    // SlideBar를 여는 함수
    const openSlideBar = () => {
        setIsOpen(true);
    };

    // SlideBar를 닫는 함수
    const closeSlideBar = () => {
        setIsOpen(false);
    };

    return (
        <>
            {/* ListIcon 버튼을 클릭하면 SlideBar가 열림 */}
            <S.ListIcon onClick={openSlideBar} />

            {/* SlideBarContainer가 열려 있을 때만 표시 */}
            {isOpen && (
                <S.Overlay onClick={closeSlideBar}>
                    <S.SlideBarContainer onClick={(e) => e.stopPropagation()}>
                    <S.BarContext>
                        <S.MenuItem>프로필 설정</S.MenuItem>
                        <S.MenuItem>데이트 기록</S.MenuItem>
                        <S.MenuItem>북마크</S.MenuItem>
                        
                    </S.BarContext>
                    <S.Withdraw>탈퇴하기</S.Withdraw>
                    </S.SlideBarContainer>
                </S.Overlay>
            )}
        </>
    );
}
