// pokemon
import { graphql, PageProps } from "gatsby";
import Page from "../components/Page";
import * as styles from "../components/Page/src/Page.module.scss";
import { AddToCartButton } from "@commercelayer/react-components/orders/AddToCartButton";
import { AvailabilityContainer } from "@commercelayer/react-components/skus/AvailabilityContainer";
import { AvailabilityTemplate } from "@commercelayer/react-components/skus/AvailabilityTemplate";
import { PricesContainer } from "@commercelayer/react-components/prices/PricesContainer";
import { Price } from "@commercelayer/react-components/prices/Price";

const PokemonPage = ({ data }: PageProps<Queries.ProductPageQuery>) => {
  const { productsJson: product } = data;

  return (
    <Page title={product?.name || "Name not found"}>
      <p>{product?.description || "Description not found"}</p>
      <p>
        <PricesContainer>
          <Price
            skuCode={product?.sku}
            className={styles.px}
            compareClassName={styles.compare}
          />
        </PricesContainer>
      </p>
      <p>
        {product?.sku && (
          <AvailabilityContainer skuCode={product?.sku}>
            <AvailabilityTemplate className={styles.px} />
          </AvailabilityContainer>
        )}

        <AddToCartButton quantity={"1"} skuCode={product?.sku!} />
      </p>
    </Page>
  );
};

export default PokemonPage;

export const query = graphql`
  query ProductPage($id: String!) {
    productsJson(id: { eq: $id }) {
      name
      sku
      description
    }
  }
`;
