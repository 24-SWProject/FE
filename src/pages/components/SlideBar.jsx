import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteUserAccount } from "../../api";
import * as S from "../../styles/components/SlideBar.style";

export default function SlideBar() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    // SlideBar를 여는 함수
    const openSlideBar = () => {
        setIsOpen(true);
    };

    // SlideBar를 닫는 함수
    const closeSlideBar = () => {
        setIsOpen(false);
    };

    // 회원 탈퇴 처리 함수
    const handleDeleteAccount = async () => {
        const confirmDelete = window.confirm("정말로 탈퇴하시겠습니까?");
        if (!confirmDelete) return;

        try {
            await deleteUserAccount();
            alert("계정이 성공적으로 삭제되었습니다.");
            localStorage.clear(); // 로컬 스토리지에 저장된 모든 데이터를 제거 (로그아웃 처리)
            navigate("/"); // 홈 또는 로그인 페이지로 이동
        } catch (error) {
            console.error("Error deleting account:", error);
            alert("계정 삭제 중 문제가 발생했습니다. 다시 시도해주세요.");
        }
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
                            <S.MenuItem as={Link} to="/profileSet">프로필 설정</S.MenuItem>
                            <S.MenuItem as={Link} to="/recording">데이트 기록</S.MenuItem>
                            <S.MenuItem as={Link} to="/performList">공연&전시 정보</S.MenuItem>
                            <S.MenuItem>북마크</S.MenuItem>
                        </S.BarContext>
                        <S.Withdraw onClick={handleDeleteAccount}>탈퇴하기</S.Withdraw>
                    </S.SlideBarContainer>
                </S.Overlay>
            )}
        </>
    );
}
