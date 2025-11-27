
import { Language, Currency } from '../types';

export const TRANSLATIONS = {
  en: {
    dashboard: 'Dashboard',
    marketplace: 'Marketplace',
    events: 'My Events',
    community: 'Community',
    settings: 'Settings',
    upgrade: 'Upgrade to Pro',
    planNew: 'Plan New Event',
    budgetOverview: 'Budget Overview',
    culturalCalendar: 'Cultural Calendar',
    totalBudget: 'Total Budget',
    spent: 'Spent',
    remaining: 'Remaining',
    logExpense: 'Log Expense',
    vendors: 'Vendors',
    tasks: 'Tasks',
    guests: 'Guests',
    immersiveView: 'Immersive View',
    liveAnalysis: 'Live AI Analysis',
    welcome: 'Namaste',
    aiTip: 'AI Tip'
  },
  hi: {
    dashboard: 'डैशबोर्ड',
    marketplace: 'बाज़ार',
    events: 'मेरे कार्यक्रम',
    community: 'समुदाय',
    settings: 'सेटिंग्स',
    upgrade: 'प्रो में अपग्रेड करें',
    planNew: 'नया कार्यक्रम',
    budgetOverview: 'बजट अवलोकन',
    culturalCalendar: 'सांस्कृतिक कैलेंडर',
    totalBudget: 'कुल बजट',
    spent: 'खर्च',
    remaining: 'शेष',
    logExpense: 'खर्च जोड़ें',
    vendors: 'विक्रेता',
    tasks: 'कार्य',
    guests: 'अतिथि',
    immersiveView: 'इमर्सिव दृश्य',
    liveAnalysis: 'लाइव एआई विश्लेषण',
    welcome: 'नमस्ते',
    aiTip: 'एआई सुझाव'
  },
  es: {
    dashboard: 'Tablero',
    marketplace: 'Mercado',
    events: 'Mis Eventos',
    community: 'Comunidad',
    settings: 'Ajustes',
    upgrade: 'Mejorar a Pro',
    planNew: 'Planear Nuevo',
    budgetOverview: 'Resumen de Presupuesto',
    culturalCalendar: 'Calendario Cultural',
    totalBudget: 'Presupuesto Total',
    spent: 'Gastado',
    remaining: 'Restante',
    logExpense: 'Registrar Gasto',
    vendors: 'Vendedores',
    tasks: 'Tareas',
    guests: 'Invitados',
    immersiveView: 'Vista Inmersiva',
    liveAnalysis: 'Análisis IA en Vivo',
    welcome: 'Hola',
    aiTip: 'Consejo IA'
  }
};

const EXCHANGE_RATES = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011
};

const CURRENCY_SYMBOLS = {
  INR: '₹',
  USD: '$',
  EUR: '€'
};

export const formatCurrency = (amount: number, currency: Currency): string => {
  const rate = EXCHANGE_RATES[currency];
  const converted = amount * rate;
  
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(converted);
};

export const t = (key: keyof typeof TRANSLATIONS['en'], lang: Language) => {
  return TRANSLATIONS[lang][key] || TRANSLATIONS['en'][key];
};
