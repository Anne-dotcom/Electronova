import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CartProvider } from '../app/context/CartContext';

export const metadata = {
  title: 'Electronova',
  description: 'Your one-stop shop for electronic devices',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          <main className="container my-4">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}