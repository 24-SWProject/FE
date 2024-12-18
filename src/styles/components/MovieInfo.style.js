import styled from 'styled-components';

export const Container = styled.div`
    width: 80%;
    aspect-ratio: 4 / 5;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin: 0 auto;
    display: block;
    flex-direction: column;
    align-items: flex-start;
    box-sizing: border-box;
`;

export const Header = styled.div`
    font-size: 1.2rem;
    font-family: 'Pretendard', sans-serif;
    font-weight: 700;
    margin-bottom: 30px;
    color: #333;
    text-align: center;
    width: 100%;
`;

export const MovieList = styled.div`
    display: flex;
    overflow-x: auto;
    gap: 15px;
    padding-bottom: 10px;
    width: 100%;

    &::-webkit-scrollbar {
        height: 2px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #cccccc;
        border-radius: 4px;
    }

    &::-webkit-scrollbar-track {
        background-color: #f0f0f0;
    }
`;

export const MovieCard = styled.div`
    min-width: 180px;
    aspect-ratio: 3 / 5;
    background-color: #eee;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Poster = styled.img`
    width: 90%;
    aspect-ratio: 1 / 1.3;
    border-radius: 10px;
    object-fit: cover;
    background-repeat: no-repeat;
    margin-bottom: 10px;
    background-color: #ddd;
`;

export const TextContainer = styled.div`
    width: 90%;
    text-align: left;
`;

export const MovieTitle = styled.div`
    font-size: clamp(10px, 1rem, 20px);
    font-weight: bold;
    color: #333;
    margin-bottom: 5px;
`;

export const MovieInfo = styled.div`
    font-size: clamp(10px, 0.8rem, 15px);
    color: #666;
    line-height: 1.2;
`;

export const SkeletonCard = styled.div`
    min-width: 180px;
    aspect-ratio: 3 / 5;
    background-color: #f0f0f0;
    border-radius: 10px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    animation: skeleton-loading 1.5s infinite;

    @keyframes skeleton-loading {
        0% {
            background-color: #e0e0e0;
        }
        50% {
            background-color: #f0f0f0;
        }
        100% {
            background-color: #e0e0e0;
        }
    }
`;

export const SkeletonPoster = styled.div`
    width: 90%;
    aspect-ratio: 1 / 1.3;
    background-color: #ddd;
    border-radius: 10px;
    margin-bottom: 10px;
`;

export const SkeletonText = styled.div`
    width: 90%;
    height: 10px;
    background-color: #ddd;
    border-radius: 5px;
    margin: 5px 0;

    &:last-child {
        width: 60%;
    }
`;

