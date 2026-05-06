from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "BhuSampada API"
    app_env: str = "development"
    app_version: str = "0.1.0"
    frontend_url: str = "http://localhost:3000"
    mongodb_uri: str = "mongodb://localhost:27017"
    mongodb_db: str = "bhusampada"
    jwt_secret: str = "change-me"
    jwt_algorithm: str = "HS256"
    cloudinary_cloud_name: str = ""
    cloudinary_api_key: str = ""
    cloudinary_api_secret: str = ""
    live_site_url: str = "https://bhusampada.com"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


settings = Settings()
