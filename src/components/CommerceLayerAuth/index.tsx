import { CommerceLayer } from "@commercelayer/react-components/auth/CommerceLayer";
import { OrderContainer } from "@commercelayer/react-components/orders/OrderContainer";
import { OrderStorage } from "@commercelayer/react-components/orders/OrderStorage";
import { authentication } from "@commercelayer/js-auth";
import { useEffect, useState } from "react";
import { CartLink } from "@commercelayer/react-components";

type Props = {
  children: JSX.Element;
  clientId: string;
  slug: string;
  market: number;
};

function CommerceLayerAuth({ children, clientId, slug, market }: Props) {
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function run() {
      if (accessToken == null) {
        const auth = await authentication("client_credentials", {
          clientId,
          slug,
          scope: `market:${market}`,
        });

        setAccessToken(auth.accessToken);
      }
    }

    void run();
  }, [market]);

  if (accessToken == null) {
    return null;
  }

  console.log(`order-${market}`);

  return (
    <CommerceLayer
      accessToken={accessToken}
      endpoint={`https://${slug}.commercelayer.io`}
    >
      <OrderStorage persistKey={`order-${market}`}>
        <OrderContainer>{children}</OrderContainer>
      </OrderStorage>
    </CommerceLayer>
  );
}

export default CommerceLayerAuth;
