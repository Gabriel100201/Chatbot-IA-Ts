import BotWhatsapp from "@bot-whatsapp/bot";

/**
 * Un flujo conversacion que responder cuando el cliente esta interesado en un producto ...
 */
export default BotWhatsapp.addKeyword(BotWhatsapp.EVENTS.ACTION).addAnswer(
  "En unos minutos un vendedor de technodevs de pondrá en contacto contigo😃🕑"
);
