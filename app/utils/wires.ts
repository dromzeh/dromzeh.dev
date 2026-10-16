type Pt = [number, number];
export interface Port {
  x: number;
  y: number;
}

const fmt = (n: number) => (Math.round(n * 100) / 100).toString();
const lerpTo = ([ax, ay]: Pt, [bx, by]: Pt, d: number): Pt => {
  const L = Math.hypot(bx - ax, by - ay) || 1;
  return [ax + ((bx - ax) / L) * d, ay + ((by - ay) / L) * d];
};

function roundedPath(points: Pt[], r = 12): string {
  if (points.length < 2) return "";
  let d = `M${fmt(points[0]![0])} ${fmt(points[0]![1])}`;
  for (let i = 1; i < points.length - 1; i++) {
    const [px, py] = points[i - 1]!;
    const [cx, cy] = points[i]!;
    const [nx, ny] = points[i + 1]!;
    const rad = Math.min(r, Math.hypot(cx - px, cy - py) / 2, Math.hypot(nx - cx, ny - cy) / 2);
    if (rad < 0.5) {
      d += `L${fmt(cx)} ${fmt(cy)}`;
      continue;
    }
    const a = lerpTo([cx, cy], [px, py], rad);
    const b = lerpTo([cx, cy], [nx, ny], rad);
    d += `L${fmt(a[0])} ${fmt(a[1])}Q${fmt(cx)} ${fmt(cy)} ${fmt(b[0])} ${fmt(b[1])}`;
  }
  const last = points[points.length - 1]!;
  return d + `L${fmt(last[0])} ${fmt(last[1])}`;
}

export function columnRoute(src: Port, dst: Port, trunkX: number, { stub = 24, radius = 12 } = {}): string {
  if (Math.abs(src.y - dst.y) < 0.5) return roundedPath([[src.x, src.y], [dst.x, dst.y]], radius);
  const tx = Math.max(src.x + stub, Math.min(trunkX, dst.x - stub));
  return roundedPath([[src.x, src.y], [tx, src.y], [tx, dst.y], [dst.x, dst.y]], radius);
}

export function railRoute(src: Port, dst: Port, railX: number, turnY: number, { radius = 12 } = {}): string {
  const ty = Math.max(turnY, src.y + 8);
  return roundedPath(
    [[src.x, src.y], [railX, src.y], [railX, ty], [dst.x, ty], [dst.x, dst.y]],
    radius,
  );
}

export function backRoute(src: Port, dstBottom: Port, floorY: number, { stub = 24, radius = 12 } = {}): string {
  return roundedPath(
    [[src.x, src.y], [src.x + stub, src.y], [src.x + stub, floorY], [dstBottom.x, floorY], [dstBottom.x, dstBottom.y]],
    radius,
  );
}

export function socketMask(points: Port[], { id, r = 3.5, pad = 80, width, height }: { id: string; r?: number; pad?: number; width: number; height: number }) {
  const circles = points.map((p) => `<circle cx="${fmt(p.x)}" cy="${fmt(p.y)}" r="${r}" fill="black"/>`).join("");
  return `<mask id="${id}" maskUnits="userSpaceOnUse"><rect x="${-pad}" y="${-pad}" width="${width + pad * 2}" height="${height + pad * 2}" fill="white"/>${circles}</mask>`;
}

export function startPulses(paths: SVGPathElement[], { dash = 26, duration = 1500, stagger = 190 } = {}): Animation[] {
  const reduce = reducedMotion();
  const anims: Animation[] = [];
  paths.forEach((p, i) => {
    const len = p.getTotalLength();
    p.style.strokeDasharray = `${dash} ${len}`;
    if (reduce) {
      p.style.strokeDashoffset = "0";
      return;
    }
    anims.push(
      p.animate([{ strokeDashoffset: len + dash }, { strokeDashoffset: 0 }], {
        duration,
        delay: i * stagger,
        easing: "linear",
        iterations: Infinity,
      }),
    );
  });
  return anims;
}
