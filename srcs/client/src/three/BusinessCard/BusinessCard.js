import {Canvas, useFrame, useLoader, useThree} from "@react-three/fiber";
import {useControls} from 'leva'
import React, {useRef} from 'react'
import {
    useGLTF,
    OrthographicCamera,
    OrbitControls,
    MeshTransmissionMaterial,
    Text,
    Text3D,
    Center
} from '@react-three/drei'
import classNames from "classnames";
import {Vector3} from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {PropTypes} from "prop-types";

BusinessCard.propTypes = {
    brandName: PropTypes.string.isRequired,
    brandSlogan: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    socialLink: PropTypes.string.isRequired,
}

export function BusinessCard({
                                 brandName = 'Brand Name',
                                 brandSlogan = 'Brand Slogan',
                                 email = 'Email',
                                 phone = 'Phone',
                                 socialLink = 'Social Link',
                                 ...props
                             }) {
    const {nodes, materials} = useGLTF('/assets/b_card.gltf');
    const {viewport} = useThree();
    const materialPlaneProps = useControls({
        thickness: {value: 0, min: 0, max: 20},
        roughness: {value: 0.5, min: 0, max: 1, step: 0.1},
        transmission: {value: 1, min: 0.9, max: 1, step: 0.01},
        ior: {value: 1.5, min: 1, max: 2.3, step: 0.05},
    });
    return (
        <group {...props} dispose={null}>
            <group scale={viewport.width / 10000}>
                <OrthographicCamera
                    makeDefault={false}
                    far={1000000}
                    near={0}
                    position={[91.562, 0, 1000]}
                />
                <group position={[91.562, 91.46, 189.418]}>
                    <mesh
                        castShadow
                        receiveShadow
                        // geometry={nodes.BrandValue.geometry}
                        material={materials['Material.002']}
                        position={[-161.71, 8.884, 22.582]}
                    >
                        <Text  fontSize={19} fontWeight={'bold'} textAlign={'left'} position={[0, 8.884, 20]}>
                            {brandName}
                        </Text>
                    </mesh>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.CardPlane.geometry}
                        material={materials['Material.003']}
                        position={[0, -91.46, 11.582]}
                    >
                        <MeshTransmissionMaterial {...materialPlaneProps}/>
                    </mesh>
                    <group position={[0, -173.442, 22.582]}>
                        <group position={[-158.544, 0, 0]}>
                            <mesh
                                castShadow
                                receiveShadow
                                geometry={nodes.EmailTitle.geometry}
                                material={nodes.EmailTitle.material}
                                position={[0, 11.387, 0]}
                            />
                            <mesh
                                castShadow
                                receiveShadow
                                // geometry={nodes.EmailValue.geometry}
                                material={nodes.EmailValue.material}
                                position={[0, -11.207, 0]}
                            >
                                <Text fontSize={14} fontWeight={'bold'} textAlign={'left'} position={[0, 0, 0]}>
                                    {email}
                                </Text>
                            </mesh>
                        </group>
                        <group position={[0.209, 0, 0]}>
                            <mesh
                                castShadow
                                receiveShadow
                                geometry={nodes.PhonetTitle.geometry}
                                material={nodes.PhonetTitle.material}
                                position={[0, 11.387, 0]}
                            />
                            <mesh
                                castShadow
                                receiveShadow
                                // geometry={nodes.PhoneValue.geometry}
                                material={nodes.PhoneValue.material}
                                position={[0, -11.207, 0]}
                            >
                                <Text fontSize={14} fontWeight={'bold'} textAlign={'left'} position={[0, 0, 0]}>
                                    {phone}
                                </Text>
                            </mesh>
                        </group>
                        <group position={[158.544, 0, 0]}>
                            <mesh
                                castShadow
                                receiveShadow
                                geometry={nodes.SocialLinkTitle.geometry}
                                material={nodes.SocialLinkTitle.material}
                                position={[0, 11.387, 0]}
                            />
                            <mesh
                                castShadow
                                receiveShadow
                                // geometry={nodes.SocialLinkValue.geometry}
                                material={nodes.SocialLinkValue.material}
                                position={[0, -11.207, 0]}
                            >
                                <Text fontSize={14} fontWeight={'bold'} textAlign={'left'} position={[0, 0, 0]}>
                                    {socialLink}
                                </Text>
                            </mesh>
                        </group>
                    </group>
                    <group position={[-149.333, -23.196, 22.582]}>
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.LabelContainer.geometry}
                            material={nodes.LabelContainer.material}
                            position={[-11.713, 2.763, 0]}
                        >
                        </mesh>
                        <mesh
                            castShadow
                            receiveShadow
                            material={nodes.LabelValue.material}
                            position={[-11.713, 2.763, 0]}
                        >
                            <Text fontSize={14} fontWeight={'semibold'} textAlign={'left'} position={[0, 0, 0]}>
                                {brandSlogan}
                            </Text>
                        </mesh>

                    </group>
                </group>
                <rectAreaLight position={[0, -3, 9]} rotation={[Math.PI, 0, 0]} scale={3.3} color={'#FFFFFF'}
                               power={1000} castShadow/>
                <ambientLight intensity={1.5}/>
                <directionalLight position={[91.562, 30, 189.418]} intensity={0.5}/>
            </group>
            <OrthographicCamera makeDefault={false} far={1000000} near={0} position={[91.562, 0, 1000]}/>
        </group>
    );
}

function Rig() {
    const {camera, pointer} = useThree();
    const vec = new Vector3()

    return useFrame(() => {
        camera.position.lerp(vec.set(-pointer.x, -pointer.y, camera.position.z), 0.05)
        camera.lookAt(0, 0, 0)
    });
}
BusinessCardCanvas.propsTypes = {
    brandName: PropTypes.string.isRequired,
    brandSlogan: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    socialLink: PropTypes.string.isRequired,
}
export function BusinessCardCanvas({brandName, brandSlogan, email, phone, socialLink}) {
    return (
        <Canvas
            style={{width: '100%', height: "unset"}}
            camera={{zoom: 10}}
        >
            <Rig/>
            <BusinessCard
                brandName={brandName}
                brandSlogan={brandSlogan}
                email={email}
                phone={phone}
                socialLink={socialLink}
            />
        </Canvas>
    );
}

useGLTF.preload('/assets/b_card.glb')

