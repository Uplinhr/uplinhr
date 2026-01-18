export const chatbotData = {
  welcomeMessage:
    "¡Hola! Soy UplinBot, el asistente virtual de Uplin. Estoy acá para ayudarte a navegar nuestras soluciones de RRHH flexibles y que encuentres rápidamente lo que necesitás para tu empresa ¿En qué puedo ayudarte?.",

  mainOptions: [
    {
      id: "1",
      text: "Quiero registrarme",
      response:
        "¡Genial! Para iniciar tu registro, te invitamos a explorar nuestras membresías. Allí podrás elegir el plan que mejor se adapte a las necesidades de tu empresa y seguir los pasos para completar tu alta.",
    },
    {
      id: "2",
      text: "Nuestros Servicios",
      subOptions: [
        {
          id: "2.1",
          text: "Búsqueda y Selección de Talento",
          subOptions: [
            {
              id: "2.1.1",
              text: "¿Cómo funciona la búsqueda de talento en Uplin?",
              response:
                "Cuando adquirís una membresía de Uplin, se te asigna una cantidad de créditos de búsqueda a tu favor. Estos créditos te permiten solicitar la búsqueda de distintos perfiles profesionales que necesite tu empresa. Es simple: usás tus créditos para activar la búsqueda del talento que estás buscando.",
            },
            {
              id: "2.1.2",
              text: "¿Qué son los créditos de búsqueda?",
              response:
                "Los créditos son unidades que se utilizan para solicitar búsquedas de talento dentro de tu membresía. Cada plan incluye una cantidad de créditos mensuales, y podés usarlos según el tipo de perfil que necesites contratar.",
            },
            {
              id: "2.1.3",
              text: "¿Cómo se usan los créditos de búsqueda?",
              response: `El consumo de tus créditos depende del nivel de seniority del perfil que buscas. Aquí te detallamos la equivalencia:

1 crédito: Perfiles iniciales (Pasantes, Operativos, Prácticas). Ej: Practicante de Talento.
2 créditos: Perfiles Junior (Analistas Junior). Ej: Ads Analyst Junior.
3 créditos: Perfiles Middle - Semisenior. Ej: Talent Acquisition Partner.
4 créditos: Perfiles Senior. Ej: Desarrollador Senior.
5 créditos: Perfiles C-Level, Mandos Altos y Estratégicos. Ej: Head / Chief of Sales.

Recordá que podés usar tus créditos dentro del mes, acumularlos (según tu plan) o comprar créditos adicionales si necesitas más búsquedas.`,
            },
            {
              id: "2.1.4",
              text: "¿Cómo se consumen los créditos?",
              response:
                "Tus créditos se consumen automáticamente en el momento en que solicitás un servicio de reclutamiento desde la plataforma. Una vez que enviás la solicitud de la vacante, se descuentan los créditos correspondientes a ese perfil.",
            },
            {
              id: "2.1.5",
              text: "¿Qué pasa si me quedo sin créditos de búsqueda?",
              response:
                "Si te quedás sin créditos de búsqueda, ¡no hay problema! Podés adquirir más en cualquier momento directamente desde tu plataforma. Así, vas a poder seguir solicitando los perfiles que tu empresa necesita sin interrupciones.",
            },
          ],
        },
        {
          id: "2.2",
          text: "Consultoría Estratégica en RRHH",
          subOptions: [
            {
              id: "2.2.1",
              text: "¿Cómo utilizo mis horas de consultoría?",
              response:
                "Nuestras horas de consultoría están diseñadas para ser tu apoyo experto en cualquier desafío o consulta estratégica de RRHH que tu empresa enfrente mes a mes. Podés abordar desde dudas específicas hasta temas complejos de desarrollo de talento, compensaciones y mucho más.",
            },
            {
              id: "2.2.2",
              text: "¿Para qué sirven las horas de consultoría?",
              response:
                "Tus horas de consultoría se brindan en sesiones virtuales flexibles con tu consultor asignado. Podés dividirlas y agendarlas según tu necesidad. Cada sesión se enfoca en tus temas específicos, ya sea para desarrollar estrategias o resolver urgencias de RRHH.",
            },
            {
              id: "2.2.3",
              text: "¿Qué hago si se me acaban las horas de consultoría?",
              response:
                "Si se te acaban las horas de consultoría, ¡no te preocupes! En Uplin podés adquirir horas adicionales a tu plan. El costo se validará directamente con nuestro equipo, quienes te brindarán una solución a medida para tu necesidad.",
            },
          ],
        },
        {
          id: "2.3",
          text: "¿Cómo funciona Uplin?",
          response: `Como cliente de Uplin, accedes a una serie de servicios de RRHH flexibles según el plan que elijas. Contarás con créditos a tu favor que se irán descontando a medida que uses nuestros servicios. Es importante que sepas que estos créditos tienen una fecha de vencimiento según tu plan. Además, siempre te brindaremos asesoramiento personalizado para guiarte en cada paso. Si necesitás más, podés adquirir servicios y créditos adicionales en cualquier momento.`,
        },
      ],
    },
    {
      id: "3",
      text: "Membresías flexibles",
      subOptions: [
        {
          id: "3.1",
          text: "Planes",
          response: `En Uplin, te ofrecemos tres planes flexibles para que elijas el que mejor se adapta a tu empresa:

• Start
• Growth
• Premium

Además, si tus necesidades son únicas y requieren una solución a medida, podemos diseñar un plan 100% personalizado. ¡Contáctanos por la opción Custom!`,
        },
        {
          id: "3.2",
          text: "Pagos",
          subOptions: [
            {
              id: "3.2.1",
              text: "¿Qué métodos de pago aceptamos?",
              response:
                "Por el momento los pagos solo se pueden realizar mediante PayPal.",
            },
            {
              id: "3.2.2",
              text: "¿Ofrecen descuentos para empresas grandes?",
              response:
                "Sí, contamos con tarifas preferenciales y propuestas personalizadas para empresas con equipos grandes o que necesiten un mayor volumen de servicios. ¡Escribinos y analizamos la mejor opción para vos!",
            },
            {
              id: "3.2.3",
              text: "¿Puedo cambiar de plan más adelante?",
              response:
                "¡Sí! Podés cambiar de plan en cualquier momento. Nos adaptamos al crecimiento de tu empresa, así que si necesitás más créditos o servicios, podés escalar tu plan sin complicaciones.",
            },
          ],
        },
      ],
    },
  ],
};

export type ChatbotData = typeof chatbotData;


