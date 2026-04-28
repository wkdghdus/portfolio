export type GalleryAsset =
  | { kind: 'image'; src: string; name: string }
  | { kind: 'pdf'; src: string; name: string }
