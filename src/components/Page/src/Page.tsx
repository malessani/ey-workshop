// Page.tsx
import { CartLink } from "@commercelayer/react-components/orders/CartLink";
import CommerceLayerAuth from "../../CommerceLayerAuth";
import * as styles from "./Page.module.scss";
import { Link } from "gatsby";

export type PageProps = {
  children: React.ReactNode;
  title: React.ReactNode;
  market?: number;
};

const marketNumber = 13502;

const clientId = `${process.env.CLIENT_ID}`;
const slug = `${process.env.SLUG}`;

const Page = ({ children, title, market }: PageProps) => {
  return (
    <CommerceLayerAuth clientId={clientId} slug={slug} market={market ?? 13502}>
      <main className={styles.page}>
        <Link to="/">Home</Link> | <CartLink label="Cart" />
        <h1 className={styles.title}>{title}</h1>
        <div>{children}</div>
      </main>
    </CommerceLayerAuth>
  );
};

export default Page;
