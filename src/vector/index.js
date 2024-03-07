import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "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"
});

async function main() {
  const embedding = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: "Gato con botas",
    encoding_format: "float",
  });

  console.log(embedding);
}

main();