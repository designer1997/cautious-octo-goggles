import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { AppBar, Link, Toolbar } from "@mui/material";
import { ReactComponent as Logo } from "../../../assets/images/logo-image.svg";

const Header = () => {
  const menus = [
    {
      name: "Video",
      route: "",
    },
    {
      name: "History",
      route: "history",
    },
  ];

  return (
    <HeaderBar position="relative">
      <Toolbar>
        <Link href="/">
          <Logo />
        </Link>
        <Navigation>
          {menus.map((links) => (
            <NavLink
              to={`/${links.route}`}
              key={links.name}
              className={({ isActive, isPending }) =>
                isActive ? "active" : isPending ? "pending" : ""
              }
            >
              {links.name}
            </NavLink>
          ))}
        </Navigation>
      </Toolbar>
    </HeaderBar>
  );
};

export default Header;

const HeaderBar = styled(AppBar)`
  &.MuiAppBar-root {
    background: #fff;
    padding: 10px 0;

    .MuiToolbar-root {
      max-width: 1200px;
      margin: 0 auto;
      width: 100%;
      justify-content: space-between;
      cursor: pointer;
    }
  }
`;

const Navigation = styled.div`
  a {
    font-size: 16px;
    font-weight: 700;
    line-height: 21px;
    color: #000;
    text-decoration: none;
    margin-left: 15px;

    &.active {
      color: #643ada;
    }
  }
`;
