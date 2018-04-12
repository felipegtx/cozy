// Simple three.js example

if (!Detector.webgl) Detector.addGetWebGLMessage();

var mesh, renderer, scene, camera, controls;
var localhost = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');

init();
animate();

function init() {

    // renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x889988);
    document.body.appendChild(renderer.domElement);

    // scene
    scene = new THREE.Scene();

    // camera
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(20, 20, 20);
    scene.add(camera); // required, since adding light as child of camera

    // controls
    controls = new THREE.OrbitControls(camera);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.maxPolarAngle = Math.PI / 2;

    // ambient
    scene.add(new THREE.AmbientLight(0x444444));

    // light
    var light = new THREE.PointLight(0xffffff, 0.8);
    camera.add(light);

    // model
    var loader = new THREE.FBXLoader();
    loader.load(localhost + '/assets/000001_FloorLamp_0001.FBX', function (object) {
        scene.add(object);
    });

}

function animate() {

    requestAnimationFrame(animate);

    //controls.update();

    renderer.render(scene, camera);

}