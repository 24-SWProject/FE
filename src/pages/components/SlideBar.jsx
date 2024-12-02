import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteUserAccount, logoutUser } from "../../api/usercrud";
import { deleteGroupAccount } from "../../api/groupcrud"; // 그룹 탈퇴 API 호출
import WithDrawModal from "./WithDrawModal";
import * as S from "../../styles/components/SlideBar.style";

export default function SlideBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [modalStep, setModalStep] = useState(0); // 모달 단계: 0 = 닫힘, 1 = 첫 번째, 2 = 두 번째
    const [isGroupWithdraw, setIsGroupWithdraw] = useState(false); // 그룹 탈퇴 여부
    const navigate = useNavigate();

    // SlideBar 열기
    const openSlideBar = () => setIsOpen(true);
    const closeSlideBar = () => setIsOpen(false);

    // 첫 번째 모달 열기
    const openFirstModal = (isGroup) => {
        setModalStep(1);
        setIsGroupWithdraw(isGroup); // 그룹 탈퇴인지 설정
    };

    // 모달 닫기
    const closeModal = () => {
        setModalStep(0);
        setIsGroupWithdraw(false); // 초기화
    };

    // 두 번째 모달 열기
    const openSecondModal = () => setModalStep(2);

    // 로그아웃 처리
    const handleLogout = async () => {
        try {
            await logoutUser();
            alert("성공적으로 로그아웃되었습니다.");
            localStorage.clear();
            navigate("/");
        } catch (error) {
            console.error("Error logging out:", error);
            alert("로그아웃 처리 중 문제가 발생했습니다. 다시 시도해주세요.");
        }
    };

    // 회원 탈퇴 처리
    const handleDeleteAccount = async () => {
        try {
            await deleteUserAccount();
            alert("계정이 성공적으로 삭제되었습니다.");
            localStorage.clear();
            navigate("/");
        } catch (error) {
            console.error("Error deleting account:", error);
            alert("계정 삭제 중 문제가 발생했습니다. 다시 시도해주세요.");
        } finally {
            closeModal();
        }
    };

    // 그룹 탈퇴 처리
    const handleGroupWithdraw = async () => {
        try {
            await deleteGroupAccount(); // 그룹 탈퇴 API 호출
            alert("그룹에서 성공적으로 탈퇴되었습니다.");
            closeModal(); // 모달 닫기
        } catch (error) {
            console.error("Error withdrawing from group:", error);
            alert("그룹 탈퇴 중 문제가 발생했습니다. 다시 시도해주세요.");
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
                            <S.MenuItem onClick={handleLogout}>로그아웃</S.MenuItem>
                        </S.BarContext>
                        <S.Withdraw onClick={() => openFirstModal(false)}>탈퇴하기</S.Withdraw>
                        <S.Withdraw onClick={() => openFirstModal(true)}>그룹 탈퇴</S.Withdraw>
                    </S.SlideBarContainer>
                </S.Overlay>
            )}

            {/* 첫 번째 모달 */}
            {modalStep === 1 && (
                <WithDrawModal
                    message={
                        isGroupWithdraw
                            ? "😢 정말 그룹에서 나가실 건가요? 😢"
                            : "😢 진짜 탈퇴하실건가요...? 😢"
                    }
                    onConfirm={openSecondModal}
                    onCancel={closeModal}
                />
            )}

            {/* 두 번째 모달 */}
            {modalStep === 2 && (
                <WithDrawModal
                    message={
                        isGroupWithdraw
                            ? "😢 정말정말 그룹에서 나가실 건가요..? 마지막 기회에요 😢"
                            : "😢 정말정말 탈퇴할 건가요..? 마지막 기회에요 😢"
                    }
                    onConfirm={isGroupWithdraw ? handleGroupWithdraw : handleDeleteAccount}
                    onCancel={closeModal}
                />
            )}
        </>
    );
}
