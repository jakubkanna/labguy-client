import { useContext } from "react";
import Layout from "../../components/layout/Layout.";
import { GeneralContext } from "../../contexts/GeneralContext";
import { Col, ListGroup, Row } from "react-bootstrap";
import { UrlSchema } from "@jakubkanna/labguy-front-schema";
import { Link } from "react-router-dom";
import Background from "../../components/Background";

export default function Homepage() {
  const { preferences } = useContext(GeneralContext);

  if (!preferences) return null;

  const {
    homepage_heading,
    homepage_subheading,
    homepage_media,
    homepage_urls,
  } = preferences;

  return (
    <Layout title="">
      <Col className="d-flex flex-column gap-2 h-100">
        <Row>
          <Col>
            <h1>{homepage_heading}</h1>
          </Col>
        </Row>
        <Row className="flex-grow-1">
          <Col>
            <Background media={homepage_media} />
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>{homepage_subheading}</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <ListGroup horizontal>
              {homepage_urls &&
                homepage_urls.map((url, key) => (
                  <ListGroup.Item key={key}>
                    <Link to={(url as UrlSchema).url} target="_blank">
                      {(url as UrlSchema).title}
                    </Link>
                  </ListGroup.Item>
                ))}
            </ListGroup>
          </Col>
        </Row>
      </Col>
    </Layout>
  );
}
