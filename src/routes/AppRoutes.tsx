import React from "react";
import { Routes, Route } from "react-router-dom";
import PolygonVisualizer from "../containers/polygonVisualizer/polygonVisualizer";
import PortTemplate from "../containers/portTemplate/PortTemplateDemo";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<PolygonVisualizer />} />
      <Route path="/port-template" element={<PortTemplate />} />
    </Routes>
  );
};

export default AppRoutes;
