import styled from "styled-components";

export const PerformContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    padding: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0;
    gap : 20px;
    position: relative;
`;

export const SmallHeader = styled.div`
    gap: 20px;
    flex-direction: row;
    display: flex; /* 반드시 flex 컨테이너가 필요 */
    justify-content: center; /* center 위치 */
    align-items: center; /* 세로축 중앙 정렬 */
    transform: translateX(-5rem); /* x축으로 왼쪽으로 30% 이동 */
    p {
        font-size: clamp(10px, 1.0rem, 12px);
        color: #ccc;
        font-family: 'Pretendard', sans-serif;
        text-decoration: underline(#eee 1px);
        margin: 0;
        padding: 0;
    }
`;
export const Header = styled.div`
    width: 80%;
    color: #FFFFFF;
    align-items: center;
    justify-content: space-between;
    font-weight: bold;
    margin: 80px 0 20px 0;
    display: flex;
    flex-direction: row;

    button {
        background: none;
        color: #fff;
        border: none;
        font-weight: 900;
        font-size: 20px;
        padding: 0;
        margin: 0;
    }

    span {
        font-size: clamp(15px, 1.2rem, 20px);
        color: #fff;
        font-family: 'Pretendard', sans-serif;
        margin: 0;
        padding: 0;
    }

`;