from __future__ import annotations

from functools import lru_cache

from pymongo import MongoClient

from app.core.config import settings


@lru_cache(maxsize=1)
def get_client() -> MongoClient:
    return MongoClient(settings.mongodb_uri)


def get_database():
    return get_client()[settings.mongodb_db]
