// Google Drive API configuration
const API_KEY = process.env.VITE_GOOGLE_API_KEY!;
const FOLDER_ID = process.env.VITE_GOOGLE_FOLDER_ID!;

export type ImageType = {
  id: string;
  name: string;
  url: string;
};

export const fetchGoogleDriveImages = async (): Promise<ImageType[]> => {
  try {
    // Fetch files from Google Drive API with thumbnailLink
    const url = `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}' in parents and mimeType contains 'image'&key=${API_KEY}&fields=files(id,name,thumbnailLink,webViewLink)`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch images: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Map to get public URLs for each image
    const images: ImageType[] = data.files.map((file: any) => ({
      id: file.id,
      name: file.name,
      // Use Google Drive's public sharing URL format which works without authentication
      url: `https://drive.google.com/thumbnail?id=${file.id}&sz=w1000`,
    }));

    return images;
  } catch (error) {
    console.error("Google Drive API Error:", error);
    throw new Error("Failed to fetch images from Google Drive");
  }
};