const REQUIRED_ENV_VARS = {
  GITHUB_TOKEN: process.env.NEXT_PUBLIC_GITHUB_TOKEN,
};

const { GITHUB_TOKEN } = REQUIRED_ENV_VARS;

export const fetchRepoAsString = async (
  owner: string,
  repo: string,
  branch = "main"
): Promise<string> => {
  const baseUrl = `https://api.github.com/repos/${owner}/${repo}`;

  try {
    const treeRes = await fetch(`${baseUrl}/git/trees/${branch}?recursive=1`, 
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json"
        }
      }
    );
    const treeData = await treeRes.json();

    if (!treeData.tree) throw new Error("No se pudo obtener el árbol del repositorio");

    const relevantExtensions = [
      ".css", ".scss", ".sass", ".html",
      "tailwind.config.js", "tailwind.config.ts"
    ];

    const relevantFiles = treeData.tree
      .filter((item: any) => item.type === "blob")
      .filter((item: any) =>
        relevantExtensions.some(ext => item.path.endsWith(ext))
      );

    const files: string[] = [];

    for (const file of relevantFiles) {
      const contentRes = await fetch(`${baseUrl}/contents/${file.path}`, 
        {
          headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            Accept: "application/vnd.github.v3+json"
          }
        }
      );
      const contentData = await contentRes.json();

      if (contentData.content) {
        const decoded = Buffer.from(contentData.content, "base64").toString("utf-8");
        files.push(`${file.path}\n${decoded}`);
      }
    }

    return files.join("\n\n");
  } catch (error) {
    console.error("fetchRepoAsString error:", error);
    return "";
  }
};