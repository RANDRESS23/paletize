import { PaletteData } from "@/types/palette";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { hexToHsl, hexToRgb } from "@/utils/changeStyleFormat";
import { toast } from "sonner";

interface PaletteProps {
  paletteData: PaletteData | null;
  activeTab: string;
  showAdvanced: boolean;
}

export const Palette = ({
  paletteData,
  activeTab,
  showAdvanced,
}: PaletteProps) => {
  const handleCopy = async (color: string) => {
    try {
      await navigator.clipboard.writeText(color);
      toast.success("¡Color copiado!", {
        description: color,
      });
    } catch (error) {
      toast.error("No se pudo copiar el color");
      console.error("Error al copiar el color:", error);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {paletteData &&
        paletteData[
          activeTab === "dark" && paletteData.supportsDarkMode
            ? "darkPalette"
            : "lightPalette"
        ].map((color, index) => (
          <div key={index} className="group">
            <div
              className="h-24 rounded-md relative overflow-hidden cursor-pointer transition-transform hover:scale-105"
              style={{ backgroundColor: color }}
            >
              <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
              <div className="absolute rounded-b-md bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-2 flex items-center justify-between">
                <span className="text-xs font-mono text-white">{color}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-white/70 hover:text-white hover:bg-white/10"
                  onClick={() => handleCopy(color)}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>
            {showAdvanced && (
              <div className="mt-1 pt-1 text-xs text-gray-500 space-y-1">
                <div className="flex justify-between">
                  <span>RGB:</span>
                  <span>{hexToRgb(color)}</span>
                </div>
                <div className="flex justify-between">
                  <span>HSL:</span>
                  <span>{hexToHsl(color)}</span>
                </div>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};
