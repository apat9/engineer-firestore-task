import React, { useState, useEffect } from 'react'; // Or Whatever React imports you want
import './App.css';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import db from './firebase-config';


function App() {

  const [newChapterName, setNewChapterName] = useState('');
  const [chapterToDelete, setChapterToDelete] = useState('');
  const [chapters, setChapters] = useState([]);
  const chapterRef = collection(db, "chapters_test");

  const displayDatabase = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "chapters_test"));
      const chaptersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setChapters(chaptersData);
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  };

  // Function to add a chapter
  const addChapter = async () => {
    await addDoc(chapterRef, { name: newChapterName });
  };

  // Function to delete a chapter
  const deleteChapter = async () => {
    const querySnapshot = await getDocs(collection(db, "chapters_test"));
    querySnapshot.forEach(async (doc) => {
      if (doc.id == chapterToDelete.trim()) {
        await deleteDoc(doc.ref);
      }
    });
  };

  return (
    <div className="App">
      <h1>Chapter Operations</h1>
      <button onClick={displayDatabase}>Display Database</button>
      <div>
        <input
          type="text"
          placeholder="New Chapter Name"
          value={newChapterName}
          onChange={(e) => setNewChapterName(e.target.value)}
        />
        <button onClick={addChapter}>Add Chapter</button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Chapter ID to Delete"
          value={chapterToDelete}
          onChange={(e) => setChapterToDelete(e.target.value)}
        />
        <button onClick={deleteChapter}>Delete Chapter</button>
      </div>
      <div>
        {chapters.map((chapter) => (
          <div key={chapter.id}>
            <span>{chapter.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
