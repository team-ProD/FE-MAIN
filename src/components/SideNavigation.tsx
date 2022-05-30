import { Fragment, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { SAMPLE_IMAGE } from '@/features/studio/constants';

const Wrap = styled.div`
  background-color: #202a44;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 45px);
  width: 300px;
  padding: 24px 0;
`;
const Logo = styled.div`
  width: 100px;
  height: 100%;
  margin: 0 auto;

  img {
    width: 100%;
    height: 100%;
  }
`;
const MenuItemWrap = styled.ul`
  display: flex;
  flex-direction: column;
  padding-top: 36px;

  li ~ li {
    margin-top: 14px;
  }
`;
const MenuItemList = styled.li<{ isActiveMenu: boolean }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 18px 24px;

  ${({ isActiveMenu }) =>
    isActiveMenu &&
    css`
      background-color: #2e2252;
    `}

  &:hover {
    background-color: #2e2252;
  }
`;
const SubMenuItemWrap = styled.ul``;
const SubMenuItemList = styled.li<{ isActiveMenu: boolean }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 18px 36px;

  ${({ isActiveMenu }) =>
    isActiveMenu &&
    css`
      background-color: #2e2252;
    `}

  &:hover {
    background-color: #2e2252;
  }
`;

interface MenuItem {
  value: string;
  path: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    value: '홈화면',
    path: '/',
  },
  {
    value: '샘플1',
    path: '/sample1/page1',
    children: [
      {
        value: '샘플하위페이지1',
        path: '/sample1/page1',
      },
      {
        value: '샘플하위페이지2',
        path: '/sample1/page2',
      },
      {
        value: '샘플하위페이지3',
        path: '/sample1/page3',
      },
    ],
  },
  {
    value: '샘플2',
    path: '/sample2',
  },
  {
    value: '샘플3',
    path: '/sample3/page1',
    children: [
      {
        value: '샘플3하위페이지1',
        path: '/sample3/page1',
      },
    ],
  },
];

const hasSubMenu = (subMenu?: MenuItem[]) => Boolean(subMenu?.length);

export const SideNavigation = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [menuPaths, setMenuPaths] = useState<string[]>([pathname]);

  const isActiveMenu = (path: string) => pathname === path;

  const handleMoveClickCurried = (path: string, hasChildren?: boolean) => () => {
    if (hasChildren) {
      setMenuPaths((prev) => {
        if (prev.includes(path)) {
          return prev.filter((prevPath) => prevPath !== path);
        }

        return [...prev, path];
      });
    }

    navigate(path);
  };

  return (
    <Wrap>
      <Logo>
        <img src={SAMPLE_IMAGE} alt="logo" />
      </Logo>

      <MenuItemWrap>
        {menuItems.map(({ path, value, children }) => (
          <Fragment key={path}>
            {/* TODO: 분할 - chkim */}
            <MenuItemList
              onClick={handleMoveClickCurried(path, hasSubMenu(children))}
              isActiveMenu={!hasSubMenu(children) && isActiveMenu(path)}>
              {value}
            </MenuItemList>

            {hasSubMenu(children) && (
              <SubMenuItemWrap>
                {children?.map(
                  ({ path, value }) =>
                    menuPaths.includes(path) && (
                      <SubMenuItemList
                        key={path}
                        onClick={handleMoveClickCurried(path)}
                        isActiveMenu={isActiveMenu(path)}>
                        {value}
                      </SubMenuItemList>
                    ),
                )}
              </SubMenuItemWrap>
            )}
          </Fragment>
        ))}
      </MenuItemWrap>
    </Wrap>
  );
};
