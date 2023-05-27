import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "@mui/material";
import img from "../../assets/images/404.png";

export default function ErrorPage() {
  return (
    <ErrorMessage className="errorPage">
      <img src={img} alt="error" />
      <Link to="/">
        <Button variant="contained" color="success">
          Go to home Page
        </Button>
      </Link>
    </ErrorMessage>
  );
}

const ErrorMessage = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 600px;
  flex-direction: column;
  gap: 15px;
`;
