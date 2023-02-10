const { enable3d, Scene3D, Canvas, THREE } = ENABLE3D


function drawAtom(scene, atom) {
    var protons = atom.np 
    var neutrons = atom.nn
    var atomConfig = atom.con


    var radioLevel = 3
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

    while (true) {


        if (protons > 0){
            const coor = coors[coorsI]

            scene.proton = scene.third.add.sphere({x: coor[0] * radioLevel, y: coor[1] * radioLevel, z: coor[2] * radioLevel, radius: 3 }, {basic: {color: 0xD13939}})

            protons--
            coorsI++
        
        }

        //NEUTRONES
        if (neutrons > 0){
            const coor = coors[coorsI]

            scene.neutron = scene.third.physics.add.sphere({x: coor[0] * radioLevel, y: coor[1] * radioLevel, z: coor[2] * radioLevel, radius: 3 }, {basic: {color: 0xC4C4C4}})
            scene.neutron.body.setCollisionFlags(2)

            neutrons--
            coorsI++
        }
        

        if (coorsI > coors.length -1) {

            coorsI = 0
            radioLevel += 2
        }

        if(protons <= 0 && neutrons <= 0){
          break
        }

    }
    /*
    scene.electrons = new THREE.Group()
    scene.third.add.existing(scene.electrons)
*/

    drawOrbitals(atomConfig, radioLevel, scene, atom)

 
    
}


function drawOrbitals(atomConfig, radius, scene, atomo) {

  for (let i = atomConfig.length -1; i > -1; i--) {
    
    const atomConf = atomConfig[i];
    const radioOrbita = atomConf.nivel
    const minRad = 5


    for (let ii = 1; ii < atomConf.e + 1; ii++) {

      scene['__electron_' + atomo.sq + i + '_' + ii] = scene.third.physics.add.sphere({ x: radius * minRad * radioOrbita, radius: 1 }, { basic: { color: 0x0080ff } })
      scene['__electron_' + atomo.sq + i + '_' + ii].body.setCollisionFlags(2)

      scene['__electron_' + atomo.sq + i + '_' + ii].radioOrbita = radioOrbita
/*
      var electron = scene.third.physics.add.sphere({ x: radius * minRad * radioOrbita, radius: 1 }, { basic: { color: 0x0080ff } })
      electron.body.setCollisionFlags(2)
      electron.radiusOrbit = radioOrbita

*/
      //var electron = scene.third.physics.add.sphere({ x: radius * minRad * radioOrbita, radius: 1 }, { basic: { color: 0x0080ff } })
      //electron.body.setCollisionFlags(2)
    //  scene.electrons.add(electron)

    }


    if (atomConfig[i].type != undefined) {
      
      //si no refiere a otro atomo
      drawOrbitals(atomList[atomConfig[i].type].con, radius, scene, atomList[atomConfig[i].type])

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
    drawAtom(this, atomList.Au)




    // both are kinematic objects
    //this.sun.body.setCollisionFlags(2)
/*
    this.earth.body.setCollisionFlags(2)

    this.third.camera.lookAt(this.earth.position.clone())*/
  }

  update(time) {


    const orbitRadius = 30

    //console.log(this.electrons

    const date = time * 0.0025



    for (const item in this) {
      if (item.indexOf('__electron_') == 0) {

       
        const { x, y, z } = this[item].position.clone()
        this[item].position.set(

          Math.cos(date) * this[item].radioOrbita + 2,
          y,
          Math.sin(date) * this[item].radioOrbita + 1

        )
    
        this[item].body.needUpdate = true
      }

    }

    console.log(this)


    const { x, y, z } = this['__electron_Ar1_1'].position.clone()
    this['__electron_Ar1_1'].position.set(

      Math.cos(date) * orbitRadius + 2,
      y,
      Math.sin(date) * orbitRadius + 1

    )
    console.log(this['__electron_Ar1_1']);

    this['__electron_Ar1_1'].position.body.needUpdate = true

/*
    const { x, y, z } = this.electron.position.clone()
    console.log(this)
    this.electron.position.set(

      Math.cos(date) * orbitRadius + 2,
      y,
      Math.sin(date) * orbitRadius + 1
    )


     
  /*
    this.electrons.children.forEach(electron => {
      const { x, y, z } = electron.position.clone()

      electron.position.set(

        Math.cos(date) * electron.radiusOrbit + 2,
        y,
        Math.sin(date) * electron.radiusOrbit + 1
      )

      console.log(electron.position)
     // electron.body.needUpdate = true

    }); */

    //      const { x, y, z } = this.electron.position.clone()


    // make object orbit around a center
    // https://stackoverflow.com/questions/42418958/rotate-an-object-around-an-orbit
   /* */
    //
    

    //https://stackoverflow.com/questions/21483999/using-atan2-to-find-angle-between-two-vectors/21486462
    //const angle = Math.atan2(2 - x, 1 - z)
   // this.electron.rotation.set(0, angle, 0)
   // this.electron.body.needUpdate = true


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