import BarcodeReader from '../components/barcode-reader.tsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CodeDetection } from '@pixelverse/strichjs-sdk';

import './multiple.css';

/**
 * Multiple scans scenario: continuously scan barcodes until some application-specific logic dictates that we
 * should stop.
 *
 * In this sample, we scan 4 distinct barcodes.
 */
export default function Page() {

    const maxBarcodes = 4;
    const [scannedCodes, setScannedCodes] = useState<string[]>([]);

    const navigate = useNavigate();
    function finishScanning() {
        navigate('/');
    }

    function onDetected(detections: CodeDetection[]) {
        const newCode = detections[0].data;
        if (scannedCodes.length < maxBarcodes && scannedCodes.indexOf(newCode) === -1) {
            setScannedCodes(old => old.concat(newCode));
        }
    }

    return (
        <main className="app-wrapper">
            <header className="top-bar">
                <h3>Multiple Scans</h3>
                <button onClick={finishScanning}>EXIT</button>
            </header>
            <BarcodeReader onDetected={onDetected}></BarcodeReader>
            <section className="barcode-grid">
                <div>{scannedCodes.length > 0 ? scannedCodes[0] : '-'}</div>
                <div>{scannedCodes.length > 1 ? scannedCodes[1] : '-'}</div>
                <div>{scannedCodes.length > 2 ? scannedCodes[2] : '-'}</div>
                <div>{scannedCodes.length > 3 ? scannedCodes[3] : '-'}</div>
            </section>
        </main>
    )
}
