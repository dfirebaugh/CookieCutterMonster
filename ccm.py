from flask import Flask, request, render_template, send_from_directory
import imageProcessing
import stlGenerator
import json

app = Flask(__name__)


@app.route('/')
def uploadPage():
    return render_template('cookie2.html') 


@app.route('/lib/<path:path>')
def send_js(path):
    return send_from_directory('lib', path)

@app.route("/api/getCookieCutterFromPath", methods=['POST'])
def getPath():
    if 'points' in request.form and 'size' in request.form:

        size = int(request.form['size'])
        points = json.loads(request.form['points'])

        return stlGenerator.createCookieFromPoints(stlGenerator.jsonPoints(points), size)

    return "Hello, World!"


@app.route("/api/getCookieCutter", methods=['POST'])
def getCookieCutter():
    print(request.files)
    print(request.form)
    if 'image' in request.files:

        data = request.files['image']
        size = int(request.form['size'])
        print(size)
        points = imageProcessing.detectEdges(data)
        return stlGenerator.createCookieFromPoints(points, size)

    return "Hello, World!"