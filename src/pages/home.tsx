import { Link } from 'react-router-dom';

import './home.css'

function Home() {
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
        </main>
    )
}
export default Home
