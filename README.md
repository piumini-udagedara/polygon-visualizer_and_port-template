# XYIcon Assessment

A React application featuring two interactive visualization and editing tools built with TypeScript, Vite, and styled-components.

## Features

### 1. Polygon Visualizer
An interactive canvas-based polygon visualization tool that allows you to:
- Visualize multiple polygons in real-time
- Test point-in-polygon calculations with mouse movement
- Edit polygon vertices by dragging them
- View telemetry data including vector source, active nodes, and computation complexity
- Switch between Analyze and Edit modes

### 2. Port Template
A hierarchical tree structure editor with the following capabilities:
- **Editable Labels**: Click on any node label to edit it inline
- **Read-only Toggle**: Mark nodes as read-only to prevent editing
- **Add Nodes**: Add child nodes or root-level nodes
- **Delete Nodes**: Remove nodes from the tree
- **Expand/Collapse**: Expand or collapse nodes with children
- **Full-page Layout**: Responsive design that adapts to different screen sizes

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **styled-components** - CSS-in-JS styling
- **lucide-react** - Icon library

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd xyicon_assessment
```

2. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

Create a production build:
```bash
npm run build
```

### Preview

Preview the production build:
```bash
npm run preview
```

### Linting

Run ESLint to check code quality:
```bash
npm run lint
```


## Usage

### Polygon Visualizer

1. Navigate to the home page (`/`)
2. Move your mouse over the canvas to see point-in-polygon calculations
3. Switch to "Edit" mode to drag polygon vertices
4. Click "Reset" to restore default polygon presets

### Port Template

1. Navigate to `/port-template`
2. **Edit Labels**: Click on any node label to edit it
   - Press `Enter` to save changes
   - Press `Escape` to cancel editing
3. **Add Nodes**: Click the "+" button next to any node to add a child
4. **Toggle Read-only**: Use the toggle switch to mark nodes as read-only
5. **Delete Nodes**: Click the trash icon to remove a node
6. **Expand/Collapse**: Click the "+" or "−" button to expand/collapse nodes


## Development Notes

- The project uses ESLint for code quality checks
- All components are written in TypeScript for type safety
- Styled-components are used throughout for consistent styling
- The layout component provides shared navigation across all pages
# polygon-visualizer_and_port-template
