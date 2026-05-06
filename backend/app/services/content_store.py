from __future__ import annotations

import json
from functools import lru_cache
from pathlib import Path
from typing import Any

from app.db.mongo import get_database


API_ROOT = Path(__file__).resolve().parents[3] / "content" / "live" / "api"


def _read_json(path: Path) -> Any:
    with path.open("r", encoding="utf-8") as handle:
        return json.load(handle)


@lru_cache(maxsize=1)
def load_snapshot() -> dict[str, Any]:
    return {
        "summary": _read_json(API_ROOT / "summary.json"),
        "settings": _read_json(API_ROOT / "web-settings.json"),
        "homepage": _read_json(API_ROOT / "homepage-data.json"),
        "categories": _read_json(API_ROOT / "categories.json"),
        "cities": _read_json(API_ROOT / "cities.json"),
        "properties": _read_json(API_ROOT / "properties" / "all.json"),
        "projects": _read_json(API_ROOT / "projects" / "all.json"),
        "articles": _read_json(API_ROOT / "articles" / "all.json"),
        "agents": _read_json(API_ROOT / "agents" / "all.json"),
        "services": _read_json(API_ROOT / "services" / "all.json"),
        "media": _read_json(API_ROOT / "media" / "all.json"),
    }


def list_items(key: str) -> list[dict[str, Any]]:
    database = get_database()
    collection = database[key]
    items = list(collection.find({}, {"_id": 0}))
    if items:
        return items
    return list(load_snapshot()[key])


def get_settings() -> dict[str, Any]:
    database = get_database()
    document = database["settings"].find_one({"_seed_key": "_singleton"}, {"_id": 0})
    if document:
        document.pop("_seed_key", None)
        return document
    return load_snapshot()["settings"]


def get_homepage() -> dict[str, Any]:
    database = get_database()
    document = database["homepage"].find_one({"_seed_key": "_singleton"}, {"_id": 0})
    if document:
        document.pop("_seed_key", None)
        return document
    return load_snapshot()["homepage"]


def get_summary() -> dict[str, Any]:
    database = get_database()
    document = database["snapshot_summary"].find_one({"_seed_key": "_singleton"}, {"_id": 0})
    if document:
        document.pop("_seed_key", None)
        return document
    return load_snapshot()["summary"]


def get_categories() -> dict[str, Any]:
    database = get_database()
    items = list(database["categories"].find({}, {"_id": 0}))
    if items:
        return {"data": items}
    return load_snapshot()["categories"]


def get_item_by_slug(key: str, slug: str) -> dict[str, Any] | None:
    for item in list_items(key):
        if item.get("slug_id") == slug:
            return item
    return None
