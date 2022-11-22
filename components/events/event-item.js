import Link from "next/link";
import React from "react";
import Button from "../ui/button";
import classes from "./event-item.module.css";
import DateIcon from "../../public/icons/date-icon";
import AddressIcon from "../../public/icons/address-icon";
import ArrowRightIcon from "../../public/icons/arrow-right-icon";

function EventItem(props) {
  const { title, image, date, location, id } = props;

  const formatDate = new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formatAddress = location.replace(", ", "\n");

  const exploreLink = `/events/${id}`;

  return (
    <li className={classes.item}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/${image}`} alt="Image cover" />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{formatDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{formatAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button link={exploreLink}>
            <span>Explore more</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
}

export default EventItem;
