import Layout from "../components/layout/layout";
import Notification from "../components/ui/notification";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
      <Notification
        title="Test"
        message="This is the first test."
        status="success"
      />
    </Layout>
  );
}

export default MyApp;
