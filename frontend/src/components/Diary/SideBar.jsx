import React from "react";

export default function Sidebar({
  notes,
  onAddNote,
  onDeleteNote,
  activeNote,
  setActiveNote,
}) {
  // Create a copy of notes and sort it to prevent mutation of props
  const sortedNotes = [...notes].sort(
    (a, b) => b.lastModified - a.lastModified
  );

  // Memoize the date options to avoid recalculating on each render
  const dateOptions = React.useMemo(
    () => ({
      hour: "2-digit",
      minute: "2-digit",
    }),
    []
  );

  return (
    <div className="app-sidebar">
      <div className="app-sidebar-header">
        <h1>Notes</h1>
        <button onClick={onAddNote}>Add</button>
      </div>

      <div className="app-sidebar-notes">
        {sortedNotes.map((note) => (
          <div
            key={note.id} // Use unique key for each note
            className={`app-sidebar-note ${
              note.id === activeNote ? "active" : ""
            }`}
            onClick={() => setActiveNote(note.id)}
          >
            <div className="sidebar-note-title">
              <strong>{note.title}</strong>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Stop the click from selecting the note
                  onDeleteNote(note.id);
                }}
              >
                Delete
              </button>
            </div>

            <p>{note.body && note.body.substr(0, 40) + "..."}</p>

            <small className="note-meta">
              Last modified{" "}
              {new Date(note.lastModified).toLocaleDateString(
                "en-IN",
                dateOptions
              )}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}
