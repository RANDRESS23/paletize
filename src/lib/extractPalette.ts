import { queryDeepSeekAI } from "@/services/getPalette";

export const parseGitHubUrl = (url: string): { owner: string; repo: string } => {
  const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
  if (!match) throw new Error("Invalid GitHub URL");

  return {
    owner: match[1],
    repo: match[2].replace(/\.git$/, ""),
  };
}

export const analyzeRepoDesign = async (repoContent: string): Promise<string> => {
  try {
    const fileMap = extractRelevantFilesFromRepo(repoContent);

    const relevantFiles = Object.entries(fileMap).filter(([filename, _]) =>
      isRelevantFile(filename)
    );

    const contentForAI = relevantFiles
      .map(([filename, content]) => `--- ${filename} ---\n${content}`)
      .join('\n\n');

    const prompt = createPrompt(contentForAI);

    const aiResponse = await queryDeepSeekAI(prompt);

    const json = extractJsonFromResponse(aiResponse);

    return json || "null";
  } catch (error) {
    console.error("analyzeRepoDesign error:", error);
    return `Request error: ${error}`;
  }
};

function extractRelevantFilesFromRepo(repoContent: string): { [filename: string]: string } {
  const fileMap: { [filename: string]: string } = {};
  const fileSplitRegex = /(?:(?:^|\n)([\w\/\.\-]+(?:\.js|\.ts|\.css|\.scss|\.sass|\.html|\.astro|\.mdx|\.json))\n)/g;

  let match: RegExpExecArray | null;
  let lastIndex = 0;
  let lastFilename = '';

  while ((match = fileSplitRegex.exec(repoContent)) !== null) {
    if (lastFilename) {
      const content = repoContent.slice(lastIndex, match.index).trim();
      if (content.length > 0) {
        fileMap[lastFilename] = content;
      }
    }
    lastFilename = match[1];
    lastIndex = fileSplitRegex.lastIndex;
  }

  if (lastFilename) {
    const content = repoContent.slice(lastIndex).trim();
    if (content.length > 0) {
      fileMap[lastFilename] = content;
    }
  }

  return fileMap;
}

function isRelevantFile(filename: string): boolean {
  return [
    '.css', '.scss', '.sass', '.html',
    'tailwind.config.js', 'tailwind.config.ts'
  ].some(ext => filename.endsWith(ext));
}

function createPrompt(content: string): string {
  return `
    Analiza el siguiente contenido de estilos y extrae su paleta de colores.

    Contenido:
    ----
    ${content}
    ----

    Instrucciones:
    - Extrae todos los colores (hex, rgb, rgba, hsl, variables CSS).
    - Si detectas soporte para modo oscuro (dark), indícalo.
    - No expliques nada. Solo responde con este JSON:

    {
      "lightPalette": ["#ffffff", "#e5e7eb"],
      "darkPalette": ["#0f172a"],
      "supportsDarkMode": true
    }

    Si no encuentras estilos o colores, responde solo con:

    null
  `;
}

function extractJsonFromResponse(text: string): string | null {
  const match = text.match(/\{\s*"lightPalette":.*?"supportsDarkMode":\s*(true|false)\s*\}/s);
  return match ? match[0] : null;
}
