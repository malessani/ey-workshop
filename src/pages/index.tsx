import { HeadFC, Link, PageProps, graphql, useStaticQuery } from "gatsby";
import Page from "../components/Page";
const IndexPage = () => {
  const data = useStaticQuery<Queries.ProductsPageQuery>(graphql`
    query ProductsPage {
      allProductsJson {
        edges {
          node {
            name
            slug
          }
        }
      }
    }
  `);

  return (
    <Page title={"Gatsby Workshop"}>
      <p>Starting the workshop now</p>
      <ul>
        {data.allProductsJson.edges.map(({ node }) => (
          <li key={node.name}>
            {node.slug && <Link to={node.slug}>{node.name}</Link>}
          </li>
        ))}
      </ul>
    </Page>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
