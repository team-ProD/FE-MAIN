import styled from 'styled-components';
import { theme } from '@/styles';
import { Link } from 'react-router-dom';

type ButtonKindType = 'primary' | 'default';
type ButtonColorType = 'bg' | 'color' | 'border';
type ButtonColorByKind = keyof typeof theme.colors;

interface ButtonColorsByKind extends Record<ButtonColorType, ButtonColorByKind> {}

const BUTTON_COLORS_BY_KIND_DIC: Record<ButtonKindType, ButtonColorsByKind> = {
  default: { bg: 'white', color: 'black', border: 'gray2' },
  primary: { bg: 'primary', color: 'white', border: 'primary' },
};

interface ButtonStyleProps {
  kind: ButtonKindType;
}

function getColor(kind: ButtonKindType): ButtonColorsByKind {
  return BUTTON_COLORS_BY_KIND_DIC[kind];
}

const Button = styled.button<ButtonStyleProps>`
  background-color: ${({ theme, kind }) => theme.colors[getColor(kind).bg]};
  color: ${({ theme, kind }) => theme.colors[getColor(kind).color]};
  outline: none;
  border: 1px solid ${({ theme, kind }) => theme.colors[getColor(kind).border]};
  cursor: pointer;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  font-weight: 500;
  width: 100%;
  height: 38px;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -0.0025em;
  transition: background-color 300ms linear;

  /* TODO: color 타입에 따라 rgba 변경 */
  &:hover {
    background-color: rgba(205, 204, 208, 0.25);
  }

  &:active {
    background-color: rgba(205, 204, 208, 0.55);
  }

  &:disabled {
    pointer-events: none;
    color: ${({ theme }) => theme.colors.gray2};
    background-color: ${({ theme }) => theme.colors.white};
  }
`;

type ButtonAsType = 'link' | 'button';

const LinkButton = Button.withComponent(Link);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, ButtonStyleProps {
  children?: React.ReactNode;
  toBe: ButtonAsType;
  to?: string;
}

export const LineButton = ({
  children,
  kind = 'default',
  toBe = 'button',
  to = '#',
  ...props
}: Partial<ButtonProps>) => {
  if (toBe === 'link') {
    return (
      <LinkButton to={to} kind={kind}>
        {children}
      </LinkButton>
    );
  }

  return (
    <Button {...props} kind={kind}>
      {children}
    </Button>
  );
};
