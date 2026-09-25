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
    "https://www.openstreetmap.org/export/embed.html?bbox=-38.5367%2C-3.7375%2C-38.5167%2C-3.7175&layer=mapnik&marker=-3.7275%2C-38.5267";

  return (
    <iframe
      title="Mapa da Faculdade CDL — Centro, Fortaleza"
      src={src}
      className={cn("w-full h-[500px] border-0", className)}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}
