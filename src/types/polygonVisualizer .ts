export interface Point {
  x: number;
  y: number;
}

export type Polygon = Point[];

export interface Preset {
  name: string;
  points: Point[];
}
