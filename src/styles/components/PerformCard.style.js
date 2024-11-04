import styled from "styled-components";

export const CardContainer = styled.div`
    width: 80%;
    background-color: #f5eee6;
    border-radius: 10px;
    display: flex;
    align-items: center;
    padding: 15px;
    margin-bottom: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const CardImage = styled.div`
    width: 100px;
    height: 100px;
    background-color: #dddddd;
    border-radius: 8px;
    overflow: hidden;
    margin-right: 15px;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

export const CardContent = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const Title = styled.h2`
    font-size: 16px;
    color: #333333;
    font-family: 'Pretendard', sans-serif;
    margin: 0;
`;

export const DateText = styled.p`
    font-size: 14px;
    color: #777777;
    margin: 5px 0 10px 0;
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
    width: 24px;
    height: 24px;
    background-color: ${({ isActive }) => (isActive ? "#444444" : "transparent")};
    mask: url('/path/to/bookmark-icon.svg') no-repeat center / contain;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: ${({ isActive }) => (isActive ? "#333333" : "#bbbbbb")};
    }
`;