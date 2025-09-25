// Google Drive API configuration
const API_KEY = "AIzaSyA_vGN_TXjigtZUxKDsYYRBU8yJnVhqfOg";
const FOLDER_ID = "1vP3xg_n60hFK4tM4QHjXEX8GHhca7OZJ";

export type ImageType = {
  id: string;
  name: string;
  url: string;
};

export const fetchGoogleDriveImages = async (): Promise<ImageType[]> => {
  try {
    // Fetch files from Google Drive API
    const url = `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}' in parents and mimeType contains 'image'&key=${API_KEY}&fields=files(id,name)`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch images: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Map to get the direct media URLs for each image
    const images: ImageType[] = data.files.map((file: any) => ({
      id: file.id,
      name: file.name,
      url: `https://www.googleapis.com/drive/v3/files/${file.id}?alt=media&key=${API_KEY}`, // Direct media URL
    }));

    return images;
  } catch (error) {
    console.error("Google Drive API Error:", error);
    throw new Error("Failed to fetch images from Google Drive");
  }
};