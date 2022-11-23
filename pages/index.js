import Head from "next/head";
import EventList from "../components/events/event-list";
import NewsletterRegistration from "../components/input/newsletter-registration";
import { getFeaturedEvents } from "../dummy-data";
import styles from "../styles/Home.module.css";

function HomePage() {
  const featuredEvents = getFeaturedEvents();
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
      </Head>
      <NewsletterRegistration />
      <EventList items={featuredEvents} />
    </div>
  );
}

export default HomePage;
