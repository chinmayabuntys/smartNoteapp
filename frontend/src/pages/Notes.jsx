import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../context/Context";
import "../style/Notes.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "./Loader";

function Notes() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase()),
  );

  const colors = [
    "#f28b82",
    "#fbbc04",
    "#fff475",
    "#ccff90",
    "#a7ffeb",
    "#cbf0f8",
    "#aecbfa",
    "#d7aefb",
  ];
  const navigate = useNavigate();

  const { token, logout } = useContext(Context);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://noteapp-backend-1fwt.onrender.com/api/notes/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotes(res.data);
    } catch (error) {
      if (error.response?.data?.message === "Token expired") {
        localStorage.removeItem("token");

        toast.error("Session expired. Please login again.");
        logout();
        navigate("/login");
      } else {
        toast.error(error.response?.data?.message || "Failed to fetch notes");
      }
    }
    setLoading(false);
  };

  const createNote = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://noteapp-backend-1fwt.onrender.com/api/notes/create",
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      setNotes((prev) => [...prev, res.data]);
      setTitle("");
      setContent("");

      toast.success(res.data.message);
    } catch (error) {
      if (error.response?.data?.message === "Token expired") {
        localStorage.removeItem("token");
        logout();
        toast.error("Session expired. Please login again.");

        navigate("/login");
      } else {
        toast.error(error.response?.data?.message || "Failed to create note");
      }
    }
  };
  useEffect(() => {
    fetchNotes();
  }, []);
  if (loading) {
    return <Loader />;
  }

  const editNote = async (id) => {
    try {
      const res = await axios.patch(
        `https://noteapp-backend-1fwt.onrender.com/api/notes/edit/${id}`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      setNotes(notes.map((note) => (note._id === id ? res.data : note)));
      setTitle("");
      setContent("");
      setEditId(null);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to edit note");
    }
  };
  const handleedit = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditId(note._id);
  };

  const deleteNote = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This note will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e63946",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axios.delete(
          `https://noteapp-backend-1fwt.onrender.com/api/notes/delete/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setNotes(notes.filter((note) => note._id !== id));

        Swal.fire("Deleted!", res.data.message, "success");
      } catch (error) {
        Swal.fire("Error!", "Failed to delete note", "error");
      }
    }
  };
  return (
    <>
      <div className="notes-page">
        <div className="main-container">
          <input
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Enter Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          {editId ? (
            <button onClick={() => editNote(editId)}>Update Note</button>
          ) : (
            <button onClick={createNote}>Create Note</button>
          )}
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="note-container">
          {filteredNotes.length === 0 ? (
            <div className="empty-state">
              <h2>No Notes Yet 📝</h2>
              <p>Create your first note to get started.</p>
            </div>
          ) : (
            filteredNotes.map((note) => {
              const randomColor =
                colors[Math.floor(Math.random() * colors.length)];

              return (
                <div
                  className="note-card"
                  key={note._id}
                  style={{ background: randomColor }}
                >
                  <h3>{note.title}</h3>

                  <p>{note.content}</p>

                  <div className="note-actions">
                    <button
                      className="edit-btn"
                      onClick={() => handleedit(note)}
                    >
                      ✏️
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => deleteNote(note._id)}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}

export default Notes;
