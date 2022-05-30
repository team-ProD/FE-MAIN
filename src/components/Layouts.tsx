import styled from 'styled-components';

import { Header } from './Header';
import { SideNavigation } from './SideNavigation';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
`;

const LayoutMainContentWrap = styled.div`
  display: flex;
`;

interface LayoutsProps {
  children?: React.ReactNode;
}

export const Layouts = ({ children }: LayoutsProps) => {
  return (
    <Wrap>
      <Header />

      <LayoutMainContentWrap>
        <div>
          <SideNavigation />
        </div>
        <div>{children}</div>
      </LayoutMainContentWrap>
    </Wrap>
  );
};
