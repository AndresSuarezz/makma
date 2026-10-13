/**
 * Contenido del sitio. Fuente: docs/diseno/sitio.md
 * Los precios son de instalación, en COP, y siempre se muestran con "desde".
 * Pendientes por confirmar con el negocio: IVA, unidad del precio de consultoría IT,
 * montos de suscripción y datos de contacto reales.
 */

export const nav = [
	{ href: '/#inicio', label: 'Inicio' },
	{ href: '/#servicios', label: 'Servicios' },
	{ href: '/#proceso', label: 'Cómo trabajamos' },
	{ href: '/#planes', label: 'Planes' },
	{ href: '/#preguntas', label: 'Preguntas' },
	{ href: '/#contacto', label: 'Contacto' }
] as const;

export const hero = {
	eyebrow: 'Casa de desarrollo tecnológico',
	titleStart: 'Software que',
	titleAccent: 'trabaja',
	titleEnd: 'mientras tu negocio crece.',
	lead: 'Dile adiós a las suscripciones eternas y a las plantillas genéricas. Construimos software propio y agentes de IA que automatizan tus procesos y escalan tu negocio.'
};

export const context = {
	eyebrow: 'Contexto',
	title: '¿Por qué contratar software hecho a tu medida?',
	paragraphs: [
		'Cuando un negocio escala, las hojas de cálculo y las aplicaciones genéricas se quedan cortas. Una casa de desarrollo construye la infraestructura que se amolda exactamente a tu operación, no al revés.',
		'Pagar suscripciones mensuales por plataformas que no controlas es cosa del pasado. Lo inteligente es tener software propio: personalizado, sin plantillas infladas y 100% de tu propiedad. Nosotros te orientamos para construir justo lo que tu empresa necesita; y si usas una herramienta existente, construimos la tuya propia personalizada a tu negocio.'
	],
	badge: 'Dile adiós a las suscripciones eternas · Construye software propio'
};

export interface Service {
	index: string;
	title: string;
	text: string;
	items: { name: string; detail: string }[];
}

export const services: Service[] = [
	{
		index: '01',
		title: 'Desarrollo web',
		text: 'Sitios y plataformas rápidos, que se encuentran en buscadores.',
		items: [
			{ name: 'Página web', detail: 'corporativa y optimizada para SEO' },
			{ name: 'Tienda en línea', detail: 'carrito, inventario y pasarelas de pago' },
			{ name: 'Sistema de gestión', detail: 'a la medida de tu operación administrativa' }
		]
	},
	{
		index: '02',
		title: 'Agentes y automatización',
		text: 'Procesos que se conectan solos y asistentes que atienden por ti.',
		items: [
			{
				name: 'Automatización',
				detail: 'de flujos, como sincronizar correos con tu base de datos o CRM'
			},
			{
				name: 'Bots de venta y atención',
				detail: 'conectados a tu catálogo para perfilar y cerrar ventas'
			},
			{ name: 'Bots de cobro', detail: 'con links de pago dinámicos directo en WhatsApp' }
		]
	},
	{
		index: '03',
		title: 'Aplicaciones móviles',
		text: 'Apps para tu equipo en campo y para tus clientes.',
		items: [
			{ name: 'App de gestión interna', detail: 'operarios en campo, inventario y logística' },
			{ name: 'App para clientes', detail: 'fidelización, reservas o pedidos recurrentes' }
		]
	},
	{
		index: '04',
		title: 'Infraestructura y consultoría IT',
		text: 'Que tus sistemas funcionen, estén seguros y no se detengan.',
		items: [
			{ name: 'Auditoría de sistemas', detail: 'qué tienes y qué le falta' },
			{ name: 'Migración a la nube', detail: 'sin detener tu operación' },
			{ name: 'Redes y mantenimiento', detail: 'estructuración y mantenimiento preventivo' }
		]
	}
];

export const steps = [
	{ title: 'Análisis', text: 'Entendemos tu operación y qué quieres resolver.' },
	{ title: 'Diseño', text: 'Definimos la interfaz y la experiencia antes de programar.' },
	{ title: 'Desarrollo y despliegue', text: 'Construimos y publicamos el sistema, bot o app.' },
	{
		title: 'Acompañamiento',
		text: 'Hosting, mantenimiento y copias de seguridad automáticas con una suscripción mensual o anual.'
	}
];

export const paymentTerms = '50% al empezar, 50% cuando recibes el sistema funcionando.';

export const pricingDisclaimer =
	'* Precios antes de IVA. Cotizaciones a la medida según el alcance y los requerimientos de tu proyecto.';

export interface Plan {
	category: string;
	name: string;
	/** Precio de instalación en COP, o null si se cotiza a medida. */
	price: number | null;
	note: string;
	items: string[];
	featured?: boolean;
}

export const plans: Plan[] = [
	{
		category: 'Desarrollo web',
		name: 'Página web',
		price: 350_000,
		note: 'Pago único de instalación. El código es tuyo. Hosting y soporte opcionales.',
		items: ['Sitio corporativo ultrarrápido', 'Optimizado para SEO']
	},
	{
		category: 'Desarrollo web',
		name: 'Sistema de gestión',
		price: 600_000,
		note: 'Pago único de instalación. Sin licencias por usuario. Código propio.',
		items: ['Control administrativo a la medida', 'Funcionalidades personalizadas']
	},
	{
		category: 'Desarrollo web',
		name: 'Tienda en línea',
		price: 1_000_000,
		note: 'Pago único de instalación. Sin comisiones por venta. De tu propiedad.',
		items: ['Carrito de compra', 'Control de inventario', 'Pasarelas de pago integradas']
	},
	{
		category: 'Aplicaciones móviles',
		name: 'App de gestión interna',
		price: 1_500_000,
		note: 'Pago único de instalación. Diseñada para tus operarios sin límites de usuarios.',
		items: ['Herramientas para operarios en campo', 'Toma de inventario y logística']
	},
	{
		category: 'Aplicaciones móviles',
		name: 'App para clientes',
		price: 2_000_000,
		note: 'Pago único de instalación. Propiedad total de la aplicación en tiendas.',
		items: ['Fidelización', 'Reservas o pedidos recurrentes']
	},
	{
		category: 'Agentes y automatización',
		name: 'Automatizaciones',
		price: 500_000,
		note: 'Pago único de montaje. Sincronización de flujos entre sistemas y CRM.',
		items: [
			'Conexión de procesos y bases de datos',
			'Eliminación de tareas repetitivas',
			'Ahorro de horas manuales'
		]
	},
	{
		category: 'Agentes y automatización',
		name: 'Bots y agentes de IA',
		price: 800_000,
		note: 'Pago único de montaje. Bots de venta, atención y cobros en WhatsApp.',
		items: [
			'Atención y perfilamiento 24/7',
			'Integrado a catálogo y WhatsApp',
			'Links de pago dinámicos'
		]
	},
	{
		category: 'Consultoría IT',
		name: 'Consultoría IT',
		price: 120_000,
		note: 'Diagnóstico técnico y orientación para tu infraestructura y sistemas.',
		items: [
			'Diagnóstico de arquitectura y seguridad',
			'Orientación técnica honesta',
			'Optimización de procesos'
		]
	}
];

export const recurring = [
	{
		name: 'Alojamiento y soporte de servidor',
		text: 'El software ya es tuyo. Esta cuota solo cubre el servidor en la nube (VPS dedicado), respaldos automáticos y mantenimiento preventivo para que tu sistema no se detenga.'
	},
	{
		name: 'Bots e Inteligencia Artificial',
		text: 'Servidor del agente activo 24/7 más consumo variable de inteligencia artificial según el volumen de mensajes e interacciones atendidas.'
	}
];

const cop = new Intl.NumberFormat('es-CO', {
	style: 'currency',
	currency: 'COP',
	maximumFractionDigits: 0
});

/** 350000 → "$350.000" */
export function formatCop(value: number): string {
	return cop.format(value).replace(/\s/g, '');
}

export interface FaqItem {
	question: string;
	answer: string;
}

export const faqs: FaqItem[] = [
	{
		question:
			'¿Por qué me conviene crear software propio en vez de pagar suscripciones mensuales (SaaS)?',
		answer:
			'Porque las plataformas genéricas por suscripción te cobran mes a mes indefinidamente por funciones que muchas veces no usas, aumentan de precio cuando creces y nunca te pertenecen. Al construir software propio con Makma, haces una inversión única de instalación: el sistema se amolda al 100% a tu operación real, no pagas alquiler de por vida y adquieres un activo que es patrimonio de tu empresa.'
	},
	{
		question:
			'Si ya uso una plataforma o herramienta de terceros, ¿pueden crear una propia para mi negocio?',
		answer:
			'Sí, ese es uno de nuestros trabajos principales. Analizamos la herramienta o plantilla que utilizas hoy, eliminamos sus limitaciones y costos recurrentes por usuario, y construimos tu propia plataforma personalizada, diseñada a la medida exacta de tu flujo comercial o administrativo.'
	},
	{
		question: '¿El software y el código fuente son 100% de mi propiedad?',
		answer:
			'Absolutamente. En Makma no creemos en plataformas cerradas ni en licencias cautivas. El repositorio, las bases de datos y los accesos de producción quedan configurados a tu nombre. Tu software te pertenece desde el primer día.'
	},
	{
		question: '¿Qué cubren los cobros recurrentes si el software ya es mío?',
		answer:
			'Tú eres el dueño absoluto del software; no pagas por el derecho de usarlo. Los cobros recurrentes son opcionales y solo cubren el servidor en la nube (VPS dedicado), monitoreo técnico, copias de seguridad automáticas y consumo de IA en caso de bots activos 24/7.'
	},
	{
		question: '¿Cuánto tiempo toma tener un proyecto funcionando?',
		answer:
			'Una página web corporativa suele estar lista en 1 a 2 semanas. Tiendas en línea y sistemas de gestión a la medida toman entre 3 y 5 semanas, y aplicaciones móviles entre 6 y 8 semanas, dependiendo de los flujos e integraciones requeridas.'
	},
	{
		question: '¿Cómo funciona la forma de pago de la instalación?',
		answer:
			'Trabajamos con un esquema transparente 50/50: abonas el 50% al iniciar para cubrir la arquitectura, el diseño y el montaje inicial, y el 50% restante únicamente cuando recibes el sistema probado, verificado y operando.'
	}
];

export interface Pillar {
	index: string;
	title: string;
	description: string;
}

export const pillars: Pillar[] = [
	{
		index: '01',
		title: 'Software propio, cero alquileres',
		description:
			'Dejas de pagar mensualidades eternas por plataformas ajenas. Construimos sistemas a la medida donde el código, los datos y la plataforma te pertenecen para siempre.'
	},
	{
		index: '02',
		title: 'Se amolda a tu operación, no al revés',
		description:
			'Las plantillas genéricas te obligan a cambiar tus procesos. Diseñamos arquitectura pensada exclusivamente para el flujo de tu empresa, eliminando cuellos de botella.'
	},
	{
		index: '03',
		title: 'Automatización con impacto real',
		description:
			'Reemplaza hojas de cálculo y tareas manuales con agentes inteligentes y bots en WhatsApp que atienden consultas, perfilan clientes y cobran automáticamente las 24 horas.'
	},
	{
		index: '04',
		title: 'Ingeniería seria y sin ataduras',
		description:
			'Hablas directamente con los desarrolladores. Te entregamos acceso total a servidores y código fuente, con transparencia técnica y costos claros desde el primer día.'
	}
];
