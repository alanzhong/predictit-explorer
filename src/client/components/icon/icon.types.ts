export interface IconMonstrProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?(event: React.MouseEvent<SVGElement>): void;
}
