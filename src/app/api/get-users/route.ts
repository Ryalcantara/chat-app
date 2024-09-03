import { supabaseAdmin } from '@/lib/supabase'

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const { data, error } = await supabaseAdmin
            .from('users')
            .select('username')

        if (error) {
            throw new Error(error.message || 'Unknown error');
        }

        return new Response(JSON.stringify({ data: data }));

    } catch (error) {
        console.error('Error fetching users:', error);
        return new Response(JSON.stringify({ error:  error.toString() }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    }
}
