import { HeadFC, Link, PageProps, graphql, useStaticQuery } from "gatsby";
import Page from "../components/Page";
const IndexPage = () => {
  const data = useStaticQuery<Queries.GetCountriesPagesQuery>(graphql`
    query GetCountriesPages {
      allCountriesJson {
        nodes {
          market
          name
          slug
        }
      }
    }
  `);

  return (
    <Page title={"Gatsby Workshop"}>
      <p>Starting the workshop now</p>
      <ul>
        {data.allCountriesJson.nodes.map(
          (market) =>
            market?.slug && (
              <li key={market.slug}>
                <Link to={market.slug}>{market.name}</Link>
              </li>
            )
        )}
      </ul>
    </Page>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
