import React, { useState, useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import { type Point, type Polygon } from "../../types/polygonVisualizer ";
import { COLORS, PRESETS } from "../../components/constants";
import { closestPointInPolygon, isPointInPolygon } from "../../utils/geometry";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 60px);
  width: 100%;
  background-color: black;
  color: white;
  overflow: hidden;
  user-select: none;
  position: relative;
`;

const Main = styled.main`
  flex: 1;
  position: relative;
  cursor: none;
`;

const Telemetry = styled.div`
  position: absolute;
  bottom: 2.5rem;
  left: 2.5rem;
  display: flex;
  gap: 3rem;
  align-items: flex-end;
`;

const TelemetryItem = styled.div<{ $highlight?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  label {
    font-size: 9px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: rgba(255, 255, 255, 0.2);
  }

  .value {
    font-size: 1.5rem;
    font-weight: 300;
    letter-spacing: -0.05em;
    font-variant-numeric: tabular-nums;
    color: ${(props) => (props.$highlight ? "#10b981" : "white")};
  }
`;

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
`;

const ValueContainer = styled.div`
  font-size: 1.5rem;
  font-weight: 300;
  letter-spacing: -0.05em;
  font-variant-numeric: tabular-nums;
`;

const Separator = styled.span`
  opacity: 0.2;
  margin: 0 0.25rem;
`;

const ComputationValue = styled.div`
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const PolygonVisualizer: React.FC = () => {
  const [polygons, setPolygons] = useState<Polygon[]>(
    PRESETS.map((p) => p.points)
  );
  const [mousePos, setMousePos] = useState<Point>({ x: -100, y: -100 });

  const [draggedVertex, setDraggedVertex] = useState<{
    polyIdx: number;
    vertIdx: number;
  } | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getCanvasPos = (e: React.MouseEvent | MouseEvent): Point => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const pos = getCanvasPos(e);
      setMousePos(pos);

      if (draggedVertex) {
        setPolygons((prevPolygons) => {
          const newPolys = [...prevPolygons];
          newPolys[draggedVertex.polyIdx] = [
            ...newPolys[draggedVertex.polyIdx],
          ];
          newPolys[draggedVertex.polyIdx][draggedVertex.vertIdx] = pos;
          return newPolys;
        });
      }
    },
    [draggedVertex]
  );

  const handleMouseUp = () => {
    setDraggedVertex(null);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    if (
      canvas.width !== rect.width * dpr ||
      canvas.height !== rect.height * dpr
    ) {
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    }

    ctx.clearRect(0, 0, rect.width, rect.height);
    ctx.fillStyle = COLORS.background;
    ctx.fillRect(0, 0, rect.width, rect.height);

    polygons.forEach((poly) => {
      if (poly.length < 1) return;

      const closest = closestPointInPolygon(poly, mousePos);
      const isInside = isPointInPolygon(poly, mousePos);

      if (!isInside && poly.length >= 3) {
        ctx.beginPath();
        ctx.setLineDash([3, 3]);
        ctx.moveTo(mousePos.x, mousePos.y);
        ctx.lineTo(closest.x, closest.y);
        ctx.strokeStyle = COLORS.line;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.setLineDash([]);
      }

      ctx.beginPath();
      ctx.moveTo(poly[0].x, poly[0].y);
      for (let i = 1; i < poly.length; i++) {
        ctx.lineTo(poly[i].x, poly[i].y);
      }
      ctx.closePath();

      ctx.fillStyle = isInside ? "rgba(40, 40, 40, 1)" : COLORS.polygonFill;
      ctx.fill();
      ctx.strokeStyle = isInside ? "#666" : COLORS.polygonStroke;
      ctx.lineWidth = 1;
      ctx.stroke();

      if (poly.length >= 3) {
        ctx.beginPath();
        ctx.arc(closest.x, closest.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = COLORS.closestPoint;
        ctx.fill();
      }
    });

    ctx.beginPath();
    ctx.arc(mousePos.x, mousePos.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = COLORS.testPoint;
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.2)";
    ctx.lineWidth = 10;
    ctx.stroke();
  }, [polygons, mousePos]);

  useEffect(() => {
    let animationFrameId: number;

    const render = () => {
      draw();
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrameId);
  }, [draw]);

  const activeNodesCount = polygons.reduce((acc, p) => acc + p.length, 0);

  return (
    <Container>
      <Main>
        <Canvas ref={canvasRef} />

        <Telemetry>
          <TelemetryItem>
            <label>Vector Source</label>
            <ValueContainer className="value">
              {Math.round(mousePos.x)}
              <Separator>/</Separator>
              {Math.round(mousePos.y)}
            </ValueContainer>
          </TelemetryItem>

          <TelemetryItem>
            <label>Active Nodes</label>
            <ValueContainer className="value">
              {activeNodesCount}
            </ValueContainer>
          </TelemetryItem>

          <TelemetryItem $highlight>
            <label>Computation</label>
            <ComputationValue className="value">O(n) Linear</ComputationValue>
          </TelemetryItem>
        </Telemetry>
      </Main>
    </Container>
  );
};

export default PolygonVisualizer;
