import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
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