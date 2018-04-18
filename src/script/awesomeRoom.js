var aweosome = (function () {

    var mesh, renderer, scene, camera, controls,
        localhost = location.protocol + "//" + location.hostname + (location.port ? ":" + location.port : ""),
        material2 = new THREE.MeshNormalMaterial({
            side: THREE.DoubleSide
        }),
        uid = "";

    function init() {

        // renderer
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0xEEEEEE);
        document.body.appendChild(renderer.domElement);

        // scene
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0xa0a0a0);
        scene.fog = new THREE.Fog(0xa0a0a0, 200, 1000);

        /// light
        light = new THREE.HemisphereLight(0xffffff, 0x444444);
        light.position.set(0, 200, 0);
        scene.add(light);
        light = new THREE.DirectionalLight(0xffffff);
        light.position.set(0, 200, 100);
        light.castShadow = true;
        light.shadow.camera.top = 180;
        light.shadow.camera.bottom = -100;
        light.shadow.camera.left = -120;
        light.shadow.camera.right = 120;
        scene.add(light);

        // camera
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
        camera.position.set(0, 400, 400);

        // // controls
        controls = new THREE.OrbitControls(camera);
        controls.enableZoom = true;
        controls.enablePan = true;

        // floor reference grid
        var grid = new THREE.GridHelper(1000, 100, 0x000000, 0x000000);
        grid.material.opacity = 0.2;
        grid.material.transparent = true;
        scene.add(grid);

        /// data fetch from server
        $.get("/design/1234?budget=cozy&room_type=bed&limit=10&q_api_key=" + uid, function (data) {
            var itemWidth = 0;
            var itemCount = data.ItemList.length;
            data.ItemList.forEach((element, i) => {
                if (itemWidth == 0) {
                    itemWidth = element.Position.x;
                } else if (i === 1) {
                    itemWidth = Math.abs(itemWidth - element.Position.x);
                }
                var loader = new THREE.FBXLoader();
                loader.load(localhost + element.item_url + element.item_name, function (object) {

                    object.position.set(element.Position.x, element.Position.y, element.Position.z);
                    object.traverse(function (child) {
                        if (child instanceof THREE.Mesh) {
                            child.material = material2;
                            child.castShadow = true;
                            child.receiveShadow = true;
                        }
                    });
                    scene.add(object);

                });
            });

            var wallsMaterial = new THREE.MeshBasicMaterial({
                color: 0x00197F,
                transparent: false,
                blending: THREE.AdditiveBlending
            });
            var roomWidth = (itemWidth * itemCount);
            var roomEdge = (roomWidth / 2);
            var pi2 = -(Math.PI / 2);
            var roomHeight = 150;
            var roomDepth = 100;

            /// Floor
            var floor = new THREE.ParametricBufferGeometry(THREE.ParametricGeometries.plane(roomWidth, roomDepth), 10, 10);
            floor.center();
            var floorMesh = new THREE.Mesh(floor, new THREE.MeshPhongMaterial({
                color: 0x999999,
                depthWrite: false,
                side: THREE.DoubleSide
            }));
            scene.add(floorMesh);

            /// Back wall
            var backWall = new THREE.ParametricBufferGeometry(THREE.ParametricGeometries.plane(roomWidth, roomHeight), 10, 10);
            var backWallMesh = new THREE.Mesh(backWall, wallsMaterial);
            backWallMesh.position.set(-roomEdge, 0, -(roomDepth / 2));
            backWallMesh.rotation.x = pi2;
            scene.add(backWallMesh);

            /// Left wall
            var leftWall = new THREE.ParametricBufferGeometry(THREE.ParametricGeometries.plane(roomDepth, roomHeight), 10, 10);
            var leftWallMesh = new THREE.Mesh(leftWall, wallsMaterial);
            leftWallMesh.position.set(-roomEdge, 0, (roomDepth / 2));
            leftWallMesh.rotation.x = pi2;
            leftWallMesh.rotation.z = -pi2;
            scene.add(leftWallMesh);

            /// Right wall
            var rightWall = new THREE.ParametricBufferGeometry(THREE.ParametricGeometries.plane(roomDepth, roomHeight), 10, 10);
            var rightWallMesh = new THREE.Mesh(rightWall, wallsMaterial);
            rightWallMesh.position.set(roomEdge, 0, -(roomDepth / 2));
            rightWallMesh.rotation.x = pi2;
            rightWallMesh.rotation.z = pi2;
            scene.add(rightWallMesh);

            /// Ceiling
            var ceileing = new THREE.ParametricBufferGeometry(THREE.ParametricGeometries.plane(roomWidth, roomDepth), 10, 10);
            var ceileingMesh = new THREE.Mesh(ceileing, wallsMaterial);
            ceileingMesh.position.set(-roomEdge, roomHeight, -(roomDepth / 2));
            scene.add(ceileingMesh);

            /// Front wall
            var frontWall = new THREE.ParametricBufferGeometry(THREE.ParametricGeometries.plane(roomWidth, roomHeight), 10, 10);
            var frontWallMesh = new THREE.Mesh(frontWall, wallsMaterial);
            frontWallMesh.position.set(roomEdge, 0, (roomDepth / 2));
            frontWallMesh.rotation.x = pi2;
            frontWallMesh.rotation.z = Math.PI;
            scene.add(frontWallMesh);
        });

    }

    function animate() {

        requestAnimationFrame(animate);
        renderer.render(scene, camera);

    }

    return {

        run: function () {

            // Initialize Firebase
            var config = {
                apiKey: "AIzaSyDtODoBvIm6PjvPDo0g_x75Xq9VMtS5mO0",
                authDomain: "cozy-abcf9.firebaseapp.com",
                databaseURL: "https://cozy-abcf9.firebaseio.com",
                projectId: "cozy-abcf9",
                storageBucket: "",
                messagingSenderId: "153655602116"
            };

            firebase.initializeApp(config);

            // FirebaseUI config.
            var uiConfig = {
                signInSuccessUrl: localhost,
                signInOptions: [
                    firebase.auth.EmailAuthProvider.PROVIDER_ID
                ]
            };

            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    
                    $("#firebaseui-auth-container").hide();
                    uid = user.uid;
                    $("#logoff").click(function() {
                        uid = "";
                        firebase.auth().signOut();
                    });

                    if (!Detector.webgl) Detector.addGetWebGLMessage();
                    init();
                    animate();
                    
                } else {

                    $("#logoff").hide();
                    var ui = new firebaseui.auth.AuthUI(firebase.auth());
                    ui.start("#firebaseui-auth-container", uiConfig);

                }
            });
        }
    }
})();

$(document).ready(aweosome.run);