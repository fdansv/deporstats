export type Language = "gl" | "es" | "en";

export const DEFAULT_LANGUAGE: Language = "gl";

export const LANGUAGE_OPTIONS: { code: Language; shortLabel: string }[] = [
  { code: "gl", shortLabel: "GL" },
  { code: "es", shortLabel: "ES" },
  { code: "en", shortLabel: "EN" },
];

export const translations = {
  gl: {
    html: {
      lang: "gl",
      title: "O Dépor, en datos",
      description:
        "Un relato de datos sobre o Deportivo de La Coruña: do título de Liga de 2000 á beira do regreso.",
    },
    language: {
      aria: "Selector de idioma",
      names: {
        gl: "Galego",
        es: "Castelán",
        en: "Inglés",
      },
    },
    errors: {
      missingApp: "Non se atopou #app",
      loadData: "Non foi posible cargar os datos",
      title: "Erro nos datos",
    },
    nav: {
      aria: "Navegación principal",
      links: {
        cume: "O cume",
        nube: "A nube",
        ascensor: "A caída",
        porta: "A volta",
      },
    },
    hero: {
      eyebrow: "Real Club Deportivo da Coruña · relato de datos",
      titleLines: ["O Dépor e a ", "ciencia ", "exacta de ", "caer."],
      lead: (points: number) =>
        `Un club gaña a Liga no ano 2000. Vinte anos despois está mirando unha ruta que di Segunda B e Primeira RFEF, e preguntándose se tamén hai outro andar por baixo. Agora, con ${points} puntos, volve mirar cara arriba.`,
      statsAria: "Resumo estatístico",
      stats: {
        titlePoints: "puntos no título",
        tiers: "niveis no eixo",
        statusDate: (date: string) => `a ${date}`,
      },
      ticker: ["1999-00 CAMPIÓN", "2019-20 DESCENSO", "2023-24 ASCENSO", "2025-26 Á PORTA"],
    },
    chapters: [
      {
        id: "cume",
        kicker: "01 / O cume",
        title: "A Liga gañouse coma se alguén deixase unha porta aberta.",
        body:
          "O Dépor non chegou a 1999-00 coma unha aparición mística. Levaba anos avisando. A diferenza é que esta vez a liña de puntos non se rompeu no último día.",
        stat: "69 puntos, 66 goles, unha cidade sen sono.",
      },
      {
        id: "nube",
        kicker: "02 / A nube",
        title: "Todas as tempadas empezan en cero. Case ningunha remata igual.",
        body:
          "Cada liña é unha tempada dun equipo que compartiu división co Dépor nos CSV reproducibles desde 1993-94. Todas saen do mesmo punto. A maioría desaparece no ruído. A liña branca é a nosa teima.",
        stat: "Diferenza de goles acumulada por xornada: marcados menos encaixados.",
      },
      {
        id: "alto",
        kicker: "03 / Vivir no alto",
        title: "Durante un intre, a rareza foi que isto parecese normal.",
        body:
          "Terceiros, segundos, campións, noites europeas. O gráfico non explica como soaba Riazor, pero si explica que o Dépor pasou de convidado a problema estrutural para a Liga.",
        stat: "1992-2004: a zona alta deixou de ser unha visita.",
      },
      {
        id: "fuga",
        kicker: "04 / A fuga lenta",
        title: "Non foi unha caída. Primeiro foi unha perda de presión.",
        body:
          "Os puntos por partido baixan antes de que chegue o desastre. A diferenza de goles, que fora unha declaración de autoridade, vai converténdose nunha pregunta incómoda.",
        stat: "Do 1,9 PPG ao fútbol de supervivencia.",
      },
      {
        id: "ascensor",
        kicker: "05 / O ascensor roto",
        title: "Hai descensos. E logo está debuxar unha escaleira cara ao soto.",
        body:
          "O club que fora campión de Liga en 2000 xogou catro anos seguidos entre Segunda División B e Primeira RFEF. Nun gráfico limpo, iso parece unha decisión xeométrica. Na vida real foi ruído.",
        stat: "Primeira -> Segunda -> Segunda B / Primeira RFEF -> Segunda.",
      },
      {
        id: "rivais",
        kicker: "06 / A lista de rivais",
        title: "O calendario pasou de ameazar a dar vértixe.",
        body:
          "A traxedia estatística precisa nomes. Cando unha historia inclúe Milan e Manchester United nun extremo, e logo Celta B, Unionistas ou Guijuelo no outro, o eixo Y xa non abonda.",
        stat: "O opoñente tamén é unha métrica.",
      },
      {
        id: "riazor",
        kicker: "07 / Riazor",
        title: "O estadio negouse a comportarse como un dato da Primeira RFEF.",
        body:
          "O que sostén a parte esperanzadora non é só a táboa. É que, nos anos máis pequenos do calendario, Riazor seguiu parecendo demasiado grande para a categoría.",
        stat: "A asistencia converteu a humillación en teimosía.",
      },
      {
        id: "porta",
        kicker: "08 / A porta de volta",
        title: "A 21 de maio de 2026, a liña volve tocar a porta.",
        body:
          "Con 74 puntos en 40 partidos, o Dépor está en ascenso directo. Isto aínda non é final. Precisamente por iso funciona como final provisional: hai unha escaleira e agora apunta cara arriba.",
        stat: "Segundo, 74 puntos, dúas xornadas por diante.",
      },
    ],
    sources: {
      kicker: "Fontes e método",
      title: "Datos fríos, historia quente.",
      body:
        "Os partidos de Primeira e Segunda veñen de Football-Data. Os anos fóra do arquivo CSV están curados a nivel de tempada e marcados coa súa fonte. A situación 2025-26 está datada porque a táboa aínda respira.",
    },
    sourceNotes: {
      "Football-Data.co.uk": "CSV de partidos en Primeira e Segunda.",
      BDFutbol: "Historial do club e tempadas anteriores ao arquivo CSV.",
      AS: "Contexto da carreira polo ascenso en maio de 2026.",
      LaLiga: "Clasificación oficial de LaLiga Hypermotion.",
    },
    attendanceLabels: {
      "2021-22": "arredor dos 20.000 en Primeira RFEF",
      "2022-23": "19.028 na Primeira Federación",
      "2023-24": "Riazor volve encherse para saír do pozo",
    },
    attendanceSources: {
      "Wikipedia / prensa": "Wikipedia / prensa",
      Wikipedia: "Wikipedia",
      "prensa / rexistros de asistencia": "prensa / rexistros de asistencia",
    },
    divisions: {
      "Primeira División": "Primeira División",
      "Segunda División": "Segunda División",
      "Segunda División B": "Segunda División B",
      "Primeira RFEF": "Primeira RFEF",
      "Primeira Federación": "Primeira Federación",
    },
    states: {
      "Ascenso a Primeira": "Ascenso a Primeira",
      "Salvación na promoción": "Salvación na promoción",
      "Súper Dépor": "Súper Dépor",
      "Zona alta": "Zona alta",
      "Campión de Liga": "Campión de Liga",
      Descenso: "Descenso",
      Ascenso: "Ascenso",
      "Primeiro ano en Segunda División B": "Primeiro ano en Segunda División B",
      "Cae no play-off": "Cae no play-off",
      "Outro play-off perdido": "Outro play-off perdido",
      "Campión e ascenso a Segunda": "Campión e ascenso a Segunda",
      "En ascenso directo a 21/05/2026": "En ascenso directo a 21/05/2026",
    },
    months: [
      "xaneiro",
      "febreiro",
      "marzo",
      "abril",
      "maio",
      "xuño",
      "xullo",
      "agosto",
      "setembro",
      "outubro",
      "novembro",
      "decembro",
    ],
    formatDate: (day: number, month: string, year: number) => `${day} de ${month} de ${year}`,
    locale: "gl-ES",
    resultLabels: {
      W: "vitoria",
      D: "empate",
      L: "derrota",
    },
    common: {
      home: "Riazor",
      away: "Fóra",
      against: "contra",
      source: "Fonte",
      in: "en",
      matches: "partidos",
      points: "puntos",
      pointsPerGame: "puntos por partido",
      goalsPerGame: "goles de diferenza por partido",
      averageApprox: "de media aprox.",
      goalDiff: "DG",
      goalFor: "GF",
      goalAgainst: "GC",
      round: "xornada",
      position: "posto",
      tierLabels: {
        1: "Primeira",
        2: "Segunda",
        3: "Segunda B / 1ª RFEF",
      },
      noDramaSeason: "Tempada sen etiqueta dramática, que tamén é un dato.",
    },
    charts: {
      goalDiff: {
        title: "GF - GC acumulado por xornada",
        contextLabel: "liñas apagadas: resto da liga · liñas brancas: Dépor",
        bestLine: "Mellor liña",
        worstLine: "Peor liña",
      },
      titlePath: {
        title: "Camiño ao título: puntos acumulados",
        finalTitle: "19/05/2000",
        finalBody: "Riazor: 2-0 ao Espanyol",
      },
      finish: {
        title: "Posto na Liga: do medo ao título",
      },
      ppg: {
        title: "Puntos por partido e goles",
        leader: "líder da división",
        median: "mediana",
        label2000: "a máquina aínda funciona",
        label2020: "a liña deixa de parecer profesional",
      },
      tier: {
        title: "Altitude competitiva por tempada",
        label2000: "campión arriba de todo",
        label2020: "catro anos no pozo",
        label2026: "segunda praza provisional",
      },
      opponents: {
        title: "Resultados que non deberían vivir no mesmo club",
        high: "vitorias arriba: o Dépor facía pequeno o grande",
        low: "derrotas abaixo: a terceira facía pequeno o Dépor",
        center: "mesmo escudo",
      },
      attendance: {
        title: "Asistencia: chamadas de atención",
        labelTitle: "Riazor",
        labelBody: "asistencia aproximada en anos onde a categoría dicía unha cousa e a bancada outra",
      },
      promotion: {
        title: "Hypermotion 2025-26: ascenso",
        labelTitle: "21/05/2026",
        labelBody: "o dato aínda non é sentenza",
      },
    },
  },
  es: {
    html: {
      lang: "es",
      title: "El Dépor, en datos",
      description:
        "Un relato de datos sobre el Deportivo de La Coruña: del título de Liga de 2000 al borde del regreso.",
    },
    language: {
      aria: "Selector de idioma",
      names: {
        gl: "Gallego",
        es: "Castellano",
        en: "Inglés",
      },
    },
    errors: {
      missingApp: "No se encontró #app",
      loadData: "No fue posible cargar los datos",
      title: "Error en los datos",
    },
    nav: {
      aria: "Navegación principal",
      links: {
        cume: "La cumbre",
        nube: "La nube",
        ascensor: "La caída",
        porta: "La vuelta",
      },
    },
    hero: {
      eyebrow: "Real Club Deportivo de La Coruña · relato de datos",
      titleLines: ["El Dépor y la ", "ciencia ", "exacta de ", "caer."],
      lead: (points: number) =>
        `Un club gana la Liga en el año 2000. Veinte años después está mirando una ruta que dice Segunda B y Primera RFEF, y preguntándose si también hay otro piso por debajo. Ahora, con ${points} puntos, vuelve a mirar hacia arriba.`,
      statsAria: "Resumen estadístico",
      stats: {
        titlePoints: "puntos en el título",
        tiers: "niveles en el eje",
        statusDate: (date: string) => `a ${date}`,
      },
      ticker: ["1999-00 CAMPEÓN", "2019-20 DESCENSO", "2023-24 ASCENSO", "2025-26 A LA PUERTA"],
    },
    chapters: [
      {
        id: "cume",
        kicker: "01 / La cumbre",
        title: "La Liga se ganó como si alguien hubiese dejado una puerta abierta.",
        body:
          "El Dépor no llegó a 1999-00 como una aparición mística. Llevaba años avisando. La diferencia es que esta vez la línea de puntos no se rompió el último día.",
        stat: "69 puntos, 66 goles, una ciudad sin sueño.",
      },
      {
        id: "nube",
        kicker: "02 / La nube",
        title: "Todas las temporadas empiezan en cero. Casi ninguna termina igual.",
        body:
          "Cada línea es una temporada de un equipo que compartió división con el Dépor en los CSV reproducibles desde 1993-94. Todas salen del mismo punto. La mayoría desaparece en el ruido. La línea blanca es nuestra obsesión.",
        stat: "Diferencia de goles acumulada por jornada: marcados menos encajados.",
      },
      {
        id: "alto",
        kicker: "03 / Vivir arriba",
        title: "Durante un instante, lo raro fue que esto pareciese normal.",
        body:
          "Terceros, segundos, campeones, noches europeas. El gráfico no explica cómo sonaba Riazor, pero sí explica que el Dépor pasó de invitado a problema estructural para la Liga.",
        stat: "1992-2004: la zona alta dejó de ser una visita.",
      },
      {
        id: "fuga",
        kicker: "04 / La fuga lenta",
        title: "No fue una caída. Primero fue una pérdida de presión.",
        body:
          "Los puntos por partido bajan antes de que llegue el desastre. La diferencia de goles, que había sido una declaración de autoridad, va convirtiéndose en una pregunta incómoda.",
        stat: "Del 1,9 PPG al fútbol de supervivencia.",
      },
      {
        id: "ascensor",
        kicker: "05 / El ascensor roto",
        title: "Hay descensos. Y luego está dibujar una escalera hacia el sótano.",
        body:
          "El club que fue campeón de Liga en 2000 jugó cuatro años seguidos entre Segunda División B y Primera RFEF. En un gráfico limpio, eso parece una decisión geométrica. En la vida real fue ruido.",
        stat: "Primera -> Segunda -> Segunda B / Primera RFEF -> Segunda.",
      },
      {
        id: "rivais",
        kicker: "06 / La lista de rivales",
        title: "El calendario pasó de amenazar a dar vértigo.",
        body:
          "La tragedia estadística necesita nombres. Cuando una historia incluye Milan y Manchester United en un extremo, y luego Celta B, Unionistas o Guijuelo en el otro, el eje Y ya no alcanza.",
        stat: "El rival también es una métrica.",
      },
      {
        id: "riazor",
        kicker: "07 / Riazor",
        title: "El estadio se negó a comportarse como un dato de Primera RFEF.",
        body:
          "Lo que sostiene la parte esperanzadora no es solo la tabla. Es que, en los años más pequeños del calendario, Riazor siguió pareciendo demasiado grande para la categoría.",
        stat: "La asistencia convirtió la humillación en terquedad.",
      },
      {
        id: "porta",
        kicker: "08 / La puerta de vuelta",
        title: "El 21 de mayo de 2026, la línea vuelve a tocar la puerta.",
        body:
          "Con 74 puntos en 40 partidos, el Dépor está en ascenso directo. Esto aún no es final. Precisamente por eso funciona como final provisional: hay una escalera y ahora apunta hacia arriba.",
        stat: "Segundo, 74 puntos, dos jornadas por delante.",
      },
    ],
    sources: {
      kicker: "Fuentes y método",
      title: "Datos fríos, historia caliente.",
      body:
        "Los partidos de Primera y Segunda vienen de Football-Data. Los años fuera del archivo CSV están curados a nivel de temporada y marcados con su fuente. La situación 2025-26 está fechada porque la tabla todavía respira.",
    },
    sourceNotes: {
      "Football-Data.co.uk": "CSV de partidos en Primera y Segunda.",
      BDFutbol: "Historial del club y temporadas anteriores al archivo CSV.",
      AS: "Contexto de la carrera por el ascenso en mayo de 2026.",
      LaLiga: "Clasificación oficial de LaLiga Hypermotion.",
    },
    attendanceLabels: {
      "2021-22": "alrededor de los 20.000 en Primera RFEF",
      "2022-23": "19.028 en la Primera Federación",
      "2023-24": "Riazor vuelve a llenarse para salir del pozo",
    },
    attendanceSources: {
      "Wikipedia / prensa": "Wikipedia / prensa",
      Wikipedia: "Wikipedia",
      "prensa / rexistros de asistencia": "prensa / registros de asistencia",
    },
    divisions: {
      "Primeira División": "Primera División",
      "Segunda División": "Segunda División",
      "Segunda División B": "Segunda División B",
      "Primeira RFEF": "Primera RFEF",
      "Primeira Federación": "Primera Federación",
    },
    states: {
      "Ascenso a Primeira": "Ascenso a Primera",
      "Salvación na promoción": "Salvación en la promoción",
      "Súper Dépor": "Súper Dépor",
      "Zona alta": "Zona alta",
      "Campión de Liga": "Campeón de Liga",
      Descenso: "Descenso",
      Ascenso: "Ascenso",
      "Primeiro ano en Segunda División B": "Primer año en Segunda División B",
      "Cae no play-off": "Cae en el play-off",
      "Outro play-off perdido": "Otro play-off perdido",
      "Campión e ascenso a Segunda": "Campeón y ascenso a Segunda",
      "En ascenso directo a 21/05/2026": "En ascenso directo a 21/05/2026",
    },
    months: [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ],
    formatDate: (day: number, month: string, year: number) => `${day} de ${month} de ${year}`,
    locale: "es-ES",
    resultLabels: {
      W: "victoria",
      D: "empate",
      L: "derrota",
    },
    common: {
      home: "Riazor",
      away: "Fuera",
      against: "contra",
      source: "Fuente",
      in: "en",
      matches: "partidos",
      points: "puntos",
      pointsPerGame: "puntos por partido",
      goalsPerGame: "goles de diferencia por partido",
      averageApprox: "de media aprox.",
      goalDiff: "DG",
      goalFor: "GF",
      goalAgainst: "GC",
      round: "jornada",
      position: "puesto",
      tierLabels: {
        1: "Primera",
        2: "Segunda",
        3: "Segunda B / 1ª RFEF",
      },
      noDramaSeason: "Temporada sin etiqueta dramática, que también es un dato.",
    },
    charts: {
      goalDiff: {
        title: "GF - GC acumulado por jornada",
        contextLabel: "líneas apagadas: resto de la liga · líneas blancas: Dépor",
        bestLine: "Mejor línea",
        worstLine: "Peor línea",
      },
      titlePath: {
        title: "Camino al título: puntos acumulados",
        finalTitle: "19/05/2000",
        finalBody: "Riazor: 2-0 al Espanyol",
      },
      finish: {
        title: "Puesto en la Liga: del miedo al título",
      },
      ppg: {
        title: "Puntos por partido y goles",
        leader: "líder de la división",
        median: "mediana",
        label2000: "la máquina aún funciona",
        label2020: "la línea deja de parecer profesional",
      },
      tier: {
        title: "Altitud competitiva por temporada",
        label2000: "campeón arriba de todo",
        label2020: "cuatro años en el pozo",
        label2026: "segunda plaza provisional",
      },
      opponents: {
        title: "Resultados que no deberían vivir en el mismo club",
        high: "victorias arriba: el Dépor hacía pequeño lo grande",
        low: "derrotas abajo: la tercera hacía pequeño al Dépor",
        center: "mismo escudo",
      },
      attendance: {
        title: "Asistencia: llamadas de atención",
        labelTitle: "Riazor",
        labelBody: "asistencia aproximada en años donde la categoría decía una cosa y la grada otra",
      },
      promotion: {
        title: "Hypermotion 2025-26: ascenso",
        labelTitle: "21/05/2026",
        labelBody: "el dato todavía no es sentencia",
      },
    },
  },
  en: {
    html: {
      lang: "en",
      title: "Depor, in data",
      description:
        "A data story about Deportivo de La Coruna: from the 2000 La Liga title to the edge of a return.",
    },
    language: {
      aria: "Language selector",
      names: {
        gl: "Galician",
        es: "Spanish",
        en: "English",
      },
    },
    errors: {
      missingApp: "#app was not found",
      loadData: "The data could not be loaded",
      title: "Data error",
    },
    nav: {
      aria: "Main navigation",
      links: {
        cume: "Summit",
        nube: "Cloud",
        ascensor: "Fall",
        porta: "Return",
      },
    },
    hero: {
      eyebrow: "Real Club Deportivo de La Coruna · data story",
      titleLines: ["Depor and the ", "exact ", "science of ", "falling."],
      lead: (points: number) =>
        `A club wins La Liga in 2000. Twenty years later it is staring at a route marked Segunda B and Primera RFEF, wondering whether there is another floor below. Now, with ${points} points, it is looking up again.`,
      statsAria: "Statistical summary",
      stats: {
        titlePoints: "points in the title season",
        tiers: "levels on the axis",
        statusDate: (date: string) => `as of ${date}`,
      },
      ticker: ["1999-00 CHAMPIONS", "2019-20 RELEGATION", "2023-24 PROMOTION", "2025-26 AT THE DOOR"],
    },
    chapters: [
      {
        id: "cume",
        kicker: "01 / The summit",
        title: "La Liga was won as if someone had left a door open.",
        body:
          "Depor did not arrive in 1999-00 like a mystical apparition. It had been warning everyone for years. The difference is that this time the points line did not break on the final day.",
        stat: "69 points, 66 goals, a sleepless city.",
      },
      {
        id: "nube",
        kicker: "02 / The cloud",
        title: "Every season starts at zero. Almost none ends the same way.",
        body:
          "Each line is a season from a team that shared a division with Depor in the reproducible CSVs since 1993-94. They all begin from the same point. Most disappear into the noise. The white line is the obsession.",
        stat: "Accumulated goal difference by round: scored minus conceded.",
      },
      {
        id: "alto",
        kicker: "03 / Living high",
        title: "For a moment, the strange thing was that this felt normal.",
        body:
          "Third, second, champions, European nights. The chart cannot explain how Riazor sounded, but it does show how Depor went from guest to structural problem for La Liga.",
        stat: "1992-2004: the top end stopped being a visit.",
      },
      {
        id: "fuga",
        kicker: "04 / The slow leak",
        title: "It was not a fall. First it was a loss of pressure.",
        body:
          "Points per game drop before disaster arrives. Goal difference, once a statement of authority, slowly becomes an uncomfortable question.",
        stat: "From 1.9 PPG to survival football.",
      },
      {
        id: "ascensor",
        kicker: "05 / The broken elevator",
        title: "There are relegations. Then there is drawing a staircase to the basement.",
        body:
          "The club that won La Liga in 2000 spent four straight years between Segunda Division B and Primera RFEF. On a clean chart, that looks like geometry. In real life it was noise.",
        stat: "Primera -> Segunda -> Segunda B / Primera RFEF -> Segunda.",
      },
      {
        id: "rivais",
        kicker: "06 / The rivals list",
        title: "The fixture list went from threatening to dizzying.",
        body:
          "Statistical tragedy needs names. When one story includes Milan and Manchester United at one end, then Celta B, Unionistas or Guijuelo at the other, the Y axis is no longer enough.",
        stat: "The opponent is also a metric.",
      },
      {
        id: "riazor",
        kicker: "07 / Riazor",
        title: "The stadium refused to behave like a Primera RFEF data point.",
        body:
          "The hopeful part is not only held up by the table. It is that, during the smallest years in the calendar, Riazor still looked too large for the category.",
        stat: "Attendance turned humiliation into stubbornness.",
      },
      {
        id: "porta",
        kicker: "08 / The way back",
        title: "On May 21, 2026, the line is knocking at the door again.",
        body:
          "With 74 points from 40 matches, Depor sits in an automatic promotion place. This is not final yet. That is exactly why it works as a provisional ending: there is a staircase, and now it points upward.",
        stat: "Second, 74 points, two rounds still ahead.",
      },
    ],
    sources: {
      kicker: "Sources and method",
      title: "Cold data, hot story.",
      body:
        "Primera and Segunda match data comes from Football-Data. Seasons outside the CSV archive are curated at season level and marked with their source. The 2025-26 status is dated because the table is still alive.",
    },
    sourceNotes: {
      "Football-Data.co.uk": "Primera and Segunda match CSVs.",
      BDFutbol: "Club history and seasons before the CSV archive.",
      AS: "Context for the promotion race in May 2026.",
      LaLiga: "Official LaLiga Hypermotion standings.",
    },
    attendanceLabels: {
      "2021-22": "around 20,000 in Primera RFEF",
      "2022-23": "19,028 in Primera Federacion",
      "2023-24": "Riazor fills again to climb out of the hole",
    },
    attendanceSources: {
      "Wikipedia / prensa": "Wikipedia / press",
      Wikipedia: "Wikipedia",
      "prensa / rexistros de asistencia": "press / attendance records",
    },
    divisions: {
      "Primeira División": "Primera Division",
      "Segunda División": "Segunda Division",
      "Segunda División B": "Segunda Division B",
      "Primeira RFEF": "Primera RFEF",
      "Primeira Federación": "Primera Federacion",
    },
    states: {
      "Ascenso a Primeira": "Promotion to Primera",
      "Salvación na promoción": "Survival through the playoff",
      "Súper Dépor": "Super Depor",
      "Zona alta": "Top end",
      "Campión de Liga": "League champions",
      Descenso: "Relegation",
      Ascenso: "Promotion",
      "Primeiro ano en Segunda División B": "First year in Segunda Division B",
      "Cae no play-off": "Falls in the playoff",
      "Outro play-off perdido": "Another lost playoff",
      "Campión e ascenso a Segunda": "Champion and promotion to Segunda",
      "En ascenso directo a 21/05/2026": "In automatic promotion on 05/21/2026",
    },
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    formatDate: (day: number, month: string, year: number) => `${month} ${day}, ${year}`,
    locale: "en-US",
    resultLabels: {
      W: "win",
      D: "draw",
      L: "loss",
    },
    common: {
      home: "Riazor",
      away: "Away",
      against: "against",
      source: "Source",
      in: "in",
      matches: "matches",
      points: "points",
      pointsPerGame: "points per match",
      goalsPerGame: "goal difference per match",
      averageApprox: "approx. average",
      goalDiff: "GD",
      goalFor: "GF",
      goalAgainst: "GA",
      round: "round",
      position: "place",
      tierLabels: {
        1: "Primera",
        2: "Segunda",
        3: "Segunda B / 1st RFEF",
      },
      noDramaSeason: "A season without a dramatic label, which is data too.",
    },
    charts: {
      goalDiff: {
        title: "GF - GA accumulated by round",
        contextLabel: "muted lines: rest of the league · white lines: Depor",
        bestLine: "Best line",
        worstLine: "Worst line",
      },
      titlePath: {
        title: "Road to the title: accumulated points",
        finalTitle: "05/19/2000",
        finalBody: "Riazor: 2-0 over Espanyol",
      },
      finish: {
        title: "League finish: from fear to the title",
      },
      ppg: {
        title: "Points per match and goals",
        leader: "division leader",
        median: "median",
        label2000: "the machine still works",
        label2020: "the line stops looking professional",
      },
      tier: {
        title: "Competitive altitude by season",
        label2000: "champions at the top",
        label2020: "four years in the hole",
        label2026: "provisional second place",
      },
      opponents: {
        title: "Results that should not live in the same club",
        high: "wins above: Depor made giants look small",
        low: "losses below: the third tier made Depor look small",
        center: "same crest",
      },
      attendance: {
        title: "Attendance: warning signs",
        labelTitle: "Riazor",
        labelBody: "approximate attendance in years when the category said one thing and the stands said another",
      },
      promotion: {
        title: "Hypermotion 2025-26: promotion",
        labelTitle: "05/21/2026",
        labelBody: "the data is not final yet",
      },
    },
  },
} as const;

export type Translation = (typeof translations)[Language];
