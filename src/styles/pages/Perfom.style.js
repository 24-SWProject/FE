import styled from "styled-components";

export const PerformContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    height: auto;
    padding: 0px;
    display: flex;
    overflow-y: auto;
    flex-direction: column;
    align-items: center;
    margin: 0;
    gap: 20px;
    position: relative;
`;

export const SmallHeader = styled.div`
    gap: 15px;
    margin: 80px 0 5px 0;
    flex-direction: row;
    display: flex; /* 반드시 flex 컨테이너가 필요 */
    justify-content: center; /* center 위치 */
    align-items: center; /* 세로축 중앙 정렬 */
    & > p { /* 부모 하위 p 요소에만 스타일 적용 */
        font-size: clamp(12px, 1.0rem, 15px);
        color: #444;
        font-family: 'Pretendard', sans-serif;
        text-decoration: underline;
        text-decoration-color: #444;
        text-decoration-thickness: 1.5px;
        margin: 0;
        padding: 0;
    }

    & > h3 {
        font-size: clamp(18px, 2.0rem, 30px);
        color: #fff;
        font-family: 'Pretendard', sans-serif;
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
    margin: 0 0 20px 0;
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

export const EventContainer = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    justify-content: flex-start;
    padding: 20px;

    p {
        font-size: 1rem;
        color: #666;
        font-family: 'Pretendard', sans-serif;
        text-align: center;
    }
`;

export const SearchContainer = styled.div`
    width: 90%;
    height: auto;
    display: inline-block;
`;

export const Input = styled.input`
    width: 85%;
    min-height: 30px;
    aspect-ratio: 8 / 1;
    margin: 5px 0;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #FFDA76;
    font-family: Pretendard, sans-serif;
    font-size: clamp(15px, 1.2rem, 20px);
    ::placeholder {
        color: #ccc;
    }
`;

export const SearchButton = styled.button`
    width: 15%;
    min-height: 30px;
    aspect-ratio: 3 / 2;
    margin: 0;
    padding: 0;
    background-color: #E6A4B4;
    border: 2px solid #FFFFFF;
    border-radius: 10px;
    font-family: 'Pretendard', sans-serif;
    font-size: clamp(15px, 1.2rem, 25px);;
    color: black;
`;