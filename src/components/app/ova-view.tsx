import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { Drumstick } from 'lucide-react';
import { useLocation } from 'wouter';
import { cleanString } from '@utils/clean-string';

import { type SortOrder, useFilter } from '@/hooks/useFilter';
import type { FilterType, Ova } from '@/types/ova';

import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

import { Filter } from './filter';
import { OvaCard } from './ova-card';
import { SearchBar } from './search-bar';

interface Props {
  data: Ova[];
  groups: string[];
}

export const OvaView: React.FC<Props> = ({ data, groups }) => {
  const [location, setLocation] = useLocation();

  // Parse initial values from URL on mount
  const searchIdx = location.indexOf('?');
  const locationQs = searchIdx >= 0 ? location.slice(searchIdx + 1) : '';
  const urlParams = new URLSearchParams(locationQs);
  const initialSearch = urlParams.get('search') ?? '';
  const initialFilters = urlParams.get('filters') ? urlParams.get('filters')!.split(',') : [];
  const initialSort = (urlParams.get('sort') as SortOrder) ?? 'none';
  const initialView = (urlParams.get('view') as 'grid' | 'list') ?? 'grid';

  const {
    data: filteredData,
    searchTerm,
    activeFilters,
    sortOrder,
    handleSearch,
    handleFilter,
    handleSort
  } = useFilter<Ova>(data, initialSearch, initialFilters, initialSort);

  const [viewMode, setViewMode] = useState<'grid' | 'list'>(initialView);

  // Sync filter state back to URL on every change (skip on first render)
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (activeFilters.length > 0) params.set('filters', activeFilters.join(','));
    if (sortOrder !== 'none') params.set('sort', sortOrder);
    if (viewMode !== 'grid') params.set('view', viewMode);
    const qs = params.toString();
    setLocation(qs ? `/?${qs}` : '/');
  }, [searchTerm, activeFilters, sortOrder, viewMode, setLocation]);

  const filters: FilterType[] = [
    {
      name: 'By group',
      options: groups.map((group) => cleanString(group))
    },
    {
      name: 'By media',
      options: ['audio', 'audio description', 'video', 'subtitles', 'video sign language']
    }
  ];

  return (
    <>
      <Filter
        onFilter={handleFilter}
        filters={filters}
        defaultFilters={initialFilters}
        sortOrder={sortOrder}
        onSort={handleSort}
        viewMode={viewMode}
        onViewMode={setViewMode}>
        <SearchBar onSearch={handleSearch} defaultValue={initialSearch} />
        <p className="text-sm text-muted-foreground ml-auto">
          Showing <span className="font-semibold">{filteredData.length}</span> of{' '}
          <span className="font-semibold">{data.length}</span> OVAs
        </p>
      </Filter>
      <AnimatePresence mode="wait">
        <motion.div
          key={viewMode}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
          className={clsx(
            'container-border px-10 py-8 not-prose z-15 relative bg-[radial-gradient(#80808080_1px,transparent_1px)] shadow-light dark:shadow-dark bg-size-[16px_16px]',
            {
              'container-grid': filteredData.length > 0 && viewMode === 'grid',
              'flex flex-col gap-2': filteredData.length > 0 && viewMode === 'list'
            }
          )}>
          {filteredData.length > 0 ? (
            filteredData.map((ova) => <OvaCard key={ova.id} ova={ova} viewMode={viewMode} />)
          ) : (
            <Alert>
              <Drumstick />
              <AlertTitle>No results found</AlertTitle>
              <AlertDescription>No results were found for the applied search or filter.</AlertDescription>
            </Alert>
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
};
