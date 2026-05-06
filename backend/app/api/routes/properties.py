from fastapi import APIRouter, Query

from app.schemas.property import PropertyCreate, PropertySummary


router = APIRouter()


@router.get("", response_model=list[PropertySummary])
async def list_properties(
    city: str | None = Query(default=None),
    property_type: str | None = Query(default=None),
) -> list[PropertySummary]:
    sample = [
        PropertySummary(
            id="sample-property-1",
            title="Signature villa in Gurgaon",
            city=city or "Gurgaon",
            property_type=property_type or "sale",
            price=18500000,
            cover_image="https://res.cloudinary.com/demo/image/upload/sample.jpg",
        )
    ]
    return sample


@router.post("", response_model=PropertyCreate)
async def create_property(payload: PropertyCreate) -> PropertyCreate:
    return payload
