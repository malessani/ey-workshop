// pokemon
import { graphql, Link, PageProps } from "gatsby";
import Page from "../components/Page";
import { Price, PricesContainer } from "@commercelayer/react-components";

interface Country {
  name: string;
  slug: string;
  market: number;
}

const ListPage = ({
  data,
  pageContext,
}: PageProps<Queries.ProductsPageQuery, { country: Country }>) => {
  const { allProductsJson: products } = data;
  const { country } = pageContext;
  return (
    <Page title={country.name} market={country.market}>
      <ul>
        <PricesContainer>
          {products.edges.map(({ node }) => (
            <li key={node.name}>
              {node.slug && node.sku && (
                <Link to={node.slug}>
                  {node.name} <Price skuCode={node.sku} showCompare={false} />
                </Link>
              )}
            </li>
          ))}
        </PricesContainer>
      </ul>
    </Page>
  );
};

export default ListPage;

export const query = graphql`
  query ProductsPage {
    allProductsJson {
      edges {
        node {
          name
          slug
          sku
        }
      }
    }
  }
`;
