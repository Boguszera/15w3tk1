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
- **Sounds**: For clicks and Racetrack and Garage scenes

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
15w3tk1/
├── .github
│   └── workflows
│       └── deploy.yml          # CD configuration. Automates deployment (e.g., to GitHub Pages) after every code push.
├── .gitignore                  
├── README.md                   
├── eslint.config.js            # Linter configuration - ensures code quality and catches syntax errors.
├── index.html                  # Main entry point. This is where Vite "injects" your React code.
├── package-lock.json           # Versions of installed dependencies (ensures the project runs the same way for everyone).
├── package.json                # Listt of dependencies (React, Three.js, Tailwind) and scripts (dev, build).
├── postcss.config.js           # CSS processor configuration - required for Tailwind CSS to work correctly.
├── public                      # Static files 
│   ├── car_model.glb           # 3D car model (glTF binary format). 
│   ├── sounds                  
│   │   ├── click.mp3           
│   │   ├── garage-ambient.mp3  
│   │   └── racetrack-ambient.mp3 
│   └── vite.svg                
├── src                         
│   ├── App.css                 # Global CSS styles 
│   ├── App.tsx                 # Main component tying the logic together
│   ├── assets                  
│   │   └── react.svg
│   ├── components              
│   │   ├── CarModel.tsx        # 3D Component. Loads the .glb file, applies materials, and reacts to configuration changes.
│   │   ├── ConfigPanel.tsx     # UI (HTML Overlay). Menu with buttons to change colors, wheels, windows, etc.
│   │   ├── GarageScene.tsx     # 3D Environment component for garage
│   │   ├── LoadingScreen.tsx   
│   │   ├── RacetrackScene.tsx  
│   │   └── Scene.tsx           # Wrapper for the React Three Fiber <Canvas>. Sets up the camera and rendering.
│   ├── index.css               # Entry point for Tailwind styles 
│   ├── main.tsx                # The file that mounts the React app to the #root element in index.html.
│   ├── store                   
│   │   └── configStore.ts      # Stores the current car state:
│   ├── types                   
│   │   └── CarConfiguration.ts # Interfaces defining which configuration options are allowed.
│   └── utils                   .
│       └── soundManager.ts     # Logic for audio playback
├── gh_structure_printer.py     # Print project structure
├── car_model.blend     		  # 3D Car model project in Blender 
├── car_workflow.json     		  # ComfyUI Workflow to generate car references 
├── tailwind.config.js          # Tailwind CSS configuration
├── tsconfig.app.json           # TypeScript configuration specific to the application code.
├── tsconfig.json               # Main TypeScript compiler configuration.
├── tsconfig.node.json          # TypeScript configuration for config files
└── vite.config.ts              # Vite bundler configuration (plugins, path aliases).
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

## 🔧 Workflow Installation

To import the workflow into ComfyUI directly from this repository:

1. Ensure you are in the project's root directory.
2. Run the following command to copy the file to the ComfyUI folder:

```bash
# Copy the workflow from the repository to ComfyUI
cp ./car_workflow.json ~/ComfyUI/user/default/workflows/
```

3. In the ComfyUI interface, click "Refresh" (or press F5 to refresh the page).

## License

MIT
