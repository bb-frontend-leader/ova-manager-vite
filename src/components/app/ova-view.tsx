import clsx from "clsx";
import { Drumstick } from "lucide-react";
import { cleanString } from "@utils/clean-string";

import { useFilter } from "@/hooks/useFilter";
import type { FilterType, Ova } from "@/types/ova";

import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

import { Filter } from "./filter";
import { OvaCard } from "./ova-card";
import { SearchBar } from "./search-bar";

interface Props {
  data: Ova[];
  groups: string[];
}

export const OvaView: React.FC<Props> = ({ data, groups }) => {
  const {
    data: filteredData,
    handleSearch,
    handleFilter,
  } = useFilter<Ova>(data);

  const filters: FilterType[] = [
    {
      name: "By group",
      options: groups.map((group) => cleanString(group)),
    },
    {
      name: "By media",
      options: [
        "audio",
        "audio description",
        "video",
        "subtitles",
        "video sign language",
      ],
    },
  ];

  return (
    <>
      <Filter onFilter={handleFilter} filters={filters}>
        <SearchBar onSearch={handleSearch} />
      </Filter>
      <div
        className={clsx(
          "container-border px-10 py-8 not-prose z-[15] relative bg-[radial-gradient(#80808080_1px,transparent_1px)] shadow-light dark:shadow-dark [background-size:16px_16px]",
          {
            "container-grid": filteredData.length > 0,
          }
        )}
      >
        {filteredData.length > 0 ? (
          filteredData.map((ova) => <OvaCard key={ova.id} ova={ova} />)
        ) : (
          <Alert>
            <Drumstick />
            <AlertTitle>No results found</AlertTitle>
            <AlertDescription>
              No results were found for the applied search or filter.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </>
  );
};
