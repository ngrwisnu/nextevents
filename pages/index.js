import Head from "next/head";
import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../dummy-data";
import styles from "../styles/Home.module.css";

function HomePage() {
  const featuredEvents = getFeaturedEvents();
  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
}

export default HomePage;
