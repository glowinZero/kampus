import { useEffect, useState, useContext } from "react";
import axios from "axios";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { AuthContext } from "../../Context/auth.context";
import { Textarea } from "@nextui-org/react";
import addIcon from '../../assets/images/add.png'
import removeIcon from '../../assets/images/remove.png'

const API_URL = "https://kampus.adaptable.app";

function NotePad() {
  const [notes, setNotes] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editedNotesTitle, setEditedNotesTitle] = useState([]);
  const [editedNotesBody, setEditedNotesBody] = useState([]);

  const { user, storeToken } = useContext(AuthContext);

  useEffect(() => {
    console.log("see UserId", user._id, storeToken);
    axios
      .get(`${API_URL}/api/notes/${user._id}`)
      .then((response) => {
        setNotes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks details:", error);
      });
  }, [user._id]);

  const addNote = async () => {
    try {
      const generateDate = Date.now();
      const requestBody = {
        title,
        body,
        date: generateDate,
        user: user._id,
      };

      const response = await axios.post(`${API_URL}/api/note`, requestBody);

      console.log("Note Created Successfully:", response.data);

      const updatedResponse = await axios.get(
        `${API_URL}/api/notes?userId=${user._id}`
      );
      setNotes(updatedResponse.data);
      setEditedNotesTitle(updatedResponse.data.map(() => false));
      setEditedNotesBody(updatedResponse.data.map(() => false));
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const updateNoteTitle = async (noteId, updatedTitle, updatedBody, index) => {
    try {
      const updatedNote = {
        title: updatedTitle,
      };

      await axios.put(`${API_URL}/api/notes/${noteId}`, updatedNote);

      const updatedResponse = await axios.get(
        `${API_URL}/api/notes?userId=${user._id}`
      );
      setNotes(updatedResponse.data);

      setEditedNotesTitle((prevEditedNotes) => {
        const newEditedNotes = [...prevEditedNotes];
        newEditedNotes[index] = false;
        return newEditedNotes;
      });

      setTitle("");
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const updateNoteBody = async (noteId, updatedTitle, updatedBody, index) => {
    try {
      const updatedNoteBody = {
        body: updatedBody,
      };

      await axios.put(`${API_URL}/api/notes/${noteId}`, updatedNoteBody);

      const updatedResponse = await axios.get(
        `${API_URL}/api/notes?userId=${user._id}`
      );
      setNotes(updatedResponse.data);

      setEditedNotesBody((prevEditedNotes) => {
        const newEditedNotes = [...prevEditedNotes];
        newEditedNotes[index] = false;
        return newEditedNotes;
      });

      setBody("");
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const deleteNote = (note) => {
    axios
      .delete(`${API_URL}/api/notes/${note._id}`)
      .then(() => {
        console.log("Note deleted");
        fetchData();
      })
      .catch((error) => {
        console.error("Error deleting Student:", error);
      });
  };

  const fetchData = async () => {
    try {
      const responseNotes = await axios.get(`${API_URL}/api/notes/`);
      console.log("users", responseNotes.data);
      setNotes(responseNotes.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  return (
    <div className="relative">
      <Button
        isIconOnly
        onPress={onOpen}
        size="md"
        className=" fixed bottom-[100px] right-[485px] bg-[#D3D3D3] shadow-lg rounded-full z-40"
      >
        <img src={addIcon} className="flex-shrink-0 w-[auto] h-6" />
      </Button>
      {notes.map((note, index) => (
        <div
          key={note._id}
          className=" text-xl p-5 bg-slate-700 rounded-3xl mb-5 relative"
        >
          <Button
            isIconOnly
            onClick={() => deleteNote(note)}
            size="lg"
            className="rounded-full bg-transparent top-6 absolute right-5 z-40"
          >
            <img src={removeIcon} className="flex-shrink-0 w-[auto] h-5" />
          </Button>
          {note.date && (
            <p className="absolute right-20 top-9 text-lg">
              {note.date.substring(0, 10)}
            </p>
          )}
          <Input
            className="text-white decoration-sky-500 mb-2 text-lg"
            color="primary"
            variant="underlined"
            size="lg"
            placeholder="Title"
            value={editedNotesTitle[index] ? title : note.title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updateNoteTitle(note._id, e.target.value, note.body, index);
              }
            }}
            onFocus={() =>
              setEditedNotesTitle((prevEditedNotes) => {
                const newEditedNotes = [...prevEditedNotes];
                newEditedNotes[index] = true;
                return newEditedNotes;
              })
            }
          />
          <Textarea
            maxRows={3}
            className="text-black placeholder-gray-500"
            placeholder="Write your notes here"
            value={editedNotesBody[index] ? body : note.body}
            onChange={(e) => setBody(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updateNoteBody(note._id, note.title, e.target.value, index);
              }
            }}
            onFocus={() =>
              setEditedNotesBody((prevEditedNotes) => {
                const newEditedNotes = [...prevEditedNotes];
                newEditedNotes[index] = true;
                return newEditedNotes;
              })
            }
          />
        </div>
      ))}
      <Modal
        size="L"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Add Note</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Title"
                  placeholder="Enter the title of the note"
                  variant="bordered"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Input
                  label="Body"
                  placeholder="Write the description of the note"
                  variant="bordered"
                  onChange={(e) => setBody(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    addNote();
                    onClose();
                  }}
                >
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default NotePad;
