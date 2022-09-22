const SUPABASE_URL = 'https://gxwgjhfyrlwiqakdeamc.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNjQxMTMxMiwiZXhwIjoxOTUxOTg3MzEyfQ.PHekiwfLxT73qQsLklp0QFEfNx9NlmkssJFDnlvNIcA';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function getBeanieBabies(title, astroSign) {
    let query = client.from('beanie_babies').select('*').order('title').limit(100);

    if (title) {
        query = query.ilike('title', `%${title}%`);
    }

    if (astroSign) {
        query = query.eq('astroSign', astroSign);
    }

    const response = await query;
    return response;
}

export async function getAstroSigns() {
    let query = client.from('beanie_baby_astro_signs').select('*').order('name');

    const response = await query;
    return response;
}
