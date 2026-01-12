import type { Preset } from "../types/polygonVisualizer ";

export const PRESETS: Preset[] = [
  {
    name: "Triangle",
    points: [
      { x: 150, y: 100 },
      { x: 250, y: 300 },
      { x: 50, y: 300 },
    ],
  },
  {
    name: "Square",
    points: [
      { x: 450, y: 100 },
      { x: 650, y: 100 },
      { x: 650, y: 300 },
      { x: 450, y: 300 },
    ],
  },
  {
    name: "L-Shape",
    points: [
      { x: 50, y: 400 },
      { x: 150, y: 400 },
      { x: 150, y: 550 },
      { x: 300, y: 550 },
      { x: 300, y: 650 },
      { x: 50, y: 650 },
    ],
  },
  {
    name: "Pentagon",
    points: [
      { x: 550, y: 450 },
      { x: 650, y: 530 },
      { x: 610, y: 650 },
      { x: 490, y: 650 },
      { x: 450, y: 530 },
    ],
  },
];

export const COLORS = {
  background: "#000000",
  polygonFill: "rgba(20, 20, 20, 1)",
  polygonStroke: "#333333",
  testPoint: "#ffffff",
  closestPoint: "#ffffff",
  line: "rgba(255, 255, 255, 0.15)",
  vertexHover: "#ffffff",
};
