var container;
var stats;

var camera;
var scene;
var renderer;

var group;

var targetRotation = 0;
var targetRotationOnMouseDown = 0;

var mouseX = 0;
var mouseXOnMouseDown = 0;

var windowHalfX = window.innerWidth / 2;

container = document.createElement('div');
document.body.appendChild(container);

camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0, 150, 500);

scene = new THREE.Scene();

group = new THREE.Group();
group.position.y = 50;
scene.add(group);

var static_group = new THREE.Group();
static_group.position.y = 50;
scene.add(static_group);

init();

addShape(static_group, doubleTriangle(50, 50, 0, 0), -180, 0, 250, 0, 0, 0, 0);
ornament();

animate();

function init() {
    renderer = new THREE.CanvasRenderer();
    renderer.setClearColor(0xffffff);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.sortElements = false;
    container.appendChild(renderer.domElement);

    stats = new Stats();
    container.appendChild(stats.dom);

    document.addEventListener('mousedown', onDocumentMouseDown, false);
    document.addEventListener('touchstart', onDocumentTouchStart, false);
    document.addEventListener('touchmove', onDocumentTouchMove, false);

    window.addEventListener('resize', onWindowResize, false);
}



function doubleTriangle(x, y, px, py) {
	var shape = new THREE.Shape();
    shape.moveTo(px, py);
    shape.lineTo(-x + px, y + py);
    shape.lineTo(x + px, y + py);
    shape.lineTo(-x + px, -y + py);
    shape.lineTo(x + px, -y + py);
    shape.lineTo(px, py);
    shape.moveTo(px, py);
    return shape;
}

function ornament() {

    // Length of the triangle's sides
    var x = 35;
    var y = 35;

    // Start point. If the doubleTriangle() is not commented, choose px = py = 0
    var px = 0;
    var py = 0;

    // Defines how many basic figures ornament will have
    var doubleX = 10;
    var doubleY = 3;

    var dx = px;
    var dy = 0;

    var shape = doubleTriangle(x, y, px, py);

    for (var i = 1; i <= doubleY; i++) {
        for (var j = 0; j < doubleX; j++) {
            addShape(group, shape, -180, dx, dy, 0, 0, 0, 0);
            if (j & 1) {
                dx = dx - 2 * x * j;
            } else {
                dx = dx + 2 * x * j;
            }
        }
        dx = px;
        dy = 2 * y * i;
    }
}

function addShape(group, shape, color, x, y, z, rx, ry, rz, s) {

    var geometry = new THREE.ShapeGeometry(shape);
    var material = new THREE.MeshBasicMaterial({
        color: color,
        overdraw: 0.5
    });

    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    mesh.rotation.set(rx, ry, rz);
    mesh.scale.set(s, s, s);
    group.add(mesh);

    var geometry = shape.createPointsGeometry();
    geometry.vertices.push(geometry.vertices[0].clone());

    var material = new THREE.LineBasicMaterial({
        linewidth: 10,
        color: 0x333333,
        transparent: true
    });

    var line = new THREE.Line(geometry, material);
    line.position.set(x, y, z);
    line.rotation.set(rx, ry, rz);

    group.add(line);
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseDown(event) {
    event.preventDefault();

    mouseXOnMouseDown = event.clientX - windowHalfX;
    targetRotationOnMouseDown = targetRotation;
}

function onDocumentTouchStart(event) {

}

function onDocumentTouchMove(event) {

}

function animate() {
	rotate(group, 0.01, "right");
    requestAnimationFrame(animate);
    render();
    stats.update();
}

function render() {
    //group.rotation.y += (targetRotation - group.rotation.y) * 0.03;
    renderer.render(scene, camera);
}

function rotate(group, speed, direction) {
	group.rotation.y += (direction == "left")?-speed:speed;
}
