
// Add A listner to the Canvas to Change Contours:
document.getElementById('canvasOutput').addEventListener('click', function (evt) {
  var celem = document.getElementById('canvasOutput')
  let rect = celem.getBoundingClientRect();
  //TODO Relative Offsets
  x = evt.clientX - (rect.left)
  y = evt.clientY - (rect.top)
  updateContourSelection(x, y)
}, false);

let maxdim = 500
var lastCnt;
var exporter = new THREE.STLExporter();
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, 200 / 200, 2, 1000);
var contours;
var contourMap;
var contourNumMap;
var hierarchy;
var saveFilename = "cookie";

var renderer = new THREE.WebGLRenderer({ alpha: true });
scene.background = new THREE.Color(0xffffffff);

var panel3d = document.getElementById('threeoutput')
var width = panel3d.clientWidth
var height = 300
if (width < 300) {
  height = width
}


renderer.setSize(width, height);
camera.up.set(0, 0, 1)
camera.position.z = 100;
camera.position.x = 40;
camera.position.y = 122;
camera.rotation.z = -3;
camera.rotation.x = 0;
camera.rotation.y = 0;
camera.lookAt(new THREE.Vector3(50, 0, 50)); // Set look at coordinate like this
panel3d.appendChild(renderer.domElement);

var controls = new THREE.OrbitControls(camera, renderer.domElement);


var buttonExportASCII = document.getElementById('exportASCII');
buttonExportASCII.addEventListener('click', saveTextAsFile);

const cameraDebugElem = document.querySelector("#cameraDebug");

function camera_debug() {
  cameraDebugElem.x = camera.position.x.toFixed(3);
  cameraDebugElem.y = camera.position.y.toFixed(3);
  cameraDebugElem.z = camera.position.z.toFixed(3);
  cameraDebugElem.rx = camera.rotation.x.toFixed(3);
  cameraDebugElem.ry = camera.rotation.y.toFixed(3);
  cameraDebugElem.rz = camera.rotation.z.toFixed(3);
}


function animate() {

  requestAnimationFrame(animate);

  // required if controls.enableDamping or controls.autoRotate are set to true
  controls.update();

  renderer.render(scene, camera);

  camera_debug(); // debug the camera if CAMERA_DEBUG = true

}



// Create a ThreeJS Vector from a OpenCV Contour
function getThreeVector(cnt, scaleF, tolerace) {
  var cPoints = []
  scale = scaleF
  lastX = -1000
  lastY = -1000
  for (let i = 0; i < cnt.rows; i++) {

    //Since its unlikely the printer will printer in better than .2 percistion if we are withing .2 in both directions we wont add the point
    //To save render size, we will make this adjustable
    currentX = cnt.data32S[i * 2] * scale
    currentY = cnt.data32S[i * 2 + 1] * scale
    if (lastX + tolerace < currentX || lastX - tolerace > currentX || lastY + tolerace < currentY || lastY - tolerace > currentY) {
      var a = new THREE.Vector2(currentX, currentY)
      cPoints.push(a);
      lastX = currentX
      lastY = currentY

    }
  }

  return cPoints;
}

function getGeoCenter(geo) {
  var center = new THREE.Vector3();

  geo.computeBoundingBox();

  center.x = (geo.boundingBox.max.x + geo.boundingBox.min.x) / 2;
  center.y = (geo.boundingBox.max.y + geo.boundingBox.min.y) / 2;
  center.z = 0;
  console.log(center)
  return center;
}

function getCookieSize() {
  return Number(document.querySelector('cookie-size').currentValue);
}


function getCookieProperties() {
  return document.getElementById('cookie-inputs');
}


//https://stackoverflow.com/questions/609530/download-textarea-contents-as-a-file-using-only-javascript-no-server-side
function saveTextAsFile() {
  var fileNameToSaveAs = saveFilename + ".stl"
  console.log(fileNameToSaveAs)
  generateSTL(lastCnt)
  var textToWrite = exporter.parse(scene);

  var textFileAsBlob = new Blob([textToWrite], { type: 'text/plain' });
  var downloadLink = document.createElement("a");
  downloadLink.download = fileNameToSaveAs;
  downloadLink.innerHTML = "Download File";
  if (window.webkitURL != null) {
    // Chrome allows the link to be clicked
    // without actually adding it to the DOM.
    downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
  }
  else {
    // Firefox requires the link to be added to the DOM
    // before it can be clicked.
    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
  }

  downloadLink.click();
}


function getScaledOutlineShape(cnt, width, maxBoundaryOffetWidth, maxDesiredOut, tol) {

  let rect = cv.boundingRect(cnt);
  let maxCntDimension = Math.max(rect.width, rect.height);


  let walloffset = Math.ceil((maxBoundaryOffetWidth + 1) * 12)
  //We Could do the math, but things run into trouble with overlaps, we can cheat
  //lets draw and image using the contour scaled 10x our cookie cutter size
  //width 10x then we can extract the inner and outer contours and scale them back to be our boundary insuring no werid overlaps
  let dst = cv.Mat.zeros(maxDesiredOut * 10 + walloffset * 2, maxDesiredOut * 10 + walloffset * 2, cv.CV_8UC3);
  let lineThickness = 10 * width

  scale = (maxDesiredOut * 10) / maxCntDimension

  for (let i = 0; i < cnt.rows; i++) {
    nexti = (i + 1) % (cnt.rows)
    var X1 = Math.round(scale * (cnt.data32S[i * 2] - rect.x) + walloffset)
    var Y1 = Math.round(scale * (cnt.data32S[i * 2 + 1] - rect.y) + walloffset)
    var X2 = Math.round(scale * (cnt.data32S[nexti * 2] - rect.x) + walloffset)
    var Y2 = Math.round(scale * (cnt.data32S[nexti * 2 + 1] - rect.y) + walloffset)
    cv.line(dst, new cv.Point(X1, Y1), new cv.Point(X2, Y2), new cv.Scalar(255, 255, 255), lineThickness)
  }


  cv.threshold(dst, dst, 70, 255, cv.THRESH_BINARY_INV);
  cv.cvtColor(dst, dst, cv.COLOR_RGBA2GRAY, 0);
  cv.threshold(dst, dst, 120, 200, cv.THRESH_BINARY);


  //OK Now we should be able to do some contour detection to find the inner and outer lines
  let contours = new cv.MatVector();
  let hierarchy = new cv.Mat();
  cv.findContours(dst, contours, hierarchy, cv.RETR_LIST, cv.CHAIN_APPROX_SIMPLE);

  let largestContour = 1
  let otherContour = 0
  let maxArea = 0.0
  let boundaryCountourAreaCutoff = (dst.cols * dst.rows) * .95 // If an Area is 95% of the entire image is probably the bounday
  // find the biggest (reasonable Contour)
  for (let i = 0; i < contours.size(); ++i) {

    let ncnt = contours.get(i);
    let area = cv.contourArea(ncnt, false);

    if (area * 1.0 > maxArea * 1.0 && area < boundaryCountourAreaCutoff) {
      otherContour = largestContour
      largestContour = i
      maxArea = area

    }
  }

  outer = getThreeVector(contours.get(largestContour), .1, tol)
  inner = getThreeVector(contours.get(otherContour), .1, tol)

  var outShape = new THREE.Shape(outer);
  hole = new THREE.Path();
  hole.setFromPoints(inner);
  outShape.holes = [hole];
  return outShape

}




/**
 * Generate Cookie Cutter
 * @param pointsArray
 */
function generateSTL(cnt) {


  cookieProps = getCookieProperties()

  height = Number(cookieProps.depth);
  handleWidth = 4.2;
  handleThickness = 2;
  width = Number(cookieProps.thickness);
  tolerance = Number(cookieProps.tolerance);

  bevelCutter = Boolean(cookieProps.cutterBevel);
  handleRound = Boolean(cookieProps.handleRound);
  console.log(bevelCutter)
  console.log(handleRound)
  var extrudeSettings = {
    steps: 1,
    depth: 0,
    bevelEnabled: true,
    bevelThickness: height / 2,
    bevelSize: width / 2,
    bevelOffset: 0,
    bevelSegments: 1
  };

  var extrudeSettings2 = {
    steps: 1,
    depth: height / 2,
    bevelEnabled: false,
  };

  if (!bevelCutter) {
    extrudeSettings2.depth = height
  }


  var handleExtrudeSettings = {
    steps: 1,
    depth: handleThickness,
    bevelEnabled: handleRound,
    bevelThickness: .6,
    bevelSize: .6,
    bevelOffset: 0,
    bevelSegments: 5
  };


  cookieSize = getCookieSize()

  //Add some width to the contour to create a shape, and scale to the cookieSize


  var outShape
  var outShape2


  if (bevelCutter) {
    outShape = getScaledOutlineShape(cnt, width / 2, handleWidth, cookieSize, tolerance)
    outShape2 = getScaledOutlineShape(cnt, width * 3 / 2, handleWidth, cookieSize, tolerance)
  } else {
    outShape = getScaledOutlineShape(cnt, width / 2, handleWidth, cookieSize, tolerance)
  }


  handleoutShape = getScaledOutlineShape(cnt, handleWidth, handleWidth, cookieSize, tolerance)

  var material = new THREE.MeshStandardMaterial({ color: 'purple' });
  material.color.set(0xAA22AA);

  var geom = new THREE.Geometry();

  //Extrude the Cutter
  if (bevelCutter) {
    var cgeometry = new THREE.Geometry().fromBufferGeometry(new THREE.ExtrudeBufferGeometry(outShape, extrudeSettings));
    cgeometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, height / 2));
    var cmesh = new THREE.Mesh(cgeometry, material);
    cmesh.updateMatrix()

    var c2geometry = new THREE.Geometry().fromBufferGeometry(new THREE.ExtrudeBufferGeometry(outShape2, extrudeSettings2));
    var c2mesh = new THREE.Mesh(c2geometry, material);
    c2mesh.updateMatrix()

    geom.mergeMesh(cmesh);
    geom.mergeMesh(c2mesh);

  } else {
    var c2geometry = new THREE.Geometry().fromBufferGeometry(new THREE.ExtrudeBufferGeometry(outShape, extrudeSettings2));
    var c2mesh = new THREE.Mesh(c2geometry, material);
    c2mesh.updateMatrix()

    geom.mergeMesh(c2mesh);
  }


  //Extrude the Handle
  var hgeometry = new THREE.Geometry().fromBufferGeometry(new THREE.ExtrudeBufferGeometry(handleoutShape, handleExtrudeSettings));
  var hmesh = new THREE.Mesh(hgeometry, material);
  hmesh.updateMatrix()

  geom.mergeMesh(hmesh);
  geom.mergeVertices(.2)

  // Remove the Old Objects
  while (scene.children.length > 0) {
    scene.remove(scene.children[0]);
  }

  scene.add(new THREE.Mesh(geom, material));

  var light = new THREE.PointLight(0xffffff, 2, 200);
  light.position.set(50, 50, 50);
  scene.add(light);
  var light = new THREE.PointLight(0xffffff, 2, 100);
  light.position.set(-50, -50, -50);

  renderer.render(scene, camera);
  controls.update();
}


let imgElement = document.getElementById('imageSrc');
const imgSelector = document.querySelector("clipart-selector")

function updateImg() {
  imgElement.src = imgSelector.imageSrc;
  saveFilename = imgSelector.saveFilename;
}
imgElement.onload = function () {

  //Add Some Padding so images close to the edge still work
  let srcPre = cv.imread(imgElement);
  let src = new cv.Mat();
  // You can try more different parameters
  offset = 10
  cv.copyMakeBorder(srcPre, src, offset, offset, offset, offset, cv.BORDER_WRAP);

  let dst = src.clone()
  contourMap = cv.Mat.zeros(src.rows, src.cols, cv.CV_8UC3);
  contourNumMap = []
  contIndex = 1

  cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);
  cv.adaptiveThreshold(src, src, 255, cv.ADAPTIVE_THRESH_GAUSSIAN_C, cv.THRESH_BINARY, 5, 1);
  cv.cvtColor(dst, dst, cv.COLOR_RGBA2GRAY, 0);
  cv.cvtColor(dst, dst, cv.COLOR_GRAY2RGBA, 0);

  if (contours) {
    contours.delete();
    contours = new cv.MatVector();
  } else {
    contours = new cv.MatVector();
  }


  hierarchy = new cv.Mat();
  // You can try more different parameters
  cv.findContours(src, contours, hierarchy, cv.RETR_LIST, cv.CHAIN_APPROX_SIMPLE);
  let largestContour = 0
  let maxArea = 0.0
  let clockwise = true
  let boundaryCountourAreaCutoff = (src.cols * src.rows) * .90 // If an Area is 98% of the entire image is probably the bounday

  // find the biggest (reasonable Contour)
  for (let i = 0; i < contours.size(); ++i) {

    let cnt = contours.get(i);
    let area = cv.contourArea(cnt, true);
    let cw = true
    if (area < 0) {
      cw = false
      area = -area
    }

    if (area > boundaryCountourAreaCutoff * .1 && area < boundaryCountourAreaCutoff) {
      cv.drawContours(dst, contours, i, new cv.Scalar(0, 0, 255, 255), 1, cv.LINE_8, hierarchy, 100);
      //Draw a line with the contour # so we can find it from clicks
      cv.drawContours(contourMap, contours, i, new cv.Scalar(contIndex, 0, 255, 255), 30, cv.LINE_8, hierarchy, 100);

      contourNumMap.push(i)
      contIndex++
    }

    if (area < boundaryCountourAreaCutoff && area * 1.0 > maxArea * 1.0) {
      largestContour = i
      maxArea = area
      clockwise = cw

    }

  }
  contIndex = 1
  //Draw a Thin Contour Line to reduce over righting
  for (let i = 0; i < contours.size(); ++i) {

    let cnt = contours.get(i);
    let area = cv.contourArea(cnt, false);

    if (area > boundaryCountourAreaCutoff * .1 && area < boundaryCountourAreaCutoff) {
      cv.drawContours(contourMap, contours, i, new cv.Scalar(contIndex, 0, 255, 255), 10, cv.LINE_8, hierarchy, 100);
      contIndex++
    }
  }

  contIndex = 1
  //Draw a Thin Contour Line to reduce over righting
  for (let i = 0; i < contours.size(); ++i) {

    let cnt = contours.get(i);
    let area = cv.contourArea(cnt, false);

    if (area > boundaryCountourAreaCutoff * .1 && area < boundaryCountourAreaCutoff) {
      cv.drawContours(contourMap, contours, i, new cv.Scalar(contIndex, 0, 255, 255), 3, cv.LINE_8, hierarchy, 100);
      contIndex++
    }
  }


  cv.drawContours(dst, contours, largestContour, new cv.Scalar(255, 0, 0, 255), 2, cv.LINE_8, hierarchy, 100);

  let cnt = contours.get(largestContour);


  //Limit the Output Size
  let scale = maxdim / Math.max(dst.cols, dst.rows)
  let dsize = new cv.Size(scale * dst.cols, scale * dst.rows);
  cv.resize(dst, dst, dsize, 0, 0, cv.INTER_LINEAR);
  cv.resize(contourMap, contourMap, dsize, 0, 0, cv.INTER_LINEAR);

  cv.imshow('canvasOutput', dst);
  src.delete(); dst.delete();



  lastCnt = cnt
  generateSTL(cnt)
  animate();

};


function updateContourSelection(x, y) {

  //Figure out if we clicked close enough to a countor


  if (contourMap) {
    co = contourMap.ucharPtr(y, x)[0];
    if (co != 0) {
      co = contourNumMap[co - 1]

      //Add Some Padding so images close to the edge still work
      let srcPre = cv.imread(imgElement);
      let dst = new cv.Mat();
      // You can try more different parameters
      offset = 10
      cv.copyMakeBorder(srcPre, dst, offset, offset, offset, offset, cv.BORDER_REPLICATE);


      cv.cvtColor(dst, dst, cv.COLOR_RGBA2GRAY, 0);
      cv.cvtColor(dst, dst, cv.COLOR_GRAY2RGBA, 0);
      let boundaryCountourAreaCutoff = (dst.cols * dst.rows) * .90 // If an Area is 98% of the entire image is probably the bounday

      for (let i = 0; i < contours.size(); ++i) {

        let cnt = contours.get(i);
        let area = cv.contourArea(cnt, true);
        let cw = true
        if (area < 0) {
          cw = false
          area = -area
        }
        if (area > boundaryCountourAreaCutoff * .1 && area < boundaryCountourAreaCutoff) {
          cv.drawContours(dst, contours, i, new cv.Scalar(0, 0, 255, 255), 1, cv.LINE_8, hierarchy, 100);
        }
      }

      cv.drawContours(dst, contours, co, new cv.Scalar(255, 0, 0, 255), 2, cv.LINE_8, hierarchy, 100);
      let cnt = contours.get(co);

      //Limit the Output Size
      let scale = maxdim / Math.max(dst.cols, dst.rows)
      let dsize = new cv.Size(scale * dst.cols, scale * dst.rows);
      cv.resize(dst, dst, dsize, 0, 0, cv.INTER_LINEAR);
      cv.imshow('canvasOutput', dst);
      dst.delete();

      lastCnt = cnt
      generateSTL(cnt)
      animate();

    }
  }
  /*
  let dst = cv.imread(imgElement);

  cv.cvtColor(dst, dst, cv.COLOR_RGBA2GRAY, 0);
  cv.cvtColor(dst, dst, cv.COLOR_GRAY2RGBA, 0);


  let maxArea =  0.0
  let clockwise = true
  let boundaryCountourAreaCutoff = (src.cols * src.rows) * .90 // If an Area is 98% of the entire image is probably the bounday

  // find the biggest (reasonable Contour)
  for (let i = 0; i < contours.size(); ++i) {

      let cnt = contours.get(i);
      let area = cv.contourArea(cnt, true);
      let cw = true
      if (area < 0) {
        cw = false
        area = -area
      }

      if (area > boundaryCountourAreaCutoff * .1 && area < boundaryCountourAreaCutoff) {
        cv.drawContours(dst, contours, i, new cv.Scalar(0,0,255,255), 1, cv.LINE_8, hierarchy, 100);
        //Draw a line with the contour # so we can find it from clicks
        cv.drawContours(contourMap, contours, i, new cv.Scalar(i,0,255,255), 10, cv.LINE_8, hierarchy, 100);
      }

      if (area < boundaryCountourAreaCutoff && area*1.0 > maxArea*1.0) {
          largestContour = i
          maxArea = area
          clockwise = cw

      }

  }

    //Draw a Thin Contour Line to reduce over righting
    for (let i = 0; i < contours.size(); ++i) {

      let cnt = contours.get(i);
      let area = cv.contourArea(cnt, false);

      if (area > boundaryCountourAreaCutoff * .1 && area < boundaryCountourAreaCutoff) {
        cv.drawContours(contourMap, contours, i, new cv.Scalar(i,0,255,255), 2, cv.LINE_8, hierarchy, 100);
      }
    }


  cv.drawContours(dst, contours, largestContour, new cv.Scalar(255,0,0,255), 2, cv.LINE_8, hierarchy, 100);

  let cnt = contours.get(largestContour);


  //Limit the Output Size
  let dsize = new cv.Size(500, 500);

  cv.resize(dst, dst, dsize, 0, 0, cv.INTER_AREA);
  cv.resize(contourMap, contourMap, dsize, 0, 0, cv.INTER_AREA);
  cv.imshow('canvasOutput', dst);
  src.delete(); dst.delete(); hierarchy.delete();



  lastCnt = cnt
  generateSTL(cnt)
  animate();
  */
};



function onOpenCvReady() {

  const urlParams = new URLSearchParams(window.location.search);
  var imageUrl = urlParams.get('image')

  if (!imageUrl) return;

  if (imageUrl != null && imageUrl.length > 0) {


    if (imageUrl.toLowerCase().startsWith("http")) {

      var xhr = new XMLHttpRequest();
      xhr.responseType = 'blob'; //so you can access the response like a normal URL
      xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
          imgElement.src = URL.createObjectURL(xhr.response); //create <img> with src set to the blob
        } else {
          var xhr2 = new XMLHttpRequest();
          xhr2.responseType = 'blob'; //so you can access the response like a normal URL
          xhr2.onreadystatechange = function () {
            if (xhr2.readyState == XMLHttpRequest.DONE && xhr2.status == 200) {
              imgElement.src = URL.createObjectURL(xhr2.response); //create <img> with src set to the blob
            }
          };
          xhr2.open('GET', "https://cors-anywhere.herokuapp.com/" + imageUrl, true);
          xhr2.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
          xhr2.send();
        }
      };
      xhr.open('GET', imageUrl, true);
      xhr.send();
    } else {
      imgElement.src = imageUrl
    }
  }
}
