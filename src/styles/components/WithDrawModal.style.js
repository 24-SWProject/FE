import styled from "styled-components";

// 모달 배경 (오버레이)
export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

// 모달 컨테이너
export const ModalContainer = styled.div`
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 90%;
    max-width: 400px;
    text-align: center;
    word-wrap: break-word; /* 줄바꿈을 강제로 추가 */
    overflow-wrap: break-word; /* 현대 브라우저에서의 줄바꿈 */
    white-space: normal;
`;

// 버튼 그룹
export const ButtonGroup = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
`;

// 버튼 스타일
export const ModalButton = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: ${(props) => (props.cancel ? "#ccc" : "#ff5555")};
    color: white;
    font-size: 16px;

    &:hover {
        background-color: ${(props) => (props.cancel ? "#aaa" : "#ff0000")};
    }
`;

export const CopyButton = styled.div`
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: #FFDA76;
    color: white;
    font-size: 12px;

    &:hover {
        background-color: #B4D6CD;
    }
`
