import { forwardRef, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';
import { BarcodeReader, StrichSDK, CodeDetection } from '@pixelverse/strichjs-sdk';
import { createBarcodeReaderConfig, sdkLicenseKey } from '../scanner-config.ts';


/**
 * Component props: clients can install a detection handler.
 */
export type BarcodeScannerProps = {
    onDetected: (detections: CodeDetection[]) => void
}

/**
 * Sample component that wraps a BarcodeReader and initializes the STRICH SDK.
 *
 * SDK license key and configuration are obtained from a utility function outside the component, but could also be
 * passed as props.
 */
const BarcodeReaderComponent = forwardRef((props: BarcodeScannerProps, ref) => {

    // a reference to the BarcodeReader host element
    // see: https://docs.strich.io/reference/interfaces/Configuration.html#selector
    const hostElemRef = useRef(null);

    // ref to a BarcodeReader
    // see: https://docs.strich.io/reference/classes/BarcodeReader.html
    const barcodeReaderRef = useRef<BarcodeReader | null>(null);

    // the SDK initialization state
    const [sdkInitialized, setSdkInitialized] = useState(StrichSDK.isInitialized());

    // allow starting/stopping barcode detection from outside the component
    useImperativeHandle(ref, () => ({
        start: () => {
            return barcodeReaderRef.current?.start();
        },
        stop: () => {
            return barcodeReaderRef.current?.stop();
        }
    }));

    // this effect has no dependencies, so it should run only once (except if React StrictMode is on)
    useLayoutEffect(() => {
            const initializeSDK = async () => {
                if (StrichSDK.isInitialized()) {
                    return;
                } else {
                    try {
                        await StrichSDK.initialize(sdkLicenseKey());
                        setSdkInitialized(true);
                    } catch (e) {
                        console.error(`Failed to initialize STRICH SDK: ${e}`);
                    }
                }
            };

            // run async initialization
            if (!sdkInitialized) {
                initializeSDK();
            }
        },
        [sdkInitialized] // empty dependencies array, will trigger only after first render
    );

    // BarcodeReader creation, once SDK is initialized
    useEffect(() => {
        if (sdkInitialized && barcodeReaderRef.current === null) {

            const config = createBarcodeReaderConfig(hostElemRef.current!);
            const barcodeReader = new BarcodeReader(config);
            barcodeReaderRef.current = barcodeReader;
            const initBarcodeReader = async () => {
                await barcodeReader.initialize();

                // when a barcode is detected, propagate it up the component tree
                barcodeReader.detected = props.onDetected;
                await barcodeReader.start();
            };
            initBarcodeReader();

            return () => {
                // destroy the BarcodeReader in the cleanup function
                barcodeReaderRef.current?.destroy();
            };
        }
    }, [sdkInitialized]);

    return (
        <div className='barcode-scanner' ref={hostElemRef}/>
    )
});

export default BarcodeReaderComponent;
