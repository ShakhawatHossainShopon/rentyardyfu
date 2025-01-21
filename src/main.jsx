import axe from "@axe-core/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App.jsx";
import { config } from "./config/config.js";
import "./index.css";
import { persistor, store } from "./store/store.js";

const stripePromise = loadStripe(config.key.PUBLISHABLE_KEY);

if (process.env.NODE_ENV !== "production") {
  axe(React, ReactDOM, 1000);
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate
        loading={
          <div className="w-full flex justify-center items-center h-[90vh]">
            <ClipLoader size={100} color="blue" />
          </div>
        }
        persistor={persistor}
      >
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
