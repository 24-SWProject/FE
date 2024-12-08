import styled from 'styled-components';

export const PerformContainer = styled.div`
    width: 85%;
    min-width: 300px;
    aspect-ratio: 3 / 2;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin: 10px auto 20px auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1) ;
    box-sizing: border-box;
    height: 250px;
`;

export const DateHeader = styled.div`
    font-size: 1.0rem;
    font-weight: bold;
    margin-bottom: 10px;
    color: #333;
`;

export const EventList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
    overflow-y: auto;
    flex-grow: 1;
`;

export const EventItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 10px 0;
    border-bottom: 1.5px solid #e0e0e0;

    &:last-child {
        border-bottom: none;
    }
`;

export const EventName = styled.div`
    width: 60%;
    font-size: 0.85rem;
    color: #333;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: start;
`;

export const EventDate = styled.div`
    font-size: clamp(8px, 0.6rem, 15px);
    color: #666;
`;
