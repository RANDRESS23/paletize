import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FormAndResults } from "@/sections/FormAndResults";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />

      <main className="flex-1 mx-auto max-w-7xl py-14 md:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 relative">
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[70%] md:w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px] -z-10"></div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500">
              Extrae paletas de colores de tus repositorios
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Analiza automáticamente los colores utilizados en tu código y
              obtén la paleta de colores de tus proyectos de GitHub.
            </p>
          </div>

          <FormAndResults />
        </div>
      </main>

      <Footer />
    </div>
  );
}
