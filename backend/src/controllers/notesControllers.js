import Note from "../model/Note.js";

export const getAllNotes = async (req, res) => {
  // res.status(200).send("You just fetched the notes");
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    console.log("Error in getAllNotes controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createNote = async (req, res) => {
  // res.status(201).json({ message: "Note created successfuly!" });
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content }); //title:title, content:content
    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.log("Error in createNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateNote = async (req, res) => {
  // res.status(200).json({ message: "Note updated successfuly!" });
  try {
    const { title, content } = req.body;
    const updatedNoted = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true },
    );
    if (!updatedNoted)
      return res.status(404).json({ message: "Note not found" });
    res.status(200).json(updatedNoted);
  } catch (error) {
    console.log("Error in updateNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteNote = async (req, res) => {
  // res.status(200).json({ message: "Note deleted successfuly!" });
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote)
      return res.status(404).json({ message: "Note not found" });
    res.status(200).json("Note deleted successfuly");
  } catch (error) {
    console.log("Error in deleteNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// const greet = (name, callback) => {
//   return console.log("HI:", name);
// };
// greet("Affan", () => console.log(callback));
