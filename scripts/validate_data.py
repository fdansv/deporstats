#!/usr/bin/env python3
"""Validate generated Deportivo story data."""

from __future__ import annotations

import csv
import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
MATCHES_PATH = ROOT / "data" / "processed" / "deportivo_1993_2026_matches.csv"
SEASONS_PATH = ROOT / "data" / "processed" / "deportivo_seasons.csv"
STORY_PATH = ROOT / "public" / "data" / "depor_story.json"


def read_csv(path: Path) -> list[dict[str, str]]:
    with path.open(newline="", encoding="utf-8") as handle:
        return list(csv.DictReader(handle))


def main() -> None:
    matches = read_csv(MATCHES_PATH)
    seasons = read_csv(SEASONS_PATH)
    story = json.loads(STORY_PATH.read_text(encoding="utf-8"))

    assert len(seasons) == 36, f"Expected 36 season rows, got {len(seasons)}"
    assert len(matches) == 1132, f"Expected 1132 match rows, got {len(matches)}"
    assert len(story["seasons"]) == len(seasons), "JSON season count mismatch"
    assert len(story["matches"]) == len(matches), "JSON match count mismatch"
    assert story["goal_diff_race"], "Missing cumulative goal-difference rows"
    assert len(story.get("attendance_series", [])) == 21, "Expected full attendance series"
    assert len(story.get("attendance_records", [])) == 1, "Expected attendance record marker"

    season_by_name = {row["season"]: row for row in seasons}
    assert season_by_name["1999-00"]["state"] == "Campión de Liga"
    assert season_by_name["1999-00"]["points"] == "69"
    assert season_by_name["2025-26"]["finish"] == "2"
    assert season_by_name["2025-26"]["points"] == "74"
    assert season_by_name["2025-26"]["matches"] == "40"

    grouped: dict[str, list[dict[str, str]]] = {}
    for match in matches:
        grouped.setdefault(match["season"], []).append(match)

    for season, rows in grouped.items():
        if season not in season_by_name:
            raise AssertionError(f"Missing season row for {season}")
        summary = season_by_name[season]
        assert int(summary["matches"]) == len(rows), f"{season}: match count mismatch"

        wins = sum(1 for row in rows if row["depor_result"] == "W")
        draws = sum(1 for row in rows if row["depor_result"] == "D")
        losses = sum(1 for row in rows if row["depor_result"] == "L")
        gf = sum(int(row["depor_goals_for"]) for row in rows)
        ga = sum(int(row["depor_goals_against"]) for row in rows)
        assert int(summary["wins"]) == wins, f"{season}: wins mismatch"
        assert int(summary["draws"]) == draws, f"{season}: draws mismatch"
        assert int(summary["losses"]) == losses, f"{season}: losses mismatch"
        assert int(summary["gf"]) == gf, f"{season}: goals for mismatch"
        assert int(summary["ga"]) == ga, f"{season}: goals against mismatch"

        depor_goal_rows = [
            row
            for row in story["goal_diff_race"]
            if row["team"] == "La Coruna" and row["season"] == season
        ]
        assert len(depor_goal_rows) == len(rows) + 1, f"{season}: cumulative GD round count mismatch"
        assert depor_goal_rows[0]["round"] == 0, f"{season}: cumulative GD should start at round 0"
        assert depor_goal_rows[0]["gd"] == 0, f"{season}: cumulative GD should start at 0"
        assert depor_goal_rows[-1]["gd"] == int(summary["gd"]), f"{season}: final cumulative GD mismatch"

    print("data ok")


if __name__ == "__main__":
    main()
