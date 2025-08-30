import Link from 'next/link';

export default function Home() {
  return (
    <div className="text-center">
      <h1>Welcome to Electronova</h1>
      <p>Your one-stop shop for the latest electronics</p>
      <Link href="/products" className="btn btn-primary mt-3">
        Shop Now
      </Link>
    </div>
  );
}
