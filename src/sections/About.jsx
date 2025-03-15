import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Center } from '@react-three/drei';
import { Suspense } from 'react';
import { useInView } from 'react-intersection-observer';
import Button from '../components/Button.jsx';
import DayNightGlobe from '../components/DayNightGlobe.jsx';
import WorkingDesk from '../components/Working-desk.jsx';
import CanvasLoader from '../components/Loading.jsx';


const About = () => {
  const [hasCopied, setHasCopied] = useState(false);

  // Configurar el hook de intersection observer con un umbral del 30%
  // rootMargin añade margen para precargar antes de que sea visible
  const [deskRef, deskInView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
    rootMargin: '200px 0px' // Precarga cuando está a 200px de entrar en viewport
  });

  const handleCopy = () => {
    navigator.clipboard.writeText('marianobonanseapetrovial@gmail.com');
    setHasCopied(true);

    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };

  return (
    <section className="c-space my-20" id="about">
      <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full">
        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container">
            <img src="assets/grid1.png" alt="grid-1" className="w-full sm:h-[276px] h-fit object-contain" />

            <div>
              <p className="grid-headtext">Hola, soy Mariano Bonansea</p>
              <p className="grid-subtext">
                Soy estudiante de Licenciatura en Informática y me apasiona el desarrollo web. Estoy en constante
                aprendizaje y busco siempre mejorar mis habilidades.
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-1 xl:row-span-3" ref={deskRef}>
          <div className="grid-container">
            <div className="rounded-3xl w-full sm:h-[326px] h-fit flex justify-center items-center" style={{ overflow: 'hidden' }}>
              {/* Mantener el Canvas siempre montado pero controlar el frameloop */}
              <Canvas className="w-full h-full"
                frameloop={deskInView ? 'always' : 'demand'}
                dpr={[1, 2]}
              >
                <ambientLight intensity={0.5} />
                <directionalLight position={[-3, 0, 0]} intensity={2} />
                <PerspectiveCamera
                  makeDefault
                  position={[-1.5, 3, 10]}
                  lookAt={[0, 0, 0]}
                />
                <Center>
                  <Suspense fallback={<CanvasLoader />}>
                    <WorkingDesk rotation={[0.5, -2.5, 0]} scale={0.8} isVisible={deskInView} />
                  </Suspense>
                </Center>
              </Canvas>
            </div>

            <div>
              <p className="grid-headtext">Tech Stack</p>
              <p className="grid-subtext">
                Me especializo en una variedad de lenguajes, frameworks y herramientas que me permiten construir
                aplicaciones robustas y escalables.
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-1 xl:row-span-4">
          <div className="grid-container">
            <div className="rounded-3xl w-full sm:h-[326px] h-fit flex justify-center items-center" style={{ overflow: 'hidden' }}>
              <DayNightGlobe />
            </div>
            <div>
              <p className="grid-headtext">Flexible con zonas horarias y ubicaciones</p>
              <p className="grid-subtext">Vivo en Puerto Madryn, Argentina y me encuentro abierto a trabajar de forma remota en todo el mundo.</p>
              <a href="#contact" className="w-fit">
                <Button name="Contáctame" isBeam containerClass="w-full mt-10" />
              </a>
            </div>
          </div>
        </div>

        <div className="xl:col-span-2 xl:row-span-3">
          <div className="grid-container">
            <img src="assets/grid3.png" alt="grid-3" className="w-full sm:h-[266px] h-fit object-contain" />

            <div>
              <p className="grid-headtext">Mi Pasión por la Programación</p>
              <p className="grid-subtext">
                Me encanta resolver problemas y construir cosas a través del código. La programación no es solo mi profesión, es mi pasión. Disfruto explorando nuevas tecnologías y mejorando mis habilidades.
              </p>
            </div>
          </div>
        </div>

        <div className="xl:col-span-1 xl:row-span-2">
          <div className="grid-container">
            <img
              src="assets/grid4.png"
              alt="grid-4"
              className="w-full md:h-[126px] sm:h-[276px] h-fit object-cover sm:object-top"
            />

            <div className="space-y-2">
              <p className="grid-subtext text-center">Contáctame</p>
              <div className="copy-container" onClick={handleCopy}>
                <img src={hasCopied ? 'assets/tick.svg' : 'assets/copy.svg'} alt="copy" />
                <p className="md:text-sm text-lg  font-medium text-gray_gradient text-white">marianobonanseapetrovial@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;