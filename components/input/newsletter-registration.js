import { useContext, useRef } from "react";
import NotificationContext from "../../store/notification-context";
import classes from "./newsletter-registration.module.css";

function NewsletterRegistration() {
  const userEmailRef = useRef();
  const notificationCtx = useContext(NotificationContext);

  function registrationHandler(event) {
    event.preventDefault();

    const enteredEmail = userEmailRef.current.value;

    notificationCtx.showNotification({
      title: "Signin...",
      message: "Registering for new newsletter",
      status: "pending",
    });

    // fetch user input (state or refs)
    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email: enteredEmail }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        return response.json().then((data) => {
          throw new Error(data.message);
        });
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: "Signed in",
          message: "Registered to write newsletter",
          status: "success",
        });
      })
      .catch((err) => {
        notificationCtx.showNotification({
          title: "Error!",
          message: err.message || "Something went wrong",
          status: "error",
        });
      });
    // optional: validate input
    // send valid data to API
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={userEmailRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
