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
      socialTitle: "O Dépor, en datos: do título de 2000 á carreira polo ascenso",
      description:
        "Un relato de datos sobre o Deportivo da Coruña: do título de Liga de 2000 á carreira polo ascenso.",
      socialDescription:
        "Visualizacións interactivas sobre o Deportivo da Coruña: Liga 1999-00, caída ata a Segunda B e Primeira RFEF, Riazor e carreira polo ascenso en 2025-26.",
      keywords:
        "Dépor, Deportivo da Coruña, Deportivo de La Coruña, Riazor, LaLiga, Segunda División, Primeira RFEF, ascenso, datos fútbol",
      imageAlt: "Gráfico editorial de deporstats sobre o Dépor, Riazor e a carreira polo ascenso",
      locale: "gl_ES",
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
        nube: "O contexto",
        ascensor: "A caída",
        porta: "A volta",
      },
    },
    hero: {
      eyebrow: "Real Club Deportivo da Coruña · relato de datos",
      titleLines: ["O Dépor, ", "do título ", "á carreira ", "polo ascenso."],
      lead: (points: number) =>
        `O Dépor gañou a Liga en 1999-00 con 69 puntos. Dúas décadas despois caeu fóra do fútbol profesional. Agora, con ${points} puntos, sostén unha praza de ascenso directo.`,
      statsAria: "Resumo estatístico",
      stats: {
        titlePoints: "puntos no título",
        tiers: "categorías percorridas",
        statusDate: (date: string) => `a ${date}`,
      },
      ticker: ["1999-00 CAMPIÓN", "2019-20 DESCENSO", "2023-24 ASCENSO", "2025-26 EN ASCENSO"],
    },
    chapters: [
      {
        id: "cume",
        kicker: "01 / O cume",
        title: "A Liga de 2000 foi a culminación dunha década de aviso.",
        body:
          "O Dépor xa fora terceiro e dúas veces subcampión. En 1999-00 mantivo o pulso ata o final e pechou a Liga en Riazor ante o Espanyol.",
        stat: "69 puntos, 66 goles e o primeiro título de Liga do club.",
      },
      {
        id: "nube",
        kicker: "02 / O contexto",
        title: "O contexto explica a dimensión do título.",
        body:
          "As liñas comparan a diferenza de goles acumulada dos equipos que compartiron división co Dépor desde 1993-94. O Dépor campión non foi a mellor curva do arquivo; foi a que chegou enteira á última xornada.",
        stat: "Diferenza de goles acumulada por xornada: marcados menos encaixados.",
      },
      {
        id: "alto",
        kicker: "03 / Vivir no alto",
        title: "A zona alta deixou de ser unha excepción.",
        body:
          "Entre 1992 e 2004, o Dépor rematou repetidamente entre os mellores e fixo de Riazor unha escala europea. O posto final mostra canto durou esa estabilidade.",
        stat: "1992-2004: terceiros, segundos, campións e noites europeas.",
      },
      {
        id: "fuga",
        kicker: "04 / A fuga lenta",
        title: "O desgaste chegou antes do descenso.",
        body:
          "Para non mesturar categorías, o gráfico compara só tempadas de Primeira. O Dépor pasa dunha media de 1,86 puntos por partido no ciclo europeo a 0,93 nos últimos cursos antes do descenso de 2018.",
        stat: "En Primeira: 1,86 PPG entre 1999 e 2004; 0,93 PPG entre 2012 e 2018.",
      },
      {
        id: "goles",
        kicker: "05 / Os goles",
        title: "Os goles tamén contan como estaba repartido o equipo.",
        body:
          "A barra separa o máximo goleador do resto. Cando a franxa de Makaay medra en 2002-03, resume tanto a súa Bota de Ouro como a dependencia ofensiva daquela tempada.",
        stat: "Makaay 2002-03: 29 goles, Bota de Ouro e traspaso ao Bayern.",
      },
      {
        id: "ascensor",
        kicker: "06 / A caída",
        title: "A caída levou o club fóra do fútbol profesional.",
        body:
          "Despois do descenso de 2019-20, o Dépor pasou catro tempadas entre Segunda B, Primeira RFEF e Primeira Federación. A escala de categorías deixa ver a profundidade do golpe.",
        stat: "Primeira -> Segunda -> Segunda B / Primeira RFEF -> Segunda.",
      },
      {
        id: "rivais",
        kicker: "07 / A lista de rivais",
        title: "A lista de rivais mide o cambio de escenario.",
        body:
          "Milan e Manchester United quedan nun extremo da memoria. Celta B, Unionistas, Guijuelo ou Coruxo aparecen no outro. O contraste pon nomes ao salto entre competicións.",
        stat: "O rival tamén é unha métrica.",
      },
      {
        id: "riazor",
        kicker: "08 / Riazor",
        title: "Riazor sostivo cifras de outra categoría.",
        body:
          "Mesmo nos anos de terceira escala, a asistencia mantivo ao Dépor por riba do seu contexto competitivo. A bancada non corrixe a clasificación, pero axuda a explicar a volta.",
        stat: "A asistencia mantivo presión de club grande.",
      },
      {
        id: "porta",
        kicker: "09 / A volta",
        title: "A 21 de maio de 2026, o regreso segue aberto.",
        body:
          "Con 74 puntos en 40 partidos, o Dépor ocupa posto de ascenso directo. Faltan dúas xornadas, así que o dato é unha fotografía de carreira, non unha chegada.",
        stat: "Segundo, 74 puntos, dúas xornadas por xogar.",
      },
    ],
    sources: {
      kicker: "Fontes e método",
      title: "Fontes, datas e límites.",
      body:
        "Os partidos de Primeira e Segunda veñen de Football-Data. Os anos fóra do arquivo CSV están curados a nivel de tempada e marcados coa súa fonte. A situación 2025-26 está datada porque a clasificación aínda pode cambiar.",
    },
    sourceNotes: {
      "Football-Data.co.uk": "CSV de partidos en Primeira e Segunda.",
      BDFutbol: "Historial do club e tempadas anteriores ao arquivo CSV.",
      StatsCrew: "Goles por xogador nas tempadas con táboa de anotación.",
      AS: "Contexto da carreira polo ascenso en maio de 2026.",
      LaLiga: "Clasificación oficial de LaLiga Hypermotion.",
      Transfermarkt: "Evolución de asistencia media por tempada e competición.",
      "La Opinión A Coruña": "Contexto local sobre os rexistros recentes de Riazor.",
      "Quincemil / El Español": "Récord de asistencia en Primeira Federación.",
    },
    attendanceLabels: {
      "2011-12": "Riazor respondeu tamén en Segunda",
      "2020-21": "a tempada COVID ten asterisco",
    },
    attendanceRecordLabels: {
      "Primera Federación record": "récord da Primeira Federación contra o Barça B",
    },
    attendanceSources: {
      "Wikipedia / prensa": "Wikipedia / prensa",
      Wikipedia: "Wikipedia",
      "prensa / rexistros de asistencia": "prensa / rexistros de asistencia",
      Transfermarkt: "Transfermarkt",
      "La Opinión A Coruña": "La Opinión A Coruña",
      "Quincemil / El Español": "Quincemil / El Español",
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
      noDramaSeason: "Tempada sen etiqueta salientable.",
    },
    charts: {
      goalDiff: {
        title: "GF - GC acumulado por xornada",
        contextLabel: "liñas apagadas: tempadas completas do arquivo",
        bestLine: "Mellor liña",
        worstLine: "Peor liña",
        sequence: [
          {
            step: "all",
            kicker: "02 / O contexto",
            title: "O contexto explica a dimensión do título.",
            body:
              "As liñas comparan a diferenza de goles acumulada dos equipos que compartiron división co Dépor desde 1993-94. O Dépor campión non foi a mellor curva do arquivo.",
            stat: "Diferenza de goles acumulada por xornada: marcados menos encaixados.",
          },
          {
            step: "best",
            kicker: "02.1 / O teito",
            title: "O Barça 2014-15 marca o teito do arquivo.",
            body:
              "A mellor traxectoria acaba cun +89 de diferenza de goles. Serve como referencia para ler o título do Dépor: máis competitivo que dominante.",
            stat: "Barcelona 2014-15: +89 DG.",
          },
          {
            step: "worst",
            kicker: "02.2 / O chan",
            title: "O Logroñés 1994-95 marca o chan.",
            body:
              "A curva remata en -64. A lista de derrotas explica por que esa liña é máis ca un extremo estatístico.",
            stat: "Logroñés 1994-95: -64 DG.",
          },
          {
            step: "depor-title",
            kicker: "02.3 / Dépor arriba",
            title: "O Dépor campión aguantou onde antes se escapara a Liga.",
            body:
              "A diferenza de goles non foi excepcional dentro do arquivo. O valor está na regularidade: 69 puntos e unha última xornada resolta en Riazor.",
            stat: "Dépor 1999-00: campión con +22 DG.",
          },
          {
            step: "depor-fall",
            kicker: "02.4 / Dépor abaixo",
            title: "En 2017-18 a tendencia xa era de descenso.",
            body:
              "O -38 de diferenza de goles resume unha tempada con pouca resposta. A liña non fala dun tramo malo, senón dun curso enteiro por baixo do nivel da categoría.",
            stat: "Dépor 2017-18: -38 DG.",
          },
          {
            step: "depor-now",
            kicker: "02.5 / Dépor agora",
            title: "A 2025-26 aínda lle quedan dúas xornadas.",
            body:
              "A lectura debe quedar datada: +20 en 40 partidos e posto de ascenso directo a 21 de maio de 2026. A curva apunta arriba, pero a táboa segue aberta.",
            stat: "Dépor 2025-26: +20 DG en 40 partidos.",
          },
        ],
        lossLedger: {
          title: (count: number) => `${count} derrotas`,
          subtitle: "Logroñés 1994-95 · marcador desde a súa perspectiva",
          roundPrefix: "X",
          home: "vs",
          away: "@",
        },
      },
      titlePath: {
        title: "Antes do título: puntos",
        finalTitle: "19/05/2000",
        finalBody: "Riazor: 2-0 ao Espanyol",
        breakBody: "0-0 co Valencia: a Liga escápase no último día",
        finalStretch: "última recta",
        warningLines: "avisos anteriores",
        comparablePoints: "puntos equivalentes",
      },
      finish: {
        title: "Posto final por tempada",
        topBandLabel: "zona 1º-3º",
        topBandTitle: "Postos 1º-3º",
        topBandBody: (hits: number, total: number, start: number, end: number) =>
          `Entre ${start} e ${end}, o Dépor rematou entre os tres primeiros en ${hits} de ${total} tempadas.`,
      },
      ppg: {
        title: "Media PPG en Primeira",
        context: "só tempadas de Primeira División",
        goalDiffPerMatch: "DG/partido",
        seasonCount: (count: number) => `${count} tempadas`,
        eras: {
          peak: {
            range: "1999-04",
            label: "ciclo de zona alta",
          },
          survival: {
            range: "2004-11",
            label: "a permanencia faise norma",
          },
          relegation: {
            range: "2012-18",
            label: "Primeira xa non se sostén",
          },
        },
      },
      scorers: {
        title: "Goles: equipo e goleador",
        otherGoals: "resto do equipo e goles en propia",
        topScorer: "máximo goleador",
        axis: "goles de Liga",
        outlierTitle: "2002-03 · Makaay",
        outlierBody: "29 goles, Bota de Ouro e traspaso ao Bayern",
        provisional: "dato provisional",
      },
      tier: {
        title: "Categoría por tempada",
        label2000: "campión de Primeira",
        label2020: "catro cursos na terceira escala",
        label2026: "segunda praza provisional",
      },
      opponents: {
        title: "Rivais: dous calendarios",
        high: "arriba: noites contra Madrid, United e Milan",
        low: "abaixo: derrotas no fútbol de terceira escala",
        center: "mesmo club",
      },
      attendance: {
        title: "Asistencia en Riazor",
        labelTitle: "Riazor",
        labelBody: "media aproximada por tempada; as chamadas sinalan anos con rexistros fóra de escala",
        axis: "asistencia media",
        partial: "2025-26 parcial",
      },
      promotion: {
        title: "Ascenso 2025-26",
        labelTitle: "21/05/2026",
        labelBody: "segundo con dúas xornadas por xogar",
      },
    },
  },
  es: {
    html: {
      lang: "es",
      title: "El Dépor, en datos",
      socialTitle: "El Dépor, en datos: del título de 2000 a la carrera por el ascenso",
      description:
        "Un relato de datos sobre el Deportivo de La Coruña: del título de Liga de 2000 a la carrera por el ascenso.",
      socialDescription:
        "Visualizaciones interactivas sobre el Deportivo de La Coruña: Liga 1999-00, caída hasta Segunda B y Primera RFEF, Riazor y carrera por el ascenso en 2025-26.",
      keywords:
        "Dépor, Deportivo de La Coruña, Deportivo La Coruña, Riazor, LaLiga, Segunda División, Primera RFEF, ascenso, datos fútbol",
      imageAlt: "Gráfico editorial de deporstats sobre el Dépor, Riazor y la carrera por el ascenso",
      locale: "es_ES",
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
        nube: "El contexto",
        ascensor: "La caída",
        porta: "La vuelta",
      },
    },
    hero: {
      eyebrow: "Real Club Deportivo de La Coruña · relato de datos",
      titleLines: ["El Dépor, ", "del título ", "a la carrera ", "por ascender."],
      lead: (points: number) =>
        `El Dépor ganó la Liga en 1999-00 con 69 puntos. Dos décadas después cayó fuera del fútbol profesional. Ahora, con ${points} puntos, sostiene una plaza de ascenso directo.`,
      statsAria: "Resumen estadístico",
      stats: {
        titlePoints: "puntos en el título",
        tiers: "categorías recorridas",
        statusDate: (date: string) => `a ${date}`,
      },
      ticker: ["1999-00 CAMPEÓN", "2019-20 DESCENSO", "2023-24 ASCENSO", "2025-26 EN ASCENSO"],
    },
    chapters: [
      {
        id: "cume",
        kicker: "01 / La cumbre",
        title: "La Liga de 2000 fue la culminación de una década de aviso.",
        body:
          "El Dépor ya había sido tercero y dos veces subcampeón. En 1999-00 sostuvo el pulso hasta el final y cerró la Liga en Riazor ante el Espanyol.",
        stat: "69 puntos, 66 goles y el primer título de Liga del club.",
      },
      {
        id: "nube",
        kicker: "02 / El contexto",
        title: "El contexto explica la dimensión del título.",
        body:
          "Las líneas comparan la diferencia de goles acumulada de los equipos que compartieron división con el Dépor desde 1993-94. El Dépor campeón no fue la mejor curva del archivo; fue la que llegó entera a la última jornada.",
        stat: "Diferencia de goles acumulada por jornada: marcados menos encajados.",
      },
      {
        id: "alto",
        kicker: "03 / Vivir arriba",
        title: "La zona alta dejó de ser una excepción.",
        body:
          "Entre 1992 y 2004, el Dépor terminó repetidamente entre los mejores e hizo de Riazor una escala europea. El puesto final muestra cuánto duró esa estabilidad.",
        stat: "1992-2004: terceros, segundos, campeones y noches europeas.",
      },
      {
        id: "fuga",
        kicker: "04 / La fuga lenta",
        title: "El desgaste llegó antes del descenso.",
        body:
          "Para no mezclar categorías, el gráfico compara solo temporadas de Primera. El Dépor pasa de una media de 1,86 puntos por partido en el ciclo europeo a 0,93 en los últimos cursos antes del descenso de 2018.",
        stat: "En Primera: 1,86 PPG entre 1999 y 2004; 0,93 PPG entre 2012 y 2018.",
      },
      {
        id: "goles",
        kicker: "05 / Los goles",
        title: "Los goles también cuentan cómo estaba repartido el equipo.",
        body:
          "La barra separa al máximo goleador del resto. Cuando la franja de Makaay crece en 2002-03, resume tanto su Bota de Oro como la dependencia ofensiva de aquella temporada.",
        stat: "Makaay 2002-03: 29 goles, Bota de Oro y traspaso al Bayern.",
      },
      {
        id: "ascensor",
        kicker: "06 / La caída",
        title: "La caída llevó al club fuera del fútbol profesional.",
        body:
          "Tras el descenso de 2019-20, el Dépor pasó cuatro temporadas entre Segunda B, Primera RFEF y Primera Federación. La escala de categorías muestra la profundidad del golpe.",
        stat: "Primera -> Segunda -> Segunda B / Primera RFEF -> Segunda.",
      },
      {
        id: "rivais",
        kicker: "07 / La lista de rivales",
        title: "La lista de rivales mide el cambio de escenario.",
        body:
          "Milan y Manchester United quedan en un extremo de la memoria. Celta B, Unionistas, Guijuelo o Coruxo aparecen en el otro. El contraste pone nombres al salto entre competiciones.",
        stat: "El rival también es una métrica.",
      },
      {
        id: "riazor",
        kicker: "08 / Riazor",
        title: "Riazor sostuvo cifras de otra categoría.",
        body:
          "Incluso en los años de tercera escala, la asistencia mantuvo al Dépor por encima de su contexto competitivo. La grada no corrige la clasificación, pero ayuda a explicar la vuelta.",
        stat: "La asistencia mantuvo presión de club grande.",
      },
      {
        id: "porta",
        kicker: "09 / La vuelta",
        title: "El 21 de mayo de 2026, el regreso sigue abierto.",
        body:
          "Con 74 puntos en 40 partidos, el Dépor ocupa puesto de ascenso directo. Faltan dos jornadas, así que el dato es una fotografía de carrera, no una llegada.",
        stat: "Segundo, 74 puntos, dos jornadas por jugar.",
      },
    ],
    sources: {
      kicker: "Fuentes y método",
      title: "Fuentes, fechas y límites.",
      body:
        "Los partidos de Primera y Segunda vienen de Football-Data. Los años fuera del archivo CSV están curados a nivel de temporada y marcados con su fuente. La situación 2025-26 está fechada porque la clasificación todavía puede cambiar.",
    },
    sourceNotes: {
      "Football-Data.co.uk": "CSV de partidos en Primera y Segunda.",
      BDFutbol: "Historial del club y temporadas anteriores al archivo CSV.",
      StatsCrew: "Goles por jugador en las temporadas con tabla de anotación.",
      AS: "Contexto de la carrera por el ascenso en mayo de 2026.",
      LaLiga: "Clasificación oficial de LaLiga Hypermotion.",
      Transfermarkt: "Evolución de asistencia media por temporada y competición.",
      "La Opinión A Coruña": "Contexto local sobre los registros recientes de Riazor.",
      "Quincemil / El Español": "Récord de asistencia en Primera Federación.",
    },
    attendanceLabels: {
      "2011-12": "Riazor respondió también en Segunda",
      "2020-21": "la temporada COVID tiene asterisco",
    },
    attendanceRecordLabels: {
      "Primera Federación record": "récord de la Primera Federación contra el Barça B",
    },
    attendanceSources: {
      "Wikipedia / prensa": "Wikipedia / prensa",
      Wikipedia: "Wikipedia",
      "prensa / rexistros de asistencia": "prensa / registros de asistencia",
      Transfermarkt: "Transfermarkt",
      "La Opinión A Coruña": "La Opinión A Coruña",
      "Quincemil / El Español": "Quincemil / El Español",
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
      noDramaSeason: "Temporada sin etiqueta destacada.",
    },
    charts: {
      goalDiff: {
        title: "GF - GC acumulado por jornada",
        contextLabel: "líneas apagadas: temporadas completas del archivo",
        bestLine: "Mejor línea",
        worstLine: "Peor línea",
        sequence: [
          {
            step: "all",
            kicker: "02 / El contexto",
            title: "El contexto explica la dimensión del título.",
            body:
              "Las líneas comparan la diferencia de goles acumulada de los equipos que compartieron división con el Dépor desde 1993-94. El Dépor campeón no fue la mejor curva del archivo.",
            stat: "Diferencia de goles acumulada por jornada: marcados menos encajados.",
          },
          {
            step: "best",
            kicker: "02.1 / El techo",
            title: "El Barça 2014-15 marca el techo del archivo.",
            body:
              "La mejor trayectoria acaba con un +89 de diferencia de goles. Sirve como referencia para leer el título del Dépor: más competitivo que dominante.",
            stat: "Barcelona 2014-15: +89 DG.",
          },
          {
            step: "worst",
            kicker: "02.2 / El suelo",
            title: "El Logroñés 1994-95 marca el suelo.",
            body:
              "La curva termina en -64. La lista de derrotas explica por qué esa línea es algo más que un extremo estadístico.",
            stat: "Logroñés 1994-95: -64 DG.",
          },
          {
            step: "depor-title",
            kicker: "02.3 / Dépor arriba",
            title: "El Dépor campeón aguantó donde antes se había escapado la Liga.",
            body:
              "La diferencia de goles no fue excepcional dentro del archivo. El valor está en la regularidad: 69 puntos y una última jornada resuelta en Riazor.",
            stat: "Dépor 1999-00: campeón con +22 DG.",
          },
          {
            step: "depor-fall",
            kicker: "02.4 / Dépor abajo",
            title: "En 2017-18 la tendencia ya era de descenso.",
            body:
              "El -38 de diferencia de goles resume una temporada con poca respuesta. La línea no habla de un tramo malo, sino de un curso entero por debajo del nivel de la categoría.",
            stat: "Dépor 2017-18: -38 DG.",
          },
          {
            step: "depor-now",
            kicker: "02.5 / Dépor ahora",
            title: "A 2025-26 todavía le quedan dos jornadas.",
            body:
              "La lectura debe quedar fechada: +20 en 40 partidos y puesto de ascenso directo a 21 de mayo de 2026. La curva apunta arriba, pero la tabla sigue abierta.",
            stat: "Dépor 2025-26: +20 DG en 40 partidos.",
          },
        ],
        lossLedger: {
          title: (count: number) => `${count} derrotas`,
          subtitle: "Logroñés 1994-95 · marcador desde su perspectiva",
          roundPrefix: "J",
          home: "vs",
          away: "@",
        },
      },
      titlePath: {
        title: "Antes del título: puntos",
        finalTitle: "19/05/2000",
        finalBody: "Riazor: 2-0 al Espanyol",
        breakBody: "0-0 con el Valencia: la Liga se escapa el último día",
        finalStretch: "última recta",
        warningLines: "avisos anteriores",
        comparablePoints: "puntos equivalentes",
      },
      finish: {
        title: "Puesto final por temporada",
        topBandLabel: "zona 1º-3º",
        topBandTitle: "Puestos 1º-3º",
        topBandBody: (hits: number, total: number, start: number, end: number) =>
          `Entre ${start} y ${end}, el Dépor terminó entre los tres primeros en ${hits} de ${total} temporadas.`,
      },
      ppg: {
        title: "Media PPG en Primera",
        context: "solo temporadas de Primera División",
        goalDiffPerMatch: "DG/partido",
        seasonCount: (count: number) => `${count} temporadas`,
        eras: {
          peak: {
            range: "1999-04",
            label: "ciclo de zona alta",
          },
          survival: {
            range: "2004-11",
            label: "la permanencia se hace norma",
          },
          relegation: {
            range: "2012-18",
            label: "Primera ya no se sostiene",
          },
        },
      },
      scorers: {
        title: "Goles: equipo y goleador",
        otherGoals: "resto del equipo y goles en propia",
        topScorer: "máximo goleador",
        axis: "goles de Liga",
        outlierTitle: "2002-03 · Makaay",
        outlierBody: "29 goles, Bota de Oro y traspaso al Bayern",
        provisional: "dato provisional",
      },
      tier: {
        title: "Categoría por temporada",
        label2000: "campeón de Primera",
        label2020: "cuatro cursos en la tercera escala",
        label2026: "segunda plaza provisional",
      },
      opponents: {
        title: "Rivales: dos calendarios",
        high: "arriba: noches contra Madrid, United y Milan",
        low: "abajo: derrotas en el fútbol de tercera escala",
        center: "mismo club",
      },
      attendance: {
        title: "Asistencia en Riazor",
        labelTitle: "Riazor",
        labelBody: "media aproximada por temporada; las llamadas señalan años con registros fuera de escala",
        axis: "asistencia media",
        partial: "2025-26 parcial",
      },
      promotion: {
        title: "Ascenso 2025-26",
        labelTitle: "21/05/2026",
        labelBody: "segundo con dos jornadas por jugar",
      },
    },
  },
  en: {
    html: {
      lang: "en",
      title: "Depor, in data",
      socialTitle: "Depor, in data: from the 2000 title to the promotion race",
      description:
        "A data story about Deportivo de La Coruna: from the 2000 La Liga title to the promotion race.",
      socialDescription:
        "Interactive visualizations on Deportivo de La Coruna: the 1999-00 La Liga title, the fall into Segunda B and Primera RFEF, Riazor, and the 2025-26 promotion race.",
      keywords:
        "Depor, Deportivo de La Coruna, Deportivo La Coruna, Riazor, LaLiga, Segunda Division, Primera RFEF, promotion, football data",
      imageAlt: "Editorial deporstats graphic about Depor, Riazor, and the promotion race",
      locale: "en_US",
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
        nube: "Context",
        ascensor: "Fall",
        porta: "Return",
      },
    },
    hero: {
      eyebrow: "Real Club Deportivo de La Coruna · data story",
      titleLines: ["Depor, ", "from the title ", "to the promotion ", "race."],
      lead: (points: number) =>
        `Depor won La Liga in 1999-00 with 69 points. Two decades later it had fallen out of professional football. Now, with ${points} points, it holds an automatic promotion place.`,
      statsAria: "Statistical summary",
      stats: {
        titlePoints: "points in the title season",
        tiers: "tiers crossed",
        statusDate: (date: string) => `as of ${date}`,
      },
      ticker: ["1999-00 CHAMPIONS", "2019-20 RELEGATION", "2023-24 PROMOTION", "2025-26 IN PROMOTION"],
    },
    chapters: [
      {
        id: "cume",
        kicker: "01 / The summit",
        title: "The 2000 title finished a decade of warnings.",
        body:
          "Depor had already finished third and twice as runner-up. In 1999-00, it held the pace to the end and sealed La Liga at Riazor against Espanyol.",
        stat: "69 points, 66 goals, and the club's first league title.",
      },
      {
        id: "nube",
        kicker: "02 / The context",
        title: "The context explains the size of the title.",
        body:
          "The lines compare accumulated goal difference for every team that shared a division with Depor since 1993-94. The champions were not the best curve in the archive; they were the one that reached the final day intact.",
        stat: "Accumulated goal difference by round: scored minus conceded.",
      },
      {
        id: "alto",
        kicker: "03 / Living high",
        title: "The top end stopped being an exception.",
        body:
          "Between 1992 and 2004, Depor repeatedly finished among the best and made Riazor a European stop. The final positions show how long that stability lasted.",
        stat: "1992-2004: thirds, seconds, champions, and European nights.",
      },
      {
        id: "fuga",
        kicker: "04 / The slow leak",
        title: "The slide started before relegation.",
        body:
          "To avoid mixing divisions, the chart compares only Primera seasons. Depor goes from 1.86 points per match in the European cycle to 0.93 in the last top-flight seasons before the 2018 relegation.",
        stat: "In Primera: 1.86 PPG from 1999 to 2004; 0.93 PPG from 2012 to 2018.",
      },
      {
        id: "goles",
        kicker: "05 / The goals",
        title: "The goals also show how the team was built.",
        body:
          "Each bar separates the leading scorer from the rest of the side. When Makaay's share rises in 2002-03, it captures both his Golden Shoe and that season's attacking dependence.",
        stat: "Makaay 2002-03: 29 goals, the Golden Shoe, and a move to Bayern.",
      },
      {
        id: "ascensor",
        kicker: "06 / The fall",
        title: "The fall took the club out of professional football.",
        body:
          "After the 2019-20 relegation, Depor spent four seasons between Segunda B, Primera RFEF, and Primera Federacion. The tier scale shows how deep the hit went.",
        stat: "Primera -> Segunda -> Segunda B / Primera RFEF -> Segunda.",
      },
      {
        id: "rivais",
        kicker: "07 / The rivals list",
        title: "The rivals list measures the change of stage.",
        body:
          "Milan and Manchester United sit at one end of the memory. Celta B, Unionistas, Guijuelo, and Coruxo appear at the other. The contrast names the distance between competitions.",
        stat: "The opponent is also a metric.",
      },
      {
        id: "riazor",
        kicker: "08 / Riazor",
        title: "Riazor kept posting numbers from another level.",
        body:
          "Even in the third tier years, attendance kept Depor above its competitive context. The stands do not fix the table, but they help explain the return.",
        stat: "Attendance kept big-club pressure in place.",
      },
      {
        id: "porta",
        kicker: "09 / The way back",
        title: "On May 21, 2026, the return is still open.",
        body:
          "With 74 points from 40 matches, Depor sits in an automatic promotion place. Two rounds remain, so the number is a race snapshot, not a finish line.",
        stat: "Second, 74 points, two rounds to play.",
      },
    ],
    sources: {
      kicker: "Sources and method",
      title: "Sources, dates, and limits.",
      body:
        "Primera and Segunda match data comes from Football-Data. Seasons outside the CSV archive are curated at season level and marked with their source. The 2025-26 status is dated because the table can still change.",
    },
    sourceNotes: {
      "Football-Data.co.uk": "Primera and Segunda match CSVs.",
      BDFutbol: "Club history and seasons before the CSV archive.",
      StatsCrew: "Player goals in seasons with a scoring table.",
      AS: "Context for the promotion race in May 2026.",
      LaLiga: "Official LaLiga Hypermotion standings.",
      Transfermarkt: "Average attendance by season and competition.",
      "La Opinión A Coruña": "Local context on recent Riazor attendance records.",
      "Quincemil / El Español": "Primera Federacion attendance record.",
    },
    attendanceLabels: {
      "2011-12": "Riazor also answered in Segunda",
      "2020-21": "the COVID season needs an asterisk",
    },
    attendanceRecordLabels: {
      "Primera Federación record": "Primera Federacion record against Barca B",
    },
    attendanceSources: {
      "Wikipedia / prensa": "Wikipedia / press",
      Wikipedia: "Wikipedia",
      "prensa / rexistros de asistencia": "press / attendance records",
      Transfermarkt: "Transfermarkt",
      "La Opinión A Coruña": "La Opinión A Coruña",
      "Quincemil / El Español": "Quincemil / El Español",
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
      noDramaSeason: "A season without a notable label.",
    },
    charts: {
      goalDiff: {
        title: "GF - GA accumulated by round",
        contextLabel: "muted lines: full seasons in the archive",
        bestLine: "Best line",
        worstLine: "Worst line",
        sequence: [
          {
            step: "all",
            kicker: "02 / The context",
            title: "The context explains the size of the title.",
            body:
              "The lines compare accumulated goal difference for every team that shared a division with Depor since 1993-94. The champions were not the best curve in the archive.",
            stat: "Accumulated goal difference by round: scored minus conceded.",
          },
          {
            step: "best",
            kicker: "02.1 / The ceiling",
            title: "Barcelona 2014-15 sets the archive ceiling.",
            body:
              "The best trajectory ends at +89 goal difference. It gives the Depor title a useful reference point: more competitive than dominant.",
            stat: "Barcelona 2014-15: +89 GD.",
          },
          {
            step: "worst",
            kicker: "02.2 / The floor",
            title: "Logroñés 1994-95 sets the archive floor.",
            body:
              "The curve finishes at -64. The defeat list explains why that line is more than a statistical extreme.",
            stat: "Logroñés 1994-95: -64 GD.",
          },
          {
            step: "depor-title",
            kicker: "02.3 / Depor high",
            title: "The champions held where the league had slipped before.",
            body:
              "The goal difference was not exceptional in the archive. The value is in the regularity: 69 points and a final day settled at Riazor.",
            stat: "Depor 1999-00: champions with +22 GD.",
          },
          {
            step: "depor-fall",
            kicker: "02.4 / Depor low",
            title: "By 2017-18, the trend already pointed down.",
            body:
              "The -38 goal difference sums up a season with little response. The line is not one bad spell; it is a full campaign below the level of the division.",
            stat: "Depor 2017-18: -38 GD.",
          },
          {
            step: "depor-now",
            kicker: "02.5 / Depor now",
            title: "The 2025-26 season still has two rounds left.",
            body:
              "The reading has to stay dated: +20 in 40 matches and an automatic promotion place on May 21, 2026. The curve points up, but the table remains open.",
            stat: "Depor 2025-26: +20 GD in 40 matches.",
          },
        ],
        lossLedger: {
          title: (count: number) => `${count} losses`,
          subtitle: "Logroñés 1994-95 · score from their perspective",
          roundPrefix: "R",
          home: "vs",
          away: "@",
        },
      },
      titlePath: {
        title: "Before the title: points",
        finalTitle: "05/19/2000",
        finalBody: "Riazor: 2-0 over Espanyol",
        breakBody: "0-0 with Valencia: the league slips on the final day",
        finalStretch: "final stretch",
        warningLines: "earlier warnings",
        comparablePoints: "equivalent points",
      },
      finish: {
        title: "Final position by season",
        topBandLabel: "1st-3rd zone",
        topBandTitle: "Places 1st-3rd",
        topBandBody: (hits: number, total: number, start: number, end: number) =>
          `Between ${start} and ${end}, Depor finished in the top three in ${hits} of ${total} seasons.`,
      },
      ppg: {
        title: "Average PPG in Primera",
        context: "Primera Division seasons only",
        goalDiffPerMatch: "GD/match",
        seasonCount: (count: number) => `${count} seasons`,
        eras: {
          peak: {
            range: "1999-04",
            label: "top-end cycle",
          },
          survival: {
            range: "2004-11",
            label: "survival becomes the norm",
          },
          relegation: {
            range: "2012-18",
            label: "Primera no longer holds",
          },
        },
      },
      scorers: {
        title: "Goals: team and scorer",
        otherGoals: "rest of team and own goals",
        topScorer: "leading scorer",
        axis: "league goals",
        outlierTitle: "2002-03 · Makaay",
        outlierBody: "29 goals, Golden Shoe, and a move to Bayern",
        provisional: "provisional data",
      },
      tier: {
        title: "Tier by season",
        label2000: "Primera champions",
        label2020: "four seasons on the third step",
        label2026: "provisional second place",
      },
      opponents: {
        title: "Rivals: two fixture lists",
        high: "above: nights against Madrid, United, and Milan",
        low: "below: defeats in third-tier football",
        center: "same club",
      },
      attendance: {
        title: "Attendance at Riazor",
        labelTitle: "Riazor",
        labelBody: "approximate season averages; callouts mark years with out-of-scale crowds",
        axis: "average attendance",
        partial: "2025-26 partial",
      },
      promotion: {
        title: "Promotion race 2025-26",
        labelTitle: "05/21/2026",
        labelBody: "second with two rounds to play",
      },
    },
  },
} as const;

export type Translation = (typeof translations)[Language];
