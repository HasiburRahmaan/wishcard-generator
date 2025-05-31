interface Box {
  id: string;
  type: 'text' | 'image';
  text: string;
  src?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize?: string;
  fontWeight?: string;
  fontFamily?: string;
  textColor: string;
  backgroundColor: string;
};
