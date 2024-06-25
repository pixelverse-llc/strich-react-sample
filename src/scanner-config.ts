import { Configuration } from '@pixelverse/strichjs-sdk';

/**
 * Create BarcodeReader configuration
 *
 * @param hostElem The host element hosting the BarcodeReader
 */
export function createBarcodeReaderConfig(hostElem: HTMLElement): Configuration {

    // see: https://docs.strich.io/reference/interfaces/Configuration.html
    return {
        selector: hostElem,
        engine: {
            symbologies: ['code128', 'qr'], // this is just an example: enable only what you need!
            duplicateInterval: 2500
        }
    };
}

/**
 * The STRICH SDK license key, see: https://docs.strich.io/getting-started.html#creating-a-license-key
 */
export function sdkLicenseKey() {
    return '<YOUR LICENSE KEY>';
}
