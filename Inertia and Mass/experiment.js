/* Global Variables */

/* Scene Dimensions (in meters: at z = 0) */
var mySceneTLX;        /* Top Left corner X coordinate */
var mySceneTLY;        /* Top Left corner Y coordinate */
var mySceneBRX;        /* Bottom Right corner X coordinate */
var mySceneBRY;        /* Bottom Right corner Y coordinate */
var mySceneW;          /* Scene Width */
var mySceneH;          /* Scene Height */
var myCenterX;         /* Scene Center X coordinate */
var myCenterY;         /* Scene Center Y coordinate */

/* Room Variables */
var leftB;              /* Left Barrier */
var rightB;             /* Right Barrier */
var bottomB;            /* Bottom Barrier */
var topB;               /* Top Barrier */
var backB=-4.0;         /* Back Barrier */
var wallThickness;      /* Wall Thickness */

/* Room Objects */
var myBack;             /* Back */

/* Ball variables */
var myBall;             /* Ball Object */
var myBallRadius;       /* Radius */
var myBallMass;  
var myBallX;            /* X Position */
var myBallY;            /* Y Position */
var myBallVX=0;           /* X Velocity */
var myBallAX=0;
var myBallZ;            /* Z Position for placing ball */

/*Hammer*/
var myHammer;
var myHammerX;
var myHammerY;
var myHammerZ;
var myHammerRadius;
var myHammerHeight;
var myHammerMass;
var myHammerVX;
var myHammerVY;
var myHammerAX;
var myHammerAY;

/*pinTop*/

var pinTop;
var pinTopX;
var pinTopY;
var wireLength;
var wire;
// Floor

var Floor;

/* Parameters, Variables */
var gravityX;           /* X component of Gravity in m/S2 */



/******************* GUI control objects code ***********************/
var angleHammer;           /* X Position Slider Label */
var aHdefault;       /* X Position Slider Default Value */
var aHmin;           /* X Position Slider Minimum Value */
var aHmax;           /* X Position Slider Maximum Value */
var aHstep;
var massball;
var massballCaption;
var massballdefault;
var massballmin;
var massballmax;
var massballstep;
var masshammer;
var masshammerCaption;
var masshammerdefault;
var masshammermin;
var masshammermax;
var masshammerstep;

function handleaH(angle)
{
    angle=(angle*3.14)/180;
    reset(angle);
    myHammer.position.setY(pinTopY-l*Math.cos(x2[0]));
    myHammer.position.setX( pinTopX+l*Math.sin(x2[0]));
    wire.geometry.verticesNeedUpdate = true;
    wire.geometry.vertices = [];
    wire.geometry.vertices.push (pinTop.position.clone(),myHammer.position.clone());
    PIErender();
}
function handlemb(newValue)
{
    massball=newValue;
        myBall.scale.x=.9+(newValue/masshammermax)*.3;
    myBall.scale.y=.9+(newValue/masshammermax)*.3;
    myBall.scale.z=.9+(newValue/masshammermax)*.3;
    PIErender();
}
function handlemh(newValue)
{
    masshammer=newValue;
    myHammer.scale.x=.9+(newValue/masshammermax)*.3;
    myHammer.scale.y=.9+(newValue/masshammermax)*.3;
    myHammer.scale.z=.9+(newValue/masshammermax)*.3;
    PIErender();

}

function initialiseControlVariables()
{
    /* Labels */
    angleHammer="Angle of Release";                  /* X Position Slider Label */
    wireLength=1.5;
    pinTopX=myCenterX;
    pinTopY=1.5*1.5;
    aHdefault=90;
    aHmin=(0.17*180)/3.1415;
    aHmax=90;
    massballCaption="mass of Ball";
    massball=10;
    massballdefault=10;
    masshammerCaption="Mass of Hammer";
    masshammer=20;
    masshammerdefault=20;
    massballmax=100;
    massballmin=1;
    masshammermax=100;
    masshammermin=1;
    /* Slider Steps */
    aHstep=0.1;                 /* X Position Slider Step */
    massballstep=1;                
    masshammerstep=1;       
    myBallVX=0;
    myBallVXCaption="Velocity of Ball"
}


function initialiseControls()
{
    initialiseControlVariables();
    
    /* Create Input Panel */
    PIEaddInputSlider(angleHammer, aHdefault, handleaH, aHmin, aHmax, aHstep);
    PIEaddInputSlider(massballCaption,massballdefault,handlemb,massballmin,massballmax,massballstep);
    PIEaddInputSlider(masshammerCaption,masshammerdefault,handlemh,masshammermin,masshammermax,masshammerstep);
    
    /* Create Display Panel */
    PIEaddDisplayText(angleHammer, aHdefault);
    PIEaddDisplayText(massballCaption, massballdefault);
    PIEaddDisplayText(masshammerCaption, masshammerdefault);
    PIEaddDisplayText(myBallVXCaption,myBallVX);
}



var helpContent;
function initialiseHelp()
{
    helpContent="<h2>Inertia and mass</h2><h3>About the experiment</h3><p>Show a hammer (ball) swinging from a ceiling, hitting a ball at rest on the ground. Show the velocity of the ball immediately after hitting.Allow student to change the mass of the ball (make it bigger or smaller) and show the result..</p><h3>Animation control</h3><p>The top line has animation controls. There are two states of the experiment.</p><h3>The setup stage</h3><p>The initial state is setup stage. In this stage, you can see a control window at the right. You have access to three sliders.</p><p>You can control the following:</p><ul><li>Angle of release&nbsp;&nbsp;:&nbsp;Controls the angle of release of pendulum.</li><li>Mass of ball&nbsp;&nbsp;:&nbsp;Change the mass of ball.</li><li>Mass of Hammer&nbsp;:&nbsp;Change the mass of Hammer(pendulum bob).</li></ul><p>Once you setup the experiment, you can enter the animation stage by clicking the start button</p><h3>The animation stage</h3><p>In the animation stage, the ball will be hit around obeyng the laws of physics.</p><p>The right hand panel now shows the values of the four experiment variables during animation.</p><ul><li>Angle of release&nbsp;&nbsp;:&nbsp;Shows the angle of release of pendulum.</li><li>Mass of ball&nbsp;&nbsp;:&nbsp;Shows the mass of ball.</li><li>Mass of Hammer&nbsp;:&nbsp;Change the mass of Hammer(pendulum bob).</li><li>Velocity of Ball&nbsp;:&nbsp;Shows the current  Velocity of the ball on ground.</li></ul><p>You can pause and resume the animation by using the pause/play nutton on the top line</p><p>You can slow down and speed up the animaion by uing the speed control buttons</p><h2>Happy Experimenting</h2>"
    PIEupdateHelp(helpContent);
}

var infoContent;
function initialiseInfo()
{
    infoContent =  "<h2>Inertia and mass experiment concepts</h2><h3>About the experiment</h3><p>Show a hammer (ball) swinging from a ceiling, hitting a ball at rest on the ground. Show the velocity of the ball immediately after hitting. Allow student to change the mass of the ball (make it bigger or smaller) and show the result.</p><h3>Collision</h3><p>In a collision between two objects, each object is interacting with the other object. The interaction involves a force acting between the objects for some amount of time. This force and time constitutes an impulse and the impulse changes the momentum of each object. Such a collision is governed by Newton's laws of motion; and as such, the laws of motion can be applied to the analysis of the collision (or explosion) situation.</p><p> The following mathematical equation is often used to express the above principle.</p><p>m1*v1+m2*v2=m1*u1+m2*u2</p><p>u1,u2 being initial velocity of obj 1,2 .and v1,v2 being final velocity</p><p>Because kinetic energy is also conserved, we simultaneously have another constraint:</p><p>1/2*m1*v1^2+1/2*m2*v2^2=1/2*m1*u1^2+1/2*m2*v2^2</p><p>Solving these equation give us</p><p>v1=(m1-m2)/(m1+m2)*u1+(2*m2)/(m1+m2)*u2</p><p>v1=(m2-m1)/(m1+m2)*u2+(2*m1)/(m1+m2)*u1</p><h2>Happy Experimenting</h2>";
    PIEupdateInfo(infoContent);
}

function initialiseScene()
{
    /* Initialise Scene Variables */
    mySceneTLX = 0.0;
    mySceneTLY = 3.0;
    mySceneBRX = 4.0;
    mySceneBRY = 0.0;
    mySceneW   = (mySceneBRX - mySceneTLX);
    mySceneH   = (mySceneTLY - mySceneBRY);
    myCenterX  = (mySceneTLX + mySceneBRX) / 2.0;
    myCenterY  = (mySceneTLY + mySceneBRY) / 2.0;
    myHammerZ    = -2.0;
    myBallZ= -2.0;
}

function initialiseOtherVariables()
{
    /* Initialise variables */
    myBallRadius = mySceneW/30.0;
    myHammerRadius = mySceneW/30.0;
    wallThickness = 0.20;
    /* Gravity */
    gravityX = 0.0;

    /* Barriers */
    leftB=mySceneTLX;
    rightB=mySceneBRX;
    bottomB=mySceneBRY;
    topB=mySceneTLY;
}


function loadExperimentElements()
{
var geometry;
var material;
var loader;
var texture;

    PIEsetExperimentTitle("Experiment Name");
    PIEsetDeveloperName("Manish");
    PIEhideControlElement();

    /* initialise help and info content */
    initialiseHelp();
    initialiseInfo();

    /* initialise Scene */
    initialiseScene();

    /* initialise Other Variables */
    initialiseOtherVariables();

    /* Create Ball and add it to scene */
    material = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('ball.jpg') } );
    myBall = new THREE.Mesh(new THREE.SphereGeometry(myBallRadius, 32, 32), material);
    // myBall = new THREE.Mesh(new THREE.SphereGeometry(myBallRadius, 32, 32), material);
    myBall.position.set(myBallX, myBallY, myBallZ);
    myBall.castShadow = true;
    myBall.receiveShadow = true;
    PIEaddElement(myBall);

    /* Create Ball and add it to scene */
    myHammer = new THREE.Mesh(new THREE.SphereGeometry(myHammerRadius, 32, 32), material);
    myHammer.position.set(myHammerX, myHammerY, myHammerZ);
    myHammer.castShadow = true;
    myHammer.receiveShadow = true;
    PIEaddElement(myHammer);

    material = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('brick.jpg') } );

/*Create slab for pendulum */
    pinTop=new THREE.Mesh(new THREE.BoxGeometry(2*mySceneW/30.0,.5*mySceneW/30.0,.3),material);
    pinTop.position.set(pinTopX,pinTopY,myHammerZ);
    PIEaddElement(pinTop);

// Create Wire
    geometry = new THREE.Geometry();
    geometry.vertices.push (pinTop.position.clone(), myHammer.position.clone(),new THREE.Vector3( 10, 0, 0 ));
    wire = new THREE.Line (geometry, new THREE.LineBasicMaterial({color:0xffffff}));
    PIEaddElement(wire);


// Create Floor
    Floor=  new THREE.Mesh(new THREE.BoxGeometry(mySceneW,.5*myBallRadius,.5),material);  
    Floor.position.set(mySceneW/2,-myBallRadius-.03,myHammerZ);
    PIEaddElement(Floor);

    geometry = new THREE.BoxGeometry( mySceneW * 2, mySceneH * 2, wallThickness );
    material = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('background.jpg') } );
    myBack = new THREE.Mesh( geometry, material );
    myBack.position.set(myCenterX, myCenterY, backB - (wallThickness / 2));
    myBack.receiveShadow = true;
    PIEaddElement(myBack);

    /* Instantiate experiment controls */
    initialiseControls();

    /* Reset all positions */
    resetExperiment();

    PIEsetAreaOfInterest(mySceneTLX, mySceneTLY, mySceneBRX, mySceneBRY);
    
}

function resetExperiment()
{
    /* initialise Other Variables */
    initialiseOtherVariables();

    /* Initialise Ball variables */
    myBallX      = myCenterX;
    myBallY      =.75;
    myHammerX =pinTopX-wireLength;
    Xdefault=myCenterX-1;
    myHammerY=myCenterY*3/2;
    // handlemb(10);
    // handlemh(20);
    handleaH(90);
    // PIEchangeDisplayText(angleHammer, (180*x2[0])/3.1415);
    // PIEchangeDisplayText(massballCaption, massball);
    // PIEchangeDisplayText(masshammerCaption, masshammer);
    // reset(3.14/2);
    flag=0;
    myBallVX=0;
    myBall.castShadow=true;
    myHammer.castShadow=true;
    myBack.receiveShadow=true;
    /* Reset Ball position */
    myBall.position.set(myBallX, myBallY, myBallZ);
    myHammer.position.set(myHammerX, myHammerY, myHammerZ);
    myBack.position.set(myCenterX, myCenterY, backB - (wallThickness / 2));
    pinTop.position.set(pinTopX,pinTopY,myHammerZ);
    Floor.position.set(mySceneW/2,.75-myBallRadius-.03,myHammerZ);
    wire.geometry.verticesNeedUpdate = true;
    wire.geometry.vertices = [];
    wire.geometry.vertices.push (pinTop.position.clone(),myHammer.position.clone());
}

var x2 = [];
var l = 1.5, g = 10;

function Next(x,dt){
    
    var n = x.length;
    var xcopy = x.slice(0);
    var f = deriv(x);
    for (var i = 0; i < n; i++) {
        xcopy[i] += f[i] * dt /2;
    }
    f = deriv(xcopy);
    for (var i = 0; i < n; i++) {
        x[i] += f[i] * dt;
    }
}

function deriv(x) {
    var ff = [];
    ff.push(x[1]);
    ff.push(-g/l*Math.sin(x[0]));
    return ff;
}

function reset(angle) {
    x2[0] = -angle, x2[1] = 0;
}
setTimeout(function(){
    if(PIEambientLight != null){
    PIEscene.children[7].intensity=.7;
    PIEscene.children[6].intensity=0.2;
        PIErender();
}
},1000);
reset(3.14/2);
var flag=0;
function updateExperimentElements(t,dt)
{
dt=dt/1000;
if(dt<.2){
// console.log(dt);
if(x2[0]>=-0.17&&flag==0){
        flag=1;
        console.log(x2[1])
        console.log(myHammer.position.x);
        myBallVX=Math.abs((2*masshammer/(masshammer+massball))*(x2[1])*l);

        x2[1]=(masshammer-massball)/(masshammer+massball)*(x2[1]);
}
myBall.position.setX(myBall.position.x+(dt/(2.7-.7*(masshammer/masshammermax)))*myBallVX);
myHammer.position.setY(pinTopY-l*Math.cos(x2[0]));
myHammer.position.setX( pinTopX+l*Math.sin(x2[0]));
Next(x2, dt);
wire.geometry.verticesNeedUpdate = true;
wire.geometry.vertices = [];
wire.geometry.vertices.push (pinTop.position.clone(),myHammer.position.clone());




if(myBall.position.x>=rightB-myBallRadius){
    myBallVX=0;
}
    PIEchangeDisplayText(angleHammer, (180*x2[0])/3.1415);
    PIEchangeDisplayText(massballCaption, massball);
    PIEchangeDisplayText(masshammerCaption, masshammer);
    PIEchangeDisplayText(myBallVXCaption,myBallVX);

}}

// x1=0;
// x2=1;
// x3=.5;
// y=.5;
// geometry = new THREE.Geometry();
// geometry.vertices.push(new THREE.Vector3(x1, y, 0));
// geometry.vertices.push(new THREE.Vector3(x2, 1, 0));
// geometry.vertices.push(new THREE.Vector3(x3, y, 0));
// material = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 2 } );
// line = new THREE.Line(geometry, material);
// PIEscene.add(line);
// PIErender();