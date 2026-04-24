/**
 * UMNG - Facultad de Ingeniería
 * Asignatura: Introducción a la Computación Gráfica
 * Estudiante: Mauricio Enrique Alvarino Mercado
 * * Este código debe ser estructurado de forma modular.
 */

// Única función autorizada para dibujar
function plotPixel(ctx, x, y, color = "#1a1a1a") {
    ctx.fillStyle = color;
    ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
}

/**
 * Retorna los centros donde se ubicarán los polígonos
 * @param {number} r - Radio de la órbita
 * @param {number} n - Cantidad de polígonos
 * @returns {Array} [{x, y}, ...]
 */
function getOrbitalPositions(r, n) {
    // Implementar lógica de distribución circular
}

/**
 * Algoritmo de Bresenham para líneas
 */
function bresenhamLine(x0, y0, x1, y1, color) {
    // Implementación obligatoria por el estudiante
}

/**
 * Algoritmo de Punto Medio para circunferencias
 */
function midpointCircle(centerX, centerY, r, color) {
    // Implementación obligatoria por el estudiante
}
