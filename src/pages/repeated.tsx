import { useNavigate } from 'react-router-dom';
import { CodeDetection } from '@pixelverse/strichjs-sdk';
import { useRef, useState } from 'react';

import BarcodeReader from '../components/barcode-reader';
import './repeated.css';

/**
 * Repeated scanning scenario:
 * Barcode detection is repeatedly toggled on/off using start()/stop() calls exposed on the Component.
 */
export default function Page() {

    // popup dialog
    const dialogRef = useRef<HTMLDialogElement | null>(null);

    // keep a ref to the BarcodeReader component to allow start/stop
    const barcodeReaderRef = useRef();

    // keep track of number of barcodes scanned and the last barcode
    const [codesScanned, setCodesScanned] = useState(0);
    const [lastCodeScanned, setLastCodeScanned] = useState<string | null>(null);

    const navigate = useNavigate();
    function finishScanning() {
        navigate('/');
    }

    /**
     * Dismiss user prompt, continue detecting barcodes.
     */
    function continueScanning() {
        dialogRef.current?.close();
        // @ts-expect-error type inference through useImperativeHandle not working?
        barcodeReaderRef.current?.start();
    }

    /**
     * Stop barcode detection, update scanned code and count and prompt user to continue or finish scanning.
     */
    function onDetected(detections: CodeDetection[]) {
        // @ts-expect-error type inference through useImperativeHandle not working?
        barcodeReaderRef.current?.stop();
        setCodesScanned(v => v + 1);
        setLastCodeScanned(detections[0].data);
        dialogRef.current?.showModal();
    }

    return (
        <main className="app-wrapper">
            <header className="top-bar">
                <h3>Repeated Scans</h3>
                <button onClick={finishScanning}>EXIT</button>
            </header>
            <BarcodeReader onDetected={onDetected} ref={barcodeReaderRef}></BarcodeReader>
            <dialog className="results-dialog" ref={dialogRef}>
                <p>You have scanned {codesScanned} barcodes.</p>
                {lastCodeScanned !== null && <p>Scanned code: <b>{lastCodeScanned}</b></p> }
                <div className="button-bar">
                    <button onClick={continueScanning}>CONTINUE</button>
                    <button onClick={finishScanning}>FINISH</button>
                </div>
            </dialog>
        </main>
    )
}
