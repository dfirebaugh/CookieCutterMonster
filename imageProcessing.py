
import numpy as np
import matplotlib.pyplot as plt
from skimage.color import rgb2gray
from skimage import data
from skimage.filters import gaussian
from skimage.segmentation import active_contour
from scipy import misc
from skimage import feature
from skimage.morphology import watershed
from skimage import data
from skimage.exposure import histogram
from skimage.feature import canny
from scipy import ndimage as ndi
import imageio
from skimage import measure

# Preprocess Image: Takes a File Stream/Name/URI and processes the image to prepare for contour scanning
def preprocessImage(fileStream):

    img = imageio.imread(fileStream)

    img = rgb2gray(img)
        
    edges = canny(img)
    fill_img = gaussian(ndi.binary_fill_holes(edges),3)

    return fill_img

# Preprocess Image: Finds the Outline of a Black image in a white background
def extractPath(img):
    coutours = measure.find_contours(img, 0.8)
    return coutours[0]


# Detected Edges From a File Stream/Name/URI 
def detectEdges(fileStream):
    return extractPath(preprocessImage(fileStream))

print(detectEdges("sample.png"))