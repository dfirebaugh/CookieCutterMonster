import viewscad
from flask import send_file
import os
import numpy as np
import tempfile
import json

np.set_printoptions(threshold=np.inf)

# createOpenScadData: Takes a Closed Point Array and converts it to a OpenScad Cookie Cutter
def createOpenScadCookieCutter(points):
    pointsArray = np.array2string(points, formatter={'float_kind':lambda x: "%.3f" % x}).replace('\n', '').replace(' ', ',')
    with open('scad.template', 'r') as file:
        template = file.read()

    scad = template.replace('COOKIE_DATA_HERE',pointsArray)
    return scad

# Convert a SCAD Document to an STL
def openScadToSTL(scad):
    r = viewscad.Renderer()
    stl_tmp_file = 'tmp.stl'
    r.render(scad, outfile=stl_tmp_file)

    return send_file(stl_tmp_file, as_attachment=True)


# Scale points to 
def scalePointsArray(points, size):

    x = points[:, 0]
    y = points[:, 1]
    #Get the Min/Max of Each Dimension
    xmax = np.amax(x)
    xmin = np.amin(x)
    ymax = np.amax(y)
    ymin = np.amin(y)

    scale = size/max(xmax - xmin, ymax - ymin)

    #Offset to 0 and scale
    x = ((x - xmin)*scale  + 1)
    y = ((y - ymin)*scale  + 1)
    newpoints = np.stack((x, y), axis=-1)
    return newpoints





# Create a Cookie Cutter From a Set of Points
def createCookieFromPoints(points, size=75):
    
    return openScadToSTL(createOpenScadCookieCutter(scalePointsArray(points, size)))


def jsonPoints(points):
    pArray = [[p["x"], p["y"]] for p in points]
    return np.array(pArray)

