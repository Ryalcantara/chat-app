import { supabaseAdmin } from '@/lib/supabase'
import { headers } from 'next/headers';
export const dynamic = "force-dynamic"
export async function POST(req: Request){
    try {
        const body = await req.json();

        const {data, error} = await supabaseAdmin
            .from('messages')
            .insert({
                message_content: body.message
            })

        if(error){
            throw error;
        }

        return new Response(JSON.stringify({ success: 'Message sent'}),
        { status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        })

    } catch (error) {

              return new Response(JSON.stringify({ error: error}),
        { status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}