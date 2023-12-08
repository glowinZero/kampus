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
  Textarea,
} from "@nextui-org/react";
import { AuthContext } from "../../Context/auth.context";
import addIcon from "../../assets/images/add.png";
import removeIcon from "../../assets/images/remove.png";

const API_URL = "https://kampus.adaptable.app";

function NotePad() {
  const [notes, setNotes] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editedNotesTitle, setEditedNotesTitle] = useState(
    Array(notes.length).fill(false)
  );
  const [editedNotesBody, setEditedNotesBody] = useState(
    Array(notes.length).fill(false)
  );
  const [editedTitle, setEditedTitle] = useState(Array(notes.length).fill(""));
  const [editedBody, setEditedBody] = useState(Array(notes.length).fill(""));
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

      await axios.post(`${API_URL}/api/note`, requestBody);

      const updatedResponse = await axios.get(
        `${API_URL}/api/notes?userId=${user._id}`
      );
      setNotes(updatedResponse.data);
      setEditedNotesTitle(updatedResponse.data.map(() => false));
      setEditedNotesBody(updatedResponse.data.map(() => false));
      fetchData();
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
        console.error("Error deleting Note:", error);
      });
  };
  
  const fetchData = async () => {
    try {
      const responseNotes = await axios.get(`${API_URL}/api/notes/${user._id}`);
      setNotes(responseNotes.data);
    } catch (error) {
      console.error("Error fetching user notes:", error);
    }
  };

  return (
    <div className="relative">
      <Button
        isIconOnly
        onPress={onOpen}
        size="md"
        className=" fixed small:bottom-[8vh] medium:bottom-[10vh] main:bottom-[10.5vh]
        small:right-[27vw] medium:right-[26vw] main:right-[26vw] bg-[#D3D3D3] shadow-lg rounded-full z-40"
      >
        <img src={addIcon} className="flex-shrink-0 w-[auto] h-6" />
      </Button>
      <div>
        {notes.length === 0 ? (
          <div>
            <p className="mt-5 opacity-90">NO NOTES CREATED</p>

            <Modal
              classNames={{
                size: "5xl",
                body: "py-6",
                backdrop:
                  "bg-gradient-to-t from-ScaleColor1-500 to-ScaleColor1-500/10 backdrop-opacity-20",
                base: "border-[#292f46] bg-white text-black",
                header: "border-b-[1px] border-[#292f46] text-black",
                footer: "border-t-[1px] border-[#292f46]",
                closeButton: "active:bg-white/10",
              }}
              motionProps={{
                variants: {
                  enter: {
                    y: 0,
                    opacity: 1,
                    transition: {
                      duration: 0.2,
                      ease: "easeOut",
                    },
                  },
                  exit: {
                    y: -20,
                    opacity: 0,
                    transition: {
                      duration: 0.2,
                      ease: "easeIn",
                    },
                  },
                },
              }}
              backdrop="opaque"
              size="L"
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              placement="center"
            >
              <ModalContent>
                {(onClose) => (
                  <div>
                    <ModalHeader className="text-black">Add Note</ModalHeader>
                    <ModalBody>
                      <Input
                        autoFocus
                        label="Title"
                        placeholder="Enter the title of the note"
                        size="md"
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
                      <Button color="danger" variant="solid" onPress={onClose}>
                        Cancel
                      </Button>
                      <Button
                        color="primary"
                        variant="solid"
                        onPress={() => {
                          addNote();
                          onClose();
                        }}
                      >
                        Submit
                      </Button>
                    </ModalFooter>
                  </div>
                )}
              </ModalContent>
            </Modal>
          </div>
        ) : (
          <div>
            {notes.map((note, index) => (
              <div
                key={note._id}
                className="text-xl p-5 bg-Color2 rounded-3xl mb-5 relative"
              >
                <Button
                  isIconOnly
                  onClick={() => deleteNote(note)}
                  size="lg"
                  className="rounded-full bg-transparent top-6 absolute right-5 z-40"
                >
                  <img
                    src={removeIcon}
                    className="flex-shrink-0 w-[auto] h-5"
                  />
                </Button>
                {note.date && (
                  <p className="absolute right-20 top-9 text-lg">
                    {note.date.substring(0, 10)}
                  </p>
                )}
                <Input
                  className="text-white decoration-sky-500 mb-5 text-lg"
                  color="primary"
                  variant="underlined"
                  size="lg"
                  placeholder="Title"
                  value={
                    editedNotesTitle[index] ? editedTitle[index] : note.title
                  }
                  onChange={(e) =>
                    setEditedTitle((prevTitles) => {
                      const newTitles = [...prevTitles];
                      newTitles[index] = e.target.value;
                      return newTitles;
                    })
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      updateNoteTitle(
                        note._id,
                        editedTitle[index],
                        note.body,
                        index
                      );
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
                  value={editedNotesBody[index] ? editedBody[index] : note.body}
                  onChange={(e) =>
                    setEditedBody((prevBodies) => {
                      const newBodies = [...prevBodies];
                      newBodies[index] = e.target.value;
                      return newBodies;
                    })
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      updateNoteBody(
                        note._id,
                        note.title,
                        editedBody[index],
                        index
                      );
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
              classNames={{
                size: "5xl",
                body: "py-6",
                backdrop:
                  "bg-gradient-to-t from-ScaleColor1-500 to-ScaleColor1-500/10 backdrop-opacity-20",
                base: "border-[#292f46] bg-white text-black",
                header: "border-b-[1px] border-[#292f46] text-black",
                footer: "border-t-[1px] border-[#292f46]",
                closeButton: "active:bg-white/10",
              }}
              motionProps={{
                variants: {
                  enter: {
                    y: 0,
                    opacity: 1,
                    transition: {
                      duration: 0.2,
                      ease: "easeOut",
                    },
                  },
                  exit: {
                    y: -20,
                    opacity: 0,
                    transition: {
                      duration: 0.2,
                      ease: "easeIn",
                    },
                  },
                },
              }}
              backdrop="opaque"
              size="L"
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              placement="center"
            >
              <ModalContent>
                {(onClose) => (
                  <div>
                    <ModalHeader className="text-black">Add Note</ModalHeader>
                    <ModalBody>
                      <Input
                        autoFocus
                        label="Title"
                        placeholder="Enter the title of the note"
                        size="md"
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
                      <Button color="danger" variant="solid" onPress={onClose}>
                        Cancel
                      </Button>
                      <Button
                        variant="solid"
                        color="primary"
                        onPress={() => {
                          addNote();
                          onClose();
                        }}
                      >
                        Submit
                      </Button>
                    </ModalFooter>
                  </div>
                )}
              </ModalContent>
            </Modal>
          </div>
        )}
      </div>
    </div>
  );
}

export default NotePad;
