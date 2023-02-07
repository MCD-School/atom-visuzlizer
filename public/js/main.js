const { enable3d, Scene3D, Canvas, THREE } = ENABLE3D




function drawAtom(scene, atom) {
    var protons = atom.np 
    var neutrons = atom.nn

    scene.proton = scene.third.physics.add.sphere({x: 0, y: 0, z: 0, radius: 1 }, {basic: {color: 0xD13939}})
    protons--
    scene.proton.body.setCollisionFlags(2)

    var radioIco = 3
    var coorsI = 0
    var rotation = 0
    const coors = [
      //Cube
      [1,1,1],
      [-1,-1,-1],
      
      [1,-1,-1],
      [-1,1,1],

      [-1,1,-1],
      [1,-1,1],

      [-1,-1,1],
      [1,1,-1],

      //Octaedro
      [1,0,0],
      [-1,0,0],

      [0,1,0],
      [0,-1,0],
      
      [0,0,1],
      [0,0,-1],

      //Icosaedro
      [0, 1, 1.618],
      [0, -1, -1.618],
      [0, -1, 1.618],
      [0, 1, -1.618],

      [1, 1.618, 0],
      [-1, -1.618, 0],
      [1, -1.618, 0],
      [-1, 1.618, 0],
      
      [1.618, 0, 1],
      [-1.618, 0, -1],
      [-1.618, 0, 1],
      [1.618, 0, -1],

      //Icosaedro paralelo
      [0, 1.618, 1],
      [1.618, 1, 0],
      [1, 0, 1.618],

      [0, -1.618, -1],
      [-1.618, -1, 0],
      [-1, 0, -1.618],

      [0, -1.618, 1],
      [-1.618, 1, 0],
      [1, 0, -1.618],

      [0, 1.618, -1],
      [1.618, -1, 0],
      [-1, 0, 1.618],

      //dodecaedro
      [1,1,1],
      [-1,-1,-1],

      [-1,-1,1],
      [1,-1,-1],

      [-1,1,1],
      [1,1,-1],
      
      [-1,1,-1],
      [1,-1,1],

      [0,1/1.618,1.618],
      [0,-1/1.618,-1.618],
      [0,1/1.618,-1.618],
      [0,-1/1.618,1.618],

      [1/1.618,1.618,0],
      [-1/1.618,-1.618,0],
      [-1/1.618,1.618,0],
      [1/1.618,-1.618,0],

      [1.618,0,1/1.618],
      [-1.618,0,-1/1.618],
      [-1.618,0,1/1.618],
      [1.618,0,-1/1.618],

      //dodecaedro inverso
      
      [1,1,1],
      [-1,-1,-1],

      [-1,-1,1],
      [1,-1,-1],

      [-1,1,1],
      [1,1,-1],
      
      [-1,1,-1],
      [1,-1,1],

      [0, 1.618, 1/1.618],
      [0, -1.618, -1/1.618],
      [0, -1.618, 1/1.618],
      [0, 1.618, -1/1.618],

      [1.618, 1/1.618, 0],
      [-1.618, 1/1.618, 0],
      [1.618, 1/1.618, 0],
      [-1.618,1/1.618, 0],

      [1/1.618,0,1.618],
      [-1/1.618,0,-1.618],
      [-1/1.618,0,1.618],
      [1/1.618,0,-1.618],
  ]

    
    const particleLevel = new THREE.Group()

    while (true) {


        if (protons > 0){
            const coor = coors[coorsI]

            var currentProton = scene.third.add.sphere({x: coor[0] * radioIco, y: coor[1] * radioIco, z: coor[2] * radioIco, radius: 3 }, {basic: {color: 0xD13939}})
            //scene.proton.body.setCollisionFlags(2)
            particleLevel.add(currentProton)
            //console.log(particleLevel, protons)

            protons--
            coorsI++
        
        }else{
            break
        }

        

        //NEUTRONES
        if (neutrons > 0){
            const coor = coors[coorsI]

            scene.neutron = scene.third.physics.add.sphere({x: coor[0] * radioIco, y: coor[1] * radioIco, z: coor[2] * radioIco, radius: 3 }, {basic: {color: 0xC4C4C4}})
            scene.neutron.body.setCollisionFlags(2)

            neutrons--
            coorsI++
        }else{
            break
        }
        

        if (coorsI > coors.length -1) {

            console.log(particleLevel)
            scene.third.add.existing(particleLevel)
           // scene.third.physics.add.existing(particleLevel)

            coorsI = 0
            radioIco += 2
        }

    }
    
}


class MainScene extends Scene3D {
  constructor() {
    super({ key: 'MainScene' })
  }

  init() {
    this.accessThirdDimension()
  }

  create() {
    this.third.warpSpeed('light', 'orbitControls', 'sky')
    this.third.camera.position.set(100, 100, 20)

    // this.third.physics.debug.enable()
    drawAtom(this, atomList.au)
    this.earth = this.third.physics.add.sphere({ y: 2, radius: 0.25 }, { basic: { color: 0x0080ff } })




    // both are kinematic objects
    //this.sun.body.setCollisionFlags(2)
    console.log()

    this.earth.body.setCollisionFlags(2)

    this.third.camera.lookAt(this.earth.position.clone())
  }
  update(time) {
    const orbitRadius = 50
    const date = time * 0.0025
    const { x, y, z } = this.earth.position.clone()

    // make object orbit around a center
    // https://stackoverflow.com/questions/42418958/rotate-an-object-around-an-orbit
    this.earth.position.set(
      Math.cos(date) * orbitRadius + 2,
      y,
      Math.sin(date) * orbitRadius + 1
    )

    //https://stackoverflow.com/questions/21483999/using-atan2-to-find-angle-between-two-vectors/21486462
    const angle = Math.atan2(2 - x, 1 - z)
    this.earth.rotation.set(0, angle, 0)

    this.earth.body.needUpdate = true
  }
}

const config = {
  type: Phaser.WEBGL,
  transparent: true,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: window.innerWidth * Math.max(1, window.devicePixelRatio / 2),
    height: window.innerHeight * Math.max(1, window.devicePixelRatio / 2)
  },
  scene: [MainScene],
  ...Canvas()
}

window.addEventListener('load', () => {
  enable3d(() => new Phaser.Game(config)).withPhysics('/lib/ammo/kripken')
})