import * as d3 from "d3";
import "./styles.css";
import { DEFAULT_LANGUAGE, LANGUAGE_OPTIONS, type Language, translations } from "./i18n";

type Season = {
  season: string;
  tier: number;
  division: string;
  finish: number;
  points: number;
  matches: number;
  wins: number;
  draws: number;
  losses: number;
  gf: number;
  ga: number;
  gd: number;
  ppg: number;
  gd_per_match: number;
  state: string;
  source: string;
  source_url: string;
  season_start: number;
};

type Match = {
  season: string;
  date: string;
  division: string;
  home_team: string;
  away_team: string;
  home_goals: number;
  away_goals: number;
  depor_venue: "H" | "A";
  depor_goals_for: number;
  depor_goals_against: number;
  depor_result: "W" | "D" | "L";
};

type TitlePoint = {
  round: number;
  date: string;
  points: number;
  opponent: string;
  venue: "H" | "A";
  gf: number;
  ga: number;
  result: "W" | "D" | "L";
};

type TitleRacePoint = {
  team: string;
  round: number;
  date: string;
  points: number;
  opponent: string;
  result: "W" | "D" | "L";
  color: string;
};

type GoalDiffPoint = {
  season: string;
  season_start: number;
  division: string;
  tier: number;
  team: string;
  round: number;
  date: string;
  gd: number;
  gf: number;
  ga: number;
  opponent: string;
  venue: "H" | "A" | "";
  result: "W" | "D" | "L" | "";
  is_depor: boolean;
  source_url: string;
};

type FinishContextPoint = {
  team: string;
  season: string;
  season_start: number;
  finish: number;
  points: number;
  color: string;
};

type PpgContextPoint = {
  season: string;
  season_start: number;
  division: string;
  leader_team: string;
  leader_ppg: number;
  median_ppg: number;
};

type PromotionTeam = {
  team: string;
  finish: number;
  points: number;
  matches: number;
  wins: number;
  draws: number;
  losses: number;
  gd: number;
};

type SourceLink = {
  name: string;
  url: string;
  note: string;
};

type AttendanceCallout = {
  season: string;
  attendance: number;
  label: string;
  source: string;
};

type StoryData = {
  generated_at: string;
  current_status_date: string;
  seasons: Season[];
  matches: Match[];
  title_path: TitlePoint[];
  title_race: TitleRacePoint[];
  goal_diff_race: GoalDiffPoint[];
  finish_context: FinishContextPoint[];
  ppg_context: PpgContextPoint[];
  team_colors: Record<string, string>;
  promotion_table: PromotionTeam[];
  milestones: { season: string; title: string; body: string }[];
  attendance_callouts: AttendanceCallout[];
  opponent_wall: { elite: string[]; third_tier: string[]; football_data_opponents: string[] };
  sources: SourceLink[];
};

type ChartRenderer = (element: HTMLElement, data: StoryData) => void;
type TooltipContent = { title: string; body: string };
type TooltipSelection = d3.Selection<HTMLDivElement, unknown, null, undefined>;
type LegendItem = { label: string; color: string };
type LabelBox = { x: number; y: number; width: number; height: number };
type OpponentMoment = {
  season: string;
  year: number;
  opponent: string;
  score: string;
  competition: string;
  venue: string;
  polarity: "high" | "low";
  impact: number;
  note: string;
  source: string;
  sourceUrl: string;
  labelDx: number;
  labelDy: number;
};

const BLUE = "#ffffff";
const DARK = "#ffffff";
const GRID = "rgba(255,255,255,0.34)";
const WARN = "#ff624f";
const LOW_BLUE = "#004b93";
const MID_BLUE = "#006bcf";
const OPPONENT_MOMENTS: OpponentMoment[] = [
  {
    season: "1993-94",
    year: 1993.72,
    opponent: "Real Madrid",
    score: "4-0",
    competition: "La Liga",
    venue: "Riazor",
    polarity: "high",
    impact: 3.4,
    note: "A early statement that Riazor could swallow giants.",
    source: "Football-Data",
    sourceUrl: "https://www.football-data.co.uk/mmz4281/9394/SP1.csv",
    labelDx: 8,
    labelDy: -82,
  },
  {
    season: "1999-00",
    year: 2000.1,
    opponent: "Real Madrid",
    score: "5-2",
    competition: "La Liga",
    venue: "Riazor",
    polarity: "high",
    impact: 3.6,
    note: "The title season did not just survive Madrid; it ran through them.",
    source: "Football-Data",
    sourceUrl: "https://www.football-data.co.uk/mmz4281/9900/SP1.csv",
    labelDx: -42,
    labelDy: -86,
  },
  {
    season: "2001-02",
    year: 2001.73,
    opponent: "Manchester United",
    score: "2-1",
    competition: "UCL",
    venue: "Riazor",
    polarity: "high",
    impact: 3.1,
    note: "Two late goals turned a European heavyweight into another Riazor victim.",
    source: "UEFA",
    sourceUrl: "https://www.uefa.com/uefachampionsleague/news/017d-0e6a314d9511-4b77428a1884-1000--comeback-kings-deportivo-stun-united/",
    labelDx: 26,
    labelDy: -4,
  },
  {
    season: "2003-04",
    year: 2004.27,
    opponent: "Milan",
    score: "4-0",
    competition: "UCL",
    venue: "Riazor",
    polarity: "high",
    impact: 4.25,
    note: "The comeback: 0-3 down after the first leg, 5-4 up on aggregate after Riazor.",
    source: "UEFA",
    sourceUrl: "https://www.uefa.com/uefachampionsleague/news/019c-0e6c12450ff2-294c584e2602-1000--dazzling-depor-ditch-milan/",
    labelDx: 18,
    labelDy: -88,
  },
  {
    season: "2020-21",
    year: 2020.95,
    opponent: "Celta B",
    score: "1-2",
    competition: "Segunda B",
    venue: "Riazor",
    polarity: "low",
    impact: 3.25,
    note: "The reserve side of the rival city won at Riazor.",
    source: "BDFutbol",
    sourceUrl: "https://www.bdfutbol.com/en/t/t2020-2113.html?tab=partits",
    labelDx: -190,
    labelDy: -96,
  },
  {
    season: "2020-21",
    year: 2021.1,
    opponent: "Compostela",
    score: "0-2",
    competition: "Segunda B",
    venue: "Riazor",
    polarity: "low",
    impact: 3,
    note: "A home defeat that made the category feel real.",
    source: "BDFutbol",
    sourceUrl: "https://www.bdfutbol.com/en/t/t2020-2113.html?tab=partits",
    labelDx: -235,
    labelDy: -12,
  },
  {
    season: "2020-21",
    year: 2021.14,
    opponent: "Coruxo",
    score: "0-2",
    competition: "Segunda B",
    venue: "O Vao",
    polarity: "low",
    impact: 3.15,
    note: "The widest away defeat of that Segunda B season.",
    source: "BDFutbol",
    sourceUrl: "https://www.bdfutbol.com/en/t/t2020-2113.html?tab=partits",
    labelDx: -53,
    labelDy: -96,
  },
  {
    season: "2020-21",
    year: 2021.22,
    opponent: "Racing Ferrol",
    score: "0-1",
    competition: "Segunda B",
    venue: "A Malata",
    polarity: "low",
    impact: 2.75,
    note: "A Galician away defeat in the third tier.",
    source: "BDFutbol",
    sourceUrl: "https://www.bdfutbol.com/en/t/t2020-2113.html?tab=partits",
    labelDx: -84,
    labelDy: -12,
  },
];
const CHAPTER_RENDERERS: Record<string, ChartRenderer> = {
  nube: drawGoalDiffCloud,
  cume: drawTitlePath,
  alto: drawFinishTimeline,
  fuga: drawPpgDrift,
  ascensor: drawTierAltitude,
  rivais: drawOpponentWall,
  riazor: drawAttendance,
  porta: drawPromotionRace,
};

let currentLanguage: Language = DEFAULT_LANGUAGE;
let currentCopy = translations[currentLanguage];
let storyData: StoryData | null = null;
let resizeObservers: ResizeObserver[] = [];
let snapNavigationCleanup: (() => void) | null = null;

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error(currentCopy.errors.missingApp);
}
const root = app;

const storyDataUrl = `${import.meta.env.BASE_URL}data/depor_story.json`;

void fetch(storyDataUrl, { cache: "no-cache" })
  .then((response) => {
    if (!response.ok) {
      throw new Error(currentCopy.errors.loadData);
    }
    return response.json() as Promise<StoryData>;
  })
  .then((data) => {
    storyData = data;
    renderApp(data);
  })
  .catch((error: Error) => {
    app.innerHTML = `<main class="error"><h1>${currentCopy.errors.title}</h1><p>${error.message}</p></main>`;
  });

function renderApp(data: StoryData) {
  applyDocumentLanguage();
  snapNavigationCleanup?.();
  snapNavigationCleanup = null;
  resizeObservers.forEach((observer) => observer.disconnect());
  resizeObservers = [];
  root.innerHTML = "";
  root.append(renderHero(data));
  currentCopy.chapters.forEach((chapter) => {
    const chart = CHAPTER_RENDERERS[chapter.id];
    root.append(renderChapter({ ...chapter, data, chart }));
  });
  root.append(renderSources(data));

  renderAllCharts(data);
  observeChapters();
  setupSnapNavigation();
  scrollToInitialHash();
}

function applyDocumentLanguage() {
  document.documentElement.lang = currentCopy.html.lang;
  document.title = currentCopy.html.title;
  document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute("content", currentCopy.html.description);
}

function setLanguage(language: Language) {
  if (language === currentLanguage) return;
  currentLanguage = language;
  currentCopy = translations[currentLanguage];
  if (storyData) {
    renderApp(storyData);
  } else {
    applyDocumentLanguage();
  }
}

function renderHero(data: StoryData): HTMLElement {
  const titleSeason = data.seasons.find((season) => season.season === "1999-00");
  const current = data.seasons.find((season) => season.season === "2025-26");
  const section = document.createElement("header");
  section.className = "hero";
  section.innerHTML = `
    <nav class="topbar" aria-label="${currentCopy.nav.aria}">
      <div class="topbar-links">
        <a href="#cume">${currentCopy.nav.links.cume}</a>
        <a href="#nube">${currentCopy.nav.links.nube}</a>
        <a href="#ascensor">${currentCopy.nav.links.ascensor}</a>
        <a href="#porta">${currentCopy.nav.links.porta}</a>
      </div>
      <div class="language-switch" aria-label="${currentCopy.language.aria}">
        ${LANGUAGE_OPTIONS.map(
          ({ code, shortLabel }) =>
            `<button type="button" data-language="${code}" aria-pressed="${code === currentLanguage}" title="${currentCopy.language.names[code]}">${shortLabel}</button>`,
        ).join("")}
      </div>
    </nav>
    <div class="hero-grid">
      <p class="eyebrow">${currentCopy.hero.eyebrow}</p>
      <h1>${currentCopy.hero.titleLines.map((line) => `<span>${line}</span>`).join("")}</h1>
      <p class="lead">
        ${currentCopy.hero.lead(current?.points ?? 74)}
      </p>
      <div class="hero-stats" aria-label="${currentCopy.hero.statsAria}">
        <div><strong>${titleSeason?.points ?? 69}</strong><span>${currentCopy.hero.stats.titlePoints}</span></div>
        <div><strong>3</strong><span>${currentCopy.hero.stats.tiers}</span></div>
        <div><strong>${current?.finish ?? 2}º</strong><span>${currentCopy.hero.stats.statusDate(formatDate(data.current_status_date))}</span></div>
      </div>
    </div>
    <div class="ticker" aria-hidden="true">
      ${currentCopy.hero.ticker.map((item) => `<span>${item}</span>`).join("")}
    </div>
  `;
  section.querySelectorAll<HTMLButtonElement>("[data-language]").forEach((button) => {
    button.addEventListener("click", () => {
      const language = button.dataset.language as Language | undefined;
      if (language) setLanguage(language);
    });
  });
  return section;
}

function renderChapter({
  id,
  kicker,
  title,
  body,
  stat,
  data,
  chart,
}: {
  id: string;
  kicker: string;
  title: string;
  body: string;
  stat: string;
  data: StoryData;
  chart: ChartRenderer;
}): HTMLElement {
  const section = document.createElement("section");
  section.id = id;
  section.className = "chapter";
  section.dataset.chart = id;

  const figure = document.createElement("figure");
  figure.className = "chart-shell";
  const chartNode = document.createElement("div");
  chartNode.className = "chart";
  chartNode.setAttribute("role", "img");
  chartNode.setAttribute("aria-label", title);
  chartNode.dataset.renderer = chart.name;
  figure.append(chartNode);

  const copy = document.createElement("article");
  copy.className = "chapter-copy";
  copy.innerHTML = `
    <p class="eyebrow">${kicker}</p>
    <h2>${title}</h2>
    <p>${body}</p>
    <p class="stat-line">${stat}</p>
  `;

  section.append(figure, copy);
  return section;
}

function renderSources(data: StoryData): HTMLElement {
  const footer = document.createElement("footer");
  footer.className = "sources";
  footer.innerHTML = `
    <div>
      <p class="eyebrow">${currentCopy.sources.kicker}</p>
      <h2>${currentCopy.sources.title}</h2>
      <p>
        ${currentCopy.sources.body}
      </p>
    </div>
    <ul>
      ${data.sources
        .map(
          (source) =>
            `<li><a href="${source.url}" target="_blank" rel="noreferrer">${source.name}</a><span>${sourceNote(source)}</span></li>`,
        )
        .join("")}
    </ul>
  `;
  return footer;
}

function renderAllCharts(data: StoryData) {
  const renderers: Record<string, ChartRenderer> = {
    drawGoalDiffCloud,
    drawTitlePath,
    drawFinishTimeline,
    drawPpgDrift,
    drawTierAltitude,
    drawOpponentWall,
    drawAttendance,
    drawPromotionRace,
  };

  document.querySelectorAll<HTMLElement>(".chart").forEach((element) => {
    const rendererName = element.dataset.renderer;
    if (!rendererName || !renderers[rendererName]) return;
    renderResponsive(element, (node) => renderers[rendererName](node, data));
  });
}

function renderResponsive(element: HTMLElement, render: (element: HTMLElement) => void) {
  render(element);
  const observer = new ResizeObserver(() => render(element));
  observer.observe(element);
  resizeObservers.push(observer);
}

function baseSvg(element: HTMLElement, minHeight = 460) {
  element.innerHTML = "";
  const width = Math.max(320, element.clientWidth);
  const height = Math.max(minHeight, element.clientHeight || Math.round(width * 0.58));
  const svg = d3
    .select(element)
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("preserveAspectRatio", "xMidYMid meet");
  const tooltip = d3.select(element).append("div").attr("class", "floating-tooltip").attr("aria-hidden", "true");
  element.onpointerleave = () => hideTooltip(tooltip);
  element.onpointerdown = (event) => {
    if (!(event.target instanceof Element) || !event.target.closest(".tooltip-target")) {
      hideTooltip(tooltip);
    }
  };
  return { svg, tooltip, width, height };
}

function drawGoalDiffCloud(element: HTMLElement, data: StoryData) {
  const { svg, tooltip, width, height } = baseSvg(element);
  const margin = responsiveMargin(width);
  const points = (data.goal_diff_race ?? []).filter((point) => point.season_start >= 1993);
  const series = [...d3.group(points, (point) => `${point.team}__${point.season}`).values()];
  const deporSeries = series.filter((values) => values[0]?.is_depor);
  const contextSeries = series.filter((values) => !values[0]?.is_depor);
  const finalPoints = series.map((values) => values[values.length - 1]).filter((point): point is GoalDiffPoint => Boolean(point));
  const bestFinal = d3.max(finalPoints, (point) => point.gd);
  const worstFinal = d3.min(finalPoints, (point) => point.gd);
  const bestSeries = series.find((values) => values[values.length - 1]?.gd === bestFinal);
  const worstSeries = series.find((values) => values[values.length - 1]?.gd === worstFinal);
  const maxRound = d3.max(points, (d) => d.round) ?? 42;
  const maxAbsGd = Math.ceil((d3.max(points, (d) => Math.abs(d.gd)) ?? 80) / 10) * 10;
  const yTicks = d3.range(-maxAbsGd, maxAbsGd + 1, 20);
  const x = d3.scaleLinear().domain([0, maxRound]).range([margin.left, width - margin.right]);
  const y = d3.scaleLinear().domain([-maxAbsGd, maxAbsGd]).range([height - margin.bottom, margin.top + 36]);
  const line = d3
    .line<GoalDiffPoint>()
    .x((d) => x(d.round))
    .y((d) => y(d.gd))
    .curve(d3.curveLinear);

  drawGrid(svg, x, y, width, height, margin, yTicks);
  svg
    .append("line")
    .attr("x1", margin.left)
    .attr("x2", width - margin.right)
    .attr("y1", y(0))
    .attr("y2", y(0))
    .attr("stroke", BLUE)
    .attr("stroke-width", 2.5)
    .attr("stroke-opacity", 0.9);

  svg
    .append("g")
    .attr("class", "context-goal-diff")
    .selectAll("path")
    .data(contextSeries)
    .join("path")
    .attr("fill", "none")
    .attr("stroke", "rgba(255,255,255,0.2)")
    .attr("stroke-width", 1.15)
    .attr("d", line);

  svg
    .append("g")
    .attr("class", "extreme-goal-diff")
    .selectAll("path")
    .data([bestSeries, worstSeries].filter((values): values is GoalDiffPoint[] => Boolean(values)))
    .join("path")
    .attr("fill", "none")
    .attr("stroke", (values) => (values[values.length - 1].gd >= 0 ? "#febe10" : WARN))
    .attr("stroke-width", 2.8)
    .attr("stroke-opacity", 0.95)
    .attr("d", line);

  svg
    .append("g")
    .attr("class", "depor-goal-diff")
    .selectAll("path")
    .data(deporSeries)
    .join("path")
    .attr("fill", "none")
    .attr("stroke", (values) => (values[0]?.season === "1999-00" ? BLUE : "rgba(255,255,255,0.76)"))
    .attr("stroke-width", (values) => (values[0]?.season === "1999-00" ? 4.4 : 2.2))
    .attr("stroke-opacity", (values) => (values[0]?.season === "1999-00" ? 1 : 0.72))
    .attr("d", line);

  const deporPoints = points.filter((point) => point.is_depor && point.round > 0);
  bindTooltip(
    svg
      .selectAll("circle.goal-diff-hit")
      .data(deporPoints)
      .join("circle")
      .attr("class", "tooltip-hit goal-diff-hit")
      .attr("cx", (d) => x(d.round))
      .attr("cy", (d) => y(d.gd))
      .attr("r", 9),
    tooltip,
    (d) => ({
      title: `${d.season} · ${currentCopy.common.round} ${d.round}`,
      body: `${venueLabel(d.venue)} ${currentCopy.common.against} ${displayTeam(d.opponent)}. ${currentCopy.common.goalFor} ${d.gf}, ${currentCopy.common.goalAgainst} ${d.ga}, ${currentCopy.common.goalDiff} ${signed(d.gd)}.`,
    }),
  );

  for (const season of ["1999-00", "2017-18", "2025-26"]) {
    const values = deporSeries.find((row) => row[0]?.season === season);
    const last = values?.[values.length - 1];
    if (!last) continue;
    const labelY = season === "1999-00" ? y(last.gd) - 54 : season === "2025-26" ? y(last.gd) + 14 : y(last.gd) - 18;
    const box = label(svg, x(last.round) - 162, labelY, season, `Dépor: ${signed(last.gd)} ${currentCopy.common.goalDiff}`);
    labelLeader(svg, x(last.round), y(last.gd), box, BLUE);
  }

  if (bestSeries) {
    const last = bestSeries[bestSeries.length - 1];
    const box = label(
      svg,
      x(last.round) - 168,
      y(last.gd) + 14,
      currentCopy.charts.goalDiff.bestLine,
      `${displayTeam(last.team)} ${last.season}: ${signed(last.gd)} ${currentCopy.common.goalDiff}`,
    );
    labelLeader(svg, x(last.round), y(last.gd), box, "#febe10");
  }
  if (worstSeries) {
    const last = worstSeries[worstSeries.length - 1];
    const box = label(
      svg,
      x(last.round) - 168,
      y(last.gd) - 44,
      currentCopy.charts.goalDiff.worstLine,
      `${displayTeam(last.team)} ${last.season}: ${signed(last.gd)} ${currentCopy.common.goalDiff}`,
    );
    labelLeader(svg, x(last.round), y(last.gd), box, WARN);
  }

  svg
    .append("text")
    .attr("x", margin.left)
    .attr("y", 60)
    .attr("class", "context-label")
    .attr("fill", "rgba(255,255,255,0.82)")
    .text(currentCopy.charts.goalDiff.contextLabel);
  chartTitle(svg, margin.left, 34, currentCopy.charts.goalDiff.title);
  axisLabel(svg, width - margin.right, height - 12, currentCopy.common.round);
  axisLabel(svg, 18, margin.top + 18, currentCopy.common.goalDiff);
}

function drawTitlePath(element: HTMLElement, data: StoryData) {
  const { svg, tooltip, width, height } = baseSvg(element);
  const margin = responsiveMargin(width);
  const points = data.title_path;
  const x = d3.scaleLinear().domain([1, 38]).range([margin.left, width - margin.right]);
  const y = d3.scaleLinear().domain([0, 72]).range([height - margin.bottom, margin.top]);
  const line = d3
    .line<TitlePoint>()
    .x((d) => x(d.round))
    .y((d) => y(d.points))
    .curve(d3.curveStepAfter);

  drawGrid(svg, x, y, width, height, margin, [0, 15, 30, 45, 60, 69]);
  const contextTeams = d3.group(
    data.title_race.filter((point) => point.team !== "La Coruna"),
    (point) => point.team,
  );
  for (const [team, values] of contextTeams) {
    svg
      .append("path")
      .datum(values)
      .attr("fill", "none")
      .attr("stroke", values[0]?.color ?? "rgba(255,255,255,0.4)")
      .attr("stroke-width", 2.5)
      .attr("stroke-opacity", 0.52)
      .attr(
        "d",
        d3
          .line<TitleRacePoint>()
          .x((d) => x(d.round))
          .y((d) => y(d.points))
          .curve(d3.curveStepAfter),
      );
  }
  svg
    .append("path")
    .datum(points)
    .attr("fill", "none")
    .attr("stroke", BLUE)
    .attr("stroke-width", 5)
    .attr("d", line);
  svg
    .selectAll("circle")
    .data(points)
    .join("circle")
    .attr("cx", (d) => x(d.round))
    .attr("cy", (d) => y(d.points))
    .attr("r", (d) => (d.result === "W" ? 4.5 : 3))
    .attr("fill", (d) => (d.result === "L" ? WARN : d.result === "D" ? LOW_BLUE : BLUE))
    .attr("stroke", DARK)
    .attr("stroke-width", 1.5);
  bindTooltip(
    svg
      .selectAll("circle.title-hit")
      .data(points)
      .join("circle")
      .attr("class", "tooltip-hit title-hit")
      .attr("cx", (d) => x(d.round))
      .attr("cy", (d) => y(d.points))
      .attr("r", 15),
    tooltip,
    (d) => ({
      title: `${formatDate(d.date)} · ${currentCopy.common.round} ${d.round}`,
      body: `${venueLabel(d.venue)}: Dépor ${d.gf}-${d.ga} ${displayTeam(d.opponent)}. ${resultLabel(d.result)}, ${d.points} ${currentCopy.common.points}.`,
    }),
  );

  const last = points[points.length - 1];
  if (last) {
    label(
      svg,
      x(last.round) - 170,
      y(last.points) - 52,
      currentCopy.charts.titlePath.finalTitle,
      currentCopy.charts.titlePath.finalBody,
    );
    svg
      .append("line")
      .attr("class", "fixed-label")
      .attr("x1", x(last.round))
      .attr("x2", x(last.round))
      .attr("y1", y(last.points))
      .attr("y2", y(last.points) - 35)
      .attr("stroke", DARK)
      .attr("stroke-width", 2);
  }

  chartTitle(svg, margin.left, 34, currentCopy.charts.titlePath.title);
  chartLegend(
    svg,
    [...contextTeams].map(([team, values]) => ({ label: displayTeam(team), color: values[0]?.color ?? BLUE })),
    margin.left,
    54,
    width - margin.left - margin.right,
  );
  axisLabel(svg, width - margin.right, height - 12, currentCopy.common.round);
  axisLabel(svg, 18, margin.top, currentCopy.common.points);
}

function drawFinishTimeline(element: HTMLElement, data: StoryData) {
  const { svg, tooltip, width, height } = baseSvg(element);
  const margin = responsiveMargin(width);
  const seasons = data.seasons.filter((season) => season.season_start >= 1990 && season.season_start <= 2005);
  const x = d3
    .scaleLinear()
    .domain(d3.extent(seasons, (d) => d.season_start) as [number, number])
    .range([margin.left, width - margin.right]);
  const y = d3.scaleLinear().domain([20, 1]).range([height - margin.bottom, margin.top + 24]);

  drawGrid(svg, x, y, width, height, margin, [1, 5, 10, 15, 20]);
  svg
    .append("path")
    .datum(seasons)
    .attr("fill", "none")
    .attr("stroke", DARK)
    .attr("stroke-width", 3)
    .attr(
      "d",
      d3
        .line<Season>()
        .x((d) => x(d.season_start))
        .y((d) => y(d.finish))
        .curve(d3.curveMonotoneX),
    );
  svg
    .selectAll("circle")
    .data(seasons)
    .join("circle")
    .attr("cx", (d) => x(d.season_start))
    .attr("cy", (d) => y(d.finish))
    .attr("r", (d) => (d.finish <= 3 ? 8 : 5))
    .attr("fill", (d) => (d.season === "1999-00" ? BLUE : d.finish <= 3 ? LOW_BLUE : DARK))
    .attr("stroke", BLUE)
    .attr("stroke-width", 2);
  bindTooltip(
    svg
      .selectAll("circle.finish-hit")
      .data(seasons)
      .join("circle")
      .attr("class", "tooltip-hit finish-hit")
      .attr("cx", (d) => x(d.season_start))
      .attr("cy", (d) => y(d.finish))
      .attr("r", 15),
    tooltip,
    (d) => ({
      title: `${d.season} · ${d.finish}º`,
      body: `${divisionLabel(d.division)}: ${d.points} ${currentCopy.common.points}, ${d.wins}-${d.draws}-${d.losses}, ${currentCopy.common.goalDiff} ${signed(d.gd)}.`,
    }),
  );

  for (const season of seasons.filter((d) => ["1991-92", "1992-93", "1999-00", "2003-04"].includes(d.season))) {
    label(svg, x(season.season_start) - 42, y(season.finish) - 62, season.season, `${season.finish}º`);
  }

  chartTitle(svg, margin.left, 34, currentCopy.charts.finish.title);
  axisLabel(svg, 18, margin.top + 16, currentCopy.common.position);
}

function drawPpgDrift(element: HTMLElement, data: StoryData) {
  const { svg, tooltip, width, height } = baseSvg(element);
  const margin = { ...responsiveMargin(width), bottom: width < 560 ? 74 : 66 };
  const seasons = data.seasons.filter((season) => season.season_start >= 1999);
  const ppgContext = data.ppg_context.filter((point) => point.season_start >= 1999);
  const x = d3
    .scaleLinear()
    .domain(d3.extent(seasons, (d) => d.season_start) as [number, number])
    .range([margin.left, width - margin.right]);
  const maxPpg = Math.max(
    d3.max(seasons, (d) => d.ppg) ?? 2,
    d3.max(ppgContext, (d) => d.leader_ppg) ?? 2,
  );
  const y = d3.scaleLinear().domain([0.7, Math.max(2.15, maxPpg + 0.1)]).range([height - margin.bottom, margin.top]);
  const bar = d3.scaleLinear().domain([-0.75, 1]).range([height - margin.bottom, margin.top]);
  const ppgContextSegments = splitPpgContext(ppgContext);

  drawSeasonBands(svg, seasons, x, width, height, margin);
  drawGrid(svg, x, y, width, height, margin, [1, 1.25, 1.5, 1.75, 2]);
  for (const segment of ppgContextSegments) {
    svg
      .append("path")
      .datum(segment)
      .attr("fill", "none")
      .attr("stroke", "#febe10")
      .attr("stroke-width", 2.5)
      .attr("stroke-opacity", 0.55)
      .attr(
        "d",
        d3
          .line<PpgContextPoint>()
          .x((d) => x(d.season_start))
          .y((d) => y(d.leader_ppg))
          .curve(d3.curveMonotoneX),
      );
    svg
      .append("path")
      .datum(segment)
      .attr("fill", "none")
      .attr("stroke", "rgba(255,255,255,0.45)")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "7 7")
      .attr(
        "d",
        d3
          .line<PpgContextPoint>()
          .x((d) => x(d.season_start))
          .y((d) => y(d.median_ppg))
          .curve(d3.curveMonotoneX),
      );
  }
  const lastPpgContext = ppgContext[ppgContext.length - 1];
  if (lastPpgContext) {
    svg
      .append("text")
      .attr("x", x(lastPpgContext.season_start) - 108)
      .attr("y", y(lastPpgContext.leader_ppg) - 12)
      .attr("class", "context-label")
      .attr("fill", "#febe10")
      .text(currentCopy.charts.ppg.leader);
    svg
      .append("text")
      .attr("x", x(lastPpgContext.season_start) - 90)
      .attr("y", y(lastPpgContext.median_ppg) + 18)
      .attr("class", "context-label")
      .attr("fill", "rgba(255,255,255,0.72)")
      .text(currentCopy.charts.ppg.median);
  }
  svg
    .selectAll("rect.gd")
    .data(seasons)
    .join("rect")
    .attr("class", "gd")
    .attr("x", (d) => x(d.season_start) - 4)
    .attr("y", (d) => Math.min(bar(0), bar(d.gd_per_match)))
    .attr("width", 8)
    .attr("height", (d) => Math.abs(bar(0) - bar(d.gd_per_match)))
    .attr("fill", (d) => (d.gd_per_match >= 0 ? "rgba(255,255,255,0.28)" : "rgba(255,98,79,0.72)"));
  svg
    .append("path")
    .datum(seasons)
    .attr("fill", "none")
    .attr("stroke", DARK)
    .attr("stroke-width", 4)
    .attr(
      "d",
      d3
        .line<Season>()
        .x((d) => x(d.season_start))
        .y((d) => y(d.ppg))
        .curve(d3.curveMonotoneX),
    );
  svg
    .selectAll("circle")
    .data(seasons)
    .join("circle")
    .attr("cx", (d) => x(d.season_start))
    .attr("cy", (d) => y(d.ppg))
    .attr("r", 4)
    .attr("fill", (d) => (d.tier === 3 ? WARN : BLUE))
    .attr("stroke", DARK);
  bindTooltip(
    svg
      .selectAll("circle.ppg-hit")
      .data(seasons)
      .join("circle")
      .attr("class", "tooltip-hit ppg-hit")
      .attr("cx", (d) => x(d.season_start))
      .attr("cy", (d) => y(d.ppg))
      .attr("r", 15),
    tooltip,
    (d) => ({
      title: `${d.season} · ${divisionLabel(d.division)}`,
      body: `${formatDecimal(d.ppg)} ${currentCopy.common.pointsPerGame}; ${formatDecimal(d.gd_per_match)} ${currentCopy.common.goalsPerGame}.`,
    }),
  );

  label(svg, x(1999) - 12, y(1.816) - 76, "2000", currentCopy.charts.ppg.label2000);
  label(svg, x(2019) - 80, y(1.214) + 36, "2020", currentCopy.charts.ppg.label2020);
  drawSeasonTicks(svg, seasons, x, height - margin.bottom + 30, width < 560);
  chartTitle(svg, margin.left, 34, currentCopy.charts.ppg.title);
  axisLabel(svg, 18, margin.top + 16, "PPG");
}

function drawTierAltitude(element: HTMLElement, data: StoryData) {
  const { svg, tooltip, width, height } = baseSvg(element);
  const margin = responsiveMargin(width);
  const seasons = data.seasons.filter((season) => season.season_start >= 1990);
  const x = d3
    .scaleLinear()
    .domain(d3.extent(seasons, (d) => d.season_start) as [number, number])
    .range([margin.left, width - margin.right]);
  const y = d3.scalePoint<number>().domain([1, 2, 3]).range([margin.top + 18, height - margin.bottom]).padding(0.35);

  for (const tier of [1, 2, 3]) {
    const yValue = y(tier) ?? 0;
    svg
      .append("rect")
      .attr("x", margin.left)
      .attr("y", yValue - 42)
      .attr("width", width - margin.left - margin.right)
      .attr("height", 84)
      .attr("fill", tier === 1 ? MID_BLUE : tier === 2 ? "#005ab0" : LOW_BLUE)
      .attr("stroke", DARK)
      .attr("stroke-width", 1);
    svg
      .append("text")
      .attr("x", 18)
      .attr("y", yValue + 5)
      .attr("class", "axis-text")
      .text(tierLabel(tier));
  }

  svg
    .append("path")
    .datum(seasons)
    .attr("fill", "none")
    .attr("stroke", BLUE)
    .attr("stroke-width", 6)
    .attr(
      "d",
      d3
        .line<Season>()
        .x((d) => x(d.season_start))
        .y((d) => y(d.tier) ?? 0)
        .curve(d3.curveStepAfter),
    );
  svg
    .selectAll("circle")
    .data(seasons)
    .join("circle")
    .attr("cx", (d) => x(d.season_start))
    .attr("cy", (d) => y(d.tier) ?? 0)
    .attr("r", (d) => (d.state.includes("Ascenso") || d.state.includes("Descenso") ? 7 : 4))
    .attr("fill", (d) => (d.tier === 3 ? WARN : d.season === "2025-26" ? LOW_BLUE : BLUE))
    .attr("stroke", DARK)
    .attr("stroke-width", 2);
  bindTooltip(
    svg
      .selectAll("circle.tier-hit")
      .data(seasons)
      .join("circle")
      .attr("class", "tooltip-hit tier-hit")
      .attr("cx", (d) => x(d.season_start))
      .attr("cy", (d) => y(d.tier) ?? 0)
      .attr("r", 15),
    tooltip,
    (d) => ({
      title: `${d.season} · ${divisionLabel(d.division)}`,
      body: `${d.finish}º, ${d.points} ${currentCopy.common.points}. ${stateLabel(d.state) || currentCopy.common.noDramaSeason}`,
    }),
  );

  label(svg, x(1999) - 30, (y(1) ?? 0) - 72, "2000", currentCopy.charts.tier.label2000);
  label(svg, x(2020) - 70, (y(3) ?? 0) + 34, "2020-24", currentCopy.charts.tier.label2020);
  label(svg, x(2025) - 118, (y(2) ?? 0) - 74, "2026", currentCopy.charts.tier.label2026);
  chartTitle(svg, margin.left, 34, currentCopy.charts.tier.title);
}

function drawOpponentWall(element: HTMLElement, data: StoryData) {
  const { svg, tooltip, width, height } = baseSvg(element);
  void data;
  const margin = {
    top: 74,
    right: width < 620 ? 24 : 42,
    bottom: 58,
    left: width < 620 ? 32 : 56,
  };
  const centerY = height * 0.5 + 8;
  const earlyX = d3.scaleLinear().domain([1993.4, 2004.4]).range([margin.left, width * 0.56]);
  const lateX = d3.scaleLinear().domain([2020.86, 2021.42]).range([width * 0.72, width - margin.right]);
  const x = (year: number) => (year < 2010 ? earlyX(year) : lateX(year));
  const y = d3
    .scaleLinear()
    .domain([-4.8, 4.8])
    .range([height - margin.bottom, margin.top + 44]);
  const cardWidth = width < 620 ? 122 : 148;
  const cardHeight = 54;
  const moments = OPPONENT_MOMENTS;
  const yearTicks = [
    { year: 1994, label: "1994" },
    { year: 2000, label: "2000" },
    { year: 2004, label: "2004" },
    { year: 2020.86, label: "2020" },
    { year: 2021.42, label: "2021" },
  ];

  chartTitle(svg, margin.left, 34, currentCopy.charts.opponents.title);
  svg
    .append("rect")
    .attr("x", margin.left)
    .attr("y", margin.top + 34)
    .attr("width", width - margin.left - margin.right)
    .attr("height", centerY - margin.top - 34)
    .attr("fill", "rgba(255,255,255,0.045)");
  svg
    .append("rect")
    .attr("x", margin.left)
    .attr("y", centerY)
    .attr("width", width - margin.left - margin.right)
    .attr("height", height - margin.bottom - centerY)
    .attr("fill", "rgba(255,98,79,0.055)");
  svg
    .selectAll("line.opponent-year")
    .data(yearTicks)
    .join("line")
    .attr("class", "opponent-year")
    .attr("x1", (d) => x(d.year))
    .attr("x2", (d) => x(d.year))
    .attr("y1", margin.top + 34)
    .attr("y2", height - margin.bottom)
    .attr("stroke", "rgba(255,255,255,0.18)")
    .attr("stroke-width", 1);
  svg
    .selectAll("text.opponent-year")
    .data(yearTicks)
    .join("text")
    .attr("class", "axis-text opponent-year")
    .attr("x", (d) => x(d.year))
    .attr("y", height - 22)
    .attr("text-anchor", "middle")
    .text((d) => d.label);
  svg
    .append("line")
    .attr("x1", margin.left)
    .attr("x2", width - margin.right)
    .attr("y1", centerY)
    .attr("y2", centerY)
    .attr("stroke", DARK)
    .attr("stroke-width", 3)
    .attr("stroke-dasharray", "10 8");
  svg
    .append("text")
    .attr("x", margin.left + 6)
    .attr("y", margin.top + 20)
    .attr("class", "context-label")
    .attr("fill", BLUE)
    .text(currentCopy.charts.opponents.high);
  svg
    .append("text")
    .attr("x", margin.left + 6)
    .attr("y", centerY + 28)
    .attr("class", "context-label")
    .attr("fill", WARN)
    .text(currentCopy.charts.opponents.low);
  svg
    .append("text")
    .attr("x", width - margin.right)
    .attr("y", centerY - 10)
    .attr("class", "context-label")
    .attr("fill", "rgba(255,255,255,0.84)")
    .attr("text-anchor", "end")
    .text(currentCopy.charts.opponents.center);

  svg
    .selectAll("line.opponent-drop")
    .data(moments)
    .join("line")
    .attr("class", "opponent-drop")
    .attr("x1", (d) => x(d.year))
    .attr("x2", (d) => x(d.year))
    .attr("y1", centerY)
    .attr("y2", (d) => y(d.polarity === "high" ? d.impact : -d.impact))
    .attr("stroke", (d) => (d.polarity === "high" ? "rgba(255,255,255,0.52)" : "rgba(255,98,79,0.58)"))
    .attr("stroke-width", 2);
  const dots = svg
    .selectAll("circle.opponent-dot")
    .data(moments)
    .join("circle")
    .attr("class", "opponent-dot")
    .attr("cx", (d) => x(d.year))
    .attr("cy", (d) => y(d.polarity === "high" ? d.impact : -d.impact))
    .attr("r", (d) => 7 + d.impact)
    .attr("fill", (d) => (d.polarity === "high" ? BLUE : WARN))
    .attr("stroke", LOW_BLUE)
    .attr("stroke-width", 2);
  bindTooltip(dots, tooltip, opponentTooltip);

  for (const moment of moments) {
    const pointX = x(moment.year);
    const pointY = y(moment.polarity === "high" ? moment.impact : -moment.impact);
    const cardX = clamp(pointX + moment.labelDx, margin.left, width - margin.right - cardWidth);
    const cardY = clamp(pointY + moment.labelDy, margin.top + 42, height - margin.bottom - cardHeight - 8);
    drawOpponentMomentCard(svg, tooltip, moment, cardX, cardY, cardWidth, cardHeight, pointX, pointY);
  }
}

function drawAttendance(element: HTMLElement, data: StoryData) {
  const { svg, tooltip, width, height } = baseSvg(element);
  const margin = responsiveMargin(width);
  const rows = data.attendance_callouts;
  const x = d3
    .scaleBand()
    .domain(rows.map((d) => d.season))
    .range([margin.left, width - margin.right])
    .padding(0.2);
  const y = d3
    .scaleLinear()
    .domain([0, d3.max(rows, (d) => d.attendance) ?? 25000])
    .nice()
    .range([height - margin.bottom, margin.top + 22]);

  drawGrid(svg, undefined, y, width, height, margin, [0, 10000, 20000]);
  const bars = svg
    .selectAll("rect")
    .data(rows)
    .join("rect")
    .attr("x", (d) => x(d.season) ?? 0)
    .attr("y", (d) => y(d.attendance))
    .attr("width", x.bandwidth())
    .attr("height", (d) => y(0) - y(d.attendance))
    .attr("fill", BLUE)
    .attr("stroke", DARK)
    .attr("stroke-width", 2);
  bindTooltip(bars, tooltip, (d) => ({
    title: `Riazor · ${d.season}`,
    body: `${formatNumber(d.attendance)} ${currentCopy.common.averageApprox} ${attendanceLabel(d)}. ${currentCopy.common.source}: ${attendanceSource(d)}.`,
  }));
  svg
    .selectAll("text.bar-label")
    .data(rows)
    .join("text")
    .attr("class", "bar-label")
    .attr("x", (d) => (x(d.season) ?? 0) + x.bandwidth() / 2)
    .attr("y", (d) => y(d.attendance) - 12)
    .attr("text-anchor", "middle")
    .text((d) => formatNumber(d.attendance));
  svg
    .selectAll("text.season-label")
    .data(rows)
    .join("text")
    .attr("class", "axis-text")
    .attr("x", (d) => (x(d.season) ?? 0) + x.bandwidth() / 2)
    .attr("y", height - 18)
    .attr("text-anchor", "middle")
    .text((d) => d.season);

  label(
    svg,
    margin.left,
    margin.top + 12,
    currentCopy.charts.attendance.labelTitle,
    currentCopy.charts.attendance.labelBody,
  );
  chartTitle(svg, margin.left, 34, currentCopy.charts.attendance.title);
}

function drawPromotionRace(element: HTMLElement, data: StoryData) {
  const { svg, tooltip, width, height } = baseSvg(element);
  const margin = responsiveMargin(width);
  const rows = data.promotion_table;
  const x = d3
    .scaleLinear()
    .domain([0, d3.max(rows, (d) => d.points) ?? 80])
    .nice()
    .range([margin.left + 80, width - margin.right]);
  const y = d3
    .scaleBand()
    .domain(rows.map((d) => displayTeam(d.team)))
    .range([margin.top + 32, height - margin.bottom])
    .padding(0.18);

  svg
    .selectAll("line.grid")
    .data(x.ticks(5))
    .join("line")
    .attr("class", "grid")
    .attr("x1", (d) => x(d))
    .attr("x2", (d) => x(d))
    .attr("y1", margin.top + 20)
    .attr("y2", height - margin.bottom)
    .attr("stroke", GRID);
  const bars = svg
    .selectAll("rect")
    .data(rows)
    .join("rect")
    .attr("x", x(0))
    .attr("y", (d) => y(displayTeam(d.team)) ?? 0)
    .attr("width", (d) => x(d.points) - x(0))
    .attr("height", y.bandwidth())
    .attr("fill", (d) => (d.team === "La Coruna" ? BLUE : "rgba(255,255,255,0.1)"))
    .attr("stroke", DARK)
    .attr("stroke-width", 2);
  bindTooltip(bars, tooltip, (d) => ({
    title: `${d.finish}. ${displayTeam(d.team)}`,
    body: `${d.points} ${currentCopy.common.points} ${currentCopy.common.in} ${d.matches} ${currentCopy.common.matches}; ${d.wins}-${d.draws}-${d.losses}, ${currentCopy.common.goalDiff} ${signed(d.gd)}.`,
  }));
  svg
    .selectAll("text.team")
    .data(rows)
    .join("text")
    .attr("class", "axis-text")
    .attr("x", margin.left)
    .attr("y", (d) => (y(displayTeam(d.team)) ?? 0) + y.bandwidth() / 2 + 5)
    .text((d) => `${d.finish}. ${displayTeam(d.team)}`);
  svg
    .selectAll("text.points")
    .data(rows)
    .join("text")
    .attr("class", "bar-label")
    .attr("x", (d) => x(d.points) + 10)
    .attr("y", (d) => (y(displayTeam(d.team)) ?? 0) + y.bandwidth() / 2 + 5)
    .text((d) => `${d.points}`);

  chartTitle(svg, margin.left, 34, currentCopy.charts.promotion.title);
  label(
    svg,
    x(74) - 82,
    (y("Dépor") ?? margin.top) - 58,
    currentCopy.charts.promotion.labelTitle,
    currentCopy.charts.promotion.labelBody,
  );
}

function drawGrid(
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  x: d3.ScaleLinear<number, number> | undefined,
  y: d3.ScaleLinear<number, number>,
  width: number,
  height: number,
  margin: { top: number; right: number; bottom: number; left: number },
  yTicks: number[],
) {
  svg
    .selectAll("line.y-grid")
    .data(yTicks)
    .join("line")
    .attr("class", "y-grid")
    .attr("x1", margin.left)
    .attr("x2", width - margin.right)
    .attr("y1", (d) => y(d))
    .attr("y2", (d) => y(d))
    .attr("stroke", GRID)
    .attr("stroke-width", 1);
  svg
    .selectAll("text.y-tick")
    .data(yTicks)
    .join("text")
    .attr("class", "axis-text")
    .attr("x", margin.left - 12)
    .attr("y", (d) => y(d) + 4)
    .attr("text-anchor", "end")
    .text((d) => d);
  if (x) {
    svg
      .selectAll("line.x-grid")
      .data(x.ticks(6))
      .join("line")
      .attr("class", "x-grid")
      .attr("x1", (d) => x(d))
      .attr("x2", (d) => x(d))
    .attr("y1", margin.top)
    .attr("y2", height - margin.bottom)
    .attr("stroke", "rgba(255,255,255,0.13)")
      .attr("stroke-width", 1);
  }
}

function drawOpponentMomentCard(
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  tooltip: TooltipSelection,
  moment: OpponentMoment,
  x: number,
  y: number,
  width: number,
  height: number,
  pointX: number,
  pointY: number,
) {
  const color = moment.polarity === "high" ? BLUE : WARN;
  const card = { x, y, width, height };
  const target = nearestLabelEdgePoint(pointX, pointY, card);
  svg
    .append("line")
    .attr("class", "fixed-label")
    .attr("x1", pointX)
    .attr("y1", pointY)
    .attr("x2", target.x)
    .attr("y2", target.y)
    .attr("stroke", color)
    .attr("stroke-width", 2)
    .attr("stroke-opacity", 0.78);

  const group = svg
    .append("g")
    .datum(moment)
    .attr("class", "fixed-label opponent-card")
    .attr("transform", `translate(${x},${y})`);
  group
    .append("rect")
    .attr("width", width)
    .attr("height", height)
    .attr("fill", LOW_BLUE)
    .attr("stroke", color)
    .attr("stroke-width", 2.5);
  group
    .append("text")
    .attr("x", 10)
    .attr("y", 21)
    .attr("class", "opponent-score")
    .attr("fill", color)
    .text(moment.score);
  group
    .append("text")
    .attr("x", 10)
    .attr("y", 39)
    .attr("class", "opponent-name")
    .attr("font-size", Math.max(10, Math.min(13, width / (moment.opponent.length * 0.64))))
    .text(moment.opponent);
  group
    .append("text")
    .attr("x", 10)
    .attr("y", height - 8)
    .attr("class", "label-body")
    .text(`${moment.season} · ${moment.competition}`);
  bindTooltip(group, tooltip, opponentTooltip);
}

function opponentTooltip(moment: OpponentMoment) {
  return {
    title: `${moment.season} · Dépor ${moment.score} ${moment.opponent}`,
    body: `${moment.venue}. ${moment.competition}. ${currentCopy.common.source}: ${moment.source}.`,
  };
}

function bindTooltip<TDatum>(
  selection: d3.Selection<any, TDatum, any, any>,
  tooltip: TooltipSelection,
  content: (datum: TDatum) => TooltipContent,
) {
  selection
    .classed("tooltip-target", true)
    .attr("tabindex", 0)
    .on("pointerenter", (event: PointerEvent, datum) => showTooltip(tooltip, event, content(datum)))
    .on("pointermove", (event: PointerEvent, datum) => showTooltip(tooltip, event, content(datum)))
    .on("pointerdown", (event: PointerEvent, datum) => {
      event.preventDefault();
      event.stopPropagation();
      showTooltip(tooltip, event, content(datum));
    })
    .on("pointerleave", (event: PointerEvent) => {
      if (event.pointerType !== "touch") {
        hideTooltip(tooltip);
      }
    })
    .on("blur", () => hideTooltip(tooltip));
}

function showTooltip(tooltip: TooltipSelection, event: PointerEvent, content: TooltipContent) {
  const node = tooltip.node();
  const parent = node?.parentElement;
  if (!node || !parent) return;

  node.innerHTML = "";
  const title = document.createElement("div");
  title.className = "floating-tooltip-title";
  title.textContent = content.title;
  const body = document.createElement("div");
  body.className = "floating-tooltip-body";
  body.textContent = content.body;
  node.append(title, body);

  const parentRect = parent.getBoundingClientRect();
  node.classList.add("is-visible");
  node.setAttribute("aria-hidden", "false");
  parent.classList.add("tooltip-active");

  const offset = event.pointerType === "touch" ? 18 : 14;
  let left = event.clientX - parentRect.left + offset;
  let top = event.clientY - parentRect.top + offset;
  const maxLeft = parentRect.width - node.offsetWidth - 8;
  const maxTop = parentRect.height - node.offsetHeight - 8;

  if (left > maxLeft) left = event.clientX - parentRect.left - node.offsetWidth - offset;
  if (top > maxTop) top = event.clientY - parentRect.top - node.offsetHeight - offset;

  node.style.left = `${Math.max(8, Math.min(left, maxLeft))}px`;
  node.style.top = `${Math.max(8, Math.min(top, maxTop))}px`;
}

function hideTooltip(tooltip: TooltipSelection) {
  tooltip.node()?.parentElement?.classList.remove("tooltip-active");
  tooltip.classed("is-visible", false).attr("aria-hidden", "true");
}

function chartTitle(svg: d3.Selection<SVGSVGElement, unknown, null, undefined>, x: number, y: number, text: string) {
  svg.append("text").attr("x", x).attr("y", y).attr("class", "chart-title").text(text);
}

function splitPpgContext(points: PpgContextPoint[]) {
  const sorted = [...points].sort((a, b) => a.season_start - b.season_start);
  const segments: PpgContextPoint[][] = [];
  for (const point of sorted) {
    const current = segments[segments.length - 1];
    const previous = current?.[current.length - 1];
    if (!current || !previous || point.season_start > previous.season_start + 1) {
      segments.push([point]);
    } else {
      current.push(point);
    }
  }
  return segments;
}

function drawSeasonBands(
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  seasons: Season[],
  x: d3.ScaleLinear<number, number>,
  width: number,
  height: number,
  margin: { top: number; right: number; bottom: number; left: number },
) {
  const bands = seasons.map((season, index) => {
    const previous = seasons[index - 1];
    const next = seasons[index + 1];
    const x0 = previous ? (x(previous.season_start) + x(season.season_start)) / 2 : margin.left;
    const x1 = next ? (x(season.season_start) + x(next.season_start)) / 2 : width - margin.right;
    return { season, x0, x1, shaded: index % 2 === 0 };
  });

  svg
    .selectAll("rect.season-band")
    .data(bands.filter((band) => band.shaded))
    .join("rect")
    .attr("class", "season-band")
    .attr("x", (d) => d.x0)
    .attr("y", margin.top)
    .attr("width", (d) => d.x1 - d.x0)
    .attr("height", height - margin.top - margin.bottom)
    .attr("fill", "rgba(255,255,255,0.065)");
}

function drawSeasonTicks(
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  seasons: Season[],
  x: d3.ScaleLinear<number, number>,
  y: number,
  compact: boolean,
) {
  const firstSeason = seasons[0]?.season_start;
  const lastSeason = seasons[seasons.length - 1]?.season_start;
  const cadence = compact ? 10 : 5;
  const ticks = seasons.filter(
    (season) =>
      season.season_start === firstSeason ||
      season.season_start === lastSeason ||
      (firstSeason !== undefined && season.season_start >= firstSeason + cadence && season.season_start % cadence === 0),
  );

  svg
    .selectAll("text.season-tick")
    .data(ticks)
    .join("text")
    .attr("class", "axis-text season-tick")
    .attr("x", (d) => x(d.season_start))
    .attr("y", y)
    .attr("text-anchor", "middle")
    .text((d) => d.season);
}

function chartLegend(
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  items: LegendItem[],
  x: number,
  y: number,
  maxWidth: number,
) {
  const group = svg.append("g").attr("class", "chart-legend").attr("transform", `translate(${x},${y})`);
  let cursor = 0;
  let row = 0;
  const rowHeight = 17;
  for (const item of items) {
    const entryWidth = Math.max(96, item.label.length * 8 + 44);
    if (cursor > 0 && cursor + entryWidth > maxWidth) {
      cursor = 0;
      row += rowHeight;
    }
    const entry = group.append("g").attr("transform", `translate(${cursor},${row})`);
    entry
      .append("line")
      .attr("x1", 0)
      .attr("x2", 22)
      .attr("y1", 0)
      .attr("y2", 0)
      .attr("stroke", item.color)
      .attr("stroke-width", 3);
    entry.append("text").attr("x", 28).attr("y", 4).attr("class", "context-label").attr("fill", item.color).text(item.label);
    cursor += entryWidth;
  }
}

function axisLabel(svg: d3.Selection<SVGSVGElement, unknown, null, undefined>, x: number, y: number, text: string) {
  svg
    .append("text")
    .attr("x", x)
    .attr("y", y)
    .attr("class", "axis-text")
    .attr("text-anchor", x <= 24 ? "start" : "end")
    .text(text);
}

function label(
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  x: number,
  y: number,
  title: string,
  body: string,
): LabelBox {
  const labelWidth = 168;
  const bodyLines = wrapLabelText(body);
  const height = 34 + bodyLines.length * 14;
  const viewBox = svg.attr("viewBox")?.split(/\s+/).map(Number) ?? [];
  const svgWidth = viewBox[2] || labelWidth + 36;
  const svgHeight = viewBox[3] || height + 74;
  const translateX = Math.max(18, Math.min(x, svgWidth - labelWidth - 18));
  const translateY = Math.max(56, Math.min(y, svgHeight - height - 18));
  const group = svg
    .append("g")
    .attr("class", "fixed-label")
    .attr("transform", `translate(${translateX},${translateY})`);
  group
    .append("rect")
    .attr("width", labelWidth)
    .attr("height", height)
    .attr("fill", LOW_BLUE)
    .attr("stroke", DARK)
    .attr("stroke-width", 2);
  group.append("text").attr("x", 10).attr("y", 19).attr("class", "label-title").text(title);
  const bodyText = group.append("text").attr("x", 10).attr("y", 38).attr("class", "label-body");
  bodyLines.forEach((line, index) => {
    bodyText.append("tspan").attr("x", 10).attr("dy", index === 0 ? 0 : 14).text(line);
  });
  return { x: translateX, y: translateY, width: labelWidth, height };
}

function labelLeader(
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  anchorX: number,
  anchorY: number,
  box: LabelBox,
  color: string,
) {
  const target = nearestLabelEdgePoint(anchorX, anchorY, box);
  const group = svg.insert("g", ".fixed-label").attr("class", "fixed-label label-leader");
  group
    .append("line")
    .attr("x1", anchorX)
    .attr("y1", anchorY)
    .attr("x2", target.x)
    .attr("y2", target.y)
    .attr("stroke", color)
    .attr("stroke-width", 2.2)
    .attr("stroke-dasharray", "6 4")
    .attr("stroke-linecap", "square");
  group
    .append("circle")
    .attr("cx", anchorX)
    .attr("cy", anchorY)
    .attr("r", 4.2)
    .attr("fill", color)
    .attr("stroke", LOW_BLUE)
    .attr("stroke-width", 2);
}

function nearestLabelEdgePoint(anchorX: number, anchorY: number, box: LabelBox) {
  const minX = box.x + 8;
  const maxX = box.x + box.width - 8;
  const minY = box.y + 8;
  const maxY = box.y + box.height - 8;

  if (anchorX < box.x) {
    return { x: box.x, y: clamp(anchorY, minY, maxY) };
  }
  if (anchorX > box.x + box.width) {
    return { x: box.x + box.width, y: clamp(anchorY, minY, maxY) };
  }
  if (anchorY < box.y) {
    return { x: clamp(anchorX, minX, maxX), y: box.y };
  }
  return { x: clamp(anchorX, minX, maxX), y: box.y + box.height };
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function wrapLabelText(text: string) {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length <= 25) {
      current = candidate;
      continue;
    }
    if (current) {
      lines.push(current);
    }
    current = word;
  }
  if (current) {
    lines.push(current);
  }
  return lines;
}

function observeChapters() {
  const links = [...document.querySelectorAll<HTMLAnchorElement>(".topbar a")];
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.find((entry) => entry.isIntersecting);
      if (!visible) return;
      links.forEach((link) => link.removeAttribute("aria-current"));
      const active = links.find((link) => link.getAttribute("href") === `#${visible.target.id}`);
      active?.setAttribute("aria-current", "page");
    },
    { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
  );
  document.querySelectorAll(".chapter").forEach((chapter) => observer.observe(chapter));
}

function setupSnapNavigation() {
  const sections = [...document.querySelectorAll<HTMLElement>(".hero, .chapter, .sources")];
  if (!sections.length) return;

  document.documentElement.classList.add("scroll-magic");

  const desktopQuery = window.matchMedia("(min-width: 861px)");
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const cooldownMs = 680;
  let lastMoveAt = 0;
  let touchStartX: number | null = null;
  let touchStartY: number | null = null;
  let touchStartedOnControl = false;

  const currentIndex = () => {
    const scrollTop = window.scrollY;
    let bestIndex = 0;
    let bestDistance = Number.POSITIVE_INFINITY;
    sections.forEach((section, index) => {
      const top = section.getBoundingClientRect().top + scrollTop;
      const distance = Math.abs(top - scrollTop);
      if (distance < bestDistance) {
        bestDistance = distance;
        bestIndex = index;
      }
    });
    return bestIndex;
  };

  const updateUrlForSection = (section: HTMLElement) => {
    const nextUrl = section.id ? `#${section.id}` : `${location.pathname}${location.search}`;
    history.replaceState(null, "", nextUrl);
  };

  const goToIndex = (index: number) => {
    const target = sections[clamp(index, 0, sections.length - 1)];
    if (!target) return;
    lastMoveAt = Date.now();
    updateUrlForSection(target);
    target.scrollIntoView({
      block: "start",
      behavior: reducedMotionQuery.matches ? "auto" : "smooth",
    });
  };

  const moveBy = (direction: number) => {
    if (!desktopQuery.matches) return;
    if (Date.now() - lastMoveAt < cooldownMs) return;
    goToIndex(currentIndex() + direction);
  };

  const isEditableTarget = (target: EventTarget | null) =>
    target instanceof Element && Boolean(target.closest("input, textarea, select, [contenteditable='true']"));

  const onWheel = (event: WheelEvent) => {
    if (!desktopQuery.matches || isEditableTarget(event.target)) return;
    if (Math.abs(event.deltaX) > Math.abs(event.deltaY) || Math.abs(event.deltaY) < 24) return;
    event.preventDefault();
    moveBy(event.deltaY > 0 ? 1 : -1);
  };

  const onTouchStart = (event: TouchEvent) => {
    const touch = event.touches[0];
    if (!touch) return;
    touchStartedOnControl =
      event.target instanceof Element &&
      Boolean(event.target.closest("a, button, input, textarea, select, [contenteditable='true']"));
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
  };

  const onTouchMove = (event: TouchEvent) => {
    if (!desktopQuery.matches || touchStartedOnControl || touchStartX === null || touchStartY === null) return;
    const touch = event.touches[0];
    if (!touch) return;
    const deltaX = touchStartX - touch.clientX;
    const deltaY = touchStartY - touch.clientY;
    if (Math.abs(deltaY) > 8 && Math.abs(deltaY) > Math.abs(deltaX)) {
      event.preventDefault();
    }
  };

  const onTouchEnd = (event: TouchEvent) => {
    if (!desktopQuery.matches || touchStartedOnControl || touchStartX === null || touchStartY === null) return;
    const touch = event.changedTouches[0];
    if (!touch) return;
    const deltaX = touchStartX - touch.clientX;
    const deltaY = touchStartY - touch.clientY;
    touchStartX = null;
    touchStartY = null;
    if (Math.abs(deltaY) < 48 || Math.abs(deltaY) < Math.abs(deltaX)) return;
    moveBy(deltaY > 0 ? 1 : -1);
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (!desktopQuery.matches || isEditableTarget(event.target)) return;
    if (event.key === "ArrowDown" || event.key === "PageDown" || (event.key === " " && !event.shiftKey)) {
      event.preventDefault();
      moveBy(1);
    } else if (event.key === "ArrowUp" || event.key === "PageUp" || (event.key === " " && event.shiftKey)) {
      event.preventDefault();
      moveBy(-1);
    } else if (event.key === "Home") {
      event.preventDefault();
      goToIndex(0);
    } else if (event.key === "End") {
      event.preventDefault();
      goToIndex(sections.length - 1);
    }
  };

  window.addEventListener("wheel", onWheel, { passive: false });
  window.addEventListener("touchstart", onTouchStart, { passive: true });
  window.addEventListener("touchmove", onTouchMove, { passive: false });
  window.addEventListener("touchend", onTouchEnd, { passive: true });
  window.addEventListener("keydown", onKeyDown);

  snapNavigationCleanup = () => {
    document.documentElement.classList.remove("scroll-magic");
    window.removeEventListener("wheel", onWheel);
    window.removeEventListener("touchstart", onTouchStart);
    window.removeEventListener("touchmove", onTouchMove);
    window.removeEventListener("touchend", onTouchEnd);
    window.removeEventListener("keydown", onKeyDown);
  };
}

function scrollToInitialHash() {
  if (!location.hash) return;
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      const target = document.querySelector<HTMLElement>(location.hash);
      if (!target) return;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY,
        behavior: "auto",
      });
    });
  });
}

function responsiveMargin(width: number) {
  return {
    top: 70,
    right: width < 560 ? 22 : 42,
    bottom: 54,
    left: width < 560 ? 48 : 72,
  };
}

function displayTeam(team: string) {
  const map: Record<string, string> = {
    "La Coruna": "Dépor",
    Santander: "Racing",
    Almeria: "Almería",
    Malaga: "Málaga",
    Castellon: "Castellón",
    Espanol: "Espanyol",
    Logrones: "Logroñés",
  };
  return map[team] ?? team;
}

function formatDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  return currentCopy.formatDate(day, currentCopy.months[month - 1], year);
}

function formatNumber(value: number) {
  return new Intl.NumberFormat(currentCopy.locale).format(value);
}

function formatDecimal(value: number) {
  return new Intl.NumberFormat(currentCopy.locale, {
    maximumFractionDigits: 2,
    minimumFractionDigits: value % 1 === 0 ? 0 : 1,
  }).format(value);
}

function signed(value: number) {
  return value > 0 ? `+${value}` : `${value}`;
}

function resultLabel(result: TitlePoint["result"]) {
  return currentCopy.resultLabels[result];
}

function venueLabel(venue: "H" | "A" | "") {
  if (venue === "H") return currentCopy.common.home;
  if (venue === "A") return currentCopy.common.away;
  return "";
}

function divisionLabel(division: string) {
  return currentCopy.divisions[division as keyof typeof currentCopy.divisions] ?? division;
}

function stateLabel(state: string) {
  if (!state) return "";
  return currentCopy.states[state as keyof typeof currentCopy.states] ?? state;
}

function sourceNote(source: SourceLink) {
  return currentCopy.sourceNotes[source.name as keyof typeof currentCopy.sourceNotes] ?? source.note;
}

function attendanceLabel(callout: AttendanceCallout) {
  return currentCopy.attendanceLabels[callout.season as keyof typeof currentCopy.attendanceLabels] ?? callout.label;
}

function attendanceSource(callout: AttendanceCallout) {
  return currentCopy.attendanceSources[callout.source as keyof typeof currentCopy.attendanceSources] ?? callout.source;
}

function tierLabel(tier: number) {
  return currentCopy.common.tierLabels[tier as keyof typeof currentCopy.common.tierLabels] ?? `${tier}`;
}
