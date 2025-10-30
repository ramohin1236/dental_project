"use client";
import BreadCrumb from "@/components/shared/BreadCrumb";
import React, { Suspense } from "react";

export const dynamic = 'force-dynamic';

// Client component that will be wrapped in Suspense
function PrivacyPolicyContent() {
  return (
    <div className="min-h-screen bg-[#171717] text-white py-5">
      <div className="container mx-auto flex justify-start items-center">
        <BreadCrumb name="Home" title="Privacy Policy" />
      </div>
      <PrivacyPolicyClient />
    </div>
  );
}

// Separate component that handles the data fetching
function PrivacyPolicyClient() {
  const { data, isFetching, error } = useGetPageByKeyQuery("privacy");
  
  const title = data?.data?.title || data?.title || "Privacy Policy";
  const content = data?.data?.content || data?.content || data?.data || "";

  return (
    <div className="container mx-auto p-5 shadow-lg rounded-lg bg-[#1c1c1c]">
      <section className="px-6 py-12 text-slate-700 leading-relaxed">
        <h1 className="text-2xl font-bold mb-5 text-white">{title}</h1>
        {isFetching && <p className="text-[#9F9C96]">Loading...</p>}
        {error && <p className="text-red-400">Failed to load content.</p>}
        {!isFetching && !error && (
          typeof content === "string" ? (
            <div className="prose prose-invert max-w-none text-white" dangerouslySetInnerHTML={{ __html: content }} />
          ) : (
            <pre className="text-white whitespace-pre-wrap">{JSON.stringify(content, null, 2)}</pre>
          )
        )}
      </section>
    </div>
  );
}

// Import the hook dynamically to avoid SSR issues
const useGetPageByKeyQuery = (key) => {
  // This will be replaced by the actual hook when the component mounts
  const [data, setData] = React.useState(null);
  const [isFetching, setIsFetching] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const { useGetPageByKeyQuery: getPageByKey } = await import('@/redux/feature/pages/pagesApi');
        const { data, isFetching, error } = getPageByKey(key);
        setData(data);
        setIsFetching(isFetching);
        if (error) setError(error);
      } catch (err) {
        setError(err);
      } finally {
        setIsFetching(false);
      }
    };

    fetchData();
  }, [key]);

  return { data, isFetching, error };
};

// Main page component with Suspense boundary
export default function PrivacyPolicy() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#171717]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    }>
      <PrivacyPolicyContent />
    </Suspense>
  );
}