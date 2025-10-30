import { Suspense } from 'react';
import ProcedureGuideContent from './ProcedureGuideContent';

export default function ProcedureGuide() {
  return (
    <Suspense fallback={
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <ProcedureGuideContent />
    </Suspense>
  );
}
