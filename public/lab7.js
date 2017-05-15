var container, scene, camera, renderer, controls, stats;
// var clock = new THREE.Clock();
// custom global variables
var mesh;
init();
animate();
// FUNCTIONS
function init() {
  // SCENE
  scene = new THREE.Scene();
  // CAMERA
  var SCREEN_WIDTH = window.innerWidth,
    SCREEN_HEIGHT = window.innerHeight;
  var VIEW_ANGLE = 45,
    ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT,
    NEAR = 0.1,
    FAR = 20000;
  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  scene.add(camera);
  camera.position.set(0, 150, 400);
  camera.lookAt(scene.position);
  // RENDERER
  if (Detector.webgl)
    renderer = new THREE.WebGLRenderer({
      antialias: true
    });
  else
    renderer = new THREE.CanvasRenderer();
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
  container = document.getElementById('ThreeJS');
  container.appendChild(renderer.domElement);
  // CONTROLS
  controls = new THREE.TrackballControls(camera, renderer.domElement);
  controls.noPan = true;
  // LIGHT
  var light = new THREE.PointLight(0xffffff);
  // light.position.set(100,250,100);
  light.position = camera.position;
  scene.add(light);
  var light = new THREE.PointLight(0x888888);
  light.position.set(-100, -250, -100);
  scene.add(light);

  // SKYBOX
  var skyBoxGeometry = new THREE.CubeGeometry(10000, 10000, 10000);
  var skyBoxMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.BackSide
  });
  var skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial);
  scene.add(skyBox);

  ////////////
  // CUSTOM //
  ////////////

  this.polyhedronMesh = polyhedronDataToMesh(POLYHEDRA.TriangularPrism);
  polyhedronMesh.scale.multiplyScalar(0.90);
  this.polyhedronMesh.position.set(0, 0, 0);
  scene.add(polyhedronMesh);


}
var faces;

function displayMesh(mesh) {
  scene.remove(polyhedronMesh);
  polyhedronMesh = mesh;
  scene.add(polyhedronMesh);
}

function polyhedronDataToMesh(data) {
  var polyhedron = new THREE.Object3D();

  // convert vertex data to THREE.js vectors
  var vertex = []
  for (var i = 0; i < data.vertex.length; i++)
    vertex.push(new THREE.Vector3(data.vertex[i][0], data.vertex[i][1], data.vertex[i][2]).multiplyScalar(100));
  // render vertices as spheres
  var vertexGeometry = new THREE.SphereGeometry(6, 12, 6);
  var vertexMaterial = new THREE.MeshLambertMaterial({
    color: 0x333333
  });
  var mesh = new THREE.Mesh(vertexGeometry, vertexMaterial);
  var vertexAmalgam = new THREE.Geometry();
  for (var i = 0; i < data.vertex.length; i++) {
    var vMesh = mesh.clone();
    vMesh.position = vertex[i];
    THREE.GeometryUtils.merge(vertexAmalgam, vMesh);
    // polyhedron.add(vMesh);
  }
  var vertexMesh = new THREE.Mesh(vertexAmalgam, vertexMaterial);
  polyhedron.add(vertexMesh);

  // convert edge data to cylinders
  var edgeMaterial = new THREE.MeshLambertMaterial({
    color: 0x333333
  });
  var edgeAmalgam = new THREE.Geometry();
  for (var i = 0; i < data.edge.length; i++) {
    var index0 = data.edge[i][0];
    var index1 = data.edge[i][1];
    var eMesh = cylinderMesh(vertex[index0], vertex[index1], edgeMaterial);
    THREE.GeometryUtils.merge(edgeAmalgam, eMesh);
  }
  var edgeMesh = new THREE.Mesh(edgeAmalgam, edgeMaterial);
  polyhedron.add(edgeMesh);
  // convert face data to a single (triangulated) geometry
  var faceMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    vertexColors: THREE.FaceColors
  });
  var faceColors = {
    3: new THREE.Color(0xe5e5e5),
    4: new THREE.Color(0xe5e5e5),
    5: new THREE.Color(0xe5e5e5),
    6: new THREE.Color(0xe5e5e5),
    7: new THREE.Color(0xe5e5e5),
    8: new THREE.Color(0xe5e5e5),
    9: new THREE.Color(0xe5e5e5),
    10: new THREE.Color(0xe5e5e5)
  };

  var geometry = new THREE.Geometry();
  geometry.vertices = vertex;
  var faceIndex = 0;
  for (var faceNum = 0; faceNum < data.face.length; faceNum++) {
    for (var i = 0; i < data.face[faceNum].length - 2; i++) {
      geometry.faces[faceIndex] = new THREE.Face3(data.face[faceNum][0], data.face[faceNum][i + 1], data.face[faceNum][i + 2]);
      geometry.faces[faceIndex].color = faceColors[data.face[faceNum].length];
      faceIndex++;
    }
  }

  geometry.computeFaceNormals();
  geometry.computeVertexNormals();
  faces = new THREE.Mesh(geometry, faceMaterial);
  polyhedron.add(faces);
  return polyhedron;
}

function cylinderMesh(point1, point2, material) {
  var direction = new THREE.Vector3().subVectors(point2, point1);
  var arrow = new THREE.ArrowHelper(direction.clone().normalize(), point1);
  var rotation = new THREE.Vector3().setEulerFromQuaternion(arrow.quaternion);
  var edgeGeometry = new THREE.CylinderGeometry(2, 2, direction.length(), 8, 4);
  var edge = new THREE.Mesh(edgeGeometry, material);
  edge.position = new THREE.Vector3().addVectors(point1, direction.multiplyScalar(0.5));
  edge.rotation = rotation;
  return edge;
}

function animate() {
  requestAnimationFrame(animate);
  render();
  update();
}

function update() {
  controls.update();
}

function onMouse() {
  if (controls.AutoRotate)
    controls.autoRotate = false;
}

function render() {
  renderer.render(scene, camera);
}
