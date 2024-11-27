import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteUserAccount, logoutUser } from "../../api/crud"; // logoutUser 추가
import WithDrawModal from "./WithDrawModal";
import * as S from "../../styles/components/SlideBar.style";

export default function SlideBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [modalStep, setModalStep] = useState(0); // 모달 단계: 0 = 닫힘, 1 = 첫 번째, 2 = 두 번째
    const navigate = useNavigate();

    useEffect(() => {
        document.body.style.overflow = "auto";
        return () => {
            document.body.style.overflow = "hidden";
        };
    }, []);

    // SlideBar를 여는 함수
    const openSlideBar = () => {
        setIsOpen(true);
    };

    // SlideBar를 닫는 함수
    const closeSlideBar = () => {
        setIsOpen(false);
    };

    // 첫 번째 모달 열기
    const openFirstModal = () => {
        setModalStep(1);
    };

    // 모달 닫기
    const closeModal = () => {
        setModalStep(0);
    };

    // 두 번째 모달 열기
    const openSecondModal = () => {
        setModalStep(2);
    };

    // 로그아웃 처리 함수
    const handleLogout = async () => {
        try {
            await logoutUser(); // 로그아웃 API 호출
            alert("성공적으로 로그아웃되었습니다.");
            localStorage.clear(); // 로컬 스토리지 비우기
            navigate("/"); // 로그인 페이지로 이동
        } catch (error) {
            console.error("Error logging out:", error);
            alert("로그아웃 처리 중 문제가 발생했습니다. 다시 시도해주세요.");
        }
    };

    // 회원 탈퇴 처리 함수
    const handleDeleteAccount = async () => {
        try {
            await deleteUserAccount();
            alert("계정이 성공적으로 삭제되었습니다.");
            localStorage.clear(); // 로컬 스토리지에 저장된 모든 데이터를 제거 (로그아웃 처리)
            navigate("/"); // 홈 또는 로그인 페이지로 이동
        } catch (error) {
            console.error("Error deleting account:", error);
            alert("계정 삭제 중 문제가 발생했습니다. 다시 시도해주세요.");
        } finally {
            closeModal(); // 모달 닫기
        }
    };

    return (
        <>
            <S.ListIcon onClick={openSlideBar} />

            {isOpen && (
                <S.Overlay onClick={closeSlideBar}>
                    <S.SlideBarContainer onClick={(e) => e.stopPropagation()}>
                        <S.BarContext>
                            <S.MenuItem as={Link} to="/profileSet">프로필 설정</S.MenuItem>
                            <S.MenuItem as={Link} to="/recording">데이트 기록</S.MenuItem>
                            <S.MenuItem as={Link} to="/performList">공연&전시 정보</S.MenuItem>
                            <S.MenuItem as={Link} to="/bookmarked">북마크</S.MenuItem>
                            <S.MenuItem onClick={handleLogout}>로그아웃</S.MenuItem> {/* 로그아웃 처리 */}
                        </S.BarContext>
                        <S.Withdraw onClick={openFirstModal}>탈퇴하기</S.Withdraw>
                    </S.SlideBarContainer>
                </S.Overlay>
            )}

            {/* 첫 번째 모달 */}
            {modalStep === 1 && (
                <WithDrawModal
                    message="😢 진짜 탈퇴하실건가요...? 😢"
                    onConfirm={openSecondModal} // 두 번째 모달 열기
                    onCancel={closeModal} // 모달 닫기
                />
            )}

            {/* 두 번째 모달 */}
            {modalStep === 2 && (
                <WithDrawModal
                    message=" 😢정말정말 탈퇴할 건가요..? 마지막 기회에요 😢"
                    onConfirm={handleDeleteAccount} // 계정 삭제 처리
                    onCancel={closeModal} // 모달 닫기
                />
            )}
        </>
    );
}
