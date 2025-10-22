import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const apiKey = Deno.env.get('GOOGLE_API_KEY')
    const folderId = Deno.env.get('GOOGLE_FOLDER_ID')

    if (!apiKey || !folderId) {
      console.error('Missing environment variables:', { 
        hasApiKey: !!apiKey, 
        hasFolderId: !!folderId 
      })
      throw new Error('Missing Google API configuration')
    }

    console.log('Fetching Google Drive images from folder:', folderId)

    // Fetch files from Google Drive API
    const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}' in parents and mimeType contains 'image'&key=${apiKey}&fields=files(id,name,thumbnailLink,webViewLink)`
    
    const response = await fetch(url)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('Google Drive API Error:', response.status, errorText)
      throw new Error(`Failed to fetch images: ${response.statusText}`)
    }

    const data = await response.json()
    console.log('Google Drive API response:', data)
    
    // Map to get public URLs for each image
    const images = data.files?.map((file: any) => ({
      id: file.id,
      name: file.name,
      // Use Google Drive's public sharing URL format which works without authentication
      url: `https://drive.google.com/thumbnail?id=${file.id}&sz=w1000`,
    })) || []

    console.log(`Successfully fetched ${images.length} images`)

    return new Response(
      JSON.stringify({ images }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  } catch (error) {
    console.error('Error in google-drive-images function:', error)
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        images: []
      }),
      { 
        status: 500, 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})