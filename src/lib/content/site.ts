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
	{ href: '/#contacto', label: 'Contacto' }
] as const;

export const hero = {
	eyebrow: 'Casa de desarrollo tecnológico',
	titleStart: 'Software que',
	titleAccent: 'trabaja',
	titleEnd: 'mientras tu negocio crece.',
	lead: 'Digitalizamos, automatizamos y escalamos operaciones comerciales e institucionales en Montería y la región.'
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
		note: 'Pago de instalación. Hosting y soporte aparte.',
		items: ['Sitio corporativo ultrarrápido', 'Optimizado para SEO']
	},
	{
		category: 'Desarrollo web',
		name: 'Sistema de gestión',
		price: 600_000,
		note: 'Pago de instalación. Hosting y soporte aparte.',
		items: ['Control administrativo a la medida', 'Funcionalidades personalizadas']
	},
	{
		category: 'Desarrollo web',
		name: 'Tienda en línea',
		price: 1_000_000,
		note: 'Pago de instalación. Hosting y soporte aparte.',
		items: ['Carrito de compra', 'Control de inventario', 'Pasarelas de pago integradas']
	},
	{
		category: 'Aplicaciones móviles',
		name: 'App de gestión interna',
		price: 1_800_000,
		note: 'Pago de instalación. Hosting y soporte aparte.',
		items: ['Herramientas para operarios en campo', 'Toma de inventario y logística']
	},
	{
		category: 'Aplicaciones móviles',
		name: 'App para clientes',
		price: 1_800_000,
		note: 'Pago de instalación. Hosting y soporte aparte.',
		items: ['Fidelización', 'Reservas o pedidos recurrentes']
	},
	{
		category: 'Agentes y automatización',
		name: 'Agentes y automatización',
		price: null,
		note: 'Cada flujo es distinto: te cotizamos a medida. Incluye consumo variable de IA según interacciones.',
		items: ['Automatización de procesos', 'Bots de venta y atención', 'Bots receptores de pagos']
	}
];

export const recurring = [
	{
		name: 'Suscripción tecnológica',
		text: 'Hosting en servidor (VPS), mantenimiento evolutivo, despliegues automáticos y copias de seguridad. Mensual o anual.'
	},
	{
		name: 'Bots',
		text: 'Mensualidad base de infraestructura más consumo variable de inteligencia artificial, según el volumen de interacciones.'
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
