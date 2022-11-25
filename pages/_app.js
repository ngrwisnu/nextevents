import Layout from "../components/layout/layout";
import Notification from "../components/ui/notification";
import { NotificationContextProvider } from "../store/notification-context";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Component {...pageProps} />
        <Notification
          title="Test"
          message="This is the first test."
          status="success"
        />
      </Layout>
    </NotificationContextProvider>
  );
}

export default MyApp;
