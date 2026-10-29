import os
import shutil

UPLOAD_FOLDER = "uploads"


def save_report(file):
    """
    Save uploaded medical report to the uploads folder.
    """

    # Create uploads folder if it doesn't exist
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)

    # Original filename
    filename = file.filename

    # Complete file path
    file_path = os.path.join(UPLOAD_FOLDER, filename)

    # Save file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return file_path