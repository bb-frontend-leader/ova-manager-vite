import { OvaCardSkeleton } from "./ova-card-skeleton";

interface Props {
  cardNumber?: number;
}

export const OvaViewSkeleton: React.FC<Props> = ({ cardNumber }) => {
  return (
    <div className="container-border container-grid px-10 py-8 not-prose z-[15] relative bg-[radial-gradient(#80808080_1px,transparent_1px)] shadow-light dark:shadow-dark [background-size:16px_16px]">
      {Array.from({ length: cardNumber || 12 }, (_, index) => (
        <OvaCardSkeleton key={index} />
      ))}
    </div>
  );
};
