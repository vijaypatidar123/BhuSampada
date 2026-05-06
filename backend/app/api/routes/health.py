from fastapi import APIRouter

from app.core.config import settings


router = APIRouter()


@router.get("/health")
async def health_check() -> dict[str, str]:
    return {
        "message": "FastAPI backend is healthy",
        "environment": settings.app_env,
        "version": settings.app_version,
    }
