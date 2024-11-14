import styled from "styled-components";
import Arrow from '../../assets/Arrow_right.png'

export const RightArrow = styled.div`
    position: absolute;
    top: 20px;
    right: 10px;
    padding: 0;
    border: none;
    cursor: pointer;
    width: 40px;
    height: 40px;
    background-image: url(${Arrow});
    background-repeat: no-repeat;
    background-size: contain;
    color: white;
    margin-bottom: 10px;
    z-index: 2;
`