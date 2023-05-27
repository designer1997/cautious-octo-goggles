
import { Typography } from "@mui/material";
import styled from "styled-components";

const Title = ({ text }: { text: string }) => (
  <TitleContainer variant="h6">
    <strong>{text}</strong>
  </TitleContainer>
);

export default Title;

const TitleContainer = styled(Typography)`
  background: rgb(100, 58, 218);
  color: #fff;
  padding: 10px 20px;
`