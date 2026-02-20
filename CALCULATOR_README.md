# Scientific Calculator - C++ WebAssembly

A complex scientific calculator built with C++ and compiled to WebAssembly, featuring a beautiful UI overlay on your existing landing page.

## Features

### Basic Operations
- Addition, Subtraction, Multiplication, Division
- Modulo operation
- Power (x^y)

### Scientific Functions
- **Trigonometric**: sin, cos, tan, asin, acos, atan
- **Hyperbolic**: sinh, cosh, tanh
- **Logarithmic**: ln (natural log), log (base 10), log2
- **Exponential**: e^x
- **Power & Root**: √, ∛, x², x^y, nth root

### Advanced Features
- **Memory Operations**: MC, MR, M+, M-
- **Special Functions**: factorial (!), absolute value (|x|), floor, ceiling, round
- **Angle Modes**: Radians (RAD) and Degrees (DEG)
- **Constants**: π (Pi), e (Euler's number), φ (Golden ratio)
- **ANS**: Access last result

## Files Structure

```
atrey_app/
├── calculator.cpp          # C++ source code for calculator logic
├── build.sh               # Build script to compile to WebAssembly
├── main/
│   ├── index.html         # Main HTML with calculator UI
│   ├── styles.css         # Styling for calculator and background
│   ├── app.js             # JavaScript interface for calculator
│   ├── calculator.js      # Generated WebAssembly JavaScript glue code
│   ├── calculator.wasm    # Compiled WebAssembly binary
│   └── resources/
│       └── gif1.gif       # Background GIF animation
└── wrangler.toml          # Cloudflare Workers configuration
```

## How to Use

### Calculator Interface

1. **Basic Operations**: Click number buttons and operators (+, -, ×, ÷)
2. **Scientific Functions**: Click function buttons (sin, cos, ln, etc.)
3. **Memory Operations**:
   - MC: Clear memory
   - MR: Recall from memory
   - M+: Add to memory
   - M-: Subtract from memory
4. **Angle Mode**: Toggle between RAD and DEG for trigonometric functions
5. **Keyboard Support**: 
   - Numbers and basic operators
   - Enter/= for equals
   - Escape for clear
   - Backspace to delete last digit

### Recompiling C++ Code

If you modify `calculator.cpp`:

```bash
./build.sh
```

This will regenerate `main/calculator.js` and `main/calculator.wasm`.

## Deployment

### Cloudflare Pages (via Wrangler)

The site is configured for Cloudflare Pages with `main/` as the root directory:

```bash
# Deploy to Cloudflare Pages (main/ is the root folder)
wrangler pages deploy main

# Or publish with project name
wrangler pages publish main --project-name=atrey-app
```

Note: All files in the `main/` folder will be served as the root of your website.

### Other Static Hosts

You can deploy the `main/` folder to any static hosting service:
- GitHub Pages
- Netlify
- Vercel
- AWS S3
- Any web server

Just upload the entire `main/` directory.

## Technical Details

### C++ to WebAssembly Compilation

The calculator is written in C++ and compiled to WebAssembly using Emscripten:

- **Language**: C++ (ISO C++11)
- **Compiler**: Emscripten (em++)
- **Target**: WebAssembly (WASM)
- **Bindings**: Embind for C++/JavaScript interop
- **Optimization**: -O3 (maximum optimization)

### Browser Compatibility

Works in all modern browsers that support WebAssembly:
- Chrome/Edge 57+
- Firefox 52+
- Safari 11+
- Opera 44+

## Design Features

- **Glassmorphism Effect**: Translucent calculator with backdrop blur
- **Animated Background**: Psychedelic gradient animations
- **Floating Animation**: Subtle floating effect for calculator
- **Glow Effects**: Pulsing glow around calculator and buttons
- **Responsive Design**: Adapts to different screen sizes

## Calculator Architecture

```
┌─────────────────┐
│   User Input    │
│   (HTML/JS)     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   app.js        │
│ (JavaScript     │
│  Interface)     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ calculator.js   │
│ (WASM Glue)     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│calculator.wasm  │
│ (C++ Logic)     │
└─────────────────┘
```

## License

Free to use and modify as needed.

## Development Notes

- All calculations are performed in the WebAssembly module for maximum performance
- The calculator maintains its own state (memory, last result, angle mode)
- Error handling for division by zero, invalid logarithms, etc.
- Supports very large numbers (switches to scientific notation when needed)

Enjoy your high-performance scientific calculator! 🚀
