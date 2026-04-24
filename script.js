/**
 * UMNG - Facultad de Ingeniería
 * Asignatura: Introducción a la Computación Gráfica
 * Estudiante: Mauricio Enrique Alvarino Mercado
 * * Este código debe ser estructurado de forma modular.
 */

// Única función autorizada para dibujar
const canvas = document.getElementById("orbitalCanvas");
const ctx = canvas.getContext("2d");

function plotPixel(ctx, x, y, color = "#1a1a1a") {
    ctx.fillStyle = color;
    ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
}

/**
 * Retorna los centros donde se ubicarán los polígonos
 * @param {number} r - Radio de la órbita
 * @param {number} n - Cantidad de polígonos
 * @param {number} cx - Coordenada X del centro de la órbita
 * @param {number} cy - Coordenada Y del centro de la órbita
 * @param {number} OffA - Ángulo de desplazamiento para la animación
 * @returns {Array} [{x, y}, ...]
 */
//Añadi cx, cy y OffA para tener los centros de la órbita, el ángulo de desplazamiento para la animación y así poder reutilizar esta función para calcular las posiciones en cada frame
function getOrbitalPositions(cx, cy, r, n, OffA) {
    // Implementar lógica de distribución circular
    const positions = [];

    // Paso angular entre polígono y polígono en la circunferencia, calculado dividiendo 360 grados (2 * PI radianes) entre la cantidad de polígonos
    const pasoAngular = (2 * Math.PI) / n;

    // Distribuir los centros de los polígonos en una circunferencia de radio r alrededor del centro del canvas
    for (let i = 0; i < n; i++) {
        // Ángulo correspondiente al i-ésimo polígono
        const angulo = OffA + i * pasoAngular;
 
        // Proyección trigonométrica sobre la circunferencia
        const x = cx + r * Math.cos(angulo);
        const y = cy + r * Math.sin(angulo);
 
        // Almacenar el centro calculado como objeto {x, y}
        positions.push({ x, y });
    }
    return positions;
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
window.onload = function () {
    iniciarSistema();
};