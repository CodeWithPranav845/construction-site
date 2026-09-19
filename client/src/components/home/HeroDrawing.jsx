// The hero's one big moment: a building elevation that draws itself, with dimension lines.
// Pure SVG. Lines animate via the .draw class in index.css (disabled for reduced-motion users).

const Line = ({ x1, y1, x2, y2, d = 0 }) => (
  <line x1={x1} y1={y1} x2={x2} y2={y2} pathLength="1" className="draw" style={{ animationDelay: `${d}s` }} />
);
const Box = ({ x, y, w, h, d = 0 }) => (
  <rect x={x} y={y} width={w} height={h} pathLength="1" className="draw" style={{ animationDelay: `${d}s` }} />
);
const Label = ({ d = 0, ...props }) => (
  <text className="draw-fade" style={{ animationDelay: `${d}s` }} {...props} />
);

const FLOOR_TOPS = [90, 144, 198, 252, 306];
const WINDOW_X = [138, 206, 274, 342];

export default function HeroDrawing() {
  return (
    <svg
      viewBox="0 0 520 430"
      role="img"
      aria-label="Technical drawing of a five-storey building with its width and height marked"
      className="h-auto w-full max-w-xl text-white/80"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      {/* ground line and level marker */}
      <Line x1="30" y1="360" x2="490" y2="360" />
      <path d="M62 360l8-13 8 13z" pathLength="1" className="draw" style={{ animationDelay: '0.2s' }} />
      <Label x="30" y="338" fill="currentColor" stroke="none" fontFamily="IBM Plex Mono, monospace" fontSize="11" d={1.4}>
        +0.00
      </Label>

      {/* structure */}
      <Box x="104" y="80" w="312" h="10" d={0.3} />
      <Box x="110" y="90" w="300" h="270" d={0.4} />
      {[144, 198, 252, 306].map((y, i) => (
        <Line key={y} x1="110" y1={y} x2="410" y2={y} d={0.7 + i * 0.12} />
      ))}

      {/* windows, and a door on the ground floor */}
      {FLOOR_TOPS.map((top, row) =>
        WINDOW_X.map((x, col) => {
          if (row === 4 && (col === 1 || col === 2)) return null;
          return <Box key={`${row}-${col}`} x={x} y={top + 12} w="40" h="30" d={1 + row * 0.14 + col * 0.04} />;
        })
      )}
      <Box x="240" y="318" w="40" h="42" d={1.6} />
      <Line x1="260" y1="318" x2="260" y2="360" d={1.8} />

      {/* width dimension */}
      <Line x1="110" y1="396" x2="410" y2="396" d={1.9} />
      <Line x1="110" y1="386" x2="110" y2="406" d={1.9} />
      <Line x1="410" y1="386" x2="410" y2="406" d={1.9} />
      <Label x="260" y="388" textAnchor="middle" fill="currentColor" stroke="none" fontFamily="IBM Plex Mono, monospace" fontSize="13" d={2.4}>
        24.00 m
      </Label>

      {/* height dimension */}
      <Line x1="452" y1="90" x2="452" y2="360" d={2.0} />
      <Line x1="442" y1="90" x2="462" y2="90" d={2.0} />
      <Line x1="442" y1="360" x2="462" y2="360" d={2.0} />
      <Label
        x="474"
        y="225"
        textAnchor="middle"
        transform="rotate(-90 474 225)"
        fill="currentColor"
        stroke="none"
        fontFamily="IBM Plex Mono, monospace"
        fontSize="13"
        d={2.5}
      >
        18.00 m
      </Label>

      {/* drawing title */}
      <Label x="110" y="48" fill="currentColor" stroke="none" fontFamily="IBM Plex Mono, monospace" fontSize="12" d={2.6}>
        Front elevation, scale 1:100
      </Label>
    </svg>
  );
}
