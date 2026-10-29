from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import os

from database import SessionLocal
from models import (
    User,
    MedicalDocument,
)

from auth import hash_password, verify_password
from chatbot import ask_ai
from report import save_report
from ocr import extract_text
from symptom import analyze_symptoms


app = FastAPI(
    title="MediAssist AI API",
    description="Personalized Generative AI Healthcare Assistant",
    version="2.0.0"
)


# ==========================================
# CORS
# ==========================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==========================================
# REQUEST MODELS
# ==========================================

class RegisterRequest(BaseModel):
    name: str
    email: str
    password: str


class LoginRequest(BaseModel):
    email: str
    password: str


class ChatRequest(BaseModel):
    message: str


class SymptomRequest(BaseModel):
    symptoms: str


# ==========================================
# HOME
# ==========================================

@app.get("/")
def home():

    return {
        "message": "Welcome to MediAssist AI",
        "version": "2.0.0"
    }


# ==========================================
# DATABASE TEST
# ==========================================

@app.get("/test-db")
def test_database():

    db = None

    try:

        db = SessionLocal()

        return {
            "message": "MySQL connected successfully!"
        }

    except Exception as e:

        return {
            "error": str(e)
        }

    finally:

        if db:
            db.close()


# ==========================================
# REGISTER
# ==========================================

@app.post("/register")
def register(
    user: RegisterRequest
):

    db = SessionLocal()

    try:

        existing_user = (
            db.query(User)
            .filter(
                User.email == user.email
            )
            .first()
        )


        if existing_user:

            return {
                "message": "Email already registered"
            }


        hashed_password = hash_password(
            user.password
        )


        new_user = User(
            name=user.name,
            email=user.email,
            password=hashed_password,
            role="patient"
        )


        db.add(new_user)

        db.commit()

        db.refresh(new_user)


        return {
            "message": "Registration successful",
            "user_id": new_user.id
        }


    except Exception as e:

        db.rollback()

        return {
            "error": str(e)
        }


    finally:

        db.close()


# ==========================================
# LOGIN
# ==========================================

@app.post("/login")
def login(
    user: LoginRequest
):

    db = SessionLocal()

    try:

        existing_user = (
            db.query(User)
            .filter(
                User.email == user.email
            )
            .first()
        )


        if not existing_user:

            return {
                "message": "Invalid email or password"
            }


        password_correct = verify_password(
            user.password,
            existing_user.password
        )


        if not password_correct:

            return {
                "message": "Invalid email or password"
            }


        return {
            "message": "Login successful",
            "user_id": existing_user.id,
            "name": existing_user.name,
            "email": existing_user.email,
            "role": existing_user.role
        }


    except Exception as e:

        return {
            "error": str(e)
        }


    finally:

        db.close()


# ==========================================
# AI HEALTH CHAT
# ==========================================

@app.post("/chat")
def chat(
    request: ChatRequest
):

    try:

        if not request.message.strip():

            return {
                "error": "Please enter a message."
            }


        answer = ask_ai(
            request.message
        )


        return {
            "message": answer
        }


    except Exception as e:

        return {
            "error": str(e)
        }


# ==========================================
# SYMPTOM ASSISTANT
# ==========================================

@app.post("/symptoms")
def symptoms(
    request: SymptomRequest
):

    try:

        if not request.symptoms.strip():

            return {
                "error": "Please enter your symptoms."
            }


        result = analyze_symptoms(
            request.symptoms
        )


        return {
            "message": result
        }


    except Exception as e:

        return {
            "error": str(e)
        }


# ==========================================
# BASIC REPORT UPLOAD
# ==========================================

@app.post("/upload-report")
async def upload_report(
    user_id: int,
    file: UploadFile = File(...)
):

    db = SessionLocal()

    try:

        # Check user
        user = (
            db.query(User)
            .filter(
                User.id == user_id
            )
            .first()
        )


        if not user:

            return {
                "error": "User not found"
            }


        # Save physical file
        file_path = save_report(file)


        # Detect document type
        extension = os.path.splitext(
            file.filename
        )[1].lower()


        if extension == ".pdf":

            document_type = "PDF"

        elif extension in [
    ".jpg",
    ".jpeg",
    ".png",
    ".bmp",
    ".tiff",
    ".webp"
]:

            document_type = "Image"

        else:

            document_type = "Other"


        # Extract text
        extracted_text = extract_text(
            file_path
        )


        # Create database record
        document = MedicalDocument(

            user_id=user_id,

            document_name=file.filename,

            document_type=document_type,

            file_path=file_path,

            extracted_text=extracted_text,

            status="processed"
        )


        db.add(document)

        db.commit()

        db.refresh(document)


        return {

            "message":
                "Medical document uploaded successfully",

            "document_id":
                document.id,

            "user_id":
                user_id,

            "filename":
                file.filename,

            "document_type":
                document_type,

            "status":
                document.status,

            "extracted_text":
                extracted_text
        }


    except Exception as e:

        db.rollback()

        return {
            "error": str(e)
        }


    finally:

        db.close()


# ==========================================
# GET USER MEDICAL DOCUMENTS
# ==========================================

@app.get(
    "/my-documents/{user_id}"
)
def get_my_documents(
    user_id: int
):

    db = SessionLocal()

    try:

        documents = (
            db.query(MedicalDocument)
            .filter(
                MedicalDocument.user_id
                == user_id
            )
            .order_by(
                MedicalDocument.upload_date.desc()
            )
            .all()
        )


        result = []


        for document in documents:

            result.append({

                "id":
                    document.id,

                "document_name":
                    document.document_name,

                "document_type":
                    document.document_type,

                "upload_date":
                    (
                        document.upload_date.isoformat()
                        if document.upload_date
                        else None
                    ),

                "status":
                    document.status,

                "extracted_text":
                    document.extracted_text
            })


        return {
            "user_id": user_id,
            "documents": result,
            "count": len(result)
        }


    except Exception as e:

        return {
            "error": str(e)
        }


    finally:

        db.close()


# ==========================================
# GET SINGLE DOCUMENT
# ==========================================

@app.get(
    "/document/{document_id}"
)
def get_document(
    document_id: int
):

    db = SessionLocal()

    try:

        document = (
            db.query(MedicalDocument)
            .filter(
                MedicalDocument.id
                == document_id
            )
            .first()
        )


        if not document:

            return {
                "error": "Document not found"
            }


        return {

            "id":
                document.id,

            "user_id":
                document.user_id,

            "document_name":
                document.document_name,

            "document_type":
                document.document_type,

            "file_path":
                document.file_path,

            "upload_date":
                (
                    document.upload_date.isoformat()
                    if document.upload_date
                    else None
                ),

            "status":
                document.status,

            "extracted_text":
                document.extracted_text
        }


    except Exception as e:

        return {
            "error": str(e)
        }


    finally:

        db.close()