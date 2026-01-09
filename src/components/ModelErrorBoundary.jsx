import React from 'react';
import { Html } from '@react-three/drei';

class ModelErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Model loading error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // Render a fallback 3D object
            return this.props.fallback || (
                <mesh>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshBasicMaterial color="red" wireframe />
                    <Html position={[0, 0.6, 0]} center transform>
                        <div style={{
                            color: 'red',
                            background: 'rgba(20, 20, 20, 0.8)',
                            padding: '8px',
                            borderRadius: '8px',
                            border: '1px solid red',
                            textAlign: 'center',
                            fontFamily: 'monospace',
                            fontSize: '12px'
                        }}>
                            System Failure<br />Model Error
                        </div>
                    </Html>
                </mesh>
            );
        }

        return this.props.children;
    }
}

export default ModelErrorBoundary;
