
import { supabase } from "@/integrations/supabase/client";


export type ImageType = {
  id: string;
  name: string;
  url: string;
};

export const fetchGoogleDriveImages = async (): Promise<ImageType[]> => {
  try {
    // Use the secure edge function to fetch images
    const { data, error } = await supabase.functions.invoke('google-drive-images');
    
    if (error) {
      throw new Error(`Failed to fetch images: ${error.message}`);
    }

    if (!data || !data.images) {
      throw new Error("No images data received from server");
    }

    return data.images;
  } catch (error) {
    console.error("Google Drive API Error:", error);
    throw new Error("Failed to fetch images from Google Drive");
  }
};