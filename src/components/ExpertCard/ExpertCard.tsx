import Image from "next/image";
import Link from "next/link";
import { FaLinkedin } from "react-icons/fa";

export type Expert = {
  id: string;
  name: string;
  role: string;
  tags: string[];
  bio: string;
  imageUrl: string;
  linkedinUrl?: string;
};

export default function ExpertCard({ expert }: { expert: Expert }) {
  const { name, role, tags, bio, imageUrl, linkedinUrl } = expert;

  return (
    <article
      className="
        bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.06)]
        p-4 md:p-5
        flex flex-col md:flex-row
        items-center md:items-start
        gap-4 md:gap-6
      "
    >
      {/* Foto con fondo morado */}
      <div
        className="
          relative shrink-0
          w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40
          rounded-xl overflow-hidden
          mx-auto md:mx-0
        "
      >
        <div className="absolute inset-0 bg-[#5C2D91]" />
        <Image src={imageUrl} alt={name} fill className="object-contain" />
      </div>

      {/* Contenido */}
      <div className="flex-1 min-w-0 w-full text-center md:text-left">
        <header className="flex items-start justify-center md:justify-between gap-3">
          <div className="w-full">
            <h3 className="text-2xl md:text-2xl font-semibold text-[#4B2C7C]">
              {name}
            </h3>
            <p className="mt-1 text-[#6D4098] font-medium">{role}</p>
          </div>

          {/* LinkedIn (desktop en header) */}
          {linkedinUrl && (
            <Link
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#5C2D91] text-[#5C2D91] hover:bg-[#5C2D91] hover:text-white transition-colors"
              aria-label={`Ver LinkedIn de ${name}`}
            >
              <FaLinkedin className="w-5 h-5" />
            </Link>
          )}
        </header>

        {/* Tags */}
        <div className="mt-3 flex flex-wrap justify-center md:justify-start gap-2">
          {tags.map((t) => (
            <span
              key={t}
              className="inline-block text-sm px-3 py-1 rounded-lg border border-[#5C2D91]/40 text-[#5C2D91] bg-[#F7F2FF]"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Bio */}
        <p className="mt-3 text-gray-700 leading-relaxed">{bio}</p>

        {/* LinkedIn (mobile abajo a la derecha) */}
        {linkedinUrl && (
          <div className="mt-4 flex justify-end md:hidden">
            <Link
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#5C2D91] text-[#5C2D91] hover:bg-[#5C2D91] hover:text-white transition-colors"
              aria-label={`Ver LinkedIn de ${name}`}
            >
              <FaLinkedin className="w-5 h-5" />
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}



