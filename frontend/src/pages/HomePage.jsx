import api from "../lib/axios";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import NoteCard from "../components/NoteCard";
import RateLimitedUi from "../components/RateLimitedUi";
import NotesNotFound from "../components/NotesNotFound";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        setNotes(res.data);
        setIsRateLimited(false);
        console.log("res", res.data);
      } catch (error) {
        console.log("error", error);
        if (error.response.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setloading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimited && <RateLimitedUi />}
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-primary py-10">Loading...</div>
        )}
        {notes.length == 0 && !isRateLimited && <NotesNotFound />}
        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes?.map((note) => (
              <NoteCard key={note?._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
