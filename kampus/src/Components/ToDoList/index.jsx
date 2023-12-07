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
  Checkbox,
} from "@nextui-org/react";
import addIcon from "../../assets/images/add.png";
// ... (other imports)

import { AuthContext } from "../../Context/auth.context";
import removeIcon from "../../assets/images/remove.png";

const API_URL = "https://kampus.adaptable.app";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState();
  const [editedTasksTitle, setEditedTasksTitle] = useState(
    Array(tasks.length).fill(false)
  );
  // eslint-disable-next-line no-unused-vars
  const [editedTasks, setEditedTasks] = useState(
    Array(tasks.length).fill(false)
  );
  const [statuses, setStatuses] = useState(Array(tasks.length).fill("To do"));

  // eslint-disable-next-line no-unused-vars
  const { user, storeToken } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/tasks/${user._id}`)
      .then((response) => {
        setTasks(response.data);
        setStatuses(Array(response.data.length).fill("To do"));
      })
      .catch((error) => {
        console.error("Error fetching tasks details:", error);
      });
  }, [user._id]);

  const addTask = async () => {
    try {
      const updatestatus = "To do";
      const requestBody = {
        title,
        deadline,
        status: updatestatus,
        user: user._id,
      };

      const response = await axios.post(`${API_URL}/api/task`, requestBody);

      console.log("Task Created Successfully:", response.data);

      const updatedResponse = await axios.get(
        `${API_URL}/api/tasks/${user._id}`
      );
      setTasks(updatedResponse.data);
      setEditedTasksTitle(Array(updatedResponse.data.length).fill(false));
      setEditedTasks(Array(updatedResponse.data.length).fill(false));
      setStatuses((prevStatuses) => [...prevStatuses, "To do"]);
      setTitle("");
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const updateTaskTitle = async (taskId, updatedTitle, index) => {
    try {
      const updatedTask = {
        title: updatedTitle,
      };

      await axios.put(`${API_URL}/api/tasks/${taskId}`, updatedTask);

      const updatedResponse = await axios.get(
        `${API_URL}/api/tasks?userId=${user._id}`
      );
      setTasks(updatedResponse.data);

      setEditedTasks((prevEditedTasks) => {
        const newEditedTasks = [...prevEditedTasks];
        newEditedTasks[index] = false;
        return newEditedTasks;
      });
    } catch (error) {
      console.error("Error updating Task:", error);
    }
  };

  const deleteTask = (taskId) => {
    axios
      .delete(`${API_URL}/api/tasks/${taskId}`)
      .then(() => {
        console.log("Task deleted");
        fetchData();
      })
      .catch((error) => {
        console.error("Error deleting Task:", error);
      });
  };

  const fetchData = async () => {
    try {
      const responseTasks = await axios.get(`${API_URL}/api/tasks/${user._id}`);
      console.log("tasks", responseTasks.data);
      setTasks(responseTasks.data);
      setEditedTasksTitle(Array(responseTasks.data.length).fill(false));
      setEditedTasks(Array(responseTasks.data.length).fill(false));
      setStatuses(Array(responseTasks.data.length).fill("To do"));
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const changeTaskStatus = async (taskId, index) => {
    try {
      const updatedTask = {
        status: statuses[index] === "To do" ? "Done" : "To do",
      };

      await axios.put(`${API_URL}/api/tasks/${taskId}`, updatedTask);

      const updatedResponse = await axios.get(
        `${API_URL}/api/tasks?userId=${user._id}`
      );
      setTasks(updatedResponse.data);

      setStatuses((prevStatuses) => {
        const newStatuses = [...prevStatuses];
        newStatuses[index] = updatedTask.status;
        return newStatuses;
      });

      setEditedTasks((prevEditedTasks) => {
        const newEditedTasks = [...prevEditedTasks];
        newEditedTasks[index] = false;
        return newEditedTasks;
      });
    } catch (error) {
      console.error("Error updating Task:", error);
    }
  };

  const calculateDaysLeft = (deadline) => {
    const currentDate = new Date();
    const deadlineDate = new Date(deadline);
    const timeDifference = deadlineDate.getTime() - currentDate.getTime();
    const daysLeft = Math.floor(timeDifference / (1000 * 3600 * 24));
    return daysLeft;
  };

  return (
    <div className="relative">
      <Button
        isIconOnly
        onPress={onOpen}
        size="md"
        className=" fixed small:bottom-[58vh] medium:bottom-[60vh] main:bottom-[60vh] small:right-[4vw] medium:right-[3.5vw] main:right-[3.5vw] bg-[#D3D3D3] shadow-lg rounded-full z-40"
      >
        <img src={addIcon} className="flex-shrink-0 w-[auto] h-6" />
      </Button>
      {tasks.length === 0 ? (
        <div>
          <p className="mt-5 opacity-90">NO TASKS CREATED</p>
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
                <>
                  <ModalHeader>Add Task</ModalHeader>
                  <ModalBody>
                    <Input
                      autoFocus
                      label="Title"
                      placeholder="Enter the title of the task"
                      variant="bordered"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <Input
                      className="text-black decoration-black bg mb-2 text-lg"
                      size="lg"
                      variant="bordered"
                      placeholder="Title"
                      type="date"
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="shadow" onPress={onClose}>
                      Cancel
                    </Button>
                    <Button
                      variant="shadow"
                      color="primary"
                      onPress={() => {
                        addTask();
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
      ) : (
        <div>
          {tasks.map((task, index) => (
            <div
              key={task._id}
              className=" text-xl p-5 ml-5 mr-5 bg-Color2 rounded-3xl mb-5 relative"
            >
              <Checkbox
                className="rounded-full bg-transparent top-10 absolute right-48 z-40"
                checked={statuses[index] === "Done"}
                onChange={() => changeTaskStatus(task._id, index)}
              />
              <Button
                isIconOnly
                onClick={() => deleteTask(task._id)}
                size="lg"
                className="rounded-full bg-transparent top-6 absolute right-5 z-40"
              >
                <img src={removeIcon} className="flex-shrink-0 w-[auto] h-5" />
              </Button>
              {task.deadline && (
                <p className="absolute right-20 top-9 text-lg z-40 ">
                  {task.deadline && (
                    <div className=" right-20 top-9 text-lg">
                      <p>
                        {calculateDaysLeft(task.deadline) < 0
                          ? "Overdue"
                          : calculateDaysLeft(task.deadline) + " days left"}
                      </p>
                    </div>
                  )}
                </p>
              )}
              <Input
                className="text-white decoration-sky-500 mb-2 text-lg"
                color="primary"
                variant="underlined"
                size="lg"
                placeholder="Title"
                value={editedTasksTitle[index] ? title : task.title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    updateTaskTitle(task._id, e.target.value, index);
                  }
                }}
                onFocus={() =>
                  setEditedTasksTitle((prevEditedTasks) => {
                    const newEditedTasks = [...prevEditedTasks];
                    newEditedTasks[index] = true;
                    return newEditedTasks;
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
                <>
                  <ModalHeader>Add Task</ModalHeader>
                  <ModalBody>
                    <Input
                      autoFocus
                      label="Title"
                      placeholder="Enter the title of the task"
                      variant="bordered"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <Input
                      className="text-black decoration-black bg mb-2 text-lg"
                      size="lg"
                      variant="bordered"
                      placeholder="Title"
                      type="date"
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="shadow" onPress={onClose}>
                      Cancel
                    </Button>
                    <Button
                      variant="shadow"
                      color="primary"
                      onPress={() => {
                        addTask();
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
      )}
    </div>
  );
}

export default Tasks;
