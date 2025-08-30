import Link from 'next/link';
import "../globals.css";

export default function Dashboard() {
  return (
    <div className='max-w-6xl h-screen'>
      <div className='min-h-70vh bg-gray-300 flex flex-col'>
        <h1 className='text-bold bg-yellow-100 flex border-b'>Dashboard</h1>
        <button>
          <Link href="/">Go to Home</Link>
        </button>
      </div>
    </div>
    );
  }
