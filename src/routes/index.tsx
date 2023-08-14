import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Header from "~/components/header/header.tsx";

export default component$(() => {
  return (
    <>
      <header>
        <Header />
      </header>
      <p>Main Page</p>
    </>
  );
});

export const head: DocumentHead = {
  title: "Unknown",
  meta: [
    {
      name: "description",
      content: "Unknown description",
    },
  ],
};
