#include <emscripten/emscripten.h>
#include <emscripten/bind.h>
#include <cmath>
#include <string>
#include <sstream>
#include <iomanip>

class ScientificCalculator {
private:
    double memory;
    double lastResult;
    
public:
    ScientificCalculator() : memory(0.0), lastResult(0.0) {}
    
    // Basic operations
    double add(double a, double b) {
        lastResult = a + b;
        return lastResult;
    }
    
    double subtract(double a, double b) {
        lastResult = a - b;
        return lastResult;
    }
    
    double multiply(double a, double b) {
        lastResult = a * b;
        return lastResult;
    }
    
    double divide(double a, double b) {
        if (b == 0) {
            return NAN;
        }
        lastResult = a / b;
        return lastResult;
    }
    
    double modulo(double a, double b) {
        if (b == 0) {
            return NAN;
        }
        lastResult = fmod(a, b);
        return lastResult;
    }
    
    // Power and root operations
    double power(double base, double exponent) {
        lastResult = pow(base, exponent);
        return lastResult;
    }
    
    double squareRoot(double x) {
        if (x < 0) {
            return NAN;
        }
        lastResult = sqrt(x);
        return lastResult;
    }
    
    double cubeRoot(double x) {
        lastResult = cbrt(x);
        return lastResult;
    }
    
    double nthRoot(double x, double n) {
        if (n == 0) {
            return NAN;
        }
        lastResult = pow(x, 1.0 / n);
        return lastResult;
    }
    
    // Trigonometric functions (radians)
    double sine(double x) {
        lastResult = sin(x);
        return lastResult;
    }
    
    double cosine(double x) {
        lastResult = cos(x);
        return lastResult;
    }
    
    double tangent(double x) {
        lastResult = tan(x);
        return lastResult;
    }
    
    double arcsine(double x) {
        if (x < -1 || x > 1) {
            return NAN;
        }
        lastResult = asin(x);
        return lastResult;
    }
    
    double arccosine(double x) {
        if (x < -1 || x > 1) {
            return NAN;
        }
        lastResult = acos(x);
        return lastResult;
    }
    
    double arctangent(double x) {
        lastResult = atan(x);
        return lastResult;
    }
    
    // Hyperbolic functions
    double sinh_calc(double x) {
        lastResult = sinh(x);
        return lastResult;
    }
    
    double cosh_calc(double x) {
        lastResult = cosh(x);
        return lastResult;
    }
    
    double tanh_calc(double x) {
        lastResult = tanh(x);
        return lastResult;
    }
    
    // Logarithmic functions
    double naturalLog(double x) {
        if (x <= 0) {
            return NAN;
        }
        lastResult = log(x);
        return lastResult;
    }
    
    double log10_calc(double x) {
        if (x <= 0) {
            return NAN;
        }
        lastResult = log10(x);
        return lastResult;
    }
    
    double log2_calc(double x) {
        if (x <= 0) {
            return NAN;
        }
        lastResult = log2(x);
        return lastResult;
    }
    
    // Exponential
    double exponential(double x) {
        lastResult = exp(x);
        return lastResult;
    }
    
    // Special functions
    double factorial(int n) {
        if (n < 0) {
            return NAN;
        }
        if (n > 170) {
            return INFINITY;  // Overflow
        }
        double result = 1;
        for (int i = 2; i <= n; i++) {
            result *= i;
        }
        lastResult = result;
        return lastResult;
    }
    
    double absolute(double x) {
        lastResult = fabs(x);
        return lastResult;
    }
    
    double ceiling(double x) {
        lastResult = ceil(x);
        return lastResult;
    }
    
    double floor_calc(double x) {
        lastResult = floor(x);
        return lastResult;
    }
    
    double round_calc(double x) {
        lastResult = round(x);
        return lastResult;
    }
    
    // Conversion functions
    double degreesToRadians(double degrees) {
        lastResult = degrees * M_PI / 180.0;
        return lastResult;
    }
    
    double radiansToDegrees(double radians) {
        lastResult = radians * 180.0 / M_PI;
        return lastResult;
    }
    
    // Memory operations
    void memoryStore(double value) {
        memory = value;
    }
    
    double memoryRecall() {
        return memory;
    }
    
    void memoryAdd(double value) {
        memory += value;
    }
    
    void memorySubtract(double value) {
        memory -= value;
    }
    
    void memoryClear() {
        memory = 0.0;
    }
    
    double getLastResult() {
        return lastResult;
    }
    
    // Constants
    double getPi() {
        return M_PI;
    }
    
    double getE() {
        return M_E;
    }
    
    double getGoldenRatio() {
        return (1.0 + sqrt(5.0)) / 2.0;
    }
};

// Binding code
EMSCRIPTEN_BINDINGS(scientific_calculator) {
    emscripten::class_<ScientificCalculator>("ScientificCalculator")
        .constructor<>()
        // Basic operations
        .function("add", &ScientificCalculator::add)
        .function("subtract", &ScientificCalculator::subtract)
        .function("multiply", &ScientificCalculator::multiply)
        .function("divide", &ScientificCalculator::divide)
        .function("modulo", &ScientificCalculator::modulo)
        // Power and root
        .function("power", &ScientificCalculator::power)
        .function("squareRoot", &ScientificCalculator::squareRoot)
        .function("cubeRoot", &ScientificCalculator::cubeRoot)
        .function("nthRoot", &ScientificCalculator::nthRoot)
        // Trigonometric
        .function("sine", &ScientificCalculator::sine)
        .function("cosine", &ScientificCalculator::cosine)
        .function("tangent", &ScientificCalculator::tangent)
        .function("arcsine", &ScientificCalculator::arcsine)
        .function("arccosine", &ScientificCalculator::arccosine)
        .function("arctangent", &ScientificCalculator::arctangent)
        // Hyperbolic
        .function("sinh_calc", &ScientificCalculator::sinh_calc)
        .function("cosh_calc", &ScientificCalculator::cosh_calc)
        .function("tanh_calc", &ScientificCalculator::tanh_calc)
        // Logarithmic
        .function("naturalLog", &ScientificCalculator::naturalLog)
        .function("log10_calc", &ScientificCalculator::log10_calc)
        .function("log2_calc", &ScientificCalculator::log2_calc)
        // Exponential
        .function("exponential", &ScientificCalculator::exponential)
        // Special functions
        .function("factorial", &ScientificCalculator::factorial)
        .function("absolute", &ScientificCalculator::absolute)
        .function("ceiling", &ScientificCalculator::ceiling)
        .function("floor_calc", &ScientificCalculator::floor_calc)
        .function("round_calc", &ScientificCalculator::round_calc)
        // Conversion
        .function("degreesToRadians", &ScientificCalculator::degreesToRadians)
        .function("radiansToDegrees", &ScientificCalculator::radiansToDegrees)
        // Memory operations
        .function("memoryStore", &ScientificCalculator::memoryStore)
        .function("memoryRecall", &ScientificCalculator::memoryRecall)
        .function("memoryAdd", &ScientificCalculator::memoryAdd)
        .function("memorySubtract", &ScientificCalculator::memorySubtract)
        .function("memoryClear", &ScientificCalculator::memoryClear)
        .function("getLastResult", &ScientificCalculator::getLastResult)
        // Constants
        .function("getPi", &ScientificCalculator::getPi)
        .function("getE", &ScientificCalculator::getE)
        .function("getGoldenRatio", &ScientificCalculator::getGoldenRatio);
}
