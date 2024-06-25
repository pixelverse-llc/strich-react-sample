# STRICH React Example

This example shows how to integrate STRICH into a web app built with React using functional components.

A license key is required to run this sample, see file `scanner-config.ts`. Check out the [Getting Started guide](https://docs.strich.io/getting-started.html) if you don't already have a key.

This project was scaffolded using `npm create vite@latest strich-react-sample` and choosing `React` and `TypeScript` options.

React StrictMode is disabled in this sample because the scanner component can't handle being initialized twice in short order.

To run the sample, run `npm install` once and then `npm run dev` to start a development server on `https://localhost:5173`. To expose the development server using HTTPS, you might to use a tool like ngrok.
