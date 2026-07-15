"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import BotonVolume from "@/components/BotonVolume/BotonVolume";
import BotonPrimario from "@/components/BotonPrimario/BotonPrimario";
import BotonSecundario from "@/components/BotonSecundario/BotonSecundario";
import { fadeUp } from "@/utils/animations";
import EyebrowPill from "../EyebrowPill/EyebrowPill";
import Title from "../Title/Title";

function getYoutubeEmbedUrl(url: string): string | null {
  const patterns = [
    /youtu\.be\/([^?&/]+)/,
    /youtube\.com\/watch\?v=([^&]+)/,
    /youtube\.com\/embed\/([^?&/]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return `https://www.youtube.com/embed/${match[1]}`;
  }
  return null;
}

interface ServiceHeroProps {
  tag: string;
  title?: {
    before?: string;
    gradient: string;
    after?: string;
  };
  titleSlot?: React.ReactNode;
  gradientClass?: string;
  description: React.ReactNode;
  primaryBtn?: { text: string; href: string };
  secondaryBtn?: { text: string; href: string };
  image?: { src: string; alt: string };
  video?: { url: string; title?: string };
  mediaSlot?: React.ReactNode;
  mediaMaxWidth?: number;
  onTTS?: () => void;
  ttsAriaLabel?: string;
}

export default function ServiceHero({
  tag,
  title,
  titleSlot,
  gradientClass = "gradient-purple-green-orange",
  description,
  primaryBtn,
  secondaryBtn,
  image,
  video,
  mediaSlot,
  mediaMaxWidth,
  onTTS,
  ttsAriaLabel = "Escuchar presentación",
}: ServiceHeroProps) {
  const videoEmbedUrl = video ? getYoutubeEmbedUrl(video.url) : null;
  const resolvedMediaSlot =
    mediaSlot ??
    (videoEmbedUrl ? (
      <div className="aspect-video w-full overflow-hidden rounded-2xl">
        <iframe
          src={videoEmbedUrl}
          className="h-full w-full"
          title={video?.title ?? "Video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    ) : undefined);
  return (
    <>
      <style>{`
        .service-hero {
          position: relative;
          overflow: hidden;
          padding: 7rem 0 4rem;
          z-index: 1;
        }
        @media (max-width: 900px) {
          .service-hero { padding-top: 6rem; }
        }
        @keyframes teamHaloPulse {
          0%, 100% { opacity: 0.85; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.04); }
        }
        @keyframes teamFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
      <section className="service-hero">
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14 items-center max-w-[1280px] mx-auto"
          style={{ padding: "0 clamp(1.25rem, 4vw, 3rem)" }}
        >
          {/* Columna izquierda — contenido */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
            className="order-1 lg:order-none"
            style={{ position: "relative", zIndex: 2 }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "1.5rem" }}>
              <EyebrowPill text={tag} />
              {onTTS && <BotonVolume onClick={onTTS} ariaLabel={ttsAriaLabel} />}
            </div>

            {titleSlot ??
              (title && (
                <Title
                  before={title.before}
                  gradient={title.gradient}
                  after={title.after}
                  gradientClass={gradientClass}
                />
              ))}

            <div
              style={{
                fontSize: "1.05rem",
                lineHeight: 1.7,
                color: "var(--color-uplin-ink-soft)",
                maxWidth: 540,
                margin: "0 0 2rem",
              }}
            >
              {description}
            </div>

            {(primaryBtn || secondaryBtn) && (
              <motion.div
                custom={3}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}
              >
                {primaryBtn && <BotonPrimario text={primaryBtn.text} href={primaryBtn.href} />}
                {secondaryBtn && <BotonSecundario text={secondaryBtn.text} href={secondaryBtn.href} />}
              </motion.div>
            )}
          </motion.div>

          {/* Columna derecha — imagen o slot de media */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.2, 0.7, 0.2, 1], delay: 0.2 }}
            className="order-2 lg:order-none"
            style={{
              position: "relative",
              width: "100%",
              maxWidth: mediaMaxWidth ?? (resolvedMediaSlot ? 560 : 520),
              marginLeft: "auto",
              pointerEvents: resolvedMediaSlot ? "auto" : "none",
            }}
          >
            {resolvedMediaSlot ? (
              resolvedMediaSlot
            ) : image ? (
              <>
                <div
                  style={{
                    position: "absolute",
                    inset: "-15% -18% -15% -12%",
                    borderRadius: "50%",
                    zIndex: -1,
                    filter: "blur(40px)",
                    background:
                      "radial-gradient(ellipse at 30% 30%, rgba(248,154,28,0.25) 0%, transparent 55%), " +
                      "radial-gradient(ellipse at 70% 75%, rgba(109,64,152,0.28) 0%, transparent 55%), " +
                      "radial-gradient(ellipse at center, rgba(114,191,88,0.15) 0%, transparent 60%)",
                    animation: "teamHaloPulse 12s ease-in-out infinite",
                  }}
                />
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={520}
                  height={347}
                  priority
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    aspectRatio: "3/2",
                    objectFit: "cover",
                    objectPosition: "center",
                    filter: "saturate(0.88) contrast(1.04) brightness(1.02)",
                    opacity: 0.92,
                    WebkitMaskImage:
                      "radial-gradient(ellipse 60% 70% at center, #000 0%, rgba(0,0,0,.92) 25%, rgba(0,0,0,.6) 50%, rgba(0,0,0,.25) 72%, rgba(0,0,0,.05) 88%, transparent 100%)",
                    maskImage:
                      "radial-gradient(ellipse 60% 70% at center, #000 0%, rgba(0,0,0,.92) 25%, rgba(0,0,0,.6) 50%, rgba(0,0,0,.25) 72%, rgba(0,0,0,.05) 88%, transparent 100%)",
                    WebkitMaskSize: "100% 100%",
                    maskSize: "100% 100%",
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                    animation: "teamFloat 9s ease-in-out infinite",
                  }}
                />
              </>
            ) : null}
          </motion.div>
        </div>
      </section>
    </>
  );
}
