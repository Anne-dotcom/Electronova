import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <main className="container my-4">
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}
