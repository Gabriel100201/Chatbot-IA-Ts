import BotWhatsapp from '@bot-whatsapp/bot';
import { ChatCompletionMessageParam } from 'openai/resources';
import { run, runDetermine } from 'src/services/openai';
import vendedor from './vendedor';
import { addToCCVClients } from 'src/helpers/addToCCVClients';
import CCVClients from "../constants/CCVClients.json";

/**
 * Un flujo conversacion que es por defecto cunado no se contgiene palabras claves en otros flujos.
 * Es decir, el flujo que hace uso de la IA.
 * El objetivo es persuadir al cliente a hacer uso de otros flujos con la deteccion de palabras clave.
 */
export default BotWhatsapp.addKeyword(BotWhatsapp.EVENTS.WELCOME)
    .addAction(async (ctx, {state, gotoFlow}) => {
        if (CCVClients.includes(ctx.from)) return
        try{
			const history = (state.getMyState()?.history ?? []) as ChatCompletionMessageParam[]
            const ai = await runDetermine(history)

            if(ai.toLowerCase().includes('unknown')){
                return 
            }

            if(ai.toLowerCase().includes('decidido')){
                addToCCVClients(ctx);
                return gotoFlow(vendedor)
            }
            
        }catch(err){
            console.log(`[ERROR]:`,err)
            return
        }
    })
    .addAction(async (ctx, { flowDynamic, state }) => {
        if (CCVClients.includes(ctx.from)) return
        try{
            const newHistory = (state.getMyState()?.history ?? []) as ChatCompletionMessageParam[]
            const name = ctx?.pushName ?? ''
    
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


