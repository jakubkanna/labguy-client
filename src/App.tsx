import { Container } from "react-bootstrap";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Main from "./components/layout/Main";
import { Outlet } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import Fallback from "./components/Fallback";

function App() {
  return (
    <Container fluid className="">
      <Header />
      <Main>
        <ErrorBoundary FallbackComponent={Fallback}>
          <Outlet />
        </ErrorBoundary>
      </Main>
      <Footer />
    </Container>
  );
}

export default App;
