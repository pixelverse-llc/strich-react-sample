import { useNavigate } from 'react-router-dom';
import { CodeDetection } from '@pixelverse/strichjs-sdk';
import BarcodeReader from '../components/barcode-reader.tsx';

/**
 * Single scan scenario: record the scanned barcode in session storage, and native back to the entry page.
 */
export default function Page() {

    const navigate = useNavigate();
    function finishScanning() {
        navigate('/');
    }

    function onDetected(detections: CodeDetection[]) {
        sessionStorage.setItem('lastCodeScanned', detections[0].data);
        finishScanning();
    }

    return (
        <main className="app-wrapper">
            <header className="top-bar">
                <h3>Single Barcode Scan</h3>
                <button onClick={finishScanning}>EXIT</button>
            </header>
            <BarcodeReader onDetected={onDetected}></BarcodeReader>
        </main>
    )
}
