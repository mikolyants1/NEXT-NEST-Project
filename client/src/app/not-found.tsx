
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { getCookie } from '@/model/hooks/getCookie';

const NotFound = ():JSX.Element => {
  const cookieStore:ReadonlyRequestCookies = cookies();
  const isUser = cookieStore.has("userId");
  const href = isUser ? `main/${getCookie("userId")}` : "";

  return (
    <div className="flex flex-col items-center justify-center py-60 px-4">
      <div className="font-bold text-2xl uppercase mb-2">
        Page not found...
      </div>
      <Link href={`/${href}`} className="block">
        <div className='flex gap-x-1 items-center'>
          <ChevronLeftIcon className="w-5 h-5" />
            Back home
        </div>
      </Link>
    </div>
  );
};

export default NotFound;