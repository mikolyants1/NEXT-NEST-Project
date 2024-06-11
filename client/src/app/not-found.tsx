
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { getCookie } from '@/model/hooks/getCookie';

const NotFound = () => {
  const userId = getCookie("userId");
  return (
    <div className="flex flex-col items-center justify-center py-60 px-4">
      <div className="font-bold text-2xl uppercase mb-2">
        Page not found...
      </div>
      <Link href={`/main/${userId}`} className="block">
        <div className='flex gap-x-1 items-center'>
          <ChevronLeftIcon className="w-5 h-5" />
            Back home
        </div>
      </Link>
    </div>
  );
};

export default NotFound;