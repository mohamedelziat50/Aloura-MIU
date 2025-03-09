// REFERENCE: https://www.youtube.com/watch?v=1TeMXIWRrqE
// 3D Model Viewer
document.addEventListener('DOMContentLoaded', function() {
  // Wait for everything to load before initializing 3D
  setTimeout(initModel, 1500);
});

function initModel() {
  const modelViewer = document.getElementById('model-viewer');
  if (!modelViewer) return;
  
  // Set up scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf1f1f1);
  
  // Set up camera
  const camera = new THREE.PerspectiveCamera(
    45, 
    modelViewer.clientWidth / modelViewer.clientHeight, 
    0.1, 
    1000
  );
  camera.position.z = 5;
  
  // Set up renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(modelViewer.clientWidth, modelViewer.clientHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.shadowMap.enabled = true;
  modelViewer.appendChild(renderer.domElement);
  
  // Add ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  
  // Add directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(0, 1, 1);
  scene.add(directionalLight);
  
  // Add spotlight for dramatic effect
  const spotLight = new THREE.SpotLight(0xffffff, 1);
  spotLight.position.set(0, 5, 5);
  spotLight.castShadow = true;
  scene.add(spotLight);
  
  // Controls for mouse rotation
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.screenSpacePanning = false;
  controls.minDistance = 3;
  controls.maxDistance = 8;
  controls.enableZoom = true;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 1.0;
  
  // Stop auto-rotation when user interacts
  modelViewer.addEventListener('mousedown', function() {
    controls.autoRotate = false;
  });
  
  // Load a 3D model
  const loader = new THREE.GLTFLoader();
  loader.load(
    './public/models/bleu_de_chanel_perfume..glb',
    function(gltf) {
      const model = gltf.scene;
      
      // Adjust model position and scale as needed
      model.position.y = -1;
      model.scale.set(0.8, 0.8, 0.8);
      
      // Add model to scene
      scene.add(model);
      
      // Optional: Adjust materials
      model.traverse((child) => {
        if (child.isMesh) {
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
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    
    // Error callback
    function(error) {
      console.error('An error happened loading the model:', error);
    }
  );
  
  // Create a simple platform
  const platformGeometry = new THREE.CylinderGeometry(1.5, 1.5, 0.1, 32);
  const platformMaterial = new THREE.MeshStandardMaterial({
    color: 0x222222,
    metalness: 0.5,
    roughness: 0.8
  });
  
  const platform = new THREE.Mesh(platformGeometry, platformMaterial);
  platform.position.y = -1.9;
  platform.receiveShadow = true;
  scene.add(platform);
  
  // Render loop
  function animate() {
    requestAnimationFrame(animate);
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