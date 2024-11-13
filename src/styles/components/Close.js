import styled from 'styled-components';
import Close from '../../assets/Close.png';
export const btnContainer = styled.div`
    position: absolute;
    top: 20px;
    left: 10px;
    padding: 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 40px;
    height: 40px;
    background-image: url(${Close});
    background-repeat: no-repeat;
    background-size: contain;
    margin-bottom : 20px;
    z-index : 10;
`;