"use client";

import { useState } from "react";
import { Form } from "@/components/Form";
import { ExternalLink, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PaletteData } from "@/types/palette";
import { Palette } from "@/components/Palette";
import { motion } from "framer-motion";
import Link from "next/link";

export const FormAndResults = () => {
  const [repoUrl, setRepoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasResults, setHasResults] = useState(false);
  const [activeTab, setActiveTab] = useState("light");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [paletteData, setPaletteData] = useState<PaletteData | null>(null);

  return (
    <>
      <motion.div
        className="bg-[#111] border border-[#222] rounded-xl p-6 md:p-8 shadow-xl mb-12 relative overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 blur-[50px] rounded-full -z-0"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-pink-500/10 blur-[50px] rounded-full -z-0"></div>

        <Form
          repoUrl={repoUrl}
          setRepoUrl={setRepoUrl}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          setHasResults={setHasResults}
          setPaletteData={setPaletteData}
        />
      </motion.div>

      {hasResults && (
        <motion.div
          className="bg-[#111] border border-[#222] rounded-xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="border-b border-[#222] p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#99a1af"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-github-icon lucide-github"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
              <span className="font-medium">
                {repoUrl.replace("https://github.com/", "")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 text-gray-400 hover:text-white flex justify-center items-center transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Paleta de colores</h2>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Switch
                    id="advanced-mode"
                    checked={showAdvanced}
                    onCheckedChange={setShowAdvanced}
                    className="cursor-pointer"
                  />
                  <Label
                    htmlFor="advanced-mode"
                    className="text-sm text-gray-400 cursor-pointer"
                  >
                    Modo avanzado
                  </Label>
                </div>
                {paletteData?.supportsDarkMode && (
                  <Tabs
                    defaultValue="light"
                    className="w-[180px]"
                    onValueChange={setActiveTab}
                  >
                    <TabsList className="bg-[#1a1a1a] border border-[#333]">
                      <TabsTrigger
                        value="light"
                        className="data-[state=active]:bg-[#333] cursor-pointer"
                      >
                        <Sun className="h-4 w-4 mr-1" />
                        Claro
                      </TabsTrigger>
                      <TabsTrigger
                        value="dark"
                        className="data-[state=active]:bg-[#333] cursor-pointer"
                      >
                        <Moon className="h-4 w-4 mr-1" />
                        Oscuro
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-6">
                <Palette
                  paletteData={paletteData}
                  activeTab={activeTab}
                  showAdvanced={showAdvanced}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};
