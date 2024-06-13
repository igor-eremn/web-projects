document.addEventListener('DOMContentLoaded', () => {
    displayNotes();
});

function displayNotes() {
    /*const notesList = document.getElementById('notes-list');
    notesList.innerHTML = '';
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    
    notes.forEach((note, index) => {
        const noteBox = document.createElement('li');
        noteBox.className = `note-box importance-${note.importance}`;

        const noteHeader = document.createElement('div');
        noteHeader.className = 'note-header';

        const noteName = document.createElement('span');
        noteName.className = 'note-name';
        noteName.textContent = note.name;

        noteHeader.appendChild(noteName);

        //const noteDescription = document.createElement('div');
        //noteDescription.className = 'note-description';
        //noteDescription.textContent = note.description;

        //const deleteButton = document.createElement('button');
        //deleteButton.className = 'delete-button';
        //deleteButton.textContent = 'Delete';
        //deleteButton.onclick = () => deleteNote(index);

        noteBox.appendChild(noteHeader);
        //noteBox.appendChild(noteDescription);
        //noteBox.appendChild(deleteButton);

        notesList.insertBefore(noteBox, notesList.firstChild);
    });*/
}

function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
}

function deleteAll() {
    localStorage.removeItem('notes');
    displayNotes();
}

/* Matter Stuff */
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
    engine = Engine.create();

    render = Render.create({
        element: document.getElementById("note-storage"),
        engine: engine,
        options: {
            width: 900,
            height: 870,
            pixelRatio: 1,
            background: '#886a6b',
            wireframes: false // <-- important
        }
    });

    Render.run(render);
    runner = Runner.create();
    Runner.run(runner, engine);
    Matter.Composite.clear(engine.world, true);
    setWorld();

    //number of notes
    //boxCount = (JSON.parse(localStorage.getItem('notes')) || []).length;
}

function setWorld() {
    const width = 900;
    const height = 870;

    let ground = Bodies.rectangle(width / 2, height, width, 7, { isStatic: true });
    let leftWall = Bodies.rectangle(0, height / 2, 7, height, { isStatic: true });
    let rightWall = Bodies.rectangle(width, height / 2, 7, height, { isStatic: true });
    let ceiling = Bodies.rectangle(width / 2, 0, width, 7, { isStatic: true });

    Composite.add(engine.world, [ground, leftWall, rightWall, ceiling]);
}

function clearWorld() {
    Matter.Composite.clear(engine.world, true);

    const boxes = document.getElementsByClassName('box');
    while (boxes.length > 0) {
        boxes[0].parentNode.removeChild(boxes[0]);
    }

    setWorld();
    boxCount = 0;
}

function getLastNoteID() {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    if (notes.length === 0) {
        return 0;
    }
    let lastNote = notes[notes.length - 1];
    return lastNote.noteID;
}

function StartBoxes() {

    const noteName = document.getElementById('note-name').value;
    const noteDescription = document.getElementById('note-description').value;
    const noteImportance = document.getElementById('note-importance').value;
    const id = getLastNoteID() + 1;
    
    if (noteName && noteDescription && noteImportance) {
        const note = {
            noteID: id,
            name: noteName,
            description: noteDescription,
            importance: noteImportance
        };

        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.push(note);
        localStorage.setItem('notes', JSON.stringify(notes));
        
        document.getElementById('todo-form').reset();
    }

    const noteStorage = document.getElementById('note-storage');
    const rect = noteStorage.getBoundingClientRect();
    const randomX = Math.random() * (rect.width - 306) + rect.left; // Adjust randomX to fit within the world boundaries

    let box = Bodies.rectangle(randomX - rect.left + 153, 100, 306, 46, {
        render: {
            fillStyle: 'transparent'
        }
    });

    const boxElement = document.createElement('div');
    boxElement.className = 'box';
    boxElement.style.width = '300px';
    boxElement.style.height = '40px';
    boxElement.style.position = 'absolute';
    boxElement.style.backgroundColor = 'white';
    boxElement.style.border = '3px solid black';
    boxElement.onclick = () => {
        alert(`Box ID: ${id}`);
    }

    const header = document.createElement('h1');
    header.textContent = `${noteName}`;
    header.style.margin = '0';
    header.style.fontSize = '16px';

    boxElement.appendChild(header);

    noteStorage.appendChild(boxElement);

    Matter.Events.on(engine, 'afterUpdate', function() {
        boxElement.style.left = `${box.position.x - 153}px`;
        boxElement.style.top = `${box.position.y - 23}px`;
        boxElement.style.transform = `rotate(${box.angle}rad)`;
    });

    Composite.add(engine.world, [box]);
    Engine.update(engine);
}

