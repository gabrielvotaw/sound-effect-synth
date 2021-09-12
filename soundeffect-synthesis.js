let waves,wavesLFO,filter,footsteps;
var beachRunningImage;
var showImage = false;

function preload(){
    beachRunningImage = loadImage("beachrunning.png");
}

function setup(){
    createCanvas(windowWidth,windowHeight);
    textFont("Ariel");
    imageMode(CENTER);

    filter = new Tone.Filter(200,"highpass").toDestination();
    waves = new Tone.Noise("brown").connect(filter);
    wavesLFO = new Tone.LFO(0.3,-100000,-1).connect(waves.volume).start();
    
    footsteps = new Tone.NoiseSynth().toDestination();
    footsteps.volume.value = 5;

    Tone.Transport.scheduleRepeat((time) => {
        footsteps.triggerAttackRelease(0.1,time);
    },"4n","0.75m");
}

function mousePressed(){
    waves.start();
    Tone.Transport.start();
}

function mouseReleased(){
    waves.stop();
    Tone.Transport.stop();
}

function draw(){
    background("white");

    textSize(20);
    text("press mouse to play beach sound",width/2-200,100);

    if(mouseIsPressed){
        background("turquoise");
        scale(2);
        image(beachRunningImage,windowWidth/2-500,200);
    }
}
