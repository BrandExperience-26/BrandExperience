import { cn } from "@/lib/utils";

interface MapViewProps {
  className?: string;
  initialCenter?: { lat: number; lng: number };
  initialZoom?: number;
  onMapReady?: (map: unknown) => void;
}

/**
 * Public map embed for the event venue.
 * It intentionally avoids an API key so the map also renders on Vercel
 * without depending on the previous Forge/Google Maps proxy.
 */
export function MapView({ className }: MapViewProps) {
  const src =
    "https://www.openstreetmap.org/export/embed.html?bbox=-38.53323%2C-3.74069%2C-38.51323%2C-3.72069&layer=mapnik&marker=-3.73069%2C-38.52323";

  return (
    <iframe
      title="Mapa da Faculdade CDL — Rua 25 de Março, 780, Centro, Fortaleza"
      src={src}
      className={cn("w-full h-[500px] border-0", className)}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}
