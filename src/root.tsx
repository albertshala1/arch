import "./global.css";
import { component$ } from "@builder.io/qwik";
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";

export default component$(() => {
  return (
    /**
     * The root of a QwikCity site always start with the <QwikCityProvider> component,
     * immediately followed by the document's <head> and <body>.
     *
     * Dont remove the `<head>` and `<body>` elements.
     */
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
      </head>
      <body lang="en" class="h-screen overflow-hidden">
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});
