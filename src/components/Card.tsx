import styled from "styled-components";
import { Starship, CategoryKey } from "../types/starship";
import starWarsImage from "../assets/star-wars.webp";
import { colors } from "../styles/colors";
import { formatValue } from "../utils/utils";

interface CardProps {
  starship: Starship | null;
  isPlayer?: boolean;
  selectedCategory: CategoryKey | null;
  onCategoryClick?: (category: CategoryKey) => void;
  hideValues?: boolean;
}

interface CategoryItemProps {
  $clickable: boolean;
  $selected: boolean;
}

interface Category {
  key: CategoryKey;
  label: string;
  value: string | number;
}

const CardContainer = styled.div`
  width: 20rem;
  padding: 0;
  border-radius: 0.5rem;
  background-color: ${colors.primary};
  color: ${colors.textPrimary};
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.4);
  overflow: hidden;

  @media (max-width: 767px) {
    width: 19rem;
  }

  @media (min-width: 1440px) {
    width: 28rem;
  }

  @media (min-width: 1920px) {
    width: 32rem;
  }
`;

const CardHeader = styled.div`
  padding: 1rem 1.25rem;
  background-color: ${colors.primary};

  @media (min-width: 1440px) {
    padding: 1.5rem 1.75rem;
  }

  @media (min-width: 1920px) {
    padding: 1.75rem 2rem;
  }
`;

const ShipName = styled.h2`
  margin: 0;
  font-size: 1.125rem;
  font-weight: bold;
  color: ${colors.textPrimary};
  text-align: center;

  @media (min-width: 1440px) {
    font-size: 1.5rem;
  }

  @media (min-width: 1920px) {
    font-size: 1.75rem;
  }
`;

const ShipClass = styled.p`
  margin: 0.25rem 0 0 0;
  font-size: 0.75rem;
  color: ${colors.textSecondary};
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 0.03125rem;

  @media (min-width: 1440px) {
    font-size: 0.875rem;
  }

  @media (min-width: 1920px) {
    font-size: 1rem;
  }
`;

const CategoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  background-color: ${colors.white};
  padding: 1.25rem;

  @media (min-width: 1440px) {
    padding: 1.75rem;
  }

  @media (min-width: 1920px) {
    padding: 2rem;
  }
`;

const CategoryItem = styled.button<CategoryItemProps>`
  display: flex;
  justify-content: space-between;
  padding: 0.875rem 1rem;
  background-color: ${(props) =>
    props.$selected ? colors.primary : colors.white};
  border: none;
  border-bottom: 1px solid ${colors.border};
  cursor: ${(props) => (props.$clickable ? "pointer" : "default")};
  transition: all 0.2s;
  color: ${colors.textPrimary};
  text-align: left;
  font-size: 0.875rem;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${(props) =>
      props.$clickable ? colors.primaryLight : null};
  }

  &:focus-visible {
    outline: 2px solid ${colors.primary};
    outline-offset: -2px;
  }

  &:disabled {
    cursor: not-allowed;
  }

  @media (min-width: 1440px) {
    padding: 1.125rem 1.25rem;
    font-size: 1rem;
  }

  @media (min-width: 1920px) {
    padding: 1.25rem 1.5rem;
    font-size: 1.125rem;
  }
`;

const CategoryLabel = styled.span`
  font-weight: 400;
  color: ${colors.textPrimary};
`;

const CategoryValue = styled.span`
  font-weight: 600;
  color: ${colors.textPrimary};
`;

const StarWarsSection = styled.div`
  background-color: ${colors.black};
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 7.5rem;
  overflow: hidden;

  @media (min-width: 1440px) {
    min-height: 10.5rem;
  }

  @media (min-width: 1920px) {
    min-height: 12rem;
  }
`;

const StarWarsImage = styled.img`
  width: 100%;
  height: 7.5rem;
  object-fit: cover;
  display: block;

  @media (min-width: 1440px) {
    height: 10.5rem;
  }

  @media (min-width: 1920px) {
    height: 12rem;
  }
`;

export default function Card({
  starship,
  isPlayer = false,
  selectedCategory,
  onCategoryClick,
  hideValues = false,
}: CardProps) {
  if (!starship) return null;

  const categories: Category[] = [
    {
      key: "max_atmosphering_speed" as CategoryKey,
      label: "Max Speed",
      value: formatValue(starship.max_atmosphering_speed),
    },
    {
      key: "cost_in_credits" as CategoryKey,
      label: "Credit Cost",
      value: formatValue(starship.cost_in_credits),
    },
    {
      key: "passengers" as CategoryKey,
      label: "Passengers",
      value: formatValue(starship.passengers),
    },
    {
      key: "films" as CategoryKey,
      label: "Film Appearances",
      value: starship.films.length,
    },
  ];

  return (
    <CardContainer role="region" aria-label={`${isPlayer ? 'Your' : 'Enemy'} starship: ${starship.name}`}>
      <CardHeader>
        <ShipName as="h2">{starship.name}</ShipName>
        <ShipClass>{starship.starship_class}</ShipClass>
      </CardHeader>

      <StarWarsSection>
        <StarWarsImage src={starWarsImage} alt="Star Wars Logo Decorative Image" />
      </StarWarsSection>

      <CategoryList>
        {categories.map(({ key, label, value }) => (
          <CategoryItem
            key={key}
            $clickable={isPlayer && !!onCategoryClick}
            $selected={selectedCategory === key}
            onClick={() => isPlayer && onCategoryClick && onCategoryClick(key)}
            disabled={!isPlayer || !onCategoryClick}
            aria-label={`${label}: ${hideValues ? "?" : value}${
              selectedCategory === key ? " (selected)" : ""
            }`}
            role="button"
            tabIndex={isPlayer && onCategoryClick ? 0 : -1}
          >
            <CategoryLabel>{label}:</CategoryLabel>
            <CategoryValue>{hideValues ? "?" : value}</CategoryValue>
          </CategoryItem>
        ))}
      </CategoryList>
    </CardContainer>
  );
}
