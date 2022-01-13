import './styles.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'dat.gui'
import { CubeReflectionMapping, DoubleSide, RGBM7Encoding } from 'three'
import 'animate.css';

//Scene, Camera, Render, Raycaster:
//NOTE: Raycaster's output will have to go to ANIMATE because of the nature of the hover state (which is motion, thus, animation)

// THREE.JS
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2(1,1);
const scene = new THREE.Scene();
scene.background = null;

//Cameras
const camera = new THREE.PerspectiveCamera(
    100,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
)
camera.position.z = 2.1
camera.position.y = 0
camera.position.x = 0
camera.lookAt( 0, 0, 0)

//Renderer
const renderer = new THREE.WebGLRenderer( { alpha: true } );
renderer.setSize(window.innerWidth, window.innerHeight);

// Torus
const geometry = new THREE.TorusGeometry( 2, 1, 16, 100 );
const material = new THREE.MeshPhongMaterial({
    // Allows the attribute 'Colour' (Float32 Buffer Attr) to affect the material. Used for hover anim effects
    color: 0xfff00f,
    wireframe: true,
    side: THREE.DoubleSide
});


// Sphere
const geometryTwo = new THREE.SphereGeometry( 15, 32, 16);
const materialTwo = new THREE.MeshPhongMaterial({
    color: 0xd641736,
    side: THREE.DoubleSide,
    wireframe: false
});

const torus = new THREE.Mesh(geometry, material);
const sphere = new THREE.Mesh(geometryTwo, materialTwo);
scene.add(torus);

// // [Change Colour string to be able to change colour on hover] 
// for (let i=0; i < torus.geometry.attributes.position.count; i++) {
//     colors.push(0, 0.19, 0.4)
// }

// //Hover color change
// torus.geometry.setAttribute(
//     'color',
//     new THREE.BufferAttribute(new Float32Array(colors), 3)
// );

// Lights
const light = new THREE.DirectionalLight(
    0xffffff, 1
);
light.position.set(0, -20, 100);

const backLight = new THREE.DirectionalLight(
    0xffffff , 1
);
backLight.position.set(0, -17, 70);

const globalLight = new THREE.AmbientLight( 0x404040, 0.4 );

scene.add(light, backLight, globalLight);


//init Mouse Event (needs to be before animate())
document.addEventListener('mousemove', onDocumentMouseMove, false);

function onDocumentMouseMove(event) {

    //Stop other events that use the mouse from resetting the animations
    event.preventDefault();

    //Updates the THREE.vector2 object x, y coordinates
    mouse.x = (event.clientX / innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / innerHeight) * 2 + 1; 
    console.log(mouse)
};

// const hoverRay = () => {
//     raycaster.setFromCamera(mouse, camera);
//     const cross = raycaster.intersectObject(scene.children);
//         if (cross.length > 0) { 
//         const { color } = cross[0].object.geometry.attributes;
//             vertice 1 (bottom)
//             color.setX(cross[0].face.a, 0);
//             color.setY(cross[0].face.a, 1);

//             vertice 1 (bottom)
//             color.setX(cross[0].face.b, 0);
//             color.setY(cross[0].face.b, 1);

//             vertice 1 (bottom)
//             color.setX(cross[0].face.c, 0);
//             color.setX(cross[0].face.c, 1);

//             color.setX(cross[0].face.d, 0);

//         cross[0].object.geometry.attributes.color.needsUpdate = true;
//     }
// }


//Render

function render() {
    raycaster.setFromCamera(mouse, camera);
    let intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length > 0 && intersects[0].object === torus) {
        torus.material.color.set(0xff0ff0)
        console.log('working');
    } else {
        torus.material.color.set(0x00ff00);
        console.log('not intersecting');
    }
    renderer.render(scene, camera)
    }


//Animation
function animate() {
    requestAnimationFrame(animate);
    torus.rotation.z += 0.001
    torus.rotation.y += 0.001
    render();
}

//Output
animate();

//Appending to HTML elements
document.getElementById('mainThreeJs').appendChild(renderer.domElement);

