const { enable3d, Scene3D, Canvas, THREE } = ENABLE3D

class MainScene extends Scene3D {
  constructor() {
    super({ key: 'MainScene' })
  }
  init() {
    this.accessThirdDimension()
  }
  preload(){
    this.third.load.preload('sky', '/assets/img/black.png')
    
  }
  create() {
    this.third.warpSpeed('light', 'orbitControls')
    this.third.camera.position.set(100, 100, 20)

    this.third.load.texture('sky').then(sky => (this.third.scene.background = sky))

    drawAtom(this, atomList.Kr)
    this.third.camera.lookAt(0,0,0)
    //console.log(this);
  }

  update(time) {

    var velocity = 0.0007

    for (const item in this) {
      if (item.indexOf('__electron_') == 0) {
      
        const date = time * velocity;

        this[item].position.set(
          Math.cos(this[item].degrees + (date * this[item].nivel)) * this[item].radioOrbital,
          this[item].position.y,
          Math.sin(this[item].degrees + (date * this[item].nivel))  * this[item].radioOrbital
        )

        this[item].body.needUpdate = true
      }
    }

  }
  
}

function drawAtom(scene, atom) {
  var protons = atom.np 
  var neutrons = atom.nn
  var atomConfig = atom.con


  var level = 1
  var coorsI = 0

  const coors = [
    //Center
   // [0,0,0],
    //Cube
    [1,1,1],
    
    [1,-1,-1],
    [-1,-1,-1],

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
    
      //PROTONS
      if (protons > 0){
        const coor = coors[coorsI]
        scene.proton = scene.third.add.sphere({x: coor[0] * level, y: coor[1] * level, z: coor[2] * level, radius: 3 }, {basic: {color: 0xD13939}})
        lastParticle = "proton"
        
        protons--
        coorsI++
        
      }
        
      //NEUTRONS
      if (neutrons > 0){
          const coor = coors[coorsI]
          scene.neutron = scene.third.physics.add.sphere({x: coor[0] * level, y: coor[1] * level, z: coor[2] * level, radius: 3 }, {basic: {color: 0xBEBEBE}})
          scene.neutron.body.setCollisionFlags(2)
          lastParticle = "neutron"
          
          neutrons--
          coorsI++
      }
      

      if (coorsI > coors.length -1) {
          coorsI = 0
          level += 2
      }

      if(protons <= 0 && neutrons <= 0){
        break
      }

  }

  drawOrbitals(atomConfig, level, scene, atom)

}

function drawOrbitals(atomConfig, levelNucleo, scene, atomo) {
  var configuration = 0 

  for (let i = atomConfig.length -1; i > -1; i--) {
    
    const atomConf = atomConfig[i];
    const radioOrbital = atomConf.nivel
    const minOrbitalMargin = 15
    var electrons = totalElectrons(atomo.con, atomConf.nivel); // cuantos electrones hay en cada capa aunque no est
    
    for (let ii = 1; ii < atomConf.e + 1; ii++) {
      
      var atomDegree = (2 * Math.PI)/electrons

      configuration = levelReview(scene, atomConf)
      atomDegree *= configuration  

      scene['__electron_' + atomo.sq + "_" + atomConf.subNivel + '_' + atomConf.nivel + '_' + ii] = scene.third.physics.add.sphere({ x: levelNucleo + (minOrbitalMargin * radioOrbital * Math.cos(atomDegree)), z: levelNucleo * minOrbitalMargin * radioOrbital * Math.sin(atomDegree), radius: 1 }, { basic: { color: 0xFFC300 } })
      scene['__electron_' + atomo.sq + "_" + atomConf.subNivel + '_' + atomConf.nivel + '_' + ii].body.setCollisionFlags(2)

      scene['__electron_' + atomo.sq + "_" + atomConf.subNivel + '_' + atomConf.nivel + '_' + ii].radioOrbital = levelNucleo + (minOrbitalMargin * radioOrbital)
      scene['__electron_' + atomo.sq + "_" + atomConf.subNivel + '_' + atomConf.nivel + '_' + ii].degrees = atomDegree
      scene['__electron_' + atomo.sq + "_" + atomConf.subNivel + '_' + atomConf.nivel + '_' + ii].nivel = 1

    }

    if (atomConfig[i].type != undefined) {
      //si no refiere a otro atomo
      drawOrbitals(atomList[atomConfig[i].type].con, levelNucleo, scene, atomList[atomConfig[i].type])
      
    }

  }
}

function levelReview(scene, atomConfig){  
  var result = 1;
  for (const item in scene) {
    var elec = item.split("_")

    if (elec[5] == atomConfig.nivel){
      result++      
    }
  }

  return result

}


function totalElectrons(atomConfig, nivel, result=0) {
  var result = result

  for (let i = atomConfig.length -1; i > -1; i--) {
  
    const atomConf = atomConfig[i];

    console.log(11111, atomConf, nivel);
    
    if(atomConf.nivel == nivel && nivel != undefined){
      result += atomConf.e
    }
    
    console.log(22222, result);
    
    if (atomConfig[i].type != undefined) {
      //si no refiere a otro atomo
      result += totalElectrons(atomList[atomConfig[i].type].con, nivel, result)
      
    }
    console.log(33333, result);

  }

  return result
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