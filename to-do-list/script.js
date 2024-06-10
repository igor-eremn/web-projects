document.addEventListener('DOMContentLoaded', () => {
    displayNotes();
});

function addNote() {
    const noteName = document.getElementById('note-name').value;
    const noteDescription = document.getElementById('note-description').value;
    const noteImportance = document.getElementById('note-importance').value;
    
    if (noteName && noteDescription && noteImportance) {
        const note = {
            name: noteName,
            description: noteDescription,
            importance: noteImportance
        };

        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.push(note);
        localStorage.setItem('notes', JSON.stringify(notes));
        
        document.getElementById('todo-form').reset();
        alert('Note added successfully');
        displayNotes();
    }
}

function displayNotes() {
    const notesList = document.getElementById('notes-list');
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

        const noteDescription = document.createElement('div');
        noteDescription.className = 'note-description';
        noteDescription.textContent = note.description;

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteNote(index);

        noteBox.appendChild(noteHeader);
        noteBox.appendChild(noteDescription);
        noteBox.appendChild(deleteButton);

        notesList.insertBefore(noteBox, notesList.firstChild);
    });
}

function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
}
