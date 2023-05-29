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

const clientId = `${process.env.GATSBY_CLIENT_ID}`;
const slug = `${process.env.GATSBY_SLUG}`;

const Page = ({ children, title, market }: PageProps) => {
  return (
    <CommerceLayerAuth clientId={clientId} slug={slug} market={market ?? 13502}>
      <main className={styles.page}>
        <Link to="/">Home</Link> |<h1 className={styles.title}>{title}</h1>
        <div>{children}</div>
      </main>
    </CommerceLayerAuth>
  );
};

export default Page;
