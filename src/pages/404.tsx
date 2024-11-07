import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout.";
import { Col, Container } from "react-bootstrap";

export default function NotFoundPage() {
  return (
    <Container>
      <Layout title="404 Not Found">
        <Col className="position-fixed top-50 start-50 translate-middle text-center font-monospace">
          <p>Page not found :(</p>
          <Link to={"/"}>Home</Link>
        </Col>
      </Layout>{" "}
    </Container>
  );
}
