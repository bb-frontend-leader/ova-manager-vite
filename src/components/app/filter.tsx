import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Funnel, X } from "lucide-react";

import type { FilterType } from "@/types/ova";

import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

const filterPanelVariants = {
  hidden: {
    opacity: 0,
    y: -20,
    height: 0,
    transition: { when: "afterChildren" },
  },
  visible: {
    opacity: 1,
    y: 0,
    height: "auto",
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
      bounce: 0.3,
      duration: 0.4,
    },
  },
};

const filterCategoryVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

interface Props {
  children?: React.ReactNode;
  filters: FilterType[];
  onFilter: (filters: string[]) => void;
}

export const Filter: React.FC<Props> = ({ children, filters, onFilter }) => {
  const [showFilter, setShowFilter] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  const clearFilters = () => {
    setSelectedFilters([]);
    onFilter([]);
  };

  const applyFilters = () => {
    onFilter(selectedFilters);
  };

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center flex-wrap justify-start gap-6 w-full">
        <Button
          variant="neutral"
          className="w-fit"
          aria-pressed={showFilter}
          aria-label="Toggle filter panel"
          onClick={() => setShowFilter((prev) => !prev)}
        >
          <Funnel className="h-4 w-4" />
          <span className="hidden md:inline-block">Filter</span>
          <motion.span
            animate={{ rotate: showFilter ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown />
          </motion.span>
        </Button>
        {children}
      </div>

      <AnimatePresence>
        {showFilter && (
          <motion.div
            variants={filterPanelVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            layout
            className="space-y-4 container-border overflow-hidden px-10 py-6"
          >
            <div className="flex justify-between items-center pb-2">
              <h2 className="text-xl font-bold">Filter OVAs</h2>
              {selectedFilters.length > 0 && (
                <Button
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={clearFilters}
                >
                  <X className="h-4 w-4" />
                  Clear all
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filters.map((category, index) => (
                <motion.div
                  key={category.name}
                  variants={filterCategoryVariants}
                  custom={index}
                  className="space-y-3"
                >
                  <h3 className="font-bold">{category.name}</h3>
                  <ul className="space-y-2.5 list-none pl-2.5">
                    {category.options.map((option, optionIndex) => (
                      <motion.li
                        key={option}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * optionIndex + 0.2 }}
                      >
                        <label className="space-y-1 text-sm flex items-center gap-2">
                          <Checkbox
                            id={option}
                            checked={selectedFilters.includes(option)}
                            onCheckedChange={() => toggleFilter(option)}
                          />
                          <span className="capitalize">{option}</span>
                        </label>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            <div className="flex gap-4 mt-6">
              <Button variant="neutral" onClick={() => setShowFilter(false)}>
                Close
              </Button>
              <Button onClick={applyFilters} disabled={selectedFilters.length === 0}>
                Apply
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
