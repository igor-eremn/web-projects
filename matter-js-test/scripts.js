let Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    Constraint = Matter.Constraint,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint,
    Events = Matter.Events;

let engine;
let render;
let runner;

function init() {
    // create an engine
    engine = Engine.create();
   
    // create a renderer
    render = Render.create({
    element: document.getElementById("areaToRender"),
    engine: engine,
    options: {
    width: 800,
    height: 1000,
    pixelRatio: 1,
    background: '#fafafa',
    wireframes: false // <-- important
    }
    });
   
    // run the renderer
    Render.run(render);
   
    // create runner
    runner = Runner.create();
   
    // run the engine
    Runner.run(runner, engine);
   }

   let lastClear = "(not given)"
   function clearWorld(exampleName) {

    Matter.Composite.clear(engine.world, false)
    }

   function StartBoxes() {
    clearWorld(engine.world);
    // create two boxes and a ground
    let boxA = Bodies.rectangle(400, 200, 80, 80);
    let boxB = Bodies.rectangle(450, 50, 80, 80, {
    render: {
    fillStyle: 'red',
    strokeStyle: 'blue',
    lineWidth: 3
    }
    });
    let ground = Bodies.rectangle(400, 600, 810, 30, { isStatic: true });
   
    // add all of the bodies to the world
    Composite.add(engine.world, [boxA, boxB, ground]);
   
    Engine.update(engine);
   }