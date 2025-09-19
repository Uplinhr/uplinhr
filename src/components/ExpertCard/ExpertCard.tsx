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
    <article className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-4 md:p-5 flex gap-4 md:gap-6">
      {/* Foto con fondo morado */}
      <div className="relative shrink-0 w-28 h-28 md:w-40 md:h-40 rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-[#5C2D91]" />
        <Image src={imageUrl} alt={name} fill className="object-contain p-3" />
      </div>

      <div className="flex-1 min-w-0">
        <header className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl md:text-2xl font-semibold text-[#4B2C7C]">{name}</h3>
            <p className="mt-1 text-[#6D4098] font-medium">{role}</p>
          </div>

          {linkedinUrl && (
            <Link
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#5C2D91] text-[#5C2D91] hover:bg-[#5C2D91] hover:text-white transition-colors"
              aria-label={`Ver LinkedIn de ${name}`}
            >
              <FaLinkedin className="w-5 h-5" />
            </Link>
          )}
        </header>

        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span
              key={t}
              className="inline-block text-sm px-3 py-1 rounded-lg border border-[#5C2D91]/40 text-[#5C2D91] bg-[#F7F2FF]"
            >
              {t}
            </span>
          ))}
        </div>

        <p className="mt-3 text-gray-700 leading-relaxed">{bio}</p>
      </div>
    </article>
  );
}

