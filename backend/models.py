from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    Date,
    DateTime,
    ForeignKey,
)
from sqlalchemy.orm import relationship
from database import Base


# ==========================================
# USER
# ==========================================

class User(Base):

    __tablename__ = "users"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(
        String(100),
        nullable=False
    )

    email = Column(
        String(100),
        unique=True,
        nullable=False
    )

    password = Column(
        String(255),
        nullable=False
    )

    role = Column(
        String(30),
        nullable=False,
        default="patient"
    )


    created_at = Column(
        DateTime
    )


    # Relationships

    medical_documents = relationship(
        "MedicalDocument",
        back_populates="user",
        cascade="all, delete-orphan"
    )

    symptom_logs = relationship(
        "SymptomLog",
        back_populates="user",
        cascade="all, delete-orphan"
    )

    chat_sessions = relationship(
        "ChatSession",
        back_populates="user",
        cascade="all, delete-orphan"
    )

    activities = relationship(
        "ActivityLog",
        back_populates="user",
        cascade="all, delete-orphan"
    )


# ==========================================
# MEDICAL DOCUMENT
# ==========================================

class MedicalDocument(Base):

    __tablename__ = "medical_documents"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    user_id = Column(
        Integer,
        ForeignKey(
            "users.id",
            ondelete="CASCADE"
        ),
        nullable=False
    )


    document_name = Column(
        String(255),
        nullable=False
    )


    document_type = Column(
        String(50)
    )


    file_path = Column(
        String(500),
        nullable=False
    )


    extracted_text = Column(
        Text
    )


    upload_date = Column(
        DateTime
    )


    status = Column(
        String(30),
        default="uploaded"
    )


    user = relationship(
        "User",
        back_populates="medical_documents"
    )


    report_values = relationship(
        "ReportValue",
        back_populates="document",
        cascade="all, delete-orphan"
    )


# ==========================================
# REPORT VALUE
# ==========================================

class ReportValue(Base):

    __tablename__ = "report_values"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    document_id = Column(
        Integer,
        ForeignKey(
            "medical_documents.id",
            ondelete="CASCADE"
        ),
        nullable=False
    )


    parameter_name = Column(
        String(150),
        nullable=False
    )


    parameter_value = Column(
        String(100)
    )


    unit = Column(
        String(50)
    )


    reference_range = Column(
        String(100)
    )


    recorded_date = Column(
        Date
    )


    document = relationship(
        "MedicalDocument",
        back_populates="report_values"
    )


# ==========================================
# SYMPTOM LOG
# ==========================================

class SymptomLog(Base):

    __tablename__ = "symptom_logs"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    user_id = Column(
        Integer,
        ForeignKey(
            "users.id",
            ondelete="CASCADE"
        ),
        nullable=False
    )


    symptoms = Column(
        Text,
        nullable=False
    )


    ai_summary = Column(
        Text
    )


    created_at = Column(
        DateTime
    )


    user = relationship(
        "User",
        back_populates="symptom_logs"
    )


# ==========================================
# CHAT SESSION
# ==========================================

class ChatSession(Base):

    __tablename__ = "chat_sessions"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    user_id = Column(
        Integer,
        ForeignKey(
            "users.id",
            ondelete="CASCADE"
        ),
        nullable=False
    )


    title = Column(
        String(255),
        default="New Health Chat"
    )


    created_at = Column(
        DateTime
    )


    updated_at = Column(
        DateTime
    )


    user = relationship(
        "User",
        back_populates="chat_sessions"
    )


    messages = relationship(
        "ChatMessage",
        back_populates="session",
        cascade="all, delete-orphan"
    )


# ==========================================
# CHAT MESSAGE
# ==========================================

class ChatMessage(Base):

    __tablename__ = "chat_messages"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    session_id = Column(
        Integer,
        ForeignKey(
            "chat_sessions.id",
            ondelete="CASCADE"
        ),
        nullable=False
    )


    sender = Column(
        String(20),
        nullable=False
    )


    message = Column(
        Text,
        nullable=False
    )


    created_at = Column(
        DateTime
    )


    session = relationship(
        "ChatSession",
        back_populates="messages"
    )


# ==========================================
# PROFESSIONAL / PATIENT ACCESS
# ==========================================

class ProfessionalPatientAccess(Base):

    __tablename__ = "professional_patient_access"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    professional_id = Column(
        Integer,
        ForeignKey(
            "users.id",
            ondelete="CASCADE"
        ),
        nullable=False
    )


    patient_id = Column(
        Integer,
        ForeignKey(
            "users.id",
            ondelete="CASCADE"
        ),
        nullable=False
    )


    access_status = Column(
        String(30),
        default="pending"
    )


    granted_at = Column(
        DateTime
    )


    created_at = Column(
        DateTime
    )


# ==========================================
# ACTIVITY LOG
# ==========================================

class ActivityLog(Base):

    __tablename__ = "activity_logs"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    user_id = Column(
        Integer,
        ForeignKey(
            "users.id",
            ondelete="CASCADE"
        ),
        nullable=False
    )


    activity_type = Column(
        String(50),
        nullable=False
    )


    description = Column(
        String(500)
    )


    created_at = Column(
        DateTime
    )


    user = relationship(
        "User",
        back_populates="activities"
    )