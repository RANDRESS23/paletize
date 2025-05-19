const REQUIRED_ENV_VARS = {
  DEEPSEEK_API_KEY: process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY,
  DEEPSEEK_API_IA: process.env.NEXT_PUBLIC_DEEPSEEK_API_IA,
  DEEPSEEK_TITLE: process.env.NEXT_PUBLIC_DEEPSEEK_TITLE,
  REFERER: process.env.NEXT_PUBLIC_HTTP_REFERER,
};

const { DEEPSEEK_API_KEY, DEEPSEEK_API_IA, DEEPSEEK_TITLE, REFERER } = REQUIRED_ENV_VARS;

export async function queryDeepSeekAI(prompt: string): Promise<string> {
  const response = await fetch(`${DEEPSEEK_API_IA}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
      "HTTP-Referer": `${REFERER}`,
      "X-Title": `${DEEPSEEK_TITLE}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "deepseek/deepseek-r1:free",
      messages: [
        {
          role: "user",
          content: prompt
        },
      ],
    }),
  });

  const data = await response.json();
  return data.choices[0].message.content;
}