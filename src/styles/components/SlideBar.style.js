import styled from "styled-components";
import List from "/src/assets/list.png"

export const ListIcon = styled.div`
    top: 20px;
    right: 10px;
    position: absolute;
    padding: 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 40px;
    height: 40px;
    background-image: url(${List});
    background-repeat: no-repeat;
    background-size: contain;
    color: white;
    margin-bottom : 20px;
    z-index : 1;

`;
export const SlideBarContainer = styled.div`
    background-color: #FFF8E3;
    width: 40%;
    min-width: 100px;
    height: 100vh;
    display: flex;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    transition: 0.4s ease;
    z-index: 5;
`;

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5); /* 어두운 반투명 배경 */
    display: flex;
    justify-content: flex-end; /* SlideBar가 오른쪽에 위치 */
    z-index: 9;
`;

export const BarContext = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 90%;
    height: 30%;
    padding: 0;
    box-sizing: border-box;
    margin: 0;
    margin-top: 5vh;
`;

export const MenuItem = styled.div`
    white-space: nowrap;
    font-size: 20px;
    font-family: Pretendard, sans-serif;
    font-weight: 600;
    color: #444444;
    cursor: pointer;
`;

export const Withdraw = styled.div`
    font-size: 15px;
    font-family: Pretendard, sans-serif;
    font-weight: 600;
    color: #777777;
    text-decoration: underline;
    cursor: pointer;
    width: 90%;
    position: absolute;
    bottom: 20px;
`;
