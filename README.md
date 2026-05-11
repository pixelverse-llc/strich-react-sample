# STRICH React Example

This example shows how to integrate STRICH into a web app built with React using functional components.
A license key is required to run this sample, see file `scanner-config.ts`. Check out the [Getting Started](https://docs.strich.io/getting-started.html) guide
if you don't already have a key.

This project was created using `npm create vite@latest strich-react-sample` and choosing `React` and `TypeScript`
options. React StrictMode is disabled in this sample because the scanner component can't handle being initialized twice
in short order.

## Running the Sample

To run the sample, run `npm install` once and then `npm run dev` to start a development server on
`https://localhost:5173`. To expose the development server using HTTPS, you might to use a tool like ngrok.

There is a [PDF test sheet](test-sheet.pdf) included in this repository for testing. If you need to create your own barcodes,
use [Barcode.new](https://barcode.new) or an alternative barcode generator.

## Testing with a Smartphone

You are likely developing a smartphone app, and since the development server is only available on localhost, you will
have trouble connecting to it.

We recommend using tools like [Ngrok](https://ngrok.com) that expose your local development server on a public address that you can
access from your smartphone, see our section [Testing on a Smartphone](https://docs.strich.io/getting-started.html#testing-on-a-smartphone).
