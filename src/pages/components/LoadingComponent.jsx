import PropagateLoader from "react-spinners/PropagateLoader";
import styled from "styled-components";

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ffffff; /* 흰색 배경 */
  z-index: 9999;
`;

const LoadingText = styled.p`
  margin-top: 20px;
  font-size: 18px;
  color: #333333;
  font-family: Pretendard, sans-serif;
`;

const LoadingSpinner = ({ text }) => {
  return (
    <LoaderContainer>
      <PropagateLoader color="#E6A4B4" size={15} />
      {text && <LoadingText>{text}</LoadingText>}
    </LoaderContainer>
  );
};

export default LoadingSpinner;
