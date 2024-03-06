import express from "express";
import { createReadStream } from "fs";
import { join } from "path";
const app = express();

const PORT = process.env?.PORT ?? 3000;

/**
 * INICIO DEL SERVICIO EN EL PUERTO DEFINIDO || 3000
 */
const initServer = (botInstance: any) => {
  app.get("/ready", (req, res) => {
    const query = req.query;

    if (query && query?.status === "fail") {
      res.redirect(`http://gabriel-portfolio-red.vercel.app/`);
      return;
    }

    res.send(`Bot funcionando y listo`);
  });

  app.get("/qr", async (_, res) => {
    const PATH_QR = join(process.cwd(), `bot.qr.png`);
    const fileStream = createReadStream(PATH_QR);
    res.writeHead(200, { "Content-Type": "image/png" });
    fileStream.pipe(res);
  });

  app.listen(PORT, () => {
    console.log(`http://locahost:${PORT} listo🏁!`);
    console.log("PATH_QR: ", `http://locahost:${PORT}/qr`, `bot.qr.png`);
  });
};

export { initServer };
