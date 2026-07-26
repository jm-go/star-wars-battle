import styled from "styled-components";
import { BeatLoader } from "react-spinners";
import { colors } from "../styles/colors";

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 25rem;
`;

const LoadingText = styled.p`
  font-size: 0.75rem;
  color: ${colors.primaryBright};
  font-weight: bold;
  letter-spacing: 0.0625rem;
  text-align: center;
`;

export default function LoadingSpinner() {
  return (
    <LoadingContainer role="status" aria-live="polite" aria-label="Loading game data">
      <BeatLoader
        color={colors.primaryBright}
        size={25}
        speedMultiplier={0.5}
        aria-hidden="true"
      />
      <LoadingText>Loading...</LoadingText>
    </LoadingContainer>
  );
}
