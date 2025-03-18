// REFERENCE: https://www.youtube.com/watch?v=1TeMXIWRrqE

// 3D Model Viewer
document.addEventListener('DOMContentLoaded', function() {
  //  Delays the execution of the initModel function by 1.5 seconds to ensure everything is ready before initializing the 3D model.
  setTimeout(initModel, 1500);
});

function initModel() {
  const modelViewer = document.getElementById('model-viewer'); 
  
  // Set up scene
  const scene = new THREE.Scene(); //creates a new 3D scene.
  scene.background = new THREE.Color(0xf1f1f1); //sets the background color of the scene to light gray.
  
  // Set up camera
  const camera = new THREE.PerspectiveCamera(
    45, // Field of view (in degrees).
    modelViewer.clientWidth / modelViewer.clientHeight, //Aspect ratio (width/height of the container).
    0.1, //Near clipping plane (objects closer than this won’t be rendered).
    1000 //Far clipping plane (objects further than this won’t be rendered).
  );
  camera.position.z = 11; //Intial camera position.
  
  // Set up renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true }); //creates a WebGL renderer, which uses the GPU to render the scene. antialias: true smooths out jagged/rough edges
  renderer.setSize(modelViewer.clientWidth, modelViewer.clientHeight); //sets the size of the renderer to match the model viewer container.
  renderer.outputEncoding = THREE.sRGBEncoding; //ensures colors are displayed correctly.
  renderer.shadowMap.enabled = true; //enables shadows.
  modelViewer.appendChild(renderer.domElement); //adds the renderer's DOM element (the actual canvas element) to the model viewer container.
  
  // Add ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); //ambient light: illuminates all objects evenly.
  scene.add(ambientLight);
  
  // Add directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1); //directional light: illuminates objects from a specific direction.
  directionalLight.position.set(0, 1, 1);
  scene.add(directionalLight);
  
  // Add spotlight for dramatic effect
  const spotLight = new THREE.SpotLight(0xffffff, 1); //spotlight: creates a cone of light and casts shadows.
  spotLight.position.set(0, 5, 5);
  spotLight.castShadow = true;
  scene.add(spotLight);
  
  // Controls for mouse rotation
  const controls = new THREE.OrbitControls(camera, renderer.domElement); // enables mouse/touch controls for rotating and zooming.
  controls.enableDamping = true; //makes the model rotate automatically.
  controls.dampingFactor = 0.05; //controls the speed of the rotation.
  controls.screenSpacePanning = false;
  controls.minDistance = 4;
  controls.maxDistance = 14;
  controls.enableZoom = true;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 1.0;
  
  // Load a 3D model
  const loader = new THREE.GLTFLoader(); //GLTFLoader:Loads a GLTF/GLB 3D model file.
  loader.load( //loads the model and adds it to the scene
    '../models/bleu_de_chanel_perfume.glb',
    function(gltf) { //function(gltf) is a callback function that is called when the model is loaded.
      const model = gltf.scene; //gltf.scene: the root object of the model.
      
      // Adjust model position and scale as needed
      model.position.y = -1;
      model.scale.set(0.8, 0.8, 0.8);
      
      // Add model to scene
      scene.add(model);
      
      // Adjust materials
      model.traverse((child) => { //loops through all parts of the model to adjust materials (e.g., glass parts).
        if (child.isMesh) { //checks if the child is a mesh (i.e., a 3D object with a material).
          child.castShadow = true;
          child.receiveShadow = true;
          
          // If the model needs glass material
          if (child.name.includes('glass')) {
            child.material = new THREE.MeshPhysicalMaterial({
              color: child.material.color,
              transparent: true,
              opacity: 0.8,
              metalness: 0.1,
              roughness: 0.05,
              clearcoat: 1.0
            });
          }
        }
      });
    },
    
    // Progress callback
    function(xhr) {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded'); //displays the progress of the model loading. 
    },
    
    // Error callback
    function(error) {
      console.error('An error happened loading the model:', error);
    }
  );
  
  // Render loop
  function animate() { //continously updates/renders the scene and camera.
    requestAnimationFrame(animate); //requests the next frame of the animation.
    controls.update();
    renderer.render(scene, camera);
  }
  animate();
  
  // Handle window resizes
  window.addEventListener('resize', function() {
    camera.aspect = modelViewer.clientWidth / modelViewer.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(modelViewer.clientWidth, modelViewer.clientHeight);
  });
} 