import React, { useEffect } from 'react';
import * as THREE from 'three';
import ThreeGlobe from 'three-globe';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as solar from 'solar-calculator';

const DayNightGlobe = () => {
    useEffect(() => {
        const VELOCITY = 1; // minutes per frame

        // Custom shader: Blends night and day images to simulate day/night cycle
        const dayNightShader = {
            vertexShader: `
        varying vec3 vNormal;
        varying vec2 vUv;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
            fragmentShader: `
        #define PI 3.141592653589793
        uniform sampler2D dayTexture;
        uniform sampler2D nightTexture;
        uniform vec2 sunPosition;
        uniform vec2 globeRotation;
        varying vec3 vNormal;
        varying vec2 vUv;

        float toRad(in float a) {
          return a * PI / 180.0;
        }

        vec3 Polar2Cartesian(in vec2 c) { // [lng, lat]
          float theta = toRad(90.0 - c.x);
          float phi = toRad(90.0 - c.y);
          return vec3( // x,y,z
            sin(phi) * cos(theta),
            cos(phi),
            sin(phi) * sin(theta)
          );
        }

        void main() {
          float invLon = toRad(globeRotation.x);
          float invLat = -toRad(globeRotation.y);
          mat3 rotX = mat3(
            1, 0, 0,
            0, cos(invLat), -sin(invLat),
            0, sin(invLat), cos(invLat)
          );
          mat3 rotY = mat3(
            cos(invLon), 0, sin(invLon),
            0, 1, 0,
            -sin(invLon), 0, cos(invLon)
          );
          vec3 rotatedSunDirection = rotX * rotY * Polar2Cartesian(sunPosition);
          float intensity = dot(normalize(vNormal), normalize(rotatedSunDirection));
          vec4 dayColor = texture2D(dayTexture, vUv);
          vec4 nightColor = texture2D(nightTexture, vUv);
          float blendFactor = smoothstep(-0.1, 0.1, intensity);
          gl_FragColor = mix(nightColor, dayColor, blendFactor);
        }
      `
        };

        const sunPosAt = dt => {
            const day = new Date(+dt).setUTCHours(0, 0, 0, 0);
            const t = solar.century(dt);
            const longitude = (day - dt) / 864e5 * 360 - 180;
            return [longitude - solar.equationOfTime(t) / 4, solar.declination(t)];
        };

        let dt = +new Date();
        let timeEl = { textContent: '' };
        const updateTime = () => {
            timeEl.textContent = new Date(dt).toLocaleString();
        };

        const Globe = new ThreeGlobe();

        let globeMaterial;
        Promise.all([
            new THREE.TextureLoader().loadAsync('//unpkg.com/three-globe/example/img/earth-day.jpg'),
            new THREE.TextureLoader().loadAsync('//unpkg.com/three-globe/example/img/earth-night.jpg')
        ]).then(([dayTexture, nightTexture]) => {
            const material = globeMaterial = new THREE.ShaderMaterial({
                uniforms: {
                    dayTexture: { value: dayTexture },
                    nightTexture: { value: nightTexture },
                    sunPosition: { value: new THREE.Vector2() },
                    globeRotation: { value: new THREE.Vector2() }
                },
                vertexShader: dayNightShader.vertexShader,
                fragmentShader: dayNightShader.fragmentShader
            });

            Globe.globeMaterial(material);

            requestAnimationFrame(() =>
                (function animate() {
                    // animate time of day
                    dt += VELOCITY * 60 * 1000;
                    timeEl.textContent = new Date(dt).toLocaleString();
                    material.uniforms.sunPosition.value.set(...sunPosAt(dt));
                    requestAnimationFrame(animate);
                })()
            );
        });

        // Setup renderer
        const renderer = new THREE.WebGLRenderer({ alpha: true }); // Enable transparency
        renderer.setSize(326, 326);
        renderer.setPixelRatio(window.devicePixelRatio);
        document.getElementById('globeViz').appendChild(renderer.domElement);

        // Setup scene
        const scene = new THREE.Scene();
        scene.add(Globe);
        scene.add(new THREE.AmbientLight(0xcccccc, Math.PI));
        scene.add(new THREE.DirectionalLight(0xffffff, 0.6 * Math.PI));

        // Setup camera
        const camera = new THREE.PerspectiveCamera();
        camera.aspect = 1; // Aspect ratio for 326x326
        camera.updateProjectionMatrix();
        camera.position.z = 300;
        

        // Add camera controls
        const obControls = new OrbitControls(camera, renderer.domElement);
        obControls.enableZoom = false;
        obControls.addEventListener('change', () => {
            // Update globe rotation on shader
            const { lng, lat } = Globe.toGeoCoords(camera.position);
            globeMaterial?.uniforms.globeRotation.value.set(lng, lat);
        });

        // Kick-off renderer
        (function animate() { // IIFE
            // Frame cycle
            obControls.update();
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        })();
    }, []);

    return (
        <div>
            <div id="globeViz" style={{ width: '326px', height: '326px', overflow: 'hidden' }}></div>
            <div id="time" ></div>
        </div>
    );
};

export default DayNightGlobe;