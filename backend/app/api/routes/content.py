from __future__ import annotations

from fastapi import APIRouter, HTTPException, Query

from app.services.content_store import (
    get_categories,
    get_homepage,
    get_item_by_slug,
    get_settings,
    get_summary,
    list_items,
)


router = APIRouter()


@router.get("/summary")
async def content_summary() -> dict:
    return get_summary()


@router.get("/settings")
async def content_settings() -> dict:
    return get_settings()


@router.get("/homepage")
async def content_homepage() -> dict:
    return get_homepage()


@router.get("/categories")
async def content_categories() -> dict:
    return get_categories()


@router.get("/properties")
async def content_properties(
    property_type: str | None = Query(default=None),
    city: str | None = Query(default=None),
) -> list[dict]:
    items = list_items("properties")
    if property_type:
        items = [item for item in items if item.get("property_type") == property_type]
    if city:
        items = [item for item in items if item.get("city", "").lower() == city.lower()]
    return items


@router.get("/properties/{slug}")
async def content_property_detail(slug: str) -> dict:
    item = get_item_by_slug("properties", slug)
    if not item:
        raise HTTPException(status_code=404, detail="Property not found")
    return item


@router.get("/projects")
async def content_projects() -> list[dict]:
    return list_items("projects")


@router.get("/projects/{slug}")
async def content_project_detail(slug: str) -> dict:
    item = get_item_by_slug("projects", slug)
    if not item:
        raise HTTPException(status_code=404, detail="Project not found")
    return item


@router.get("/articles")
async def content_articles() -> list[dict]:
    return list_items("articles")


@router.get("/articles/{slug}")
async def content_article_detail(slug: str) -> dict:
    item = get_item_by_slug("articles", slug)
    if not item:
        raise HTTPException(status_code=404, detail="Article not found")
    return item


@router.get("/agents")
async def content_agents() -> list[dict]:
    return list_items("agents")


@router.get("/agents/{slug}")
async def content_agent_detail(slug: str) -> dict:
    item = get_item_by_slug("agents", slug)
    if not item:
        raise HTTPException(status_code=404, detail="Agent not found")
    return item


@router.get("/services")
async def content_services() -> list[dict]:
    return list_items("services")


@router.get("/media")
async def content_media() -> list[dict]:
    return list_items("media")
