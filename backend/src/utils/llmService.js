import OpenAI from "openai";
import { GoogleGenAI } from "@google/genai";
import { config } from "../config.js";

let llmClient = null;
let llmProvider = null;

function initializeLLM() {
  if (llmClient) return llmClient;

  const provider = config.llm.provider || "gemini"; 
  llmProvider = provider;

  if (provider === "openai") {
    if (!config.llm.openaiApiKey) {
      throw new Error("OPENAI_API_KEY not set in environment variables");
    }

    llmClient = new OpenAI({
      apiKey: config.llm.openaiApiKey,
    });

  } else if (provider === "gemini") {
    if (!config.llm.geminiApiKey) {
      throw new Error("GEMINI_API_KEY not set in environment variables");
    }

    llmClient = new GoogleGenAI({
      apiKey: config.llm.geminiApiKey,
    });

  } else {
    throw new Error(`Unknown LLM provider: ${provider}`);
  }

  return llmClient;
}

export const generateHint = async (
  assignmentTitle,
  assignmentDescription,
  assignmentQuestion,
  schema,
  hintPrompt,
  userQuery = null
) => {
  try {
    const client = initializeLLM();
    const schemaText = formatSchemaForPrompt(schema);

    const systemPrompt = `
You are a helpful SQL tutor. Your job is to provide hints to help students learn SQL, NOT to give away the solution.

IMPORTANT RULES:
1. NEVER provide the complete SQL solution
2. NEVER write actual SQL code
3. ONLY provide conceptual hints
4. Guide thinking, don't solve
5. Ask guiding questions when helpful
`;

    let userPrompt = `
Assignment: "${assignmentTitle}"

Description:
${assignmentDescription}

Question:
${assignmentQuestion}

Database Schema:
${schemaText}

Hint Guidance:
${hintPrompt}

Remember: NO SQL CODE. Only conceptual hints.
`;

    if (userQuery) {
      userPrompt += `
User's Current Attempt:
${userQuery}

Give guidance based on what they may be missing.
`;
    }

    let hint;
    if (llmProvider === "gemini") {
      const response = await client.models.generateContent({
        model: "gemini-2.5-flash",
        contents: systemPrompt + "\n\n" + userPrompt,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 300,
        },
      });

      hint = response.text?.trim();
    }

    else if (llmProvider === "openai") {
      const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 300,
      });

      hint = response.choices[0]?.message?.content?.trim();
    }

    if (!hint) {
      throw new Error("Empty response from LLM");
    }

    return hint;

  } catch (err) {
    console.error("LLM hint generation error:", err);

    // ✅ Safe fallback (very important for production)
    return `
Think about:
- Which table contains the required data?
- Do you need filtering using conditions?
- Are you selecting the correct columns?
- Is there a grouping or aggregation involved?
`;
  }
};
function formatSchemaForPrompt(schema) {
  if (!schema || !schema.tables) {
    return "No schema information available";
  }

  const lines = [];

  schema.tables.forEach((table) => {
    lines.push(`Table: ${table.name}`);

    if (table.columns) {
      table.columns.forEach((col) => {
        lines.push(
          `  - ${col.name} (${col.type})`
        );
      });
    }

    lines.push("");
  });

  return lines.join("\n");
}