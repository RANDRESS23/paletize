import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { analyzeRepoDesign, parseGitHubUrl } from "@/lib/extractPalette";
import { fetchRepoAsString } from "@/services/getFilesToRepo";
import { PaletteData } from "@/types/palette";
import { Sparkles } from "lucide-react";
import { SignInButton, SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import confetti from "canvas-confetti";

interface FormProps {
  repoUrl: string;
  setRepoUrl: (url: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  setHasResults: (hasResults: boolean) => void;
  setPaletteData: (data: PaletteData) => void;
}

export const Form = ({
  repoUrl,
  setRepoUrl,
  isLoading,
  setIsLoading,
  setHasResults,
  setPaletteData,
}: FormProps) => {
  const { isSignedIn } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!repoUrl) return;
    if (!isSignedIn) {
      toast.error("Debes iniciar sesión para extraer paletas");
      return;
    }

    setIsLoading(true);

    const { owner, repo } = parseGitHubUrl(repoUrl);
    const repoContent = await fetchRepoAsString(owner, repo);
    const paletteData = await analyzeRepoDesign(repoContent);
    const parsedPaletteData = JSON.parse(paletteData);

    setPaletteData(parsedPaletteData);
    setIsLoading(false);
    setHasResults(parsedPaletteData !== null);

    if (parsedPaletteData === null) {
      toast.error(
        "No se pudo extraer la paleta, intenta de nuevo o refresca la página"
      );
      return;
    }

    confetti();
    toast.success("Paleta extraída correctamente");
  };

  const handleExampleClick = (example: string) => {
    setRepoUrl(example);
    handleSubmit(new Event("submit") as any);
  };

  return (
    <form onSubmit={handleSubmit} className="relative z-10">
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="https://github.com/usuario/repositorio"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            className="bg-[#1a1a1a] border-[#333] h-12 text-white placeholder:text-gray-500"
          />
        </div>
        <Button
          type="submit"
          className="h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
          disabled={isLoading || !repoUrl}
        >
          <SignedOut>
            <SignInButton mode="modal">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                <span>Extraer paleta</span>
              </div>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Analizando...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                <span>Extraer paleta</span>
              </div>
            )}
          </SignedIn>
        </Button>
      </div>

      <div className="text-sm text-gray-400 mb-4">
        Prueba con estos ejemplos:
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="bg-[#1a1a1a] border-[#333] hover:bg-[#222] text-gray-300"
          onClick={() =>
            handleExampleClick("https://github.com/midudev/lolalolitaland.com")
          }
        >
          lolalolitaland.com
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="bg-[#1a1a1a] border-[#333] hover:bg-[#222] text-gray-300"
          onClick={() =>
            handleExampleClick(
              "https://github.com/midudev/la-velada-web-oficial"
            )
          }
        >
          la-velada-web-oficial
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="bg-[#1a1a1a] border-[#333] hover:bg-[#222] text-gray-300"
          onClick={() =>
            handleExampleClick("https://github.com/midudev/jsconf.es")
          }
        >
          jsconf.es
        </Button>
      </div>
    </form>
  );
};
