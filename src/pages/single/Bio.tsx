import HTMLReactParser from "html-react-parser/lib/index";
import Layout from "../../components/layout/Layout.";
import { ProfileSchema } from "@jakubkanna/labguy-front-schema";
import { useLoaderData } from "react-router-dom";
import { useContext } from "react";
import { GeneralContext } from "../../contexts/GeneralContext";
import PortfolioButton from "../../components/PortfolioButton";

export default function Bio() {
  const data = (useLoaderData() as ProfileSchema) || null;
  const { preferences } = useContext(GeneralContext);

  if (!data) return null;

  const { statement, additional } = data;

  const arrayToHtml = (arr: unknown) => {
    const array = Array.isArray(arr) ? arr : [];

    return array.map((item, index) => (
      <div id={`Additional-${index}`} key={index}>
        {item?.html && HTMLReactParser(item.html)}
      </div>
    ));
  };

  return (
    <Layout title="Bio" description={statement || undefined}>
      <div id="Statement">
        <h2>Statement</h2>
        <div>{statement && HTMLReactParser(statement)}</div>
      </div>
      <div id="Additional">
        <h2>Additional</h2>
        {arrayToHtml(additional)}
      </div>
      {preferences?.enable_portfolio_pdf && (
        <div id="Portfolio">
          <h2>Portfolio</h2>
          <PortfolioButton url={data.portfolio_pdf_url} />
        </div>
      )}
    </Layout>
  );
}
