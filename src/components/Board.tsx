import styled from "styled-components";
import starsBackground from "../assets/stars-background.jpg";
import { colors } from "../styles/colors";

const Board = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: url(${starsBackground});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  position: relative;
`;

export const GameContainer = styled.div`
  width: 100%;
  max-width: 75rem;
  margin: 0 auto;
`;

export const CardsContainer = styled.div`
  display: flex;
  gap: 2rem;
  padding-bottom: 1rem;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  flex-direction: row;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: center;
  }

  @media (min-width: 1440px) {
    gap: 3rem;
  }

  @media (min-width: 1920px) {
    gap: 4rem;
  }
`;

export const CardWithScore = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

export const MobileScore = styled.div`
  display: none;

  @media (max-width: 767px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
  }
`;

export const MobileScoreLabel = styled.div`
  font-size: 0.75rem;
  color: ${colors.textTertiary};
  text-transform: uppercase;
  letter-spacing: 0.0625rem;
`;

export const MobileScoreValue = styled.div`
  font-size: 1.75rem;
  font-weight: bold;
  color: ${colors.white};
`;

export const GameInfo = styled.div`
  text-align: center;
  margin-bottom: 1.25rem;
  color: ${colors.white};
  position: relative;

  @media (max-width: 767px) {
    margin-bottom: 0.5rem;
    margin-top: 1rem;
  }
`;

export const ScoreBoard = styled.div`
  position: absolute;
  top: 0.625rem;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 2.5rem;
  font-size: 3rem;
  font-weight: bold;
  z-index: 10;

  @media (max-width: 767px) {
    display: none;
  }
`;

export const Score = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  color: ${colors.white};
`;

export const ScoreLabel = styled.span`
  font-size: 0.75rem;
  color: ${colors.textTertiary};
  text-transform: uppercase;
  letter-spacing: 0.0625rem;
`;

export const ScoreValue = styled.span`
  font-size: 2rem;
  color: ${colors.white};
  font-weight: bold;

  @media (max-width: 767px) {
    font-size: 1.75rem;
  }
`;

export const Message = styled.div<{
  $type?: "win" | "lose" | "draw" | "info" | "";
}>`
  font-size: ${(props) => (props.$type === "info" ? "1.125rem" : "1.5rem")};
  font-weight: bold;
  margin: 0;
  min-height: 1.875rem;
  color: ${(props) => {
    if (props.$type === "win") return colors.success;
    if (props.$type === "lose") return colors.error;
    if (props.$type === "draw") return colors.warning;
    return colors.white;
  }};

  @media (max-width: 767px) {
    font-size: ${(props) => (props.$type === "info" ? "0.875rem" : "1rem")};
  }
`;

export const ResetButton = styled.button`
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background-color: ${colors.primaryBright};
  color: ${colors.black};
  border: none;
  border-radius: 0.25rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
  z-index: 1;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background-color: ${colors.primaryHover};
    transition: left 0.3s ease;
    z-index: -1;
  }

  &:hover::before {
    left: 0;
  }

  &:active::before {
    left: 0;
  }

  &:focus-visible {
    outline: 3px solid ${colors.primaryBright};
    outline-offset: 0.125rem;
  }
`;

export const FinalResults = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin: 1.5rem 0;
  font-size: 1.5rem;
  font-weight: bold;
  color: ${colors.white};

  @media (max-width: 767px) {
    gap: 2rem;
    font-size: 1.25rem;
  }
`;

export const FinalScore = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

export const FinalScoreLabel = styled.span`
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.0625rem;
`;

export const FinalScoreValue = styled.span`
  font-size: 2.25rem;
  color: ${colors.primaryBright};

  @media (max-width: 767px) {
    font-size: 1.5625rem;
  }
`;

export const DecorativeIcon = styled.img`
  width: 4.375rem;
  height: 4.375rem;
  margin: 1.5rem auto;
  display: block;
`;

export default Board;
