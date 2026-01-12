import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  z-index: 1000;
`;

const NavLink = styled(Link)<{ $active: boolean }>`
  text-decoration: none;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: ${(props) => (props.$active ? "#000" : "#888")};
  padding: 0.5rem 1rem;
  transition: color 0.2s;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 1rem;
    right: 1rem;
    height: 2px;
    background: ${(props) => (props.$active ? "#000" : "transparent")};
    transition: background 0.2s;
  }
`;

const LayoutContainer = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  padding-top: 60px;
`;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  return (
    <LayoutContainer>
      <Nav>
        <NavLink to="/" $active={location.pathname === "/"}>
          Polygon Visualizer
        </NavLink>
        <NavLink
          to="/port-template"
          $active={location.pathname === "/port-template"}
        >
          Port Template
        </NavLink>
      </Nav>
      <ContentWrapper>{children}</ContentWrapper>
    </LayoutContainer>
  );
};

export default Layout;
