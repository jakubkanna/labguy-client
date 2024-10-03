import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Fallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <Container>
      <Row>
        <Col>
          <p>{error.message}</p>
          <Link onClick={resetErrorBoundary} to={""}>
            Try to Reset
          </Link>
        </Col>
      </Row>
    </Container>
  );
}
