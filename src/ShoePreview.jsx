import { useId, useRef, useState } from "react";
import { CATALOG as C } from "./catalog";

export default function ShoePreview({ config }) {
  const views = ["Side", "Top", "Front", "Heel"];
  const [viewIndex, setViewIndex] = useState(0);
  const dragStart = useRef(null);
  const color = C.colors.find((item) => item.id === config.color) ?? C.colors[0];
  const sole = C.soles.find((item) => item.id === config.sole) ?? C.soles[0];
  const id = useId().replaceAll(":", "");
  const upperClip = `upper-${id}`;
  const upperShade = `upper-shade-${id}`;
  const rubberShade = `rubber-shade-${id}`;
  const panelShade = `panel-shade-${id}`;
  const knitTexture = `knit-${id}`;
  const suedeTexture = `suede-${id}`;
  const stageGlow = `stage-glow-${id}`;
  const shoeShadow = `shoe-shadow-${id}`;
  const premiumLaces = config.addons.includes("laces");
  const monogram = config.addons.includes("monogram");
  const waterproof = config.addons.includes("waterproof");
  const laceColor = premiumLaces ? "#d97706" : color.dark ? "#f3f4f6" : "#374151";
  const upperPath =
    "M57 224 L57 157 Q57 141 74 135 L197 114 Q224 109 242 88 L266 59 Q279 43 297 45 Q316 47 327 66 L355 108 Q366 118 385 123 Q431 136 464 164 Q490 184 495 212 Q496 222 486 226 L70 230 Q59 230 57 224Z";
  const laceRows = [0, 1, 2, 3].map((index) => ({
    left: [244 + index * 13, 108 + index * 13],
    right: [292 + index * 13, 108 + index * 13],
  }));
  const changeView = (direction) =>
    setViewIndex((index) => (index + direction + views.length) % views.length);
  const beginDrag = (x) => {
    dragStart.current = x;
  };
  const finishDrag = (x) => {
    if (dragStart.current === null) return;
    const delta = x - dragStart.current;
    dragStart.current = null;
    if (Math.abs(delta) > 35) changeView(delta < 0 ? 1 : -1);
  };

  return (
    <div className="shoe-viewer">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1 rounded-full border border-gray-200 bg-white/75 p-1 shadow-sm" aria-label="Sneaker viewing angles">
          {views.map((view, index) => (
            <button
              key={view}
              type="button"
              aria-pressed={viewIndex === index}
              onClick={() => setViewIndex(index)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                viewIndex === index
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {view}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Previous sneaker view"
            onClick={() => changeView(-1)}
            className="view-arrow"
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            aria-label="Next sneaker view"
            onClick={() => changeView(1)}
            className="view-arrow"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      <div
        className="shoe-viewer-canvas"
        onPointerDown={(event) => beginDrag(event.clientX)}
        onPointerUp={(event) => finishDrag(event.clientX)}
        onPointerCancel={() => {
          dragStart.current = null;
        }}
        onMouseDown={(event) => beginDrag(event.clientX)}
        onMouseUp={(event) => finishDrag(event.clientX)}
        onTouchStart={(event) => beginDrag(event.touches[0].clientX)}
        onTouchEnd={(event) => finishDrag(event.changedTouches[0].clientX)}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") changeView(1);
          if (event.key === "ArrowLeft") changeView(-1);
        }}
        tabIndex={0}
        role="group"
        aria-label={`${views[viewIndex]} view. Drag horizontally or use arrow keys to rotate.`}
      >
      {viewIndex === 0 ? (
        <svg
          viewBox="0 0 540 310"
          role="img"
          aria-label={`Side view of sneaker: ${color.label}, ${config.material}, ${sole.label} sole`}
          className="mx-auto block h-auto w-full max-w-2xl"
        >
      <defs>
        <radialGradient id={stageGlow} cx="50%" cy="53%" r="56%">
          <stop offset="0" stopColor="#fff" stopOpacity="0.94" />
          <stop offset="1" stopColor="#cbd5e1" stopOpacity="0" />
        </radialGradient>
        <filter id={shoeShadow} x="-15%" y="-20%" width="140%" height="160%">
          <feDropShadow dx="0" dy="7" stdDeviation="6" floodColor="#172033" floodOpacity="0.2" />
        </filter>
        <linearGradient id={upperShade} x1="0" y1="0" x2="0.75" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.24" />
          <stop offset="0.4" stopColor="#fff" stopOpacity="0.03" />
          <stop offset="1" stopColor="#111827" stopOpacity="0.18" />
        </linearGradient>
        <linearGradient id={panelShade} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.16" />
          <stop offset="1" stopColor="#111827" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id={rubberShade} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.72" />
          <stop offset="0.2" stopColor={sole.hex} />
          <stop offset="1" stopColor="#64748b" stopOpacity="0.24" />
        </linearGradient>
        <clipPath id={upperClip}>
          <path d={upperPath} />
        </clipPath>
        <pattern id={knitTexture} width="8" height="8" patternUnits="userSpaceOnUse">
          <path d="M0 0L8 8M8 0L0 8" stroke="#111827" strokeOpacity="0.075" strokeWidth="0.7" />
        </pattern>
        <pattern id={suedeTexture} width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="3" r="0.8" fill="#111827" fillOpacity="0.11" />
          <circle cx="8" cy="7" r="0.7" fill="#fff" fillOpacity="0.14" />
        </pattern>
      </defs>

      <ellipse cx="275" cy="165" rx="238" ry="139" fill={`url(#${stageGlow})`} />
      <ellipse cx="276" cy="278" rx="218" ry="12" fill="#172033" fillOpacity="0.16" />

      {/* Treaded rubber outsole */}
      <path
        d="M47 241 Q47 233 61 232 L486 228 Q503 228 505 241 L503 254 Q501 265 487 267 L68 271 Q51 271 49 258Z"
        fill="#293445"
      />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
        <path
          key={`tread-${index}`}
          d={`M${71 + index * 48} 260 l10 5 10 -5`}
          fill="none"
          stroke="#111827"
          strokeOpacity="0.48"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      ))}

      {/* Cushioned midsole with a clean foxing seam */}
      <path
        d="M47 219 Q47 211 61 211 L482 208 Q500 208 503 221 L505 240 Q503 251 488 252 L65 256 Q49 255 47 243Z"
        fill={`url(#${rubberShade})`}
        stroke="#475569"
        strokeOpacity="0.46"
        strokeWidth="2"
      />
      <path
        d="M57 224 Q174 230 280 224 T493 220"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.76"
        strokeWidth="2.5"
      />
      <path
        d="M63 245 Q174 249 286 245 T490 240"
        fill="none"
        stroke="#475569"
        strokeOpacity="0.34"
        strokeWidth="1.5"
        strokeDasharray="2 3"
      />
      <path
        d="M64 232 Q178 237 286 232 T489 229"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.42"
        strokeWidth="1.2"
      />
      {[0, 1, 2, 3].map((index) => (
        <path
          key={`midsole-groove-${index}`}
          d={`M${77 + index * 12} 235 l7 0`}
          stroke="#475569"
          strokeOpacity="0.36"
          strokeWidth="1"
          strokeLinecap="round"
        />
      ))}
      {config.sole === "air" && (
        <g>
          <rect x="369" y="222" width="72" height="18" rx="9" fill="#fff" fillOpacity="0.72" />
          <path d="M378 231h54" stroke="#60a5fa" strokeOpacity="0.48" strokeWidth="2" />
        </g>
      )}

      {/* Tongue and padded collar */}
      <path
        d="M231 139 Q239 94 263 60 Q275 43 293 45 Q314 48 326 77 L345 126Z"
        fill={color.hex}
        stroke="#273244"
        strokeOpacity="0.5"
        strokeWidth="2"
      />
      <path
        d="M250 111 Q263 78 281 58 Q293 52 306 62 L322 104Z"
        fill="#111827"
        fillOpacity="0.12"
      />
      <path
        d="M252 100 Q268 67 283 54 Q297 45 310 53 Q322 61 333 86"
        fill="none"
        stroke="#273244"
        strokeOpacity="0.48"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        d="M254 96 Q269 69 284 57 Q297 50 309 57 Q320 64 330 84"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.52"
        strokeWidth="1.2"
        strokeDasharray="2 3"
      />
      <path
        d="M269 59 Q281 49 293 50"
        fill="none"
        stroke="#111827"
        strokeOpacity="0.28"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M253 99 Q269 68 284 56 Q297 49 309 56 Q321 64 331 86"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.36"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* One-piece upper with the chosen material finish */}
      <path
        d={upperPath}
        fill={color.hex}
        stroke="#253247"
        strokeOpacity="0.78"
        strokeWidth="2.5"
        strokeLinejoin="round"
        filter={`url(#${shoeShadow})`}
      />
      <g clipPath={`url(#${upperClip})`}>
        {config.material === "canvas" && (
          <rect x="45" y="38" width="470" height="202" fill={`url(#${knitTexture})`} />
        )}
        {config.material === "suede" && (
          <rect x="45" y="38" width="470" height="202" fill={`url(#${suedeTexture})`} />
        )}
        {config.material === "leather" && (
          <path
            d="M79 146 Q213 112 363 145"
            fill="none"
            stroke="#fff"
            strokeOpacity="0.12"
            strokeWidth="8"
            strokeLinecap="round"
          />
        )}
        <rect x="45" y="38" width="470" height="202" fill={`url(#${upperShade})`} />
        {waterproof && <rect x="45" y="38" width="470" height="202" fill="#bae6fd" fillOpacity="0.11" />}
      </g>

      {/* Heel counter and side-quarter overlays */}
      <path
        d="M61 158 Q62 141 79 137 L111 131 Q122 178 129 229 L72 231 Q62 229 61 219Z"
        fill={`url(#${panelShade})`}
        stroke="#263449"
        strokeOpacity="0.64"
        strokeWidth="1.6"
      />
      <path
        d="M115 132 L196 116 Q226 111 244 88 L263 63 Q271 54 282 50 L307 61 Q291 99 270 126 Q248 153 210 169 L132 191Z"
        fill={`url(#${panelShade})`}
        stroke="#263449"
        strokeOpacity="0.58"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M121 137 L196 121 Q224 116 239 94 M139 185 Q177 175 204 164"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.5"
        strokeWidth="1.5"
        strokeDasharray="2 4"
      />
      <path
        d="M116 133 L196 117 Q226 111 243 89 M135 188 Q175 178 207 166"
        fill="none"
        stroke="#172033"
        strokeOpacity="0.26"
        strokeWidth="1"
        strokeDasharray="1 4"
      />
      <path
        d="M116 140 L123 145 M124 138 L131 143 M132 136 L139 141 M140 134 L147 139"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.5"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M80 145 Q92 141 105 140"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.42"
        strokeWidth="1.2"
      />

      {/* Rounded toe bumper and ventilated toe box */}
      <path
        d="M403 143 Q444 154 469 180 Q489 200 492 219 L486 229 L399 230 Q414 187 403 143Z"
        fill={`url(#${panelShade})`}
        stroke="#263449"
        strokeOpacity="0.6"
        strokeWidth="1.5"
      />
      <path
        d="M409 148 Q446 160 468 186"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.52"
        strokeWidth="1.5"
        strokeDasharray="2 4"
      />
      <path
        d="M405 147 Q415 184 400 225"
        fill="none"
        stroke="#172033"
        strokeOpacity="0.24"
        strokeWidth="1"
        strokeDasharray="1 4"
      />
      {[0, 1, 2].map((row) =>
        [0, 1, 2, 3, 4, 5].map((column) => (
          <circle
            key={`toe-hole-${row}-${column}`}
            cx={423 + column * 8 + row * 3}
            cy={187 + row * 7}
            r="1.25"
            fill={color.dark ? "#fff" : "#172033"}
            fillOpacity="0.42"
          />
        ))
      )}
      <path
        d="M422 178 Q443 183 461 197"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.34"
        strokeWidth="1"
      />

      {/* Reinforced eyestay */}
      <path
        d="M237 96 Q294 108 354 151 L366 170 Q305 161 249 124 L230 112Z"
        fill={color.dark ? "#111827" : "#fff"}
        fillOpacity="0.12"
        stroke="#263449"
        strokeOpacity="0.52"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M242 98 Q296 112 354 154"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.47"
        strokeWidth="1.5"
        strokeDasharray="2 4"
      />
      <path
        d="M238 94 Q295 106 358 150"
        fill="none"
        stroke="#172033"
        strokeOpacity="0.25"
        strokeWidth="1"
        strokeDasharray="1 4"
      />

      {/* Four pairs of eyelets with raised, alternating flat-woven laces */}
      {laceRows.map((row, index) => (
        <g key={`eyelets-${index}`}>
          {[row.left, row.right].map(([x, y], side) => (
            <g key={side}>
              <ellipse
                cx={x}
                cy={y}
                rx="5.4"
                ry="4"
                transform={`rotate(28 ${x} ${y})`}
                fill="#cbd5e1"
                stroke="#475569"
                strokeWidth="1"
              />
              <ellipse
                cx={x}
                cy={y}
                rx="2.7"
                ry="1.9"
                transform={`rotate(28 ${x} ${y})`}
                fill="#172033"
              />
            </g>
          ))}
        </g>
      ))}
      {laceRows.slice(0, -1).map((row, index) => {
        const next = laceRows[index + 1];
        const crossovers = [
          { start: row.left, end: next.right },
          { start: row.right, end: next.left },
        ];
        if (index % 2 === 1) crossovers.reverse();

        return (
          <g key={`laces-${index}`}>
            {crossovers.map(({ start, end }, crossoverIndex) => {
              const path = `M${start[0]} ${start[1]} L${end[0]} ${end[1]}`;
              return (
                <g key={crossoverIndex}>
                  <path d={path} fill="none" stroke="#172033" strokeOpacity="0.5" strokeWidth="9" strokeLinecap="round" />
                  <path d={path} fill="none" stroke={laceColor} strokeWidth="5.7" strokeLinecap="round" />
                  <path d={path} fill="none" stroke="#fff" strokeOpacity="0.58" strokeWidth="1.1" strokeLinecap="round" />
                </g>
              );
            })}
          </g>
        );
      })}
      {laceRows.map((row, index) => (
        <g key={`eyelet-rims-${index}`}>
          {[row.left, row.right].map(([x, y], side) => (
            <ellipse
              key={side}
              cx={x}
              cy={y}
              rx="5.4"
              ry="4"
              transform={`rotate(28 ${x} ${y})`}
              fill="none"
              stroke="#f8fafc"
              strokeOpacity="0.74"
              strokeWidth="1"
            />
          ))}
        </g>
      ))}

      {/* Bow and short lace ends finish the eyelet lacing */}
      <g>
        <path
          d="M242 103 C228 93 225 85 232 82 C241 79 247 91 246 101 M248 102 C258 92 268 87 273 92 C278 98 266 106 253 108 M246 102 L240 116 M250 103 L260 115"
          fill="none"
          stroke="#172033"
          strokeOpacity="0.46"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M242 101 C228 91 225 83 232 80 C241 77 247 89 246 99 M248 100 C258 90 268 85 273 90 C278 96 266 104 253 106 M246 100 L240 114 M250 101 L260 113"
          fill="none"
          stroke={laceColor}
          strokeWidth="4.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <ellipse cx="247" cy="101" rx="4.2" ry="3.4" fill={laceColor} stroke="#172033" strokeOpacity="0.45" strokeWidth="1" />
      </g>

      {/* Small sewn tongue label and original side accent */}
      <path
        d="M275 76 Q291 70 307 80 L312 96 Q294 91 270 91Z"
        fill={color.dark ? "#e5e7eb" : "#f8fafc"}
        fillOpacity="0.88"
        stroke="#334155"
        strokeOpacity="0.28"
        strokeWidth="1"
      />
      <text
        x="289"
        y="86"
        textAnchor="middle"
        fontSize="5.5"
        fontWeight="700"
        letterSpacing="0.6"
        fontFamily="Arial, sans-serif"
        fill="#334155"
      >
        CRAFT
      </text>
      <path
        d="M157 190 Q179 181 201 175 M161 196 Q182 188 205 181"
        fill="none"
        stroke={color.dark ? "#fff" : "#334155"}
        strokeOpacity="0.48"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M166 185 Q185 178 204 172 M168 201 Q191 192 211 185"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.5"
        strokeWidth="1"
        strokeDasharray="1 3"
      />

      {monogram && (
        <text
          x="87"
          y="207"
          fontSize="15"
          fontWeight="700"
          fontFamily="Georgia, serif"
          fill={color.dark ? "#fff" : "#172033"}
          fillOpacity="0.82"
        >
          CC
        </text>
      )}
        </svg>
      ) : (
        <ShoeAngleView
          view={views[viewIndex]}
          color={color}
          sole={sole}
          laceColor={laceColor}
          premiumLaces={premiumLaces}
          monogram={monogram}
          waterproof={waterproof}
          id={id}
        />
      )}
      </div>
      <p className="mt-1 text-center text-xs text-gray-500">
        {views[viewIndex]} view <span aria-hidden="true">·</span> Drag to rotate
      </p>
    </div>
  );
}

function ShoeAngleView({ view, color, sole, laceColor, premiumLaces, monogram, waterproof, id }) {
  const topView = view === "Top";
  const frontView = view === "Front";
  const gradientId = `angle-sole-${id}`;
  const upperId = `angle-upper-${id}`;

  return (
    <svg
      viewBox="0 0 540 310"
      role="img"
      aria-label={`${view} view of sneaker: ${color.label}`}
      className="mx-auto block h-auto w-full max-w-2xl"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.7" />
          <stop offset="0.35" stopColor={sole.hex} />
          <stop offset="1" stopColor="#334155" stopOpacity="0.28" />
        </linearGradient>
        <linearGradient id={upperId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.25" />
          <stop offset="1" stopColor="#111827" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      <ellipse cx="270" cy="264" rx="154" ry="14" fill="#172033" fillOpacity="0.14" />

      {topView ? (
        <g>
          <path
            d="M209 25 Q270 7 331 25 L354 71 Q368 105 363 150 L348 225 Q337 273 310 286 Q270 300 230 286 Q203 273 192 225 L177 150 Q172 105 186 71Z"
            fill={`url(#${gradientId})`}
            stroke="#334155"
            strokeWidth="3"
          />
          <path
            d="M215 32 Q270 18 325 32 L345 78 Q355 109 349 151 L334 222 Q324 263 303 274 Q270 287 237 274 Q216 263 206 222 L191 151 Q185 109 195 78Z"
            fill={color.hex}
            stroke="#334155"
            strokeOpacity="0.65"
            strokeWidth="2"
          />
          <path
            d="M222 41 Q270 30 318 41 L331 82 Q338 108 332 143 L319 213 Q310 250 294 261 Q270 272 246 261 Q230 250 221 213 L208 143 Q202 108 209 82Z"
            fill={`url(#${upperId})`}
            stroke="#fff"
            strokeOpacity="0.5"
            strokeWidth="1.5"
          />
          <ellipse cx="270" cy="54" rx="32" ry="15" fill="#273449" />
          <ellipse cx="270" cy="54" rx="25" ry="10" fill="#101827" />
          <path d="M246 55 Q270 47 294 55" fill="none" stroke={color.hex} strokeOpacity="0.78" strokeWidth="3" />
          <path d="M239 67 Q270 61 301 67" fill="none" stroke="#fff" strokeOpacity="0.36" strokeWidth="1.2" strokeDasharray="2 3" />
          <path
            d="M238 62 Q245 46 270 43 Q295 46 302 62 L309 105 L231 105Z"
            fill={waterproof ? "#bfdbfe" : color.hex}
            fillOpacity="0.75"
            stroke="#334155"
            strokeOpacity="0.4"
            strokeWidth="1.5"
          />
          {[0, 1, 2, 3, 4].map((row) => (
            <g key={`top-lace-${row}`}>
              <ellipse cx={239 + row * 3} cy={99 + row * 13} rx="4" ry="3" fill="#334155" />
              <ellipse cx={301 - row * 3} cy={99 + row * 13} rx="4" ry="3" fill="#334155" />
              {row < 4 && (
                <>
                  <path
                    d={`M${239 + row * 3} ${99 + row * 13} L${301 - (row + 1) * 3} ${112 + row * 13}`}
                    stroke="#172033"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                  <path
                    d={`M${239 + row * 3} ${99 + row * 13} L${301 - (row + 1) * 3} ${112 + row * 13}`}
                    stroke={laceColor}
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                  <path
                    d={`M${301 - row * 3} ${99 + row * 13} L${239 + (row + 1) * 3} ${112 + row * 13}`}
                    stroke="#172033"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                  <path
                    d={`M${301 - row * 3} ${99 + row * 13} L${239 + (row + 1) * 3} ${112 + row * 13}`}
                    stroke={laceColor}
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </>
              )}
            </g>
          ))}
          <path
            d="M210 174 Q270 190 330 174 M215 186 Q270 201 325 186 M223 215 Q270 229 317 215"
            fill="none"
            stroke="#fff"
            strokeOpacity="0.56"
            strokeWidth="1.4"
            strokeDasharray="2 4"
          />
          {[0, 1, 2, 3, 4].map((column) =>
            [0, 1].map((row) => (
              <circle
                key={`top-toe-vent-${column}-${row}`}
                cx={246 + column * 12}
                cy={229 + row * 8 + Math.abs(2 - column) * 1.5}
                r="1.4"
                fill={color.dark ? "#fff" : "#273449"}
                fillOpacity="0.42"
              />
            ))
          )}
          <path d="M215 238 Q270 255 325 238" fill="none" stroke="#334155" strokeOpacity="0.28" strokeWidth="1" />
          {monogram && <text x="270" y="220" textAnchor="middle" fontSize="15" fontWeight="700" fill={color.dark ? "#fff" : "#334155"}>CC</text>}
          <text x="270" y="37" textAnchor="middle" fontSize="7" fontWeight="700" letterSpacing="1" fill="#fff" fillOpacity="0.88">HEEL</text>
          <text x="270" y="269" textAnchor="middle" fontSize="7" fontWeight="700" letterSpacing="1" fill={color.dark ? "#fff" : "#334155"} fillOpacity="0.7">TOE</text>
        </g>
      ) : frontView ? (
        <g>
          <path
            d="M127 226 Q132 187 153 158 Q178 127 220 112 Q270 94 320 112 Q362 127 387 158 Q408 187 413 226 Q413 246 392 251 Q270 270 148 251 Q127 246 127 226Z"
            fill={`url(#${gradientId})`}
            stroke="#334155"
            strokeWidth="3"
          />
          <path
            d="M147 218 Q151 182 172 158 Q199 130 235 122 Q270 114 305 122 Q341 130 368 158 Q389 182 393 218 L389 231 Q270 251 151 231Z"
            fill={color.hex}
            stroke="#334155"
            strokeOpacity="0.75"
            strokeWidth="2"
          />
          <path d="M151 218 Q270 239 389 218" fill="none" stroke="#fff" strokeOpacity="0.65" strokeWidth="2" />
          <path
            d="M207 154 Q211 126 236 110 Q251 101 270 101 Q289 101 304 110 Q329 126 333 154 L319 182 Q270 193 221 182Z"
            fill={color.hex}
            stroke="#334155"
            strokeOpacity="0.55"
            strokeWidth="2"
          />
          <path
            d="M180 182 Q201 159 225 155 M360 182 Q339 159 315 155"
            fill="none"
            stroke="#fff"
            strokeOpacity="0.44"
            strokeWidth="1.5"
            strokeDasharray="2 4"
          />
          <path
            d="M164 190 Q270 216 376 190 L389 218 Q270 241 151 218Z"
            fill={`url(#${upperId})`}
            stroke="#334155"
            strokeOpacity="0.46"
            strokeWidth="1.4"
          />
          <path d="M151 218 Q270 239 389 218" fill="none" stroke="#fff" strokeOpacity="0.66" strokeWidth="2" />
          {[0, 1, 2, 3, 4, 5].map((column) =>
            [0, 1].map((row) => (
              <circle
                key={`front-vent-${column}-${row}`}
                cx={237 + column * 13}
                cy={202 + row * 8 + Math.abs(2.5 - column) * 1.5}
                r="1.35"
                fill={color.dark ? "#fff" : "#273449"}
                fillOpacity="0.46"
              />
            ))
          )}
          {[0, 1, 2].map((row) => (
            <g key={`front-lace-${row}`}>
              <ellipse cx={245 - row * 3} cy={134 + row * 14} rx="5" ry="4" fill="#cbd5e1" stroke="#334155" />
              <ellipse cx={295 + row * 3} cy={134 + row * 14} rx="5" ry="4" fill="#cbd5e1" stroke="#334155" />
              <ellipse cx={245 - row * 3} cy={134 + row * 14} rx="2" ry="1.8" fill="#172033" />
              <ellipse cx={295 + row * 3} cy={134 + row * 14} rx="2" ry="1.8" fill="#172033" />
              <path
                d={`M${245 - row * 3} ${134 + row * 14} L${295 + row * 3} ${148 + row * 14}`}
                stroke="#172033"
                strokeWidth="9"
                strokeLinecap="round"
              />
              <path
                d={`M${245 - row * 3} ${134 + row * 14} L${295 + row * 3} ${148 + row * 14}`}
                stroke={laceColor}
                strokeWidth="5.5"
                strokeLinecap="round"
              />
              <path
                d={`M${295 + row * 3} ${134 + row * 14} L${245 - (row + 1) * 3} ${148 + row * 14}`}
                stroke="#172033"
                strokeWidth="9"
                strokeLinecap="round"
              />
              <path
                d={`M${295 + row * 3} ${134 + row * 14} L${245 - (row + 1) * 3} ${148 + row * 14}`}
                stroke={laceColor}
                strokeWidth="5.5"
                strokeLinecap="round"
              />
            </g>
          ))}
          <path d="M270 119 L270 183" stroke="#334155" strokeOpacity="0.28" strokeWidth="1.3" strokeDasharray="2 4" />
          <path d="M219 183 Q270 196 321 183" fill="none" stroke="#334155" strokeOpacity="0.3" strokeWidth="1.2" />
          {waterproof && <path d="M374 107l5 10m-15-5 5 10m23-6 5 10" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />}
          {monogram && <text x="270" y="221" textAnchor="middle" fontSize="14" fontWeight="700" fill={color.dark ? "#fff" : "#334155"}>CC</text>}
        </g>
      ) : (
        <g>
          <path
            d="M169 80 Q270 55 371 80 L388 214 Q388 240 365 247 Q270 270 175 247 Q152 240 152 214Z"
            fill={`url(#${gradientId})`}
            stroke="#334155"
            strokeWidth="3"
          />
          <path
            d="M181 87 Q270 68 359 87 L373 206 Q373 225 354 231 Q270 251 186 231 Q167 225 167 206Z"
            fill={color.hex}
            stroke="#334155"
            strokeOpacity="0.72"
            strokeWidth="2"
          />
          <path
            d="M197 101 Q270 86 343 101 L351 199 Q349 215 335 219 Q270 237 205 219 Q191 215 189 199Z"
            fill={`url(#${upperId})`}
            stroke="#334155"
            strokeOpacity="0.52"
            strokeWidth="1.5"
          />
          <path
            d="M200 105 Q270 91 340 105 L345 195 Q344 208 332 212 Q270 229 208 212 Q196 208 195 195Z"
            fill={color.hex}
            fillOpacity="0.62"
            stroke="#fff"
            strokeOpacity="0.32"
            strokeWidth="1"
          />
          <path d="M188 100 Q270 83 352 100" fill="none" stroke="#fff" strokeOpacity="0.62" strokeWidth="1.5" strokeDasharray="2 4" />
          <path d="M270 93 Q264 152 270 218" fill="none" stroke="#172033" strokeOpacity="0.26" strokeWidth="1.5" />
          <path d="M260 93 Q257 151 261 220 M280 93 Q283 151 279 220" fill="none" stroke="#fff" strokeOpacity="0.44" strokeWidth="1" strokeDasharray="2 4" />
          <path
            d="M210 85 Q213 47 236 41 Q270 32 304 41 Q327 47 330 85 L317 106 Q270 98 223 106Z"
            fill="#172033"
            fillOpacity="0.72"
            stroke="#334155"
            strokeWidth="2"
          />
          <path
            d="M224 81 Q229 54 246 51 Q270 44 294 51 Q311 54 316 81"
            fill="none"
            stroke={color.hex}
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path d="M270 48 L270 99" stroke="#fff" strokeOpacity="0.44" strokeWidth="2" />
          <path d="M236 32 Q270 13 304 32 L297 47 Q270 39 243 47Z" fill={color.hex} stroke="#334155" strokeWidth="2" />
          <path d="M248 29 Q270 18 292 29" fill="none" stroke="#fff" strokeOpacity="0.72" strokeWidth="1.5" strokeDasharray="2 3" />
          <path d="M243 46 Q270 37 297 46" fill="none" stroke="#172033" strokeOpacity="0.34" strokeWidth="2" />
          <path d="M178 214 Q270 237 362 214" fill="none" stroke="#fff" strokeOpacity="0.56" strokeWidth="2" />
          <path
            d="M188 227 Q270 247 352 227 L354 234 Q270 256 186 234Z"
            fill="#172033"
            fillOpacity="0.48"
          />
          {[0, 1, 2, 3, 4].map((index) => (
            <path
              key={`heel-tread-${index}`}
              d={`M${207 + index * 31} 239 l8 5 8 -5`}
              fill="none"
              stroke="#0f172a"
              strokeOpacity="0.62"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          ))}
          <path d="M216 105 Q224 96 236 93 M324 105 Q316 96 304 93" fill="none" stroke="#fff" strokeOpacity="0.48" strokeWidth="1.3" strokeDasharray="2 4" />
          <text x="270" y="179" textAnchor="middle" fontSize="8" fontWeight="700" letterSpacing="1.2" fill={color.dark ? "#fff" : "#334155"} fillOpacity="0.6">CRAFT / HEEL</text>
          <path d="M178 214 Q270 237 362 214" fill="none" stroke="#fff" strokeOpacity="0.55" strokeWidth="2" />
          {monogram && <text x="270" y="176" textAnchor="middle" fontSize="20" fontWeight="700" fill={color.dark ? "#fff" : "#334155"}>CC</text>}
          {waterproof && <path d="M360 111l5 10m-17-5 5 10m22 4 5 10" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />}
        </g>
      )}

      {premiumLaces && (
        <text x="270" y="294" textAnchor="middle" fontSize="9" fontWeight="700" letterSpacing="1.2" fill={laceColor}>
          PREMIUM LACES
        </text>
      )}
    </svg>
  );
}
