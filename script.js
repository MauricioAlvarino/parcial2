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
 
        let e2 = 2 * err;
 
        if (e2 > -dy) {
            err -= dy;
            x0 += sx;
        }
 
        if (e2 < dx) {
            err += dx;
            y0 += sy;
        }
    }
}

/** 
 * Algoritmo de Punto Medio para circunferencias
 * Dibujar una circunferencia utilizando el metodo del punto medio aprovechando la simetria de 8 ectantes, haciendo todo el circulo calculando solo el primer ectante
 *
 * @param {CanvasRenderingContext2D} ctx - Contexto 2D del canvas
 * @param {number} centerX - Coordenada X del centro de la circunferencia
 * @param {number} centerY - Coordenada Y del centro de la circunferencia
 * @param {number} r - Radio de la circunferencia en píxeles
 * @param {string} [color="#ffffff"] - Color de la circunferencia
 */
 
function midpointCircle(centerX, centerY, r, color) {
    // Implementación obligatoria por el estudiante
    let x = 0;
    let y = r;

    let p = 1 - r;

    
    // Dibujar los 8 ectantes en el primer paso
    plotPixel(ctx, centerX + x, centerY + y, color);
    plotPixel(ctx, centerX - x, centerY + y, color);
    plotPixel(ctx, centerX + x, centerY - y, color);
    plotPixel(ctx, centerX - x, centerY - y, color);
    plotPixel(ctx, centerX + y, centerY + x, color);
    plotPixel(ctx, centerX - y, centerY + x, color);
    plotPixel(ctx, centerX + y, centerY - x, color);
    plotPixel(ctx, centerX - y, centerY - x, color);

    while (x < y) {
        x++;
        if (p < 0) {
            //Y se mantiene igual pero se actualiza el punto de decisión
            p += 2 * x + 1;
        } else{
            //Y se decrementa y se actualiza el punto de decisión a partir de la nueva coordenada
            y--;
            p += 2 * (x - y) + 1;
        }
        //Con cada nuevo punto calculado se dibujan los 8 ectantes correspondientes
        plotPixel(ctx, centerX + x, centerY + y, color);
        plotPixel(ctx, centerX - x, centerY + y, color);
        plotPixel(ctx, centerX + x, centerY - y, color);
        plotPixel(ctx, centerX - x, centerY - y, color);
        plotPixel(ctx, centerX + y, centerY + x, color);
        plotPixel(ctx, centerX - y, centerY + x, color);
        plotPixel(ctx, centerX + y, centerY - x, color);
        plotPixel(ctx, centerX - y, centerY - x, color);
    }
}