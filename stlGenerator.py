import viewscad
from flask import send_file
import os
import numpy as np
import tempfile

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


# Create a Cookie Cutter From a Set of Points
def createCookieFromPoints(points, size=75):
    print(points)
    return openScadToSTL(createOpenScadCookieCutter(points))

