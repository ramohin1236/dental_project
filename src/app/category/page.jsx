"use client";

import dynamic from 'next/dynamic';

// Dynamically import the client component
const CategoryContent = dynamic(
  () => import('./CategoryContent'),
  { 
    loading: () => (
      <div className="min-h-screen flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }
);

export default function CategoryPage() {
  return <CategoryContent />;
}
