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
    x0 = Math.round(x0);
    y0 = Math.round(y0);
    x1 = Math.round(x1);
    y1 = Math.round(y1);
    let dx = Math.abs(x1 - x0);
    let dy = Math.abs(y1 - y0);
    let sx = (x0 < x1) ? 1 : -1;
    let sy = (y0 < y1) ? 1 : -1;
    let err = dx - dy;

     while (true) {
        // Pintar el píxel actual
        plotPixel(ctx, x0, y0, color);
 
        // Condición de parada
        if (x0 === x1 && y0 === y1) break;
 
        let p2 = 2 * p;
 
        if (p2 > -dy) {
            p -= dy;
            x0 += sx;
        }
 
        if (p2 < dx) {
            p += dx;
            y0 += sy;
        }
}

/**
 * Algoritmo de Punto Medio para circunferencias
 */
function midpointCircle(centerX, centerY, r, color) {
    // Implementación obligatoria por el estudiante
}
