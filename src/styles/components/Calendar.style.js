import styled from "styled-components";

export const CalendarContainer = styled.div`
    width: 80%;
    aspect-ratio: 1/1;
    min-width: 300px;
    margin: 10px auto 30px;
    padding: 10px;
    background-color: #FFFFFF;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1) inset;
    font-family: 'Pretendard', sans-serif;
`;

export const CalendarHeader = styled.div`
    font-size: 24px;
    font-weight: 700;
    color: #333333;
    text-align: center;
    margin-bottom: 10px;
`;

export const CalendarSubHeader = styled.div`
    font-size: 20px;
    color: #333333;
    text-align: center;
    margin-bottom: 20px;
`;

export const CalendarItem = styled.div`
    .react-calendar {
        width: 100%;
        border: none;
        font-family: 'Pretendard', sans-serif;
        background-color: #FFFFFF;
    }

    .react-calendar__navigation {
        display: flex;
        justify-content: space-between;
        padding: 10px;
        margin-bottom: 15px;
    }

    .react-calendar__navigation__label {
        display: block;
        font-size: 18px;
        font-weight: bold;
        color: #333333;
    }

    .react-calendar__navigation button {
        color: #888888;
        min-width: 44px;
        background: none;
        font-size: 20px;
        padding: 0;

        &:hover, &:focus {
            background: none; 
            color: #888888; 
            outline: none; 
            box-shadow: none;
            border: none;
        }
    }

    .react-calendar__month-view__weekdays {
        color: #888888;
        font-size: 16px;
    }

    .react-calendar__month-view__weekdays__weekday {
        display: flex;
        justify-content: center;
        font-weight: 600;
        margin-bottom: 10px;
    }

    .react-calendar__tile {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        aspect-ratio: 1/1;
        font-size: 16px;
        border-radius: 50%;
        border: none;
        color: #4A4A4A;
        background-color: #FFFFFF;
        transition: all 0.2s ease-in-out;
        padding: 0;

        &:hover {
            background-color: rgba(0, 41, 255, 0.1);
        }
    }

    .react-calendar__tile--now {
        background-color: none;
        border: 2px dotted #333;
        color: #4A4A4A;
        border-radius: 50%;
        font-weight: bold;
        padding: 0;
    }

    .react-calendar__tile--active {
        background-color: rgba(173, 216, 230, 0.5);
        color: #FFFFFF;
        border-radius: 50%;
        border: none;
    }

    .react-calendar__tile--active:focus {
        background-color: rgba(173, 216, 230, 0.5);
        outline: none;
        box-shadow: none;
    }

    .react-calendar__tile--active:hover {
        background-color: rgba(173, 216, 230, 0.7);
        border: none;
    }
`;
