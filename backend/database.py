from sqlalchemy import create_engine
from sqlalchemy.engine import URL
from sqlalchemy.orm import sessionmaker, declarative_base

DB_PASSWORD = "Somesh@123"

database_url = URL.create(
    drivername="mysql+mysqlconnector",
    username="root",
    password=DB_PASSWORD,
    host="localhost",
    database="mediassist_db"
)

engine = create_engine(database_url)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()