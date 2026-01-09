import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Target = (props) => {
  const targetRef = useRef();

  useGSAP(() => {
    gsap.to(targetRef.current.position, {
      y: targetRef.current.position.y + 0.5,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
    });
  });

  return (
    <mesh {...props} ref={targetRef} rotation={[0, Math.PI / 5, 0]} scale={1.5}>
      <mesh position={[0, 0, 0]}>
        {/* Stand Post */}
        <cylinderGeometry args={[0.1, 0.1, 2, 8]} />
        <meshStandardMaterial color="#D1D5DB" />
      </mesh>
      <mesh position={[0, 1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        {/* Target Face */}
        <cylinderGeometry args={[0.6, 0.6, 0.1, 32]} />
        <meshStandardMaterial color="#FF5733" />
        <mesh position={[0, -0.06, 0]}>
          {/* Inner White Ring */}
          <cylinderGeometry args={[0.45, 0.45, 0.01, 32]} />
          <meshStandardMaterial color="white" />
        </mesh>
        <mesh position={[0, -0.07, 0]}>
          {/* Inner Red Dot */}
          <cylinderGeometry args={[0.2, 0.2, 0.01, 32]} />
          <meshStandardMaterial color="#FF5733" />
        </mesh>
      </mesh>
    </mesh>
  );
};

export default Target;
