import { OvaCardSkeleton } from './ova-card-skeleton';

interface Props {
  cardNumber?: number;
  viewMode?: 'grid' | 'list';
}

export const OvaViewSkeleton: React.FC<Props> = ({ cardNumber, viewMode = 'grid' }) => {
  const count = cardNumber ?? (viewMode === 'list' ? 6 : 12);
  return (
    <div
      className={`${
        viewMode === 'list' ? 'flex flex-col gap-2' : 'container-grid'
      } container-border px-10 py-8 not-prose z-15 relative bg-[radial-gradient(#80808080_1px,transparent_1px)] shadow-light dark:shadow-dark bg-size-[16px_16px]`}
    >
      {Array.from({ length: count }, (_, index) => (
        <OvaCardSkeleton key={index} viewMode={viewMode} />
      ))}
    </div>
  );
};
