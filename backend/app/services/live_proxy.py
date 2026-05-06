from __future__ import annotations

from urllib.parse import urlencode

import httpx
from fastapi import Request, Response

from app.core.config import settings


HOP_BY_HOP_HEADERS = {
    "connection",
    "keep-alive",
    "proxy-authenticate",
    "proxy-authorization",
    "te",
    "trailers",
    "transfer-encoding",
    "upgrade",
    "content-encoding",
    "content-length",
    "host",
}


def build_target_url(path: str, query_params: dict[str, str]) -> str:
    base = settings.live_site_url.rstrip("/")
    suffix = path.lstrip("/")
    target = f"{base}/{suffix}" if suffix else base
    if query_params:
        target = f"{target}?{urlencode(query_params, doseq=True)}"
    return target


def filter_request_headers(headers: Request) -> dict[str, str]:
    return {
        key: value
        for key, value in headers.headers.items()
        if key.lower() not in HOP_BY_HOP_HEADERS
    }


def filter_response_headers(headers: httpx.Headers) -> dict[str, str]:
    return {
        key: value
        for key, value in headers.items()
        if key.lower() not in HOP_BY_HOP_HEADERS
    }


async def proxy_live_request(request: Request, path: str) -> Response:
    target_url = build_target_url(path, dict(request.query_params))
    request_headers = filter_request_headers(request)
    body = await request.body()

    timeout = httpx.Timeout(60.0, connect=30.0)
    async with httpx.AsyncClient(follow_redirects=True, timeout=timeout) as client:
        upstream = await client.request(
            request.method,
            target_url,
            headers=request_headers,
            content=body,
        )

    response_headers = filter_response_headers(upstream.headers)
    return Response(
        content=upstream.content,
        status_code=upstream.status_code,
        headers=response_headers,
        media_type=upstream.headers.get("content-type"),
    )
