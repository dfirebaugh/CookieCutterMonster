
var exporter = new THREE.STLExporter();
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, 200/200, 2, 1000 );

var renderer = new THREE.WebGLRenderer({ alpha: true });
scene.background = new THREE.Color( 0xffffffff );

renderer.setSize( 200,200 );
camera.position.z = 100;

document.getElementById( 'threeoutput' ).appendChild( renderer.domElement );

var controls = new THREE.OrbitControls( camera, renderer.domElement );  


var buttonExportASCII = document.getElementById( 'exportASCII' );
buttonExportASCII.addEventListener( 'click', saveTextAsFile );
        
function animate() {

requestAnimationFrame( animate );

// required if controls.enableDamping or controls.autoRotate are set to true
controls.update();

renderer.render( scene, camera );

}


      
// Create a ThreeJS Vector from a OpenCV Contour
function getThreeVector(cnt, scaleF)
    {

       var cPoints=[]
        scale = scaleF

        for (let i = 0; i < cnt.rows; i++) {
            var a = new THREE.Vector2( cnt.data32S[i*2] * scale, cnt.data32S[i*2 + 1] * scale)
            
            cPoints.push(a);   
        }

        return cPoints;
}


function getCookieSize() {
        return document.getElementById('cookieSize').value;
  }

  //https://stackoverflow.com/questions/609530/download-textarea-contents-as-a-file-using-only-javascript-no-server-side
  function saveTextAsFile()
    {
      var fileNameToSaveAs = "cookie.stl"
       var textToWrite = exporter.parse( scene );

    	var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'}); 
    	var downloadLink = document.createElement("a");
    	downloadLink.download = fileNameToSaveAs;
    	downloadLink.innerHTML = "Download File";
    	if (window.webkitURL != null)
    	{
    		// Chrome allows the link to be clicked
    		// without actually adding it to the DOM.
    		downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    	}
    	else
    	{
    		// Firefox requires the link to be added to the DOM
    		// before it can be clicked.
    		downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    		downloadLink.onclick = destroyClickedElement;
    		downloadLink.style.display = "none";
    		document.body.appendChild(downloadLink);
    	}
    
    	downloadLink.click();
    }


    function getScaledOutlineShape(cnt, width, maxBoundaryOffetWidth, maxDesiredOut) {

      let rect = cv.boundingRect(cnt);
      let maxCntDimension = Math.max(rect.width,rect.height);
      

      let walloffset = Math.ceil((maxBoundaryOffetWidth+1)*12)
      //We Could do the math, but things run into trouble with overlaps, we can cheat
      //lets draw and image using the contour scaled 10x our cookie cutter size
      //width 10x then we can extract the inner and outer contours and scale them back to be our boundary insuring no werid overlaps
      let dst = cv.Mat.zeros(maxDesiredOut*10+walloffset*2, maxDesiredOut*10+ walloffset*2, cv.CV_8UC3);
      let lineThickness = 10 * width

      scale = (maxDesiredOut * 10) / maxCntDimension

      for (let i = 0; i < cnt.rows; i++) {
        nexti = (i+1)%(cnt.rows)
            var X1 = Math.round(scale*(cnt.data32S[i*2] - rect.x) +walloffset)
            var Y1 = Math.round(scale*(cnt.data32S[i*2 + 1] - rect.y)  + walloffset)
            var X2 = Math.round(scale*(cnt.data32S[nexti*2] - rect.x)  + walloffset)
            var Y2 = Math.round(scale*(cnt.data32S[nexti*2 + 1] - rect.y)  + walloffset)
            cv.line(dst, new cv.Point(X1, Y1), new cv.Point(X2, Y2), new cv.Scalar(255, 255, 255), lineThickness)
        }

        
      cv.threshold(dst, dst,  70, 255, cv.THRESH_BINARY_INV);
      cv.cvtColor(dst, dst, cv.COLOR_RGBA2GRAY, 0);
      cv.threshold(dst, dst, 120, 200, cv.THRESH_BINARY);


      //OK Now we should be able to do some contour detection to find the inner and outer lines
      let contours = new cv.MatVector();
      let hierarchy = new cv.Mat();
      cv.findContours(dst, contours, hierarchy, cv.RETR_LIST, cv.CHAIN_APPROX_SIMPLE);

      let largestContour =  1
      let otherContour =  0
      let maxArea =  0.0
      let boundaryCountourAreaCutoff = (dst.cols * dst.rows) * .95 // If an Area is 95% of the entire image is probably the bounday
      // find the biggest (reasonable Contour)
      for (let i = 0; i < contours.size(); ++i) {
          
          let ncnt = contours.get(i);
          let area = cv.contourArea(ncnt, false);

          if ( area*1.0 > maxArea*1.0 && area < boundaryCountourAreaCutoff) {
              otherContour = largestContour
              largestContour = i
              maxArea = area
              
          }
      }

      outer = getThreeVector(contours.get(largestContour),.1)
      inner = getThreeVector(contours.get(otherContour),.1)

      var outShape = new THREE.Shape(outer);
      hole = new THREE.Path();
      hole.fromPoints(inner);
      outShape.holes = [hole];
      return outShape

    }

  /**
   * Generate Cookie Cutter
   * @param pointsArray
   */
    function generateSTL(cnt, clockwise){

 
      height = 15;
      handleWidth = 4.5;
      handleThickness = 2.2;
      width = 1;

      var extrudeSettings = {
          steps: 10,
          depth: height,
          bevelEnabled: false,
      };

      var handleExtrudeSettings = {
          steps: 10,
          depth: handleThickness,
          bevelEnabled: false
      };


      cookieSize = getCookieSize()

      //Add some width to the contour to create a shape, and scale to the cookieSize
      outShape = getScaledOutlineShape(cnt, width, handleWidth, cookieSize)
      handleoutShape = getScaledOutlineShape(cnt, handleWidth, handleWidth, cookieSize)

      var material =  new THREE.MeshStandardMaterial({color: 'red'}); 
      material.color.set(0x000088);  


      //Extrude the Cutter
      var cgeometry = new THREE.Geometry().fromBufferGeometry(new THREE.ExtrudeBufferGeometry( outShape, extrudeSettings ));
      var cmesh = new THREE.Mesh( cgeometry, material ) ;
      cmesh.updateMatrix()

       //Extrude the Handle
       var hgeometry = new THREE.Geometry().fromBufferGeometry(new THREE.ExtrudeBufferGeometry( handleoutShape, handleExtrudeSettings ));
       var hmesh = new THREE.Mesh( hgeometry, material ) ;
       hmesh.updateMatrix()

      var geom = new THREE.Geometry();
      geom.mergeMesh(cmesh);
      geom.mergeMesh(hmesh);
      geom.mergeVertices(); // optional

      // Remove the Old Objects
      while(scene.children.length > 0){ 
          scene.remove(scene.children[0]); 
      }

      scene.add(new THREE.Mesh(geom, material));

     var light = new THREE.PointLight( 0xffffff, 2, 200 );
    light.position.set( 50, 50, 50 );
    scene.add( light );

    renderer.render( scene, camera );
    controls.update();  
  }


let imgElement = document.getElementById('imageSrc');
let inputElement = document.getElementById('fileInput');
inputElement.addEventListener('change', (e) => {
  imgElement.src = URL.createObjectURL(e.target.files[0]);
}, false);


imgElement.onload = function() {
let src = cv.imread(imgElement);
let dst = cv.imread(imgElement);
cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);
cv.threshold(src, src, 120, 200, cv.THRESH_BINARY);
cv.cvtColor(dst, dst, cv.COLOR_RGBA2GRAY, 0);
cv.cvtColor(dst, dst, cv.COLOR_GRAY2RGBA, 0);

let contours = new cv.MatVector();
let hierarchy = new cv.Mat();
// You can try more different parameters
cv.findContours(src, contours, hierarchy, cv.RETR_LIST, cv.CHAIN_APPROX_SIMPLE);
let largestContour =  0
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
    if (area < boundaryCountourAreaCutoff && area*1.0 > maxArea*1.0) {
        largestContour = i
        maxArea = area
        clockwise = cw
        
    }

}


cv.drawContours(dst, contours, largestContour, new cv.Scalar(255,0,0,255), 2, cv.LINE_8, hierarchy, 100);

let cnt = contours.get(largestContour);


//Limit the Output Size
let dsize = new cv.Size(300, 300);
cv.resize(dst, dst, dsize, 0, 0, cv.INTER_AREA);
cv.imshow('canvasOutput', dst);
src.delete(); dst.delete(); contours.delete(); hierarchy.delete();

generateSTL(cnt, clockwise)
animate();

};



function onOpenCvReady() {
  document.getElementById('status').hidden = true;
}