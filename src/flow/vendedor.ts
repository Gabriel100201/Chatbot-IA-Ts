import BotWhatsapp from "@bot-whatsapp/bot";

/**
 * Un flujo conversacion que responder cuando el cliente esta interesado en un producto ...
 */
export default BotWhatsapp.addKeyword(BotWhatsapp.EVENTS.ACTION)
  .addAction(async (ctx) => {
    console.log(
      `Enviar un mail con el con el numero de la persona: ${ctx.from}`
    );
  })
  .addAnswer(
    "En unos minutos un vendedor de technodevs de pondrá en contacto contigo😃🕑"
  );