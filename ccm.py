from flask import Flask, request, render_template
import imageProcessing
import stlGenerator

app = Flask(__name__)


@app.route('/')
def uploadPage():
    return render_template('cookie.html') 


@app.route('/FileSaver.js')
def fileSaverPage():
    return render_template('FileSaver.js') 

@app.route("/api/getPath", methods=['POST'])
def getPath():
    print(request.files)
    if 'image' in request.files:

        print("Got an Image")
        data = request.files['image']
    return "Hello, World!"


@app.route("/api/getCookieCutter", methods=['POST'])
def getCookieCutter():
    print(request.files)
    print(request.form)
    if 'image' in request.files:

        data = request.files['image']
        points = imageProcessing.detectEdges(data)
        return stlGenerator.createCookieFromPoints(points)

    return "Hello, World!"