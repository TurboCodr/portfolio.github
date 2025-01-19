document.addEventListener('DOMContentLoaded', function() {
    // Initialize the second dropdown with the same options
    const originalKeySelect = document.getElementById('original-key');
    const targetKeySelect = document.getElementById('target-key');
    targetKeySelect.innerHTML = originalKeySelect.innerHTML;

    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

    function transposeNote(note, semitones) {
        // Handle invalid notes
        if (!note || note.trim() === '') return '';
        
        // Standardize the note format
        note = note.toUpperCase().trim();
        
        // Find the index of the note in our notes array
        let noteIndex = notes.indexOf(note);
        if (noteIndex === -1) {
            // Handle alternative names (e.g., Db = C#)
            noteIndex = notes.indexOf(note.replace('B', '#'));
        }
        
        if (noteIndex === -1) return note; // Return original if not found

        // Calculate new index
        let newIndex = (noteIndex + semitones) % 12;
        if (newIndex < 0) newIndex += 12;
        
        return notes[newIndex];
    }

    document.getElementById('transpose-btn').addEventListener('click', function() {
        const originalKey = document.getElementById('original-key').value;
        const targetKey = document.getElementById('target-key').value;
        const inputNotes = document.getElementById('notes').value.split(' ');
        
        // Calculate semitones to transpose
        const originalIndex = notes.indexOf(originalKey);
        const targetIndex = notes.indexOf(targetKey);
        const semitones = targetIndex - originalIndex;
        
        // Transpose each note
        const transposedNotes = inputNotes.map(note => transposeNote(note, semitones));
        
        // Display result
        document.getElementById('result-text').textContent = transposedNotes.join(' ');
    });
});
