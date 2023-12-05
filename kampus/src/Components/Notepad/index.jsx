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
import { Accordion, AccordionItem } from "@nextui-org/react";

const API_URL = "http://localhost:5005";

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
      .get(`${API_URL}/api/notes?userId=${user._id}`)
      .then((response) => {
        setNotes(response.data);
        // setEditedNotesTitle(response.data.map(() => false));
        // setEditedNotesBody(response.data.map(() => false));
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

  return (
    <div>
      {notes.map((note, index) => (
        <div key={note._id}>
          <Input
            color="grey"
            placeholder={note.title}
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
          <Input
            placeholder={note.body}
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
          {note.date && <p>{note.date.substring(0, 10)}</p>}
        </div>
      ))}
      <Button onPress={onOpen} color="secondary">
        add note
      </Button>
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
