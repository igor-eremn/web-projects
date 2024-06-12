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
            height: 900,
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

    setWorld();
}

function clearWorld() {
    // Clear all bodies from the world
    Matter.Composite.clear(engine.world, true);

    // Remove all HTML elements associated with the boxes
    const boxes = document.getElementsByClassName('box');
    while (boxes.length > 0) {
        boxes[0].parentNode.removeChild(boxes[0]);
    }

    setWorld();
}


function setWorld() {
    let ground = Bodies.rectangle(400, 900, 800, 5, { isStatic: true });
    let leftWall = Bodies.rectangle(0, 450, 5, 900, { isStatic: true });
    let rightWall = Bodies.rectangle(800, 450, 5, 900, { isStatic: true });
    let ceiling = Bodies.rectangle(400, 0, 900, 5, { isStatic: true });

    Composite.add(engine.world, [ground, leftWall, rightWall, ceiling]);
}

function StartBoxes() {
    let randomX = (Math.random() * 500) + 100; // Random X coordinate between 100 and 600

    // Create Matter.js body
    let box = Bodies.rectangle(randomX, 50, 306, 46, {
        render: {
            fillStyle: 'transparent' // Make it transparent so it doesn't conflict with HTML rendering
        }
    });

    // Create HTML element
    const boxElement = document.createElement('div');
    boxElement.className = 'box';
    boxElement.style.width = '300px';
    boxElement.style.height = '40px';
    boxElement.style.position = 'absolute';
    boxElement.style.backgroundColor = 'white';
    boxElement.style.border = '3px solid black';

    // Add HTML content inside the box
    const header = document.createElement('h1');
    header.textContent = 'Box';
    header.style.margin = '0';
    header.style.fontSize = '16px'; // Adjust to fit inside the box

    const button = document.createElement('button');
    button.textContent = 'Click Me';
    button.style.fontSize = '12px'; // Adjust to fit inside the box

    // Append elements to the box
    boxElement.appendChild(header);
    boxElement.appendChild(button);

    // Append to container
    document.getElementById('areaToRender').appendChild(boxElement);

    // Update HTML element's position and rotation based on the Matter.js body
    Matter.Events.on(engine, 'afterUpdate', function() {
        boxElement.style.left = `${box.position.x - 147}px`; // Center the box (half of 300px width)
        boxElement.style.top = `${box.position.y - 22}px`; // Center the box (half of 40px height)
        boxElement.style.transform = `rotate(${box.angle}rad)`;
    });

    // Add Matter.js body to the world
    Composite.add(engine.world, [box]);
    Engine.update(engine);
}
