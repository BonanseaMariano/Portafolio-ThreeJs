import ModelErrorBoundary from '../components/ModelErrorBoundary.jsx';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Center } from '@react-three/drei';
import { useInView } from 'react-intersection-observer';

import CanvasLoader from '../components/Loading.jsx';
import { SecurityBot } from '../components/SecurityBot.jsx';

const RobotSection = () => {
    // Configurar el hook de intersection observer con un umbral del 30% y precarga
    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: false,
        rootMargin: '200px 0px' // Precargar 200px antes de que sea visible
    });

    return (
        <section className="c-space my-20 flex flex-col" id="robot">
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 w-full flex-grow">
                <div
                    ref={ref}
                    className="border border-black-300 bg-black-200 rounded-lg h-96 md:h-full"
                >
                    {/* Mantener el Canvas siempre montado pero pausar frameloop cuando no es visible */}
                    <Canvas
                        className="w-full h-full"
                        frameloop={inView ? 'always' : 'demand'}
                        dpr={[1, 2]}
                    >
                        <ambientLight intensity={0.5} />
                        <PerspectiveCamera makeDefault position={[0, 1.3, 5]} />
                        <Center>
                            <Suspense fallback={<CanvasLoader />}>
                                <group scale={1} position={[0, 0, 0]}>
                                    <ModelErrorBoundary>
                                        <SecurityBot isVisible={inView} />
                                    </ModelErrorBoundary>
                                </group>
                            </Suspense>
                        </Center>
                    </Canvas>
                </div>

                <div className="flex flex-col gap-5 relative sm:p-10 py-10 px-5 shadow-2xl shadow-black-200 bg-black-200 rounded-lg">
                    <div className="absolute top-0 right-0">
                        <img src="/assets/spotlight5.png" alt="spotlight" className="w-full h-96 object-cover rounded-xl" />
                    </div>

                    <h2 className="text-3xl font-bold text-gray_gradient">
                        En búsqueda de oportunidades laborales
                    </h2>
                    <p className="text-lg text-white-600 mt-3">
                        Actualmente me encuentro disponible para posibles ofertas laborales que me permitan desarrollar mis habilidades y crecer profesionalmente.
                    </p>
                    <p className="text-lg text-white-600 mt-3">
                        Con experiencia en desarrollo web y un fuerte enfoque en tecnologías modernas, estoy listo para enfrentar nuevos desafíos y contribuir al éxito de su equipo.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default RobotSection;