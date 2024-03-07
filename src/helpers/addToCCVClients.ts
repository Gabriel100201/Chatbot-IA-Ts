import fs from "fs";
import path from "path";
import CCVClients from "../constants/CCVClients.json";
import { fileURLToPath } from "url";

const currentFilePath = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFilePath);
const CCVpath = path.resolve(currentDir, "../constants/CCVClients.json");

const timeToRemove = 5000; // 1 minuto

export const addToCCVClients = (ctx: any) => {
  const clientNumber = ctx.from;

  CCVClients.push(clientNumber);

  fs.writeFile(CCVpath, JSON.stringify(CCVClients), "utf8", (err) => {
    if (err) {
      console.log("Error al escribir en el archivo JSON:", err);
    } else {
      setTimeout(() => {
        removeFromCCVClients(clientNumber);
      }, timeToRemove);
    }
  });
};

const removeFromCCVClients = (clientNumber: any) => {
  const index = CCVClients.indexOf(clientNumber);
  if (index !== -1) {
    CCVClients.splice(index, 1);
    fs.writeFile(CCVpath, JSON.stringify(CCVClients), "utf8", (err) => {
      if (err) {
        console.log("Error al escribir en el archivo JSON:", err);
      }
    });
  }
};

addToCCVClients({ from: "264440" });
