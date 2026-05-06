from pydantic import BaseModel, Field


class PropertySummary(BaseModel):
    id: str
    title: str
    city: str
    property_type: str
    price: int
    cover_image: str


class PropertyCreate(BaseModel):
    title: str = Field(min_length=3, max_length=160)
    description: str = Field(min_length=10, max_length=5000)
    city: str
    locality: str
    property_type: str
    listing_type: str
    price: int = Field(ge=0)
