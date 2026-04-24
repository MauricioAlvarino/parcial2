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
 * @param {CanvasRenderingContext2D} ctx - Contexto 2D del canvas
 * @param {number} x0 - Coordenada X del punto inicial
 * @param {number} y0 - Coordenada Y del punto inicial
 * @param {number} x1 - Coordenada X del punto final
 * @param {number} y1 - Coordenada Y del punto final
 * @param {string} [color="#ffffff"] - Color del segmento
 */
function bresenhamLine(ctx, x0, y0, x1, y1, color="#ffffff") {
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
 
function midpointCircle(ctx, centerX, centerY, r, color="#ffffff") {
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

/**
 * Calcula y retorna los vértices de un polígono regular de k lados,
 * con centro en (cx, cy), radio interno radioP y rotado según angleOffset.
 *
 * Fórmula para el i-ésimo vértice:
 *   ángulo_i = OffA + i * (2pi / k)
 *   xi = cx + radioP * cos(angulo_i)
 *   yi = cy + radioP * sin(angulo_i)
 *
 * @param {number} cx - Coordenada X del centro del polígono
 * @param {number} cy - Coordenada Y del centro del polígono
 * @param {number} radioP - Radio circunscrito del polígono (distancia centro-vértice)
 * @param {number} k - Número de lados (y vértices) del polígono regular
 * @param {number} [OffA] - Rotación inicial del polígono en radianes
 * @returns {Array<{x: number, y: number}>} Arreglo de vértices en orden
 */
function getPolygonVertices(cx, cy, radioP, k, OffA = 0) {
    const vertices = [];
 
    // Paso angular entre vértices consecutivos: 360° / k
    const pasoAngular = (2 * Math.PI) / k;
 
    for (let i = 0; i < k; i++) {
        const angulo = OffA + i * pasoAngular;
 
        const x = cx + radioP * Math.cos(angulo);
        const y = cy + radioP * Math.sin(angulo);
 
        vertices.push({ x, y });
    }
 
    // Retornar el arreglo de vértices antes de dibujar para permitir su reutilización en otras funciones
    return vertices;
}
 
/**
 * Dibuja un polígono regular usando los vértices retornados por getPolygonVertices.
 * Conecta cada par de vértices consecutivos con el Algoritmo de Bresenham.
 * El último vértice se conecta de vuelta al primero para cerrar la figura.
 *
 * @param {CanvasRenderingContext2D} ctx - Contexto 2D del canvas
 * @param {number} cx - Coordenada X del centro
 * @param {number} cy - Coordenada Y del centro
 * @param {number} radioP - Radio circunscrito en píxeles
 * @param {number} k - Número de lados
 * @param {number} OffA - Rotación inicial en radianes
 * @param {string} color - Color del polígono
 */
function drawPolygon(ctx, cx, cy, radioP, k, OffA, color) {
    // Obtener arreglo de vértices {x, y} antes de dibujar
    const vertices = getPolygonVertices(cx, cy, radioP, k, OffA);
 
    // Conectar cada vértice con el siguiente usando Bresenham
    for (let i = 0; i < vertices.length; i++) {
        const actual = vertices[i];
        // El módulo cierra el polígono, el último vértice conecta al primero
        const siguiente = vertices[(i + 1) % vertices.length];
 
        bresenhamLine(ctx, actual.x, actual.y, siguiente.x, siguiente.y, color);
    }
}

function iniciarSistema() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // centro del canvas
    let cx = canvas.width / 2;
    let cy = canvas.height / 2;

    // dibujar órbita
    midpointCircle(ctx, cx, cy, 120, "white");

    // obtener posiciones
    let posiciones = getOrbitalPositions(cx, cy, 120, 6, 0);

    // dibujar polígonos
    posiciones.forEach(p => {
        drawPolygon(ctx, p.x, p.y, 30, 5, 0, "red");
    });
}

window.onload = function () {
    iniciarSistema();
};