#!/bin/bash

# Build script for compiling C++ calculator to WebAssembly
# Requires Emscripten SDK to be installed

echo "Building Scientific Calculator WebAssembly..."

# Compile with Emscripten
em++ calculator.cpp \
    -o main/calculator.js \
    -s WASM=1 \
    -s MODULARIZE=1 \
    -s EXPORT_NAME="createCalculatorModule" \
    -s ALLOW_MEMORY_GROWTH=1 \
    -s NO_EXIT_RUNTIME=1 \
    -s EXPORTED_RUNTIME_METHODS='["ccall","cwrap"]' \
    -lembind \
    -O3 \
    --bind

if [ $? -eq 0 ]; then
    echo "Build successful! Files generated:"
    echo "  - main/calculator.js"
    echo "  - main/calculator.wasm"
else
    echo "Build failed!"
    exit 1
fi
