import styled from "styled-components";
import Bookmark from "../../assets/Bookmark.png";
import BookmarkFill from "../../assets/Bookmark_fill.png";

export const CardContainer = styled.div`
    width: 85%;
    background-color: #E6A4B4;
    border-radius: 10px;
    display: flex;
    align-items: center;
    padding: 10px;
    margin-bottom: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
`;

export const CardImage = styled.div`
    width: 100px;
    aspect-ratio: 3 / 4;
    background-color: #444;
    border-radius: 8px;
    overflow: hidden;
    margin-right: 15px;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        background-repeat: no-repeat;
    }
`;


export const CardContent = styled.div`
    width: 100% - 120px;
    height: 100%;
    padding: 15px;
    box-sizing: border-box;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    position: relative;
`;

export const Title = styled.h2`
    font-size: clamp(10px, 1.0rem, 13px);
    color: #fff;
    font-family: 'Pretendard', sans-serif;
    margin: 0;
    word-wrap: break-word; /* 줄바꿈을 강제로 추가 */
    overflow-wrap: break-word; /* 현대 브라우저에서의 줄바꿈 */
    white-space: normal; /* 텍스트가 줄바꿈 없이 한 줄로 표시되지 않도록 설정 */
    text-align: left;
`;

export const DateText = styled.p`
    font-size: clamp(5px, 0.7rem, 10px);
    color: #fff;
    margin: 5px 0 10px 0;
`;

export const BottomDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    
`;


export const LinkButton = styled.button`
    width: 50px;
    padding: 5px 10px;
    background-color: #a8d18d;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 12px;
    cursor: pointer;
    margin-top: 5px;
    font-family: 'Pretendard', sans-serif;
    &:hover {
        background-color: #96c478;
    }
`;

export const BookmarkIcon = styled.button`
    position: absolute;
    right: 20px;
    width: 24px;
    height: 24px;
    background-image: url(${({ isActive }) => (isActive ? BookmarkFill : Bookmark)});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-color: transparent;
    border: none;
    cursor: pointer;
    transition: background-image 0.3s;

    &:hover {
        opacity: 0.8;
    }
`;
