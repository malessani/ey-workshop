// pokemon
import { graphql, PageProps } from "gatsby";
import Page from "../components/Page";
import * as styles from "../components/Page/src/Page.module.scss";
import { AddToCartButton } from "@commercelayer/react-components/orders/AddToCartButton";
import { AvailabilityContainer } from "@commercelayer/react-components/skus/AvailabilityContainer";
import { AvailabilityTemplate } from "@commercelayer/react-components/skus/AvailabilityTemplate";
import { PricesContainer } from "@commercelayer/react-components/prices/PricesContainer";
import { Price } from "@commercelayer/react-components/prices/Price";
import { useState } from "react";

const PokemonPage = ({
  data,
  pageContext,
}: PageProps<Queries.ProductPageQuery, { market: number }>) => {
  const { productsJson: product } = data;
  const [available, setAvailable] = useState(false);
  return (
    <Page title={product?.name || "Name not found"} market={pageContext.market}>
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
          <>
            <AvailabilityContainer
              skuCode={product.sku}
              getQuantity={(quantity) => setAvailable(quantity > 0)}
            >
              <AvailabilityTemplate className={styles.px} />
            </AvailabilityContainer>
            <AddToCartButton
              quantity={"1"}
              disabled={!available}
              skuCode={product.sku}
            />
          </>
        )}
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
