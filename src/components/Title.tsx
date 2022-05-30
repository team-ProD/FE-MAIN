import { createElement, ReactNode } from 'react';

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: ReactNode;
}
export const Title = ({ level = 1, children, ...props }: TitleProps) => {
  return createElement(`h${level}`, props, children);
};
