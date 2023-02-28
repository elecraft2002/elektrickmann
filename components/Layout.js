import { Header } from "./Header";
import { Footer } from "./Footer";
import styled from "styled-components";
import { COLOR } from "../pages/_app";
const StyledLayout = styled.div`
  color: ${COLOR.light};
  background: ${COLOR.dark};
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
export const Layout = ({
  navigation,
  settings,
  withHeaderDivider,
  withProfile,
  withSignUpForm,
  children,
}) => {
  return (
    <StyledLayout className="text-slate-700">
      <Header
        withProfile={withProfile}
        withDivider={withHeaderDivider}
        navigation={navigation}
        settings={settings}
      />
      <main>{children}</main>
      <Footer withSignUpForm={withSignUpForm} settings={settings} />
    </StyledLayout>
  );
};
