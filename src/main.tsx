// Interactive catalogue entry, built into /showcase/ before Astro assembles the site.
import React from "react";
import { createRoot } from "react-dom/client";
import ShowcaseApp from "./ShowcaseApp";
createRoot(document.getElementById("root")!).render(<React.StrictMode><ShowcaseApp /></React.StrictMode>);
