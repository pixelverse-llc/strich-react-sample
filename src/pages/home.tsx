import { Link } from 'react-router-dom';
import { useState } from 'react';

import { StrichSDK, PopupScanner } from '@pixelverse/strichjs-sdk';
import { sdkLicenseKey } from '../scanner-config.ts';

import './home.css'

function Home() {

    const [scannedCode, setScannedCode] = useState<string>();

    /**
     * Scan barcodes using the PopupScanner, see: https://docs.strich.io/the-popup-scanner.html
     */
    async function scanWithPopup() {
        if (!StrichSDK.isInitialized()) {
            await StrichSDK.initialize(sdkLicenseKey());
        }
        const detections = await PopupScanner.scan({ symbologies: ['code128', 'qr'] });
        if (detections) {
            setScannedCode(detections[0].data);
        }
    }

    return (
        <main className='home-container'>
            <header>
                <h2>STRICH React Sample</h2>
            </header>
            <p>Enabled symbologies: <b>Code 128, QR</b>.</p>
            <section>
                <header><h3>Single Scan</h3></header>
                <p>Scan a single barcode and return here.</p>
                <Link to={`/single`}>Start Single</Link>
            </section>
            <section>
                <header><h3>Repeated Scans</h3></header>
                <p>Repeatedly scan barcodes, pausing and resuming the scanner until done.</p>
                <Link to={`/repeated`}>Start Repeated</Link>
            </section>
            <section>
                <header><h3>Multiple Scans</h3></header>
                <p>Scan continuously until a number of distinct barcodes are scanned.</p>
                <Link to={`/multiple`}>Start Multiple</Link>
            </section>
            <section>
                <header><h3>PopupScanner</h3></header>
                <p>Scan using the built-in PopupScanner UI.</p>
                <button onClick={scanWithPopup}>Scan with Popup</button>
                <p>Scanned code: {scannedCode}</p>
            </section>
        </main>
    )
}
export default Home
