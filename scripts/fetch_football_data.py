#!/usr/bin/env python3
"""Build the Deportivo data files used by the Galician story site."""

from __future__ import annotations

import csv
import datetime as dt
import json
import urllib.request
from collections import defaultdict
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
RAW_DIR = ROOT / "data" / "raw"
PROCESSED_DIR = ROOT / "data" / "processed"
PUBLIC_DATA_DIR = ROOT / "public" / "data"

DEPOR_NAMES = {"La Coruna"}
BASE_URL = "https://www.football-data.co.uk/mmz4281/{season}/{division}.csv"

TEAM_COLORS = {
    "La Coruna": "#ffffff",
    "Barcelona": "#a50044",
    "Real Madrid": "#febe10",
    "Valencia": "#ff7a00",
    "Zaragoza": "#9bd3ff",
    "Celta": "#8bd4ff",
}

TITLE_RACE_TEAMS = ["La Coruna", "Barcelona", "Valencia", "Zaragoza", "Real Madrid"]
FINISH_CONTEXT_TEAMS = ["Barcelona", "Real Madrid", "Valencia", "Celta"]

FOOTBALL_DATA_SEASONS = [
    ("9394", "SP1"),
    ("9495", "SP1"),
    ("9596", "SP1"),
    ("9697", "SP1"),
    ("9798", "SP1"),
    ("9899", "SP1"),
    ("9900", "SP1"),
    ("0001", "SP1"),
    ("0102", "SP1"),
    ("0203", "SP1"),
    ("0304", "SP1"),
    ("0405", "SP1"),
    ("0506", "SP1"),
    ("0607", "SP1"),
    ("0708", "SP1"),
    ("0809", "SP1"),
    ("0910", "SP1"),
    ("1011", "SP1"),
    ("1112", "SP2"),
    ("1213", "SP1"),
    ("1314", "SP2"),
    ("1415", "SP1"),
    ("1516", "SP1"),
    ("1617", "SP1"),
    ("1718", "SP1"),
    ("1819", "SP2"),
    ("1920", "SP2"),
    ("2425", "SP2"),
    ("2526", "SP2"),
]

PROMOTION_CONTEXT_CODES = [
    "9697",
    "9798",
    "9899",
    "9900",
    "0001",
    "0102",
    "0203",
    "0304",
    "0405",
    "0506",
    "0607",
    "0708",
    "0809",
    "0910",
    "1011",
    "1112",
    "1213",
    "1314",
    "1415",
    "1516",
    "1617",
    "1718",
    "1819",
    "1920",
    "2021",
    "2122",
    "2223",
    "2324",
    "2425",
    "2526",
]

DIVISION_NAMES = {
    "SP1": ("Primeira División", 1),
    "SP2": ("Segunda División", 2),
}

CURATED_SEASONS: list[dict[str, Any]] = [
    {
        "season": "1990-91",
        "tier": 2,
        "division": "Segunda División",
        "finish": 2,
        "points": 48,
        "matches": 38,
        "wins": 20,
        "draws": 8,
        "losses": 10,
        "gf": 60,
        "ga": 32,
        "state": "Ascenso a Primeira",
        "source": "BDFutbol",
        "source_url": "https://www.bdfutbol.com/es/t/t1990-912a.html",
    },
    {
        "season": "1991-92",
        "tier": 1,
        "division": "Primeira División",
        "finish": 17,
        "points": 31,
        "matches": 38,
        "wins": 8,
        "draws": 15,
        "losses": 15,
        "gf": 37,
        "ga": 48,
        "state": "Salvación na promoción",
        "source": "BDFutbol",
        "source_url": "https://www.bdfutbol.com/t/t1991-92.html",
    },
    {
        "season": "1992-93",
        "tier": 1,
        "division": "Primeira División",
        "finish": 3,
        "points": 54,
        "matches": 38,
        "wins": 22,
        "draws": 10,
        "losses": 6,
        "gf": 67,
        "ga": 33,
        "state": "Súper Dépor",
        "source": "BDFutbol",
        "source_url": "https://www.bdfutbol.com/es/en/t/t1992-93.html?tab=stats",
    },
    {
        "season": "2020-21",
        "tier": 3,
        "division": "Segunda División B",
        "finish": 4,
        "points": 39,
        "matches": 24,
        "wins": 11,
        "draws": 6,
        "losses": 7,
        "gf": 22,
        "ga": 13,
        "state": "Primeiro ano en Segunda División B",
        "source": "Wikipedia/BDFutbol",
        "source_url": "https://en.wikipedia.org/wiki/Deportivo_de_La_Coru%C3%B1a",
    },
    {
        "season": "2021-22",
        "tier": 3,
        "division": "Primeira RFEF",
        "finish": 2,
        "points": 74,
        "matches": 38,
        "wins": 22,
        "draws": 8,
        "losses": 8,
        "gf": 59,
        "ga": 29,
        "state": "Cae no play-off",
        "source": "Wikipedia/BDFutbol",
        "source_url": "https://en.wikipedia.org/wiki/Deportivo_de_La_Coru%C3%B1a",
    },
    {
        "season": "2022-23",
        "tier": 3,
        "division": "Primeira Federación",
        "finish": 4,
        "points": 67,
        "matches": 38,
        "wins": 18,
        "draws": 13,
        "losses": 7,
        "gf": 53,
        "ga": 29,
        "state": "Outro play-off perdido",
        "source": "AS / Wikipedia",
        "source_url": "https://resultados.as.com/resultados/futbol/primera_rfef/2022_2023/clasificacion/",
    },
    {
        "season": "2023-24",
        "tier": 3,
        "division": "Primeira Federación",
        "finish": 1,
        "points": 78,
        "matches": 38,
        "wins": 22,
        "draws": 12,
        "losses": 4,
        "gf": 64,
        "ga": 27,
        "state": "Campión e ascenso a Segunda",
        "source": "StatsCrew / Wikipedia",
        "source_url": "https://www.statscrew.com/worldfootball/stats/t-DEPCO346/y-2023",
    },
]

MILESTONES = [
    {
        "season": "1990-91",
        "title": "Volta a Primeira",
        "body": "O Dépor sobe e volve a Primeira despois de dezaoito anos fóra.",
    },
    {
        "season": "1992-93",
        "title": "O salto do Súper Dépor",
        "body": "Bebeto, Mauro Silva e un terceiro posto colocan o club na zona alta.",
    },
    {
        "season": "1993-94",
        "title": "Subcampión por pouco",
        "body": "O equipo encaixa só 18 goles e perde a Liga na última xornada.",
    },
    {
        "season": "1999-00",
        "title": "Campión",
        "body": "O 19 de maio de 2000, Riazor ve o único título de Liga da historia do club.",
    },
    {
        "season": "2001-02",
        "title": "Centenariazo",
        "body": "A Copa no Bernabéu amplía unha etapa de títulos e presenza europea.",
    },
    {
        "season": "2010-11",
        "title": "Primeira caída",
        "body": "O club baixa a Segunda e comeza unha década máis irregular.",
    },
    {
        "season": "2017-18",
        "title": "Último descenso de Primeira",
        "body": "A perda de categoría deixa o club de novo en Segunda.",
    },
    {
        "season": "2019-20",
        "title": "Segunda B",
        "body": "O Dépor cae fóra do fútbol profesional por primeira vez neste tramo.",
    },
    {
        "season": "2023-24",
        "title": "Ascenso a Segunda",
        "body": "O ascenso corta catro anos seguidos na terceira escala.",
    },
    {
        "season": "2025-26",
        "title": "En ascenso directo",
        "body": "A 21 de maio de 2026, o Dépor é segundo con 74 puntos en 40 partidos.",
    },
]

ATTENDANCE_CALLOUTS = [
    {
        "season": "2021-22",
        "attendance": 20000,
        "label": "media arredor dos 20.000 en Primeira RFEF",
        "source": "Wikipedia / prensa",
    },
    {
        "season": "2022-23",
        "attendance": 19028,
        "label": "19.028 de media na Primeira Federación",
        "source": "Wikipedia",
    },
    {
        "season": "2023-24",
        "attendance": 24000,
        "label": "Riazor supera o contexto da categoría",
        "source": "prensa / rexistros de asistencia",
    },
]

SOURCE_LINKS = [
    {
        "name": "Football-Data.co.uk",
        "url": "https://www.football-data.co.uk/spainm.php",
        "note": "CSV de partidos en Primeira e Segunda.",
    },
    {
        "name": "BDFutbol",
        "url": "https://www.bdfutbol.com/es/e/e13.html",
        "note": "Historial do club e tempadas anteriores ao arquivo CSV.",
    },
    {
        "name": "AS",
        "url": "https://as.com/futbol/segunda/el-depor-con-dos-balas-para-el-ascenso-y-rivales-sin-margen-de-error-f202605-n/",
        "note": "Contexto da carreira polo ascenso en maio de 2026.",
    },
    {
        "name": "LaLiga",
        "url": "https://www.laliga.com/laliga-hypermotion/clasificacion",
        "note": "Clasificación oficial de LaLiga Hypermotion.",
    },
]

FINISH_OVERRIDES = {
    "1996-97": {
        "finish": 3,
        "source_url": "https://www.bdfutbol.com/es/t/t1996-97.html",
        "source_note": "posto oficial por criterios de desempate",
    },
    "2014-15": {
        "finish": 16,
        "source_url": "https://en.wikipedia.org/wiki/Deportivo_de_La_Coru%C3%B1a",
        "source_note": "posto oficial por criterios de desempate",
    },
    "2024-25": {
        "finish": 15,
        "source_url": "https://www.bdfutbol.com/en/t/t2024-252a.html",
        "source_note": "posto oficial por criterios de desempate",
    },
}


def season_label(code: str) -> str:
    century = "19" if int(code[:2]) >= 93 else "20"
    return f"{century}{code[:2]}-{code[2:]}"


def season_start_year(label: str) -> int:
    return int(label[:4])


def points_for_win(code_or_label: str) -> int:
    start = int(code_or_label[:4]) if "-" in code_or_label else int(
        ("19" if int(code_or_label[:2]) >= 93 else "20") + code_or_label[:2]
    )
    return 2 if start < 1995 else 3


def source_url(code: str, division: str) -> str:
    return BASE_URL.format(season=code, division=division)


def parse_date(value: str) -> str:
    for fmt in ("%d/%m/%y", "%d/%m/%Y"):
        try:
            return dt.datetime.strptime(value, fmt).date().isoformat()
        except ValueError:
            pass
    raise ValueError(f"Unrecognized date format: {value}")


def fetch_raw(code: str, division: str) -> Path:
    RAW_DIR.mkdir(parents=True, exist_ok=True)
    path = RAW_DIR / f"{code}_{division}.csv"
    with urllib.request.urlopen(source_url(code, division), timeout=30) as response:
        path.write_bytes(response.read())
    return path


def played_rows(code: str, division: str) -> list[dict[str, str]]:
    path = fetch_raw(code, division)
    with path.open(newline="", encoding="utf-8-sig") as handle:
        return [
            row
            for row in csv.DictReader(handle)
            if row.get("Div") == division and is_played(row)
        ]


def is_played(row: dict[str, str]) -> bool:
    return bool(row.get("HomeTeam") and row.get("AwayTeam") and row.get("FTHG") and row.get("FTAG"))


def depor_result(row: dict[str, str]) -> str:
    home = row["HomeTeam"] in DEPOR_NAMES
    full_time_result = row["FTR"]
    if full_time_result == "D":
        return "D"
    if (home and full_time_result == "H") or (not home and full_time_result == "A"):
        return "W"
    return "L"


def depor_match_row(code: str, division: str, row: dict[str, str]) -> dict[str, Any]:
    home = row["HomeTeam"] in DEPOR_NAMES
    home_goals = int(row["FTHG"])
    away_goals = int(row["FTAG"])
    goals_for = home_goals if home else away_goals
    goals_against = away_goals if home else home_goals

    output: dict[str, Any] = {
        "season": season_label(code),
        "date": parse_date(row["Date"]),
        "division": division,
        "home_team": row["HomeTeam"],
        "away_team": row["AwayTeam"],
        "home_goals": home_goals,
        "away_goals": away_goals,
        "full_time_result": row["FTR"],
        "depor_venue": "H" if home else "A",
        "depor_goals_for": goals_for,
        "depor_goals_against": goals_against,
        "depor_result": depor_result(row),
        "source_url": source_url(code, division),
    }

    for source, target in [
        ("HTHG", "half_time_home_goals"),
        ("HTAG", "half_time_away_goals"),
        ("HTR", "half_time_result"),
    ]:
        output[target] = row.get(source, "")

    return output


def empty_record() -> dict[str, int]:
    return {"matches": 0, "wins": 0, "draws": 0, "losses": 0, "gf": 0, "ga": 0, "points": 0}


def add_match_to_table(
    table: dict[str, dict[str, int]],
    home_team: str,
    away_team: str,
    home_goals: int,
    away_goals: int,
    points_per_win: int,
) -> None:
    home = table[home_team]
    away = table[away_team]
    home["matches"] += 1
    away["matches"] += 1
    home["gf"] += home_goals
    home["ga"] += away_goals
    away["gf"] += away_goals
    away["ga"] += home_goals

    if home_goals > away_goals:
        home["wins"] += 1
        away["losses"] += 1
        home["points"] += points_per_win
    elif home_goals < away_goals:
        away["wins"] += 1
        home["losses"] += 1
        away["points"] += points_per_win
    else:
        home["draws"] += 1
        away["draws"] += 1
        home["points"] += 1
        away["points"] += 1


def table_rows_for_season(code: str, division: str, rows: list[dict[str, str]]) -> list[dict[str, Any]]:
    table: dict[str, dict[str, int]] = defaultdict(empty_record)
    for row in rows:
        add_match_to_table(
            table,
            row["HomeTeam"],
            row["AwayTeam"],
            int(row["FTHG"]),
            int(row["FTAG"]),
            points_for_win(code),
        )

    ranked = sorted(
        table.items(),
        key=lambda item: (
            -item[1]["points"],
            -(item[1]["gf"] - item[1]["ga"]),
            -item[1]["gf"],
            item[0],
        ),
    )
    division_name, tier = DIVISION_NAMES[division]
    output = []
    for index, (team, record) in enumerate(ranked, start=1):
        output.append(
            {
                "season": season_label(code),
                "team": team,
                "tier": tier,
                "division": division_name,
                "finish": index,
                "points": record["points"],
                "matches": record["matches"],
                "wins": record["wins"],
                "draws": record["draws"],
                "losses": record["losses"],
                "gf": record["gf"],
                "ga": record["ga"],
                "gd": record["gf"] - record["ga"],
                "ppg": round(record["points"] / record["matches"], 3),
                "gd_per_match": round((record["gf"] - record["ga"]) / record["matches"], 3),
                "source": "Football-Data.co.uk",
                "source_url": source_url(code, division),
            }
        )
    return output


def season_state(row: dict[str, Any]) -> str:
    season = row["season"]
    if season == "1999-00":
        return "Campión de Liga"
    if season in {"2010-11", "2012-13", "2017-18", "2019-20"}:
        return "Descenso"
    if season in {"2011-12", "2013-14", "2023-24"}:
        return "Ascenso"
    if season == "2025-26":
        return "En ascenso directo a 21/05/2026"
    if row["tier"] == 1 and row["finish"] <= 6:
        return "Zona alta"
    return ""


def with_derived_fields(row: dict[str, Any]) -> dict[str, Any]:
    row = dict(row)
    override = FINISH_OVERRIDES.get(row["season"])
    if override:
        row["finish"] = override["finish"]
        row["source_url"] = override["source_url"]
        row["source"] = f"{row['source']} + {override['source_note']}"
    row["gd"] = row["gf"] - row["ga"]
    row["ppg"] = round(row["points"] / row["matches"], 3)
    row["gd_per_match"] = round(row["gd"] / row["matches"], 3)
    row.setdefault("state", season_state(row))
    row["season_start"] = season_start_year(row["season"])
    return row


def build_datasets() -> None:
    RAW_DIR.mkdir(parents=True, exist_ok=True)
    PROCESSED_DIR.mkdir(parents=True, exist_ok=True)
    PUBLIC_DATA_DIR.mkdir(parents=True, exist_ok=True)

    matches: list[dict[str, Any]] = []
    depor_seasons_by_label: dict[str, dict[str, Any]] = {}
    promotion_table: list[dict[str, Any]] = []
    title_race: list[dict[str, Any]] = []
    goal_diff_race: list[dict[str, Any]] = []
    finish_context: list[dict[str, Any]] = []
    ppg_context: list[dict[str, Any]] = []

    for code, division in FOOTBALL_DATA_SEASONS:
        rows = played_rows(code, division)
        if not rows:
            continue

        season_table = table_rows_for_season(code, division, rows)
        season = season_label(code)
        goal_diff_race.extend(goal_diff_paths(rows, code, division))
        ppg_context.append(ppg_context_row(season_table))

        if code == "9900" and division == "SP1":
            title_race = title_race_paths(rows, TITLE_RACE_TEAMS, code)

        if division == "SP1":
            finish_context.extend(context_finish_rows(season_table, FINISH_CONTEXT_TEAMS))

        for table_row in season_table:
            if table_row["team"] in DEPOR_NAMES:
                depor_row = with_derived_fields({k: v for k, v in table_row.items() if k != "team"})
                depor_row["state"] = season_state(depor_row)
                depor_seasons_by_label[depor_row["season"]] = depor_row

        if code == "2526" and division == "SP2":
            promotion_table = season_table[:8]

        for row in rows:
            if row["HomeTeam"] in DEPOR_NAMES or row["AwayTeam"] in DEPOR_NAMES:
                matches.append(depor_match_row(code, division, row))

    for curated in CURATED_SEASONS:
        depor_seasons_by_label[curated["season"]] = with_derived_fields(curated)

    seasons = [depor_seasons_by_label[season] for season in sorted(depor_seasons_by_label)]
    title_path = cumulative_title_path(matches)
    promotion_goal_diff_race = promotion_goal_diff_paths()

    write_csv(PROCESSED_DIR / "deportivo_1993_2026_matches.csv", matches)
    write_csv(PROCESSED_DIR / "deportivo_seasons.csv", seasons)
    write_csv(PROCESSED_DIR / "deportivo_2025_26_promotion_table.csv", promotion_table)
    write_csv(PROCESSED_DIR / "league_goal_diff_by_round.csv", goal_diff_race)

    legacy_matches = [match for match in matches if 1993 <= season_start_year(match["season"]) <= 1999]
    legacy_summary = [row for row in seasons if 1993 <= row["season_start"] <= 1999]
    write_csv(PROCESSED_DIR / "deportivo_1993_2000_matches.csv", legacy_matches)
    write_csv(PROCESSED_DIR / "deportivo_1993_2000_summary.csv", legacy_summary)

    story = {
        "generated_at": dt.date.today().isoformat(),
        "current_status_date": "2026-05-21",
        "seasons": seasons,
        "matches": matches,
        "title_path": title_path,
        "title_race": title_race,
        "goal_diff_race": goal_diff_race,
        "promotion_goal_diff_race": promotion_goal_diff_race,
        "finish_context": finish_context,
        "ppg_context": ppg_context,
        "team_colors": TEAM_COLORS,
        "promotion_table": promotion_table,
        "milestones": MILESTONES,
        "attendance_callouts": ATTENDANCE_CALLOUTS,
        "opponent_wall": opponent_wall(matches),
        "sources": SOURCE_LINKS,
    }
    (PUBLIC_DATA_DIR / "depor_story.json").write_text(
        json.dumps(story, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )


def cumulative_title_path(matches: list[dict[str, Any]]) -> list[dict[str, Any]]:
    points = 0
    path = []
    for index, match in enumerate(
        sorted((m for m in matches if m["season"] == "1999-00"), key=lambda item: item["date"]),
        start=1,
    ):
        if match["depor_result"] == "W":
            points += 3
        elif match["depor_result"] == "D":
            points += 1
        path.append(
            {
                "round": index,
                "date": match["date"],
                "points": points,
                "opponent": match["away_team"] if match["depor_venue"] == "H" else match["home_team"],
                "venue": match["depor_venue"],
                "gf": match["depor_goals_for"],
                "ga": match["depor_goals_against"],
                "result": match["depor_result"],
            }
        )
    return path


def goal_diff_paths(rows: list[dict[str, str]], code: str, division: str) -> list[dict[str, Any]]:
    season = season_label(code)
    season_start = season_start_year(season)
    division_name, tier = DIVISION_NAMES[division]
    matches_by_team: dict[str, list[dict[str, Any]]] = defaultdict(list)

    for row in sorted(rows, key=lambda item: parse_date(item["Date"])):
        date = parse_date(row["Date"])
        home = row["HomeTeam"]
        away = row["AwayTeam"]
        home_goals = int(row["FTHG"])
        away_goals = int(row["FTAG"])
        matches_by_team[home].append(
            {
                "date": date,
                "venue": "H",
                "opponent": away,
                "gf": home_goals,
                "ga": away_goals,
            }
        )
        matches_by_team[away].append(
            {
                "date": date,
                "venue": "A",
                "opponent": home,
                "gf": away_goals,
                "ga": home_goals,
            }
        )

    output: list[dict[str, Any]] = []
    for team in sorted(matches_by_team):
        cumulative_gf = 0
        cumulative_ga = 0
        output.append(
            {
                "season": season,
                "season_start": season_start,
                "division": division_name,
                "tier": tier,
                "team": team,
                "round": 0,
                "date": "",
                "gd": 0,
                "gf": 0,
                "ga": 0,
                "opponent": "",
                "venue": "",
                "result": "",
                "is_depor": team in DEPOR_NAMES,
                "source_url": source_url(code, division),
            }
        )
        for index, match in enumerate(matches_by_team[team], start=1):
            cumulative_gf += match["gf"]
            cumulative_ga += match["ga"]
            if match["gf"] > match["ga"]:
                result = "W"
            elif match["gf"] < match["ga"]:
                result = "L"
            else:
                result = "D"
            output.append(
                {
                    "season": season,
                    "season_start": season_start,
                    "division": division_name,
                    "tier": tier,
                    "team": team,
                    "round": index,
                    "date": match["date"],
                    "gd": cumulative_gf - cumulative_ga,
                    "gf": cumulative_gf,
                    "ga": cumulative_ga,
                    "opponent": match["opponent"],
                    "venue": match["venue"],
                    "result": result,
                    "is_depor": team in DEPOR_NAMES,
                    "source_url": source_url(code, division),
                }
            )
    return output


def promotion_goal_diff_paths() -> list[dict[str, Any]]:
    tables_by_team_season_tier: dict[tuple[str, int, int], dict[str, Any]] = {}
    paths_by_team_season_tier: dict[tuple[str, int, int], list[dict[str, Any]]] = {}

    for code in PROMOTION_CONTEXT_CODES:
        for division in ("SP1", "SP2"):
            rows = played_rows(code, division)
            if not rows:
                continue

            table = table_rows_for_season(code, division, rows)
            paths = goal_diff_paths(rows, code, division)
            year = season_start_year(season_label(code))
            tier = DIVISION_NAMES[division][1]

            for row in table:
                tables_by_team_season_tier[(row["team"], year, tier)] = row

            grouped_paths: dict[str, list[dict[str, Any]]] = defaultdict(list)
            for point in paths:
                grouped_paths[point["team"]].append(point)
            for team, values in grouped_paths.items():
                paths_by_team_season_tier[(team, year, tier)] = values

    output: list[dict[str, Any]] = []

    def append_case(team: str, year: int, tier: int, promotion_case: str) -> None:
        key = (team, year, tier)
        table_row = tables_by_team_season_tier[key]
        next_tier = None
        if (team, year + 1, 1) in tables_by_team_season_tier:
            next_tier = 1
        elif (team, year + 1, 2) in tables_by_team_season_tier:
            next_tier = 2

        for point in paths_by_team_season_tier.get(key, []):
            output.append(
                {
                    "season": point["season"],
                    "season_start": point["season_start"],
                    "division": point["division"],
                    "tier": point["tier"],
                    "team": point["team"],
                    "round": point["round"],
                    "date": point["date"],
                    "gd": point["gd"],
                    "promotion_case": promotion_case,
                    "finish": table_row["finish"],
                    "points": table_row["points"],
                    "returned_to_segunda": next_tier == 2,
                    "completed_next_season": next_tier in {1, 2},
                    "source_url": point["source_url"],
                }
            )

    for team, year, tier in sorted(tables_by_team_season_tier):
        if tier == 2 and (team, year + 1, 1) in tables_by_team_season_tier:
            append_case(team, year, tier, "segunda-promotion")
        if tier == 1 and (team, year - 1, 2) in tables_by_team_season_tier:
            append_case(team, year, tier, "primera-after-promotion")

    return output


def title_race_paths(rows: list[dict[str, str]], teams: list[str], code: str) -> list[dict[str, Any]]:
    points = {team: 0 for team in teams}
    rounds = {team: 0 for team in teams}
    paths: list[dict[str, Any]] = []
    points_per_win = points_for_win(code)

    for row in sorted(rows, key=lambda item: parse_date(item["Date"])):
        home = row["HomeTeam"]
        away = row["AwayTeam"]
        home_goals = int(row["FTHG"])
        away_goals = int(row["FTAG"])

        if home_goals > away_goals:
            awarded = {home: points_per_win, away: 0}
            result = {home: "W", away: "L"}
        elif home_goals < away_goals:
            awarded = {home: 0, away: points_per_win}
            result = {home: "L", away: "W"}
        else:
            awarded = {home: 1, away: 1}
            result = {home: "D", away: "D"}

        for team, opponent in [(home, away), (away, home)]:
            if team not in points:
                continue
            points[team] += awarded[team]
            rounds[team] += 1
            paths.append(
                {
                    "team": team,
                    "round": rounds[team],
                    "date": parse_date(row["Date"]),
                    "points": points[team],
                    "opponent": opponent,
                    "result": result[team],
                    "color": TEAM_COLORS.get(team, "#ffffff"),
                }
            )
    return paths


def context_finish_rows(table: list[dict[str, Any]], teams: list[str]) -> list[dict[str, Any]]:
    output = []
    for row in table:
        if row["team"] not in teams:
            continue
        output.append(
            {
                "team": row["team"],
                "season": row["season"],
                "season_start": season_start_year(row["season"]),
                "finish": row["finish"],
                "points": row["points"],
                "color": TEAM_COLORS.get(row["team"], "#ffffff"),
            }
        )
    return output


def ppg_context_row(table: list[dict[str, Any]]) -> dict[str, Any]:
    ordered = sorted(table, key=lambda row: row["finish"])
    median = sorted(row["ppg"] for row in ordered)[len(ordered) // 2]
    leader = ordered[0]
    return {
        "season": leader["season"],
        "season_start": season_start_year(leader["season"]),
        "division": leader["division"],
        "leader_team": leader["team"],
        "leader_ppg": leader["ppg"],
        "median_ppg": round(median, 3),
    }


def opponent_wall(matches: list[dict[str, Any]]) -> dict[str, list[str]]:
    elite = [
        "Real Madrid",
        "Barcelona",
        "Milan",
        "Manchester United",
        "Juventus",
        "Arsenal",
        "Bayern",
        "PSG",
    ]
    third_tier = [
        "Celta de Vigo B",
        "Unionistas",
        "Zamora",
        "SD Compostela",
        "Coruxo",
        "Guijuelo",
        "Talavera",
        "Tarazona",
    ]
    seen = sorted({
        match["home_team"] if match["away_team"] in DEPOR_NAMES else match["away_team"]
        for match in matches
    })
    return {"elite": elite, "third_tier": third_tier, "football_data_opponents": seen}


def write_csv(path: Path, rows: list[dict[str, Any]]) -> None:
    if not rows:
        return
    fieldnames: list[str] = []
    for row in rows:
        for key in row:
            if key not in fieldnames:
                fieldnames.append(key)
    with path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=fieldnames, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(rows)


if __name__ == "__main__":
    build_datasets()
