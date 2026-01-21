# 3D Car Configurator

An interactive web-based 3D car configurator built with React, TypeScript, and Three.js.

## Features

### 3D Visualization
- Real-time 3D rendering using Three.js and React Three Fiber
- Orbital camera controls (zoom, rotate, pan)
- Camera reset functionality
- Studio-style lighting with HDRI environment
- Contact shadows and realistic rendering

### Customization Options

#### Body
- **Paint Color**: Choose any color using the color picker
- **Material**: Toggle between matte and glossy finishes

#### Wheels
- **Color**: Customize wheel color

#### Front Lamps
- **On/Off Toggle**: Turn front lights on or off
- **Intensity**: Adjust emission intensity (0-5)
- **Color**: Choose light color (default: white)

#### Back Lamps
- **On/Off Toggle**: Turn back lights on or off
- **Intensity**: Adjust emission intensity (0-5)
- **Color**: Choose light color (default: red)

#### Windows
- **Transparency**: Control window transparency (0-1)
- **Tint**: Toggle between clear and tinted windows

#### Spoiler
- **Visibility**: Show or hide the spoiler
- **Color Options**: Body color, carbon fiber, or black

#### Metal Elements
- **Material Type**: Chrome, brushed metal, or black metal
- **Roughness**: Adjust surface roughness (0-1)
- **Metalness**: Adjust metallic appearance (0-1)

### Additional Features
- **Configuration Persistence**: Automatically saves to localStorage
- **Reset Function**: Restore default configuration
- **Loading Screen**: Displays progress during initialization
- **Fullscreen Mode**: Expand to fullscreen for immersive experience

## Technology Stack

- **React 18** with TypeScript
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for React Three Fiber
- **Zustand** - State management
- **Tailwind CSS** - Styling
- **Vite** - Build tool and dev server

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── CarModel.tsx        # 3D car model with all customizable parts
│   ├── Scene.tsx           # 3D scene setup with lighting and camera
│   ├── ConfigPanel.tsx     # UI configuration panel
│   └── LoadingScreen.tsx   # Loading screen component
├── store/
│   └── configStore.ts      # Zustand store for configuration state
├── types/
│   └── CarConfiguration.ts # TypeScript types and interfaces
├── App.tsx                 # Main application component
├── main.tsx                # Application entry point
└── index.css               # Global styles with Tailwind
```

## Usage

1. **Explore the 3D Model**: Use your mouse to rotate, zoom, and pan around the car
2. **Customize**: Use the side panel to modify various car components
3. **Save**: Your configuration is automatically saved to browser storage
4. **Reset**: Click the "Reset" button to restore default settings
5. **Fullscreen**: Click the "Fullscreen" button for an immersive experience
6. **Reset Camera**: Click "Reset Camera" to return to the default view

## Custom 3D Model

The application currently uses a procedurally generated car model. To use a custom GLB model from Blender:

1. Export your car model from Blender as GLB with the following mesh names:
   - `body` - Main car body
   - `wheels` - All wheels
   - `frontlamps` - Front lights
   - `backlamps` - Back lights
   - `windows_1` - All windows
   - `spoiler` - Rear spoiler
   - `metal_elements` - Chrome/metal parts (grille, mirrors, etc.)

2. Place the GLB file in the `public` folder

3. Update `src/components/CarModel.tsx` to load the GLB file using `useGLTF` from `@react-three/drei`

## Performance

The application is optimized to run at 60 FPS on desktop devices:
- Efficient material updates with lerping
- Shadow mapping optimization
- Proper use of React Three Fiber's render loop
- Minimal re-renders through Zustand store

## Browser Support

- Modern browsers with WebGL support
- Tested on Chrome, Firefox, Safari, and Edge
- Desktop-first design (mobile support can be added)

## License

MIT
