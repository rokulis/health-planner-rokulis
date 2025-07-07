import React from 'react';

import { Search } from 'lucide-react';
import { useDebounce } from 'use-debounce';

import { useRouter } from 'next/navigation';

import { Input } from '@/commons/components/ui/input';

export const SearchInput = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchValue] = useDebounce(searchTerm, 500);
  const router = useRouter();

  React.useEffect(() => {
    router.push(`?search=${encodeURIComponent(searchValue)}`);
  }, [searchValue, router]);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          onChange={e => setSearchTerm(e.target.value)}
          type="text"
          placeholder="Search"
          className="pl-10 pr-4 py-2 w-full rounded-full border border-gray-200 bg-gray-50 focus:bg-white focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors"
        />
      </div>
    </div>
  );
};
