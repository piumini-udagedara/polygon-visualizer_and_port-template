import type { Point } from "../types/polygonVisualizer ";

const EPSILON = 1e-9;

/**
 * Standard Ray Casting algorithm to check if a point is inside a polygon.
 * Time Complexity: O(n)
 */
export const isPointInPolygon = (poly: Point[], pos: Point): boolean => {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i].x,
      yi = poly[i].y;
    const xj = poly[j].x,
      yj = poly[j].y;

    const intersect =
      yi > pos.y !== yj > pos.y &&
      pos.x < ((xj - xi) * (pos.y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
};

/**
 * Finds the closest point on a line segment [a, b] to point p.
 */
export const getClosestPointOnSegment = (
  p: Point,
  a: Point,
  b: Point
): Point => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;

  if (Math.abs(dx) < EPSILON && Math.abs(dy) < EPSILON) return a;

  const t = ((p.x - a.x) * dx + (p.y - a.y) * dy) / (dx * dx + dy * dy);
  const clampedT = Math.max(0, Math.min(1, t));

  return {
    x: a.x + clampedT * dx,
    y: a.y + clampedT * dy,
  };
};

/**
 * Calculates distance between two points.
 */
export const getDistance = (p1: Point, p2: Point): number => {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
};

/**
 * Requirement: Returns the closest point to `pos` that lies inside or on the boundary
 * of the polygon `poly`.
 * Time Complexity: O(n)
 */
export const closestPointInPolygon = (poly: Point[], pos: Point): Point => {
  if (poly.length === 0) return pos;
  if (poly.length === 1) return poly[0];

  // 1. If inside or on edge, return pos itself
  if (isPointInPolygon(poly, pos)) {
    return pos;
  }

  // 2. Otherwise, check each edge and find the closest point
  let minDistance = Infinity;
  let closest: Point = poly[0];

  for (let i = 0; i < poly.length; i++) {
    const a = poly[i];
    const b = poly[(i + 1) % poly.length];

    const candidate = getClosestPointOnSegment(pos, a, b);
    const dist = getDistance(pos, candidate);

    if (dist < minDistance) {
      minDistance = dist;
      closest = candidate;
    }
  }

  return closest;
};
