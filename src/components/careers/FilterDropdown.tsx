"use client";
import { FaFilter } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

interface FilterDropdownProps {
  areas: string[];
  selectedArea: string;
  open: boolean;
  onToggle: () => void;
  onSelect: (area: string) => void;
}

export default function FilterDropdown({
  areas,
  selectedArea,
  open,
  onToggle,
  onSelect,
}: FilterDropdownProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative flex items-center gap-2 bg-[#6C4099] text-white px-4 py-2 rounded-[10px] w-fit cursor-pointer"
      onClick={onToggle}
    >
      <FaFilter />
      <span>{selectedArea || "Filtrar por área"}</span>
      <motion.div
        animate={{ rotate: open ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <FiChevronDown />
      </motion.div>

      <AnimatePresence>
        {open && areas.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 left-0 bg-white text-[#6C4099] shadow-lg rounded-xl py-2 px-4 flex flex-col min-w-[200px] z-10 font-poppins"
          >
            <div
              className="cursor-pointer py-1 hover:bg-[#6C4099] hover:text-white px-2 rounded-md"
              onClick={(e) => {
                e.stopPropagation();
                onSelect("Todas");
              }}
            >
              Todas
            </div>
            {areas.map((area) => (
              <div
                key={area}
                className="cursor-pointer py-1 hover:bg-[#6C4099] hover:text-white px-2 rounded-md"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(area);
                }}
              >
                {area}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {areas.length === 0 && !open && (
        <span className="text-white text-sm italic ml-2">
          No hay áreas disponibles
        </span>
      )}
    </motion.div>
  );
}
