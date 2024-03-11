export const BREAKPOINT_VALUES = {
  base: 2,
  sm: 2,
  md: 3,
  lg: 4,
};

export const getHostName = () =>
  `${window.location.protocol}//${window.location.host}`;

export const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
export const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

export const createShortLink = (flyboothId: string) => {
  return flyboothId.split("-")[1];
};

export const CLOUDINARY_FOLDER = process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER;

export const InterfaceSections = {
  both: "both",
  photos: "photos",
  messages: "messages",
} as const;
export type InterfaceSections = keyof typeof InterfaceSections;
