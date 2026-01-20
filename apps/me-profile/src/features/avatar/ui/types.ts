export interface AvatarProps {
  url: string;
  onPickFile?: (file: File) => void;
  disabled?: boolean;
}
