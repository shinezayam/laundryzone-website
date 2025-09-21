'use client';

import { useParams } from 'next/navigation';
import { JobApplication } from '@/components/JobApplication';

export default function JobApplicationPage() {
  const params = useParams();
  const locale = params.locale as string;
  const jobId = params.jobId as string;

  return <JobApplication jobId={jobId} locale={locale} />;
}
