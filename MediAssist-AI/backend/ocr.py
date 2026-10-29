import os

from PIL import (
    Image,
    ImageEnhance,
    ImageFilter,
    ImageOps
)

import pytesseract
from pypdf import PdfReader


# Tesseract location
pytesseract.pytesseract.tesseract_cmd = (
    r"C:\Program Files\Tesseract-OCR\tesseract.exe"
)


def preprocess_image(image):
    """
    Improve medical report image before OCR.
    """

    # 1. Convert to grayscale
    image = image.convert("L")

    # 2. Increase image size
    width, height = image.size

    image = image.resize(
        (width * 2, height * 2),
        Image.Resampling.LANCZOS
    )

    # 3. Improve contrast
    image = ImageOps.autocontrast(image)

    image = ImageEnhance.Contrast(image).enhance(2.2)

    # 4. Reduce small noise
    image = image.filter(
        ImageFilter.MedianFilter(size=3)
    )

    # 5. Sharpen text
    image = image.filter(
        ImageFilter.SHARPEN
    )

    # 6. Make text clearer using threshold
    image = image.point(
        lambda pixel: 0 if pixel < 180 else 255
    )

    return image


def extract_text_from_image(file_path):

    image = Image.open(file_path)

    image = preprocess_image(image)

    text = pytesseract.image_to_string(
        image,
        config="--oem 3 --psm 6"
    )

    return text.strip()


def extract_text_from_pdf(file_path):

    reader = PdfReader(file_path)

    text = ""

    for page in reader.pages:

        page_text = page.extract_text()

        if page_text:
            text += page_text + "\n"

    return text.strip()


def extract_text(file_path):

    extension = os.path.splitext(
        file_path
    )[1].lower()

    if extension in [
    ".jpg",
    ".jpeg",
    ".png",
    ".bmp",
    ".tiff",
    ".webp"
]:

        return extract_text_from_image(file_path)

    elif extension == ".pdf":

        return extract_text_from_pdf(file_path)

    else:

        return "Unsupported file type."