// ╔══════════════════════════════════════════════════════════════╗
// ║  EJEMPLO: Tu Propia Agencia de Desarrollo Web               ║
// ║  Copia esto a config.js para lanzar tu negocio de inmediato  ║
// ╚══════════════════════════════════════════════════════════════╝

const CONFIG = {
  email: "landirianositeoficial@gmail.com",
  whatsapp: "https://wa.me/teredicrom?s=t",
  access_key: "72981d4f-66f6-4fba-8fb6-75bfa899c4b1",

  templateType: "professional",
  theme: "ocean-pro", // Un azul tecnológico y premium
  typography: { fontHeading: "Outfit", fontBody: "Inter", fontSize: 16, fontWeightHeading: 800 },
  effects: { glassmorphism: true, animations: true, gradientText: true, glowButtons: true },

  businessName:  "LANDIRIANOS SITE", // ← Puedes cambiar el nombre de tu agencia aquí
  businessSlogan: "Desarrollo Web Premium e Ingeniería Digital para Empresas Escalables",
  businessDescription: "En LANDIRIANOS SITE operamos como un estudio especializado en ingeniería digital y soluciones web de alto nivel. Transformamos modelos de negocio tradicionales en infraestructuras digitales altamente eficientes, escalables y seguras. Nuestro enfoque fusiona la vanguardia tecnológica con arquitecturas de conversión avanzadas, garantizando un retorno de inversión (ROI) real, medible y sostenible para corporaciones y marcas líderes.",
  logo: null,
  currency: "USD", currencySymbol: "$",
  heroBadgeText: null,
  heroCTAText: "Solicitar Cotización",

  heroBg: { 
    type: "image", 
    imageUrl: "./assets/backgrounds/hero-bg.webp",
    imageOverlay: 0.55
  },

  sections: {
    hero: true, about: true, services: true, portfolio: true,
    products: false, digital: false, testimonials: true, faq: true, contact: true
  },

  contact: { whatsapp: "https://wa.me/teredicrom?s=t", email: "landirianositeoficial@gmail.com", schedule: "Lun-Vie 9am–7pm" },
  social: { instagram: "https://instagram.com/landirianos.site", linkedin: "https://linkedin.com/company/landirianos-site" },

  floatingButtons: {
    whatsapp: { enabled: true, number: "https://wa.me/teredicrom?s=t", message: "Hola! Vengo de su web y me interesan los planes de desarrollo 🚀", pulse: true, position: "bottom-right" },
    email: { enabled: true, address: "landirianositeoficial@gmail.com", subject: "Consulta de Proyecto Web" }, 
    phone: { enabled: false }, scrollTop: { enabled: true }
  },

  about: {
    title: "Quiénes Somos: Expertos en Automatización y Ecosistemas Web Robustos",
    subtitle: "¿Qué Somos Capaces de Lograr por Tu Negocio?",
    description: "En LANDIRIANOS SITE operamos como un estudio especializado en ingeniería digital y soluciones web de alto nivel. Transformamos modelos de negocio tradicionales en infraestructuras digitales altamente eficientes, escalables y seguras. Nuestro enfoque fusiona la vanguardia tecnológica con arquitecturas de conversión avanzadas, garantizando un retorno de inversión (ROI) real, medible y sostenible para corporaciones y marcas líderes.",
    image: null,
    carousel: [
      { src: "./assets/PORTAFOLIOS/MOCKUP-ENTRENADOR-JHONMAYKEL.webp",  label: "Portafolios Profesionales" },
      { src: "./assets/PAGINA WEB/MOCKUP INCREATEX CORPORATIVO.webp",    label: "Páginas Web Premium" },
      { src: "./assets/tiendas virtuales/tiendaautomotriz.webp",         label: "Tiendas Virtuales Automatizadas" },
    ],
    highlights: [
      { icon: "⚡", label: "Escalabilidad Estructural Garantizada: Diseñamos plataformas web premium capaces de soportar picos masivos de tráfico concurrentes." },
      { icon: "⚙️", label: "Automatización Operativa Avanzada: Conectamos tus procesos comerciales y flujos de usuarios eliminando la carga administrativa manual." },
      { icon: "🛡️", label: "Blindaje Digital e Integridad: Implementamos protocolos de ciberseguridad avanzados para proteger tus activos de software." },
      { icon: "🤖", label: "Integración con Inteligencia Artificial (IA): Fusionamos analítica de datos de última generación e IA en un ecosistema unificado." }
    ],
    stats: [
      { number: "99.9%", label: "Uptime en Servidores" },
      { number: "24/7", label: "Soporte Técnico" },
      { number: "100%", label: "Auto-Administrables" },
    ]
  },

  services: {
    title: "Nuestras Soluciones Web y Servicios de Ingeniería Digital",
    subtitle: "Ingeniería de datos, ciberseguridad avanzada y plataformas de conversión de alto impacto.",
    items: [
      { 
        id: "pl_001", icon: "🌐", name: "Plan Starter — Presencia", 
        description: "Tu tarjeta de presentación digital. Landing page informativa, servidor y soporte incluido. (Sin tienda).", 
        price: "$39", duration: "/ mes", highlight: false,
        focus: "Construir una identidad profesional sólida, blindada y de alta velocidad.",
        logic: "Por el costo de una suscripción básica, obtienes una oficina digital abierta 24/7 que trabaja para ti.",
        details: [
          { t: "Landing Page Informativa de Alto Impacto", d: "" },
          { t: "Storytelling Persuasivo", d: "Redacción diseñada para retener al usuario en los primeros 3 segundos." },
          { t: "Secciones de Autoridad", d: "Espacio para hitos, experiencia, misión y validación social." },
          { t: "Formularios Inteligentes", d: "Captura de leads optimizada para que los clientes te contacten con un clic." },
          { t: "Ecosistema de Tarjeta Digital (NFC Ready)", d: "Perfil interactivo para compartir por QR o proximidad, eliminando el gasto en tarjetas de papel." },
          { t: "Infraestructura de Grado Empresarial", d: "Hosting de alta velocidad, Servidores con uptime del 99.9% y Certificado SSL (Seguridad Total) incluido." }
        ]
      },
      { 
        id: "pl_002", icon: "🚀", name: "Plan Emprendedor — E-Commerce", 
        description: "Ideal para tiendas. Landing con carrito, botones flotantes y acceso total a tu panel para subir productos.", 
        price: "$99", duration: "/ mes (1er Mes GRATIS)", highlight: true,
        focus: "Transformar visitantes en transacciones reales sin intervención manual.",
        logic: "Eliminamos el riesgo inicial. Si vendes un par de productos, el sistema se paga solo.",
        details: [
          { t: "E-Commerce Hub Profesional", d: "Carrito de compras fluido y optimizado para reducir el abandono antes del pago." },
          { t: "Gestión de Inventario Autónoma", d: "Panel administrativo intuitivo para controlar stock, precios y variantes (tallas, colores) sin saber programar." },
          { t: "Canales de Cierre Directo", d: "Botones flotantes inteligentes conectados a WhatsApp o Telegram para asesoría en tiempo real." },
          { t: "SEO Local Básico", d: "Configuración técnica para que los clientes en tu ciudad te encuentren primero en Google." }
        ]
      },
      { 
        id: "pl_003", icon: "💼", name: "Plan Profesional — Business", 
        description: "Soporte VIP. Asesoría estratégica, link protegido y opción a delegarnos la carga de todo tu catálogo mensual.", 
        price: "$250", duration: "/ mes", highlight: false,
        focus: "Liberar el tiempo del dueño del negocio delegando la operatividad técnica.",
        logic: "Es más barato que contratar a un asistente o un diseñador, pero con resultados de agencia experta.",
        details: [
          { t: "Carga de Catálogo Delegada", d: "Tú nos envías las fotos por chat y nosotros subimos, editamos y optimizamos los productos por ti." },
          { t: "Asesoría Estratégica Mensual", d: "Sesión de análisis para revisar tus métricas de tráfico y sugerir mejoras en tus embudos." },
          { t: "Seguridad y Backup Pro", d: "Copias de seguridad diarias y protocolos de cifrado avanzados para proteger los datos de tus clientes." },
          { t: "Soporte VIP Prioritario", d: "Línea directa de atención con tiempos de respuesta reducidos para cualquier cambio urgente." }
        ]
      },
      { 
        id: "pl_004", icon: "🏢", name: "Plan Corporate — All Inclusive", 
        description: "Servicio Concierge. Nosotros subimos los productos, diseñamos campañas y te hacemos hasta 3 rediseños completos al año.", 
        price: "$1000+", duration: "/ mes", highlight: false,
        focus: "Una solución llave en mano para empresas que buscan dominancia en el mercado.",
        logic: "Sustituye a una agencia de marketing completa. El ahorro en nómina de especialistas es superior al 80%.",
        details: [
          { t: "Servicio de Concierge Dedicado", d: "Un gestor de cuenta que conoce tu marca a fondo y ejecuta todas tus solicitudes." },
          { t: "Laboratorio de Diseño Evolutivo", d: "Hasta 3 rediseños visuales totales al año para que tu marca nunca se vea obsoleta." },
          { t: "Estrategia de Crecimiento Agresivo", d: "Creación y optimización de campañas publicitarias (Ads) y análisis de conversión constante (CRO)." },
          { t: "Mantenimiento Total", d: "Gestión integral de contenidos, actualizaciones de seguridad y nuevas funcionalidades cada mes." }
        ]
      },
      { 
        id: "pl_005", icon: "🤝", name: "Plan Partner — Beneficio Mútuo", 
        description: "Retención por % de ventas. Si tienes alto contenido, creamos tu tienda y compartimos las ganancias de cada venta mediante contrato mutuo.", 
        price: "% / venta", duration: "(Previa Evaluación)", highlight: false,
        focus: "Sociedad de crecimiento conjunto para figuras con gran alcance pero sin infraestructura.",
        logic: "Riesgo Cero. Nosotros invertimos tecnología y trabajo; tú pones tu marca y audiencia. Solo ganamos si tú ganas.",
        details: [
          { t: "Desarrollo de Tienda Costo Cero", d: "Construimos toda tu infraestructura de e-commerce sin que tengas que pagar el montaje ni la configuración inicial." },
          { t: "Monetización de Audiencia", d: "Diseñamos el embudo de ventas específicamente para convertir a tus seguidores en compradores recurrentes de forma orgánica." },
          { t: "Transparencia Total en Tiempo Real", d: "Acceso a un dashboard compartido donde ambos vemos las ventas, pedidos y comisiones generadas al instante." },
          { t: "Socio Tecnológico Permanente", d: "Nos encargamos de que la tienda soporte picos de tráfico masivo (ej. durante un lanzamiento o promoción) sin caerse." },
          { t: "Contrato de Sociedad Digital", d: "Marco legal sólido que garantiza la propiedad de tu marca y la transparencia en la repartición de beneficios." }
        ]
      }
    ]
  },

  portfolio: {
    title: "Proyectos Realizados y Casos de Éxito Digital",
    subtitle: "Combinamos el desarrollo de sistemas robustos con el diseño de interfaces web premium altamente funcionales.",
    items: [
      // ── PORTAFOLIOS ───────────────────────────────────────────────
      { id: "pt_p01", category: "Portafolios", title: "Entrenador Jhonmaykel Carloman",
        image: "./assets/PORTAFOLIOS/MOCKUP-ENTRENADOR-JHONMAYKEL.webp",
        url: "https://landirianositeoficial-pro.github.io/portafoliojhonmaykelcarloman/" },
      { id: "pt_p02", category: "Portafolios", title: "Maga Interactiva",
        image: "./assets/PORTAFOLIOS/MOCKUP-MAGA INTERACTIVA.webp",
        url: "https://landirianositeoficial-pro.github.io/portafolioannakaritmata/" },
      { id: "pt_p03", category: "Portafolios", title: "Dise\u00f1ador Gr\u00e1fico Creativo",
        image: "./assets/PORTAFOLIOS/disenadorgraficonaranjachico.webp",
        url: "#" },
      { id: "pt_p04", category: "Portafolios", title: "Portafolio Fitness",
        image: "./assets/PORTAFOLIOS/portafoliofitnneschica1.webp",
        url: "#" },
      { id: "pt_p05", category: "Portafolios", title: "Portafolio Creativo",
        image: "./assets/PORTAFOLIOS/portafoliocreativo.webp",
        url: "#" },
      { id: "pt_p06", category: "Portafolios", title: "Web de Dise\u00f1o",
        image: "./assets/PORTAFOLIOS/webdedisenohombre.webp",
        url: "#" },
      { id: "pt_p07", category: "Portafolios", title: "Servicio Profesional",
        image: "./assets/PORTAFOLIOS/servicioprofesional.webp",
        url: "#" },
      { id: "pt_p08", category: "Portafolios", title: "Gym Website",
        image: "./assets/PORTAFOLIOS/gymwebsitechico1.webp",
        url: "#" },
      // ── P\u00c1GINAS WEB ─────────────────────────────────────────────
      { id: "pt_w01", category: "P\u00e1ginas Web", title: "INCREATEX Corporativo",
        image: "./assets/PAGINA WEB/MOCKUP INCREATEX CORPORATIVO.webp",
        url: "https://landirianositeoficial-pro.github.io/INCREATEXOFICIAL/" },
      // ── TIENDAS VIRTUALES ─────────────────────────────────────────
      { id: "pt_t01", category: "Tiendas Virtuales", title: "Tienda Automotriz",
        image: "./assets/tiendas virtuales/tiendaautomotriz.webp",
        url: "#" },
      { id: "pt_t02", category: "Tiendas Virtuales", title: "Tecnolog\u00eda & Gadgets",
        image: "./assets/tiendas virtuales/tiendadeobjetostecnologicos.webp",
        url: "#" },
      { id: "pt_t03", category: "Tiendas Virtuales", title: "Zapater\u00eda Online",
        image: "./assets/tiendas virtuales/tiendadezapateria.webp",
        url: "#" },
      { id: "pt_t04", category: "Tiendas Virtuales", title: "Moda Masculina",
        image: "./assets/tiendas virtuales/tiendamodahombrecreativo.webp",
        url: "#" },
      { id: "pt_t05", category: "Tiendas Virtuales", title: "Tienda Maquillaje",
        image: "./assets/tiendas virtuales/tiendaonlinemaquillaje.webp",
        url: "#" },
      // ── HERRAMIENTAS ──────────────────────────────────────────────
      { id: "pt_h01", category: "Herramientas", title: "Facturadora Proforma",
        image: "./assets/HERRAMIENTAS/FACTURADORA PROFORMA MOCKUP.webp",
        url: "https://landirianositeoficial-pro.github.io/MI-FACTURADORAFREELANCER/" },
      { id: "pt_h02", category: "Herramientas", title: "Selector de Color Franelas",
        image: "./assets/HERRAMIENTAS/HERRAMIENTA-SELECTORDECOLORFRANELAS.webp",
        url: "https://landirianositeoficial-pro.github.io/Selector-de-color-para-franelas-/" },
      { id: "pt_h03", category: "Herramientas", title: "Monitor Landiriano",
        image: "./assets/HERRAMIENTAS/BOTON DE MONITOR.webp",
        url: "" }
    ]
  },

  methodology: {
    title: "Pilares Metodológicos: Innovación, Seguridad y Rentabilidad",
    advantages: [
      { title: "Estrategias Comerciales y SEO Basadas en Intención de Compra", desc: "Aplicamos tácticas avanzadas de optimización de la tasa de conversión (CRO) e ingeniería inversa de búsqueda (SEO) para atraer audiencias cualificadas." },
      { title: "Ventajas Competitivas: Ecosistemas con Integración Total", desc: "Entregamos un ecosistema web unificado, blindado contra ataques, posicionado orgánicamente y automatizado de extremo a extremo." },
      { title: "Equilibrio de Costos e Inversión Eficiente (Maximización del ROI)", desc: "Desarrollamos soluciones web bajo estrictos principios de costo-eficiencia, eliminando sobrecostos futuros mediante auditorías técnicas preventivas." }
    ]
  },

  testimonials: {
    title: "Construimos Confianza",
    subtitle: "Respaldados por negocios que están escalando gracias a nuestra tecnología.",
    items: [
      { name: "Neon Closet", location: "Caracas", photo: "https://placehold.co/80x80/0F0818/C084FC?text=NC", text: "Antes no sabíamos cómo subir productos a una web, nos daba terror. Con el panel visual que nos habilitaron, literal subimos el stock nuevo desde el teléfono en 5 minutos.", rating: 5, platform: "Instagram" },
      { name: "Coach Ramírez", location: "Bogotá", photo: "https://placehold.co/80x80/160C00/FF8C00?text=CR", text: "El sistema de código y candado de seguridad para mis Ebooks es perfecto. Evito el pirateo, cobro mis dólares por WhatsApp y el cliente lo descarga él mismo. Me quitó un dolor de cabeza.", rating: 5, platform: "Google" },
    ]
  },

  faq: {
    title: "Preguntas Frecuentes",
    subtitle: "Resolvemos tus dudas principales para arrancar hoy.",
    items: [
      { question: "¿Por qué pagar mensualmente y no un único pago?", answer: "Un pago web inicial ronda los $1,500 USD, lo cual asfixia a muchos emprendedores. Además, debes seguir pagando servidores y mantenimiento externo. Nuestro modelo SaaS ($99/mes) te diluye el costo, asumiendo nosotros los gastos técnicos, mantenimiento de la nube, y actualizaciones futuras. Si la web se cae, el problema es nuestro, no tuyo." },
      { question: "¿Me entregan contraseñas o el panel es de ustedes?", answer: "En los planes desde Emprendedor, te configuramos una clave de administrador para que modifiques, ocultes o subas productos en tiempo real, desde tu teléfono o computadora. Tú controlas tu inventario." },
      { question: "¿En cuánto tiempo me entregan mi página?", answer: "Si ya tienes tu material (logo, colores y fotografías), entregamos la estructura lista con los primeros productos subidos en 48 horas hábiles." },
      { question: "¿Existe compromiso de permanencia?", answer: "No. Puedes darte de baja cuando desees sin penalizaciones ocultas." },
    ]
  },

  paymentMethods: ["Zelle", "PayPal", "Binance Pay", "Pago Móvil"],
  seo: { title: "LANDIRIANOS SITE | Desarrollo Web Premium y Apps Corporativas", description: "Agencia líder en desarrollo web premium, automatización de ecommerce con IA, ciberseguridad avanzada y optimización SEO. Maximiza el ROI de tu negocio.", lang: "es" },
  // ─── PREMIUM TEMPLATES ENGINE ──────────────────────────────────
  // Variantes elegibles desde la carpeta ./PLANTILLAS/
  premiumTemplates: {
    activePaletteCatalog:    "default", // Opciones: catalogo_paletas_premium.html
    activeBackgroundEffect:  "default", // Opciones: efectos_fondo.html
    activeTypographyEffect:  "default", // Opciones: efectos_tipografia.html
    activeCreativeCartForm:  "default", // Opciones: formas_carrito_creativo.html
    activeCreativeFaqForm:   "default", // Opciones: formas_faq_creativas.html
    activeFuturisticSection: "default"  // Opciones: secciones_futuristas.html
  },
};

function getMergedConfig() {
  return CONFIG;
}
