import BotWhatsapp from '@bot-whatsapp/bot';
import { ChatCompletionMessageParam } from 'openai/resources';
import { run, runDetermine } from 'src/services/openai';
import chatbotFlow from './chatbot.flow';
import vendedor from './vendedor';

/**
 * Un flujo conversacion que es por defecto cunado no se contgiene palabras claves en otros flujos.
 * Es decir, el flujo que hace uso de la IA.
 * El objetivo es persuadir al cliente a hacer uso de otros flujos con la deteccion de palabras clave.
 */
export default BotWhatsapp.addKeyword(BotWhatsapp.EVENTS.WELCOME)
    .addAction(async (ctx, {state, gotoFlow}) => {
        try{
			const history = (state.getMyState()?.history ?? []) as ChatCompletionMessageParam[]
            const ai = await runDetermine(history)

            console.log(`DECIDIDO A COMPRAR?:`,ai.toLowerCase())

            if(ai.toLowerCase().includes('unknown')){
                return 
            }

            if(ai.toLowerCase().includes('decidido')){
                return gotoFlow(vendedor)
            }
            
        }catch(err){
            console.log(`[ERROR]:`,err)
            return
        }
    })
    .addAction(async (ctx, { flowDynamic, state }) => {
        try{
            const newHistory = (state.getMyState()?.history ?? []) as ChatCompletionMessageParam[]
            const name = ctx?.pushName ?? ''
    
/*             console.log(`[HISTORY]:`,newHistory)
 */    
            newHistory.push({
                role: 'user',
                content: ctx.body
            })
    
            const largeResponse = await run(name, newHistory)

            const chunks = largeResponse.split(/(?<!\d)\.\s+/g);
            for (const chunk of chunks) {
                await flowDynamic(chunk)
            }

            newHistory.push({
                role: 'assistant',
                content: largeResponse
            })
        
            await state.update({history: newHistory})
    
        }catch(err){
            console.log(`[ERROR]:`,err)
        }
    })


