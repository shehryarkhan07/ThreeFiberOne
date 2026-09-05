import { Canvas, useFrame } from "@react-three/fiber"
import { useRef } from "react"
import {GizmoHelper, GizmoViewport, OrbitControls, useHelper} from "@react-three/drei"
import {useControls} from "leva"
import {SpotLightHelper} from "three"

function LightWithHelper(){

  const lightRef = useRef()
  const {angle, penumbra} = useControls({
    angle: Math.PI / 8,
    penumbra: {
      value: 0.0,
      min: 0.0,
      max: 1.0,
      step: 0.1
    }
  })

  useHelper(lightRef, SpotLightHelper, "yellow")

return <spotLight
        ref={lightRef}
        position={[5, 5, 5]}
        angle={angle}
        penumbra={penumbra}
        intensity={80}
        color={0xffea00}
        />

}


function AnimatedBox() {

  const boxRef = useRef()

  const {color, speed} = useControls({
    color: {value: {r: 1, g: 0, b: 0}},
    speed: {value: 0.005, min: 0, max: 0.1}
  })

  useFrame(()=> {
    boxRef.current.rotation.x += speed
    boxRef.current.rotation.y += speed
    boxRef.current.rotation.z += speed
  })


  return (
     <mesh ref={boxRef}>
          <boxGeometry args={[2, 2, 2]} />
           <meshStandardMaterial color={color} /> 
        </mesh>)
}

function App() {

  return (
    <div id="canvas-container">
      <Canvas camera= {{position: [2, 2, 2]}} >
      <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
        <GizmoViewport/>
        </GizmoHelper>

        <gridHelper args={[20, 20, ]}/>
        <axesHelper args={[10]}/>
        <OrbitControls />
        <AnimatedBox/>
        <ambientLight intensity={0.5} color={0xffffff} />
        
       <LightWithHelper/> 

      </Canvas>
    </div>
  )
}

export default App
