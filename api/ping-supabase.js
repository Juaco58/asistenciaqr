import { createClient } from '@supabase/supabase-js'

// Usamos SERVICE_ROLE_KEY para asegurar que la consulta se ejecute saltando el RLS
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL, 
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {
  // 1. Validar que la petición venga estrictamente de Vercel Cron
  const authHeader = req.headers['authorization']
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ success: false, error: 'No autorizado' })
  }

  try {
    // 2. Consulta real a tu tabla reuniones
    const { data, error } = await supabase.from('reuniones').select('id').limit(1)
    
    if (error) throw error
    
    return res.status(200).json({ success: true, message: 'Supabase desperto correctamente' })
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message })
  }
}
