/**
 * Spanish translations
 */

export default {
  // Common
  common: {
    next: 'Siguiente',
    previous: 'Anterior',
    skip: 'Omitir',
    continue: 'Continuar',
    cancel: 'Cancelar',
    done: 'Listo',
    save: 'Guardar',
    close: 'Cerrar',
    back: 'Atrás',
    retry: 'Reintentar',
    loading: 'Cargando...',
    error: 'Error',
    success: 'Éxito',
  },

  // Onboarding
  onboarding: {
    welcome: {
      title: 'Aprueba tu examen de permiso con confianza',
      subtitle: 'Practica con preguntas reales del DMV',
    },
    features: {
      title: 'Aprende todas las señales y reglas',
      subtitle: 'Preguntas específicas por estado con explicaciones',
    },
    progress: {
      title: 'Sabe cuándo estás listo',
      subtitle: 'Sigue tu progreso y aprueba el examen',
    },
    getStarted: 'Comenzar',
  },

  // Language Selection
  language: {
    title: 'Elige tu idioma',
    english: 'English',
    spanish: 'Español',
    haitianCreole: 'Kreyòl Ayisyen',
    chinese: '简体中文',
    vietnamese: 'Tiếng Việt',
    korean: '한국어',
    arabic: 'العربية',
  },

  // State Selection
  state: {
    title: 'Selecciona tu estado',
    subtitle: 'Te mostraremos preguntas basadas en las leyes de tu estado',
    searchPlaceholder: 'Buscar estados...',
  },

  // Name Entry
  name: {
    title: '¿Cómo te llamamos?',
    placeholder: 'Ingresa tu nombre',
    skip: 'Omitir por ahora',
  },

  // License Type
  license: {
    title: '¿Para qué licencia estás estudiando?',
    car: {
      title: 'Auto (Clase C)',
      subtitle: 'Vehículo de pasajeros estándar',
    },
    motorcycle: {
      title: 'Motocicleta (Clase M)',
      subtitle: 'Vehículos de dos ruedas',
    },
    cdl: {
      title: 'Comercial (CDL)',
      subtitle: 'Camiones y autobuses',
      comingSoon: 'Próximamente',
    },
  },

  // Home Screen
  home: {
    greeting: '¡Hola, {{name}}!',
    greetingDefault: '¿Listo para practicar?',
    subtitle: '¿Qué quieres aprender hoy?',
    examReadiness: 'Preparación para el examen',
    keepPracticing: '¡Sigue practicando!',
    almostReady: '¡Casi listo!',
    ready: '¡Estás listo!',
    startPracticeTest: 'Iniciar examen de práctica',
    quickStudy: 'Estudio rápido',
    flashCard: 'Tarjetas',
    handbook: 'Manual',
    quiz: 'Cuestionario',
    questions: '{{count}} Preguntas',
  },

  // Categories
  categories: {
    road_signs: 'Señales de tráfico',
    traffic_signals: 'Semáforos',
    right_of_way: 'Derecho de paso',
    parking_rules: 'Reglas de estacionamiento',
    safe_driving: 'Conducción segura',
    alcohol_drugs: 'Alcohol y drogas',
    special_situations: 'Situaciones especiales',
    vehicle_equipment: 'Equipo del vehículo',
    road_markings: 'Marcas viales',
  },

  // Study Mode
  study: {
    title: 'Modo de estudio',
    question: 'Pregunta {{current}} de {{total}}',
    explanation: 'Explicación',
    handbookRef: 'Ver referencia del manual',
    nextQuestion: 'Siguiente pregunta',
    correct: '¡Correcto!',
    incorrect: 'Incorrecto',
    bookmark: 'Marcar',
    bookmarked: 'Marcado',
  },

  // Practice Test
  test: {
    title: 'Examen de práctica',
    intro: {
      questions: '{{count}} Preguntas',
      timeLimit: '{{minutes}} Minutos',
      passingScore: '{{score}}% para aprobar',
      rules: {
        title: 'Reglas del examen',
        noFeedback: 'Sin retroalimentación hasta completar',
        review: 'Puedes revisar respuestas al final',
        simulation: 'Simula condiciones reales del DMV',
      },
      start: 'Iniciar examen',
    },
    question: 'Pregunta {{current}}/{{total}}',
    flagForReview: 'Marcar para revisar',
    endTest: 'Terminar examen',
    confirmEnd: '¿Seguro que quieres terminar el examen?',
    timeWarning: '¡Menos de 2 minutos restantes!',
  },

  // Results
  results: {
    passed: 'APROBADO',
    needsPractice: 'NECESITA PRÁCTICA',
    score: '{{correct}}/{{total}}',
    percentage: '{{percent}}%',
    passingThreshold: '{{score}}% requerido para aprobar',
    timeTaken: 'Tiempo: {{time}}',
    categoryBreakdown: 'Desglose por categoría',
    reviewAnswers: 'Revisar respuestas',
    retakeTest: 'Repetir examen',
    shareResults: 'Compartir resultados',
    backToHome: 'Volver al inicio',
  },

  // Road Signs
  signs: {
    title: 'Señales de tráfico',
    searchPlaceholder: 'Buscar señales...',
    all: 'Todas',
    regulatory: 'Regulatorias',
    warning: 'Advertencia',
    guide: 'Guía',
    construction: 'Construcción',
    practiceQuestions: 'Practicar preguntas',
  },

  // Progress
  progress: {
    title: 'Tu progreso',
    questionsAnswered: 'Preguntas respondidas',
    accuracy: 'Precisión',
    studyStreak: 'Racha de estudio',
    days: '{{count}} días',
    examReadiness: 'Preparación para el examen',
    categoryPerformance: 'Rendimiento por categoría',
    weakAreas: 'Áreas débiles',
    practiceNow: 'Practicar ahora',
    testHistory: 'Historial de exámenes',
    reviewMissed: 'Revisar preguntas falladas',
    noProgress: '¡Comienza tu primer cuestionario para seguir tu progreso!',
    noMissed: '¡Excelente! No has fallado ninguna pregunta.',
    noTestHistory: 'Completa tu primer examen de práctica para ver resultados.',
  },

  // Profile
  profile: {
    title: 'Perfil',
    displayName: 'Nombre',
    settings: 'Configuración',
    changeState: 'Cambiar estado',
    changeLicense: 'Cambiar tipo de licencia',
    language: 'Idioma',
    darkMode: 'Modo oscuro',
    soundEffects: 'Efectos de sonido',
    support: 'Soporte',
    findDMV: 'Encontrar DMV cercano',
    helpFAQ: 'Ayuda y preguntas frecuentes',
    rateApp: 'Calificar esta app',
    shareApp: 'Compartir con amigos',
    version: 'Versión {{version}}',
  },

  // Bookmarks
  bookmarks: {
    title: 'Marcadores',
    empty: 'Toca el icono de marcador en cualquier pregunta para guardarla aquí.',
    practiceBookmarked: 'Practicar marcados',
  },

  // DMV Finder
  dmv: {
    title: 'Encontrar DMV',
    mapView: 'Mapa',
    listView: 'Lista',
    getDirections: 'Obtener direcciones',
    scheduleAppointment: 'Agendar cita',
    open: 'Abierto',
    closed: 'Cerrado',
    enableLocation: 'Habilita la ubicación para encontrar oficinas del DMV cercanas',
  },

  // Errors
  errors: {
    network: 'Sin conexión a internet',
    generic: 'Algo salió mal',
    tryAgain: 'Intentar de nuevo',
  },

  // Empty States
  empty: {
    noResults: 'No se encontraron resultados',
    tryDifferent: 'Intenta con otras palabras',
  },
};
