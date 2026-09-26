// themes.js — Temas de color preconstruidos
// Cada tema define las variables CSS que se aplican al :root
// Puedes agregar más temas aquí o editarlos

const THEMES = {

  // ══════════════════════════════════════════
  // 1. MIDNIGHT GOLD — Lujo, joyería, alta costura
  // ══════════════════════════════════════════
  "midnight-gold": {
    label: "Midnight Gold",
    description: "Lujo oscuro con toques dorados",
    preview: ["#0A0A0F", "#D4AF37", "#F5E6A3"],
    vars: {
      "--c-primary":       "#D4AF37",
      "--c-primary-rgb":   "212,175,55",
      "--c-primary-light": "#F5E6A3",
      "--c-accent":        "#C9A227",
      "--c-bg":            "#0A0A0F",
      "--c-bg-2":          "#141420",
      "--c-surface":       "#1E1E2E",
      "--c-surface-2":     "#252535",
      "--c-text":          "#E8E8F0",
      "--c-text-muted":    "#8888A8",
      "--c-border":        "rgba(212,175,55,0.15)",
      "--c-shadow-glow":   "rgba(212,175,55,0.25)",
      "--c-hero-grad-1":   "#0A0A0F",
      "--c-hero-grad-2":   "#1A1428",
    }
  },

  // ══════════════════════════════════════════
  // 2. ROSE LUXURY — Estética, spa, belleza, maquillaje
  // ══════════════════════════════════════════
  "rose-luxury": {
    label: "Rose Luxury",
    description: "Elegancia rosada para belleza y estética",
    preview: ["#1A0A10", "#E8A0BF", "#F9E4EE"],
    vars: {
      "--c-primary":       "#E8A0BF",
      "--c-primary-rgb":   "232,160,191",
      "--c-primary-light": "#F9E4EE",
      "--c-accent":        "#C8707F",
      "--c-bg":            "#120810",
      "--c-bg-2":          "#1E1018",
      "--c-surface":       "#2A1520",
      "--c-surface-2":     "#321A26",
      "--c-text":          "#F5E8EE",
      "--c-text-muted":    "#B098A0",
      "--c-border":        "rgba(232,160,191,0.15)",
      "--c-shadow-glow":   "rgba(232,160,191,0.25)",
      "--c-hero-grad-1":   "#120810",
      "--c-hero-grad-2":   "#2A0E20",
    }
  },

  // ══════════════════════════════════════════
  // 3. OCEAN PRO — Médicos, abogados, tecnología, finanzas
  // ══════════════════════════════════════════
  "ocean-pro": {
    label: "Ocean Pro",
    description: "Profesional y confiable en azul marino",
    preview: ["#050F1A", "#00B4D8", "#90E0EF"],
    vars: {
      "--c-primary":       "#00B4D8",
      "--c-primary-rgb":   "0,180,216",
      "--c-primary-light": "#90E0EF",
      "--c-accent":        "#0096C7",
      "--c-bg":            "#050F1A",
      "--c-bg-2":          "#0A1628",
      "--c-surface":       "#0D1F35",
      "--c-surface-2":     "#122845",
      "--c-text":          "#E0F4FF",
      "--c-text-muted":    "#6A9AB8",
      "--c-border":        "rgba(0,180,216,0.15)",
      "--c-shadow-glow":   "rgba(0,180,216,0.25)",
      "--c-hero-grad-1":   "#050F1A",
      "--c-hero-grad-2":   "#0A1E3A",
    }
  },

  // ══════════════════════════════════════════
  // 4. FOREST ZEN — Coaches, nutrición, yoga, bienestar
  // ══════════════════════════════════════════
  "forest-zen": {
    label: "Forest Zen",
    description: "Naturaleza y calma para bienestar",
    preview: ["#080F08", "#4ADE80", "#D4EDDA"],
    vars: {
      "--c-primary":       "#4ADE80",
      "--c-primary-rgb":   "74,222,128",
      "--c-primary-light": "#D4EDDA",
      "--c-accent":        "#22C55E",
      "--c-bg":            "#080F08",
      "--c-bg-2":          "#101A10",
      "--c-surface":       "#162216",
      "--c-surface-2":     "#1C2C1C",
      "--c-text":          "#E8F5E8",
      "--c-text-muted":    "#7A9A7A",
      "--c-border":        "rgba(74,222,128,0.15)",
      "--c-shadow-glow":   "rgba(74,222,128,0.25)",
      "--c-hero-grad-1":   "#080F08",
      "--c-hero-grad-2":   "#0F200F",
    }
  },

  // ══════════════════════════════════════════
  // 5. URBAN INK — Tatuadores, músicos, artistas, streetwear
  // ══════════════════════════════════════════
  "urban-ink": {
    label: "Urban Ink",
    description: "Arte urbano y cultura underground",
    preview: ["#0A0A0A", "#FF3B30", "#FF8C00"],
    vars: {
      "--c-primary":       "#FF3B30",
      "--c-primary-rgb":   "255,59,48",
      "--c-primary-light": "#FF8C00",
      "--c-accent":        "#FF6B00",
      "--c-bg":            "#0A0A0A",
      "--c-bg-2":          "#141414",
      "--c-surface":       "#1C1C1C",
      "--c-surface-2":     "#242424",
      "--c-text":          "#F0F0F0",
      "--c-text-muted":    "#808080",
      "--c-border":        "rgba(255,59,48,0.15)",
      "--c-shadow-glow":   "rgba(255,59,48,0.3)",
      "--c-hero-grad-1":   "#0A0A0A",
      "--c-hero-grad-2":   "#1A0808",
    }
  },

  // ══════════════════════════════════════════
  // 6. CANDY STORE — Moda joven, accesorios, lifestyle femenino
  // ══════════════════════════════════════════
  "candy-store": {
    label: "Candy Store",
    description: "Vibrante y alegre para moda joven",
    preview: ["#0F0818", "#C084FC", "#F0ABFC"],
    vars: {
      "--c-primary":       "#C084FC",
      "--c-primary-rgb":   "192,132,252",
      "--c-primary-light": "#F0ABFC",
      "--c-accent":        "#FB7185",
      "--c-bg":            "#0F0818",
      "--c-bg-2":          "#180E28",
      "--c-surface":       "#221535",
      "--c-surface-2":     "#2A1A40",
      "--c-text":          "#F5E8FF",
      "--c-text-muted":    "#9070A8",
      "--c-border":        "rgba(192,132,252,0.15)",
      "--c-shadow-glow":   "rgba(192,132,252,0.3)",
      "--c-hero-grad-1":   "#0F0818",
      "--c-hero-grad-2":   "#1E0F30",
    }
  },

  // ══════════════════════════════════════════
  // 7. SOLAR ENERGY — Emprendedores, cursos, motivación
  // ══════════════════════════════════════════
  "solar-energy": {
    label: "Solar Energy",
    description: "Energía y motivación con naranja solar",
    preview: ["#0A0600", "#FF8C00", "#FFD700"],
    vars: {
      "--c-primary":       "#FF8C00",
      "--c-primary-rgb":   "255,140,0",
      "--c-primary-light": "#FFD700",
      "--c-accent":        "#FF6B00",
      "--c-bg":            "#0A0600",
      "--c-bg-2":          "#160C00",
      "--c-surface":       "#1F1200",
      "--c-surface-2":     "#281800",
      "--c-text":          "#FFF5E0",
      "--c-text-muted":    "#A07040",
      "--c-border":        "rgba(255,140,0,0.15)",
      "--c-shadow-glow":   "rgba(255,140,0,0.3)",
      "--c-hero-grad-1":   "#0A0600",
      "--c-hero-grad-2":   "#1A0E00",
    }
  }
};

// Fuentes disponibles (Google Fonts)
const FONTS = {
  "Outfit":      { label: "Outfit — Moderno y limpio", weights: [300,400,500,600,700,900] },
  "Inter":       { label: "Inter — Profesional y legible", weights: [300,400,500,600,700,800] },
  "Playfair Display": { label: "Playfair Display — Elegante y serif", weights: [400,500,600,700,800] },
  "Poppins":     { label: "Poppins — Amigable y redondeado", weights: [300,400,500,600,700,800] },
  "Montserrat":  { label: "Montserrat — Fuerte y deportivo", weights: [300,400,500,600,700,800,900] },
  "Raleway":     { label: "Raleway — Sofisticado y ligero", weights: [300,400,500,600,700,800] },
  "Josefin Sans":{ label: "Josefin Sans — Geométrico y artístico", weights: [300,400,600,700] },
  "DM Sans":     { label: "DM Sans — Neutro y técnico", weights: [300,400,500,600,700] },
};

// Aplicar tema al documento
function applyTheme(themeName, customVars = {}) {
  const theme = THEMES[themeName];
  const vars = theme ? { ...theme.vars, ...customVars } : customVars;
  const root = document.documentElement;
  Object.entries(vars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}

// Aplicar tipografía al documento
function applyTypography(fontHeading, fontBody, fontSize, fontWeight) {
  const root = document.documentElement;
  if (fontHeading) root.style.setProperty('--font-heading', `'${fontHeading}', sans-serif`);
  if (fontBody)    root.style.setProperty('--font-body',    `'${fontBody}', sans-serif`);
  if (fontSize)    root.style.setProperty('--fs-base',      fontSize + 'px');
  if (fontWeight)  root.style.setProperty('--fw-heading',   fontWeight);
  loadGoogleFonts([fontHeading, fontBody].filter(Boolean));
}

// Cargar fuentes de Google Fonts dinámicamente
function loadGoogleFonts(families) {
  if (!families.length) return;
  const existing = document.getElementById('dynamic-fonts');
  if (existing) existing.remove();
  const link = document.createElement('link');
  link.id = 'dynamic-fonts';
  link.rel = 'stylesheet';
  const familiesParam = families
    .map(f => `family=${f.replace(/ /g, '+')}:wght@300;400;500;600;700;800;900`)
    .join('&');
  link.href = `https://fonts.googleapis.com/css2?${familiesParam}&display=swap`;
  document.head.appendChild(link);
}

console.log('✅ Themes cargados:', Object.keys(THEMES).length, 'temas disponibles');
