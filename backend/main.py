from fastapi import FastAPI, File, UploadFile
from fastapi.responses import Response
from fastapi.middleware.cors import CORSMiddleware
from rembg import remove
from PIL import Image, ImageOps
import cv2
import numpy as np
import io
app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    #allow_origins=["http://localhost:4000"],  # Allow requests from Next.js frontend
    allow_origins=["*"],  # Allow requests from any origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)
'''
@app.post("/remove-bg/")
async def process_image(file: UploadFile = File(...)):
    # Read image file
    image_bytes = await file.read()
    
    # Open image using PIL
    input_image = Image.open(io.BytesIO(image_bytes)).convert("L")  # Convert to grayscale
    
    # Invert the image (black <-> white)
    inverted_image = ImageOps.invert(input_image)
    
    # Convert to RGBA and remove background
    inverted_image = inverted_image.convert("RGBA")
    output_image = remove(inverted_image)
    
    # Save the output to a bytes buffer
    img_io = io.BytesIO()
    output_image.save(img_io, format="PNG")
    img_io.seek(0)
    
    # Return image as response
    return Response(content=img_io.getvalue(), media_type="image/png")

'''
@app.post("/removebg")
async def process_image(file: UploadFile = File(...)):
    # Read image file
    image_bytes = await file.read()
    
    # Open image using OpenCV
    np_img = np.frombuffer(image_bytes, np.uint8)
    image = cv2.imdecode(np_img, cv2.IMREAD_COLOR)
    
    # Convert to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    # Apply threshold to extract signature
    _, thresh = cv2.threshold(gray, 150, 255, cv2.THRESH_BINARY_INV)
    
    # Create a mask
    mask = thresh
    
    # Convert to 4-channel (RGBA) image
    b, g, r = cv2.split(image)
    alpha = mask
    rgba = cv2.merge([b, g, r, alpha])
    
    # Convert to PIL image
    pil_img = Image.fromarray(rgba)
    
    # Save the output to a bytes buffer
    img_io = io.BytesIO()
    pil_img.save(img_io, format="PNG")
    img_io.seek(0)
    
    # Return image as response
    return Response(content=img_io.getvalue(), media_type="image/png")