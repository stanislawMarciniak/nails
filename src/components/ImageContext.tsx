// ImageContext.tsx
import React, { createContext, useContext, useState } from "react";
import { Image as ChakraImage } from "@chakra-ui/react";

type ImageContextType = {
  selectedImage: null | typeof ChakraImage;
  setSelectedImage: React.Dispatch<
    React.SetStateAction<null | typeof ChakraImage>
  >;
};

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export function useImageContext(): ImageContextType {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error("useImageContext must be used within an ImageProvider");
  }
  return context;
}

type ImageProviderProps = {
  children: React.ReactNode;
};

export function ImageProvider({ children }: ImageProviderProps): JSX.Element {
  const [selectedImage, setSelectedImage] = useState<null | typeof ChakraImage>(
    null
  );

  return (
    <ImageContext.Provider value={{ selectedImage, setSelectedImage }}>
      {children}
    </ImageContext.Provider>
  );
}
