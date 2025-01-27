import  { Suspense, useEffect, useState, createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html, Environment, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

// eslint-disable-next-line react-refresh/only-export-components
export const SpeechContext = createContext({
  isTeaching: false,
  setIsTeaching: () => {},
  isClapping: false,
  setIsClapping: () => {},
  isBowing: false,
  setBowing: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useSpeechState = () => useContext(SpeechContext);

function LoadingSpinner() {
  return (
    <Html center>
      <div className="text-lg text-gray-600">Loading Avatar...</div>
    </Html>
  );
}

function AvatarModel({ scale = 4, setFeedback }) {
  const { scene } = useGLTF('/models/megan.glb');
  const [mixer] = useState(() => new THREE.AnimationMixer(scene));
  const [animations, setAnimations] = useState({ idle: null, talking: null, clapping: null, bow: null });
  const { isTeaching, isClapping, isBowing } = useSpeechState();

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material.roughness = 1;
        child.material.metalness = 0;
        child.material.envMapIntensity = 0.3;
      }
    });
  }, [scene]);

  useEffect(() => {
    const loader = new FBXLoader();
    const animationFiles = {
      idle: 'public/animations/idle.fbx',
      talking: 'animations/talk1.fbx',
      clapping: 'animations/clap.fbx',
      bow: 'animations/bow.fbx',
    };

    Object.entries(animationFiles).forEach(([name, path]) => {
      loader.load(path, (fbx) => {
        if (fbx.animations && fbx.animations.length > 0) {
          const animation = fbx.animations[0];
          const action = mixer.clipAction(animation, scene);
          action.setLoop(THREE.LoopRepeat);
          action.clampWhenFinished = true;
          setAnimations((prev) => ({
            ...prev,
            [name]: action,
          }));
        }
      });
    });

    return () => {
      mixer.stopAllAction();
    };
  }, [mixer, scene]);

  useEffect(() => {
    if (!animations.idle || !animations.talking || !animations.clapping || !animations.bow) return;

    const stopAllAnimations = () => {
      Object.values(animations).forEach((action) => {
        if (action.isRunning()) {
          action.fadeOut(0.2);
        }
      });
    };

    if (isBowing) {
      stopAllAnimations();
      setFeedback('Great Job!');
      animations.bow.reset().fadeIn(0.2).play();
      animations.bow.setLoop(THREE.LoopOnce);
      setTimeout(() => {
        animations.bow.fadeOut(0.2);
        animations.idle.reset().fadeIn(0.2).play();
      }, 2000);
    } else if (isClapping) {
      stopAllAnimations();
      setFeedback('Great Job!');
      animations.clapping.reset().fadeIn(0.2).play();
    } else if (isTeaching) {
      stopAllAnimations();
      setFeedback('Teaching Mode');
      animations.talking.reset().fadeIn(0.2).play();
    } else {
      stopAllAnimations();
      setFeedback(null);
      animations.idle.reset().fadeIn(0.2).play();
    }
  }, [isTeaching, isClapping, isBowing, animations, setFeedback]);

  useFrame((state, delta) => {
    mixer.update(delta);
  });

  // eslint-disable-next-line react/no-unknown-property
  return <primitive object={scene} scale={scale} 
    // eslint-disable-next-line react/no-unknown-property
    position={[0, -6, 0]} 
    // eslint-disable-next-line react/no-unknown-property
    rotation={[-Math.PI / 2, 0, 0]} />;
}

AvatarModel.propTypes = {
  scale: PropTypes.number,
  setFeedback: PropTypes.func.isRequired
};

function Scene({ cameraPosition, targetPosition, fov, enableZoom, minZoom, maxZoom, initialScale, setFeedback }) {
  return (
    <>
      
      <PerspectiveCamera makeDefault position={cameraPosition} fov={fov} />
      <OrbitControls
        enableZoom={enableZoom}
        enablePan={false}
        minDistance={minZoom}
        maxDistance={maxZoom}
        target={new THREE.Vector3(...targetPosition)}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.5}
        minAzimuthAngle={-Math.PI / 4}
        maxAzimuthAngle={Math.PI / 4}
      />
      {/* eslint-disable-next-line react/no-unknown-property */}
      <ambientLight intensity={0.4} />
      {/* eslint-disable-next-line react/no-unknown-property */}
      <directionalLight position={[5, 5, 5]} intensity={0.3} castShadow />
      
      <Environment preset="sunset" intensity={0.2} />

      <Suspense fallback={<LoadingSpinner />}>
        <AvatarModel scale={initialScale} setFeedback={setFeedback} />
      </Suspense>
    </>
  );
}

Scene.propTypes = {
  cameraPosition: PropTypes.arrayOf(PropTypes.number).isRequired,
  targetPosition: PropTypes.arrayOf(PropTypes.number).isRequired,
  fov: PropTypes.number.isRequired,
  enableZoom: PropTypes.bool.isRequired,
  minZoom: PropTypes.number.isRequired,
  maxZoom: PropTypes.number.isRequired,
  initialScale: PropTypes.number.isRequired,
  setFeedback: PropTypes.func.isRequired
};

export function SpeechProvider({ children }) {
  const [isTeaching, setIsTeaching] = useState(false);
  const [isClapping, setIsClapping] = useState(false);
  const [isBowing, setBowing] = useState(false);

  const value = {
    isTeaching,
    setIsTeaching,
    isClapping,
    setIsClapping,
    isBowing,
    setBowing,
  };

  return <SpeechContext.Provider value={value}>{children}</SpeechContext.Provider>;
}

SpeechProvider.propTypes = {
  children: PropTypes.node.isRequired
};

function Avatar({
  cameraPosition = [0, 0, 0],
  targetPosition = [0, -6, 0],
  fov = 50,
  enableZoom = true,
  minZoom = 2,
  maxZoom = 10,
  initialScale = 5,
}) {
  const [feedback, setFeedback] = useState(null);

  return (
    <div className="relative w-full h-screen bg-gray-100">
      {feedback && (
        <div
          className={`absolute top-10 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg text-white font-bold shadow-lg transition-all ${
            feedback === 'Great Job!' ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {feedback}
        </div>
      )}
      <Canvas
        shadows
        fog={{
          near: 10,
          far: 20,
          color: '#f0f0f0',
        }}
      >
        <Scene
          cameraPosition={cameraPosition}
          targetPosition={targetPosition}
          fov={fov}
          enableZoom={enableZoom}
          minZoom={minZoom}
          maxZoom={maxZoom}
          initialScale={initialScale}
          setFeedback={setFeedback}
        />
        {/* eslint-disable-next-line react/no-unknown-property */}
        <color attach="background" args={["#f0f0f0"]} />
      </Canvas>
    </div>
  );
}

Avatar.propTypes = {
  cameraPosition: PropTypes.arrayOf(PropTypes.number),
  targetPosition: PropTypes.arrayOf(PropTypes.number),
  fov: PropTypes.number,
  enableZoom: PropTypes.bool,
  minZoom: PropTypes.number,
  maxZoom: PropTypes.number,
  initialScale: PropTypes.number
};

export default Avatar;