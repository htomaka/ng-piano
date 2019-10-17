export interface Command {
  label: string;
  exec: () => void;
}
