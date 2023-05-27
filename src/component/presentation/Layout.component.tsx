import styled from 'styled-components';
import { Container } from "@mui/material";

const Layout = ({ children }: { children: any }) => (
   <Container><Wrapper>{children}</Wrapper></Container>
)

export default Layout

const Wrapper = styled.div`
 padding: 20px;
 box-shadow: 0 0 12px rgba(0,0,0,0.15);
 margin: 50px 0;

 .react-draggable {
   cursor: grab;
   display: flex;
   flex-direction column;
 }
`