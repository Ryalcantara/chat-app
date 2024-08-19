import { supabase, supabaseAdmin } from "@/lib/supabase";

// export const dynamic = "force-dynamic"
export async function GET(req: Request, res: Response){
    try {
        const { data, error } = await supabaseAdmin
            .from('messages')
            .select('*')
            .order('created_at', {ascending: true})

        if (error) {
            throw error
        }

        return new Response(JSON.stringify({ success: data }))
    } catch (error) {

        return new Response(JSON.stringify({ error: error }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
    }
}
