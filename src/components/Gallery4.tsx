import React, { useState, useEffect } from "react";
import { Dialog, DialogPortal, DialogOverlay } from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { fetchGoogleDriveImages, type ImageType } from "@/services/googleDrive";
import { cn } from "@/lib/utils";

const GalleryAPI: React.FC = () => {
  const [images, setImages] = useState<ImageType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null); // To handle the image clicked for the modal
  const [openModal, setOpenModal] = useState<boolean>(false); // To control modal visibility

  useEffect(() => {
    const loadImages = async () => {
      try {
        const images = await fetchGoogleDriveImages();
        setImages(images);
        console.log("Fetched Images:", images);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, []);

  const handleImageClick = (image: ImageType) => {
    setSelectedImage(image);
    setOpenModal(true); // Open the modal when an image is clicked
  };

  const toggleModal = () => {
    setOpenModal(!openModal); // Toggle the modal open/close state
  };

  if (loading) return <p>Loading images...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="pt-2">
      <h2 className="text-2xl font-bold mb-4">Image Gallery</h2>
      {images.length === 0 ? (
        <p>No images found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="border rounded-lg shadow"
              onClick={() => handleImageClick(image)} // Handle image click
            >
              <img
                src={image.url}
                alt={image.name}
                className="h-80 w-full max-w-full rounded-lg object-cover object-center cursor-pointer"
                onError={(e) => {
                  console.error('Failed to load image:', image.name, image.url);
                  // Fallback to a different URL format if the first one fails
                  e.currentTarget.src = `https://drive.google.com/uc?id=${image.id}`;
                }}
              />
              <p className="text-sm text-center mt-2">{image.name}</p>
            </div>
          ))}
        </div>
      )}

      {/* Dialog modal for larger image view */}
      {selectedImage && (
        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <DialogPortal>
            <DialogOverlay />
            <DialogPrimitive.Content
              className={cn(
                "fixed left-[50%] top-[50%] z-50 grid w-full max-w-4xl translate-x-[-50%] translate-y-[-50%] gap-4 border-0 bg-black/90 backdrop-blur-sm p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg cursor-pointer max-h-[90vh] overflow-auto"
              )}
              onClick={() => setOpenModal(false)}
            >
              <div className="flex justify-center items-center">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.name}
                  className="max-w-full max-h-full rounded-lg"
                  onError={(e) => {
                    e.currentTarget.src = `https://drive.google.com/uc?id=${selectedImage.id}`;
                  }}
                />
              </div>
              <p className="text-center mt-4 text-white">{selectedImage.name}</p>
            </DialogPrimitive.Content>
          </DialogPortal>
        </Dialog>
      )}
    </div>
  );
};

export default GalleryAPI;
