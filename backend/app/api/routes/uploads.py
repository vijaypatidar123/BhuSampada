from fastapi import APIRouter

from app.services.cloudinary import get_upload_config


router = APIRouter()


@router.get("/config")
async def upload_config() -> dict[str, str]:
    return get_upload_config()
