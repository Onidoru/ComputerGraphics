var container, scene, camera, renderer, controls, stats;
var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock();
// custom global variables
var cube;
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
  camera.position.set(0, 100, 300);
  camera.lookAt(scene.position);
  // RENDERER
  if (Detector.webgl)
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      logarithmicDepthBuffer: true
    });
  else
    renderer = new THREE.CanvasRenderer();

  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
  container = document.getElementById('ThreeJS');
  container.appendChild(renderer.domElement);
  // EVENTS
  THREEx.WindowResize(renderer, camera);
  // CONTROLS
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.autoRotate = true;
  // LIGHT
  var light = new THREE.PointLight(0xffffff);
  light.position.set(0, 250, 0);
  scene.add(light);

  var skyBoxGeometry = new THREE.CubeGeometry(10000, 10000, 10000);
  var skyBoxMaterial = new THREE.MeshBasicMaterial({
    //color: 0x9999ff,  // Blue sky
    color: 0xffffff,    // White sky
    side: THREE.BackSide
  });
  var skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial);
  skyBox.flipSided = true; // render faces from inside of the cube, instead of from outside (default).
  scene.add(skyBox);
  scene.fog = new THREE.FogExp2(0xffffff, 0.00025);

  var shapeGeometry = new THREE.OctahedronGeometry(60, 0);

  // Basic wireframe materials.
  var darkMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff
  });
  var wireframeMaterial = new THREE.MeshBasicMaterial({
    color: 0x333333,
    wireframe: true,
    transparent: true,
    wireframeLinewidth: 1
  });
  var multiMaterial = [darkMaterial, wireframeMaterial];

  var shape = new THREE.Mesh(shapeGeometry.clone(), darkMaterial);
  shape.position.set(0, 0, 0);
  scene.add(shape);
  var shapeWire = new THREE.Mesh( shapeGeometry.clone(), wireframeMaterial );
  shapeWire.position = shape.position;
  scene.add( shapeWire );

}

function animate() {
  requestAnimationFrame(animate);
  render();
  update();
}

function onMouse() {
  if (controls.AutoRotate)
  controls.autoRotate = false;
}

function update() {
  controls.update();
}

function render() {
  renderer.render(scene, camera);
}
