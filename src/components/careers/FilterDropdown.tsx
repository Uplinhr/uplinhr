"use client";
import { ChevronDown } from "lucide-react";
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
    <div className="relative flex flex-col gap-[0.3rem] items-center">

      {/* Control principal — glassmorphism pill */}
      <div
        className="relative cursor-pointer"
        onClick={onToggle}
      >
        <motion.div
          whileHover={{ borderColor: "var(--color-uplin-purple-5)" }}
          className="flex items-center gap-2 rounded-full px-[1.1rem] py-[0.6rem] min-w-[200px] border border-white/70 text-[0.95rem] font-medium select-none"
          style={{
            background: "var(--color-uplin-glass-bg-strong)",
            backdropFilter: "blur(14px) saturate(150%)",
            color: "var(--color-uplin-ink)",
            transition: "all var(--transition-uplin-fast)",
          }}
        >
          <span className="flex-1">
            {selectedArea && selectedArea !== "Todas"
              ? selectedArea
              : selectedArea === "Todas"
              ? "Todas las áreas"
              : "Filtrar por área"}
          </span>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0"
            style={{ color: "var(--color-uplin-ink-soft)" }}
          >
            <ChevronDown size={12} />
          </motion.span>
        </motion.div>
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {open && areas.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="absolute top-full mt-2 left-0 z-10 min-w-[200px] rounded-[var(--radius-uplin-md)] overflow-hidden border border-white/70 py-1"
            style={{
              background: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(20px) saturate(160%)",
              boxShadow: "var(--shadow-uplin-glass)",
            }}
          >
            {/* Opción "Todas" */}
            <div
              className="px-4 py-[0.4rem] text-[0.9rem] font-medium cursor-pointer rounded-[var(--radius-uplin-sm)] mx-1 transition-all"
              style={{ color: "var(--color-uplin-ink-soft)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--color-uplin-purple-8)"
                e.currentTarget.style.color = "var(--color-uplin-purple-deep)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent"
                e.currentTarget.style.color = "var(--color-uplin-ink-soft)"
              }}
              onClick={(e) => {
                e.stopPropagation();
                onSelect("Todas");
              }}
            >
              Todas las áreas
            </div>

            {/* Separador */}
            <div
              className="mx-3 my-1 h-px"
              style={{ background: "var(--color-uplin-line)" }}
            />

            {/* Áreas */}
            {areas.map((area) => (
              <div
                key={area}
                className="px-4 py-[0.4rem] text-[0.9rem] font-medium cursor-pointer rounded-[var(--radius-uplin-sm)] mx-1 transition-all"
                style={{
                  color: selectedArea === area
                    ? "var(--color-uplin-purple)"
                    : "var(--color-uplin-ink-soft)",
                  fontWeight: selectedArea === area ? 600 : 500,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--color-uplin-purple-8)"
                  e.currentTarget.style.color = "var(--color-uplin-purple-deep)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent"
                  e.currentTarget.style.color = selectedArea === area
                    ? "var(--color-uplin-purple)"
                    : "var(--color-uplin-ink-soft)"
                }}
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

      {/* Sin áreas disponibles */}
      {areas.length === 0 && (
        <span
          className="text-[0.85rem] italic ml-2"
          style={{ color: "var(--color-uplin-ink-muted)" }}
        >
          No hay áreas disponibles
        </span>
      )}
    </div>
  );
}
