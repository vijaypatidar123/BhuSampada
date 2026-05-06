from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response

from app.api.routes import content, health, properties, uploads
from app.core.config import settings
from app.services.live_proxy import proxy_live_request


app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router, tags=["health"])
app.include_router(properties.router, prefix="/api/properties", tags=["properties"])
app.include_router(uploads.router, prefix="/api/uploads", tags=["uploads"])
app.include_router(content.router, prefix="/api/content", tags=["content"])


@app.api_route(
    "/{full_path:path}",
    methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"],
    include_in_schema=False,
)
async def live_site_proxy(request: Request, full_path: str) -> Response:
    return await proxy_live_request(request, full_path)
