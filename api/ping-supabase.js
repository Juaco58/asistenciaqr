import { createClient } from '@supabase/supabase-js'

// Vercel tomará estas variables automáticamente desde su panel de configuración
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)

export default async function handler(req, res) {
  try {
    // Hace una consulta ultra rápida a la tabla reuniones para simular actividad
    const { data, error } = await supabase.from('reuniones').select('id').limit(1)
    
    if (error) throw error
    
    return res.status(200).json({ success: true, message: 'Supabase despertó correctamente' })
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message })
  }
}
