import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteUserAccount, logoutUser } from "../../api/usercrud";
import { deleteGroupAccount } from "../../api/groupcrud";
import WithDrawModal from "./WithDrawModal";
import * as S from "../../styles/components/SlideBar.style";

export default function SlideBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [modalStep, setModalStep] = useState(0); // 모달 단계
    const [isGroupWithdraw, setIsGroupWithdraw] = useState(false); // 그룹 탈퇴 여부
    const [topPosition, setTopPosition] = useState(0); // 스크롤에 따라 SlideBar 위치 조정
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setTopPosition(window.scrollY); // 현재 스크롤 위치 설정
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

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
        setIsGroupWithdraw(false);
    };

    // 로그아웃 처리
    const handleLogout = async () => {
        try {
            await logoutUser();
            localStorage.clear();
            navigate("/");
        } catch (error) {
            alert("로그아웃 하는 중에 에러가 발생하였습니다.");
            console.error("로그아웃 처리 중 오류 발생 : ", error);
        }
    };

    // 회원 탈퇴 처리
    const handleDeleteAccount = async () => {
        try {
            await deleteUserAccount();
            localStorage.clear();
            navigate("/");
        } catch (error) {
            alert("탈퇴 하는 중에 에러가 발생하였습니다.");
            console.error("회원 탈퇴 중 에러 발생: ", error);
        } finally {
            closeModal();
        }
    };

    // 그룹 탈퇴 처리
    const handleGroupWithdraw = async () => {
        try {
            await deleteGroupAccount();
            alert("그룹에서 성공적으로 탈퇴되었습니다.");
            closeModal();
        } catch (error) {
            alert("그룹 탈퇴 중 문제가 발생했습니다. 다시 시도해주세요.");
            console.error("그룹 탈퇴 에러 발생: ", error);
        }
    };

    return (
        <>
            <S.ListIcon onClick={openSlideBar} />

            {isOpen && (
                <S.Overlay onClick={closeSlideBar}>
                    <S.SlideBarContainer style={{ top: `${topPosition}px` }} onClick={(e) => e.stopPropagation()}>
                        <S.BarContext>
                            <S.MenuItem as={Link} to="/profileSet">프로필 설정</S.MenuItem>
                            <S.MenuItem as={Link} to="/recording">데이트 기록</S.MenuItem>
                            <S.MenuItem as={Link} to="/performList">공연&전시 정보</S.MenuItem>
                            <S.MenuItem as={Link} to="/bookmarked">북마크</S.MenuItem>
                            <S.MenuItem onClick={handleLogout}>로그아웃</S.MenuItem>
                        </S.BarContext>
                        <S.WithdrawGroup>
                            <S.Withdraw onClick={() => openFirstModal(true)}>그룹 탈퇴</S.Withdraw>
                            <S.Withdraw onClick={() => openFirstModal(false)}>탈퇴하기</S.Withdraw>
                        </S.WithdrawGroup>
                    </S.SlideBarContainer>
                </S.Overlay>
            )}

            {modalStep === 1 && (
                <WithDrawModal
                    message={isGroupWithdraw ? "😢 정말 그룹에서 나가실 건가요? 😢" : "😢 진짜 탈퇴하실건가요...? 😢"}
                    onConfirm={() => setModalStep(2)}
                    onCancel={closeModal}
                />
            )}
            {modalStep === 2 && (
                <WithDrawModal
                    message={isGroupWithdraw ? "😢 정말정말 그룹에서 나가실 건가요..? 마지막 기회에요 😢" : "😢 정말정말 탈퇴할 건가요..? 마지막 기회에요 😢"}
                    onConfirm={async () => {
                        if (isGroupWithdraw) {
                            await handleGroupWithdraw();
                        } else {
                            await handleDeleteAccount();
                            await handleLogout(); // 회원 탈퇴 후 로그아웃 처리
                        }
                    }}
                    onCancel={closeModal}
                />
            )}
        </>
    );
}
