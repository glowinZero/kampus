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
  Checkbox
} from "@nextui-org/react";

import { AuthContext } from "../../Context/auth.context";
import removeIcon from "../../assets/images/remove.png";

const API_URL = "https://kampus.adaptable.app";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState();
  const [editedTasksTitle, setEditedTasksTitle] = useState(Array(tasks.length).fill(false));
  // eslint-disable-next-line no-unused-vars
  const [editedTasks, setEditedTasks] = useState(Array(tasks.length).fill(false));
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

      const updatedResponse = await axios.get(`${API_URL}/api/tasks/${user._id}`)
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
    <div>
    {tasks.length === 0 ? <div>
    <p>No tasks created</p>
    <Modal
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
                  className="text-white decoration-sky-500 mb-2 text-lg"
                  color="primary"
                  size="lg"
                  placeholder="Title"
                  type="date" value={deadline} 
                  onChange={(e) => setDeadline(e.target.value)} />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button
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
    <Button onPress={onOpen} color="secondary" className="mt-5">
        ADD TASK
      </Button></div> : <div>
      {tasks.map((task, index) => (
      <div
        key={task._id}
        className=" text-xl p-5 bg-slate-700 rounded-3xl mb-5 relative"
      >
          <Checkbox
            checked={statuses[index] === "Done"}
            onChange={() => changeTaskStatus(task._id, index)}
          />
          <Button
            isIconOnly
            onClick={() => deleteTask(task._id)}
            size="lg"
            className="shadow-lg  rounded-full bg-transparent top-6 absolute right-5 z-40"
          >
            <img src={removeIcon} className="flex-shrink-0 w-[auto] h-5" />
          </Button>
          {task.deadline && (
            <p className="absolute right-20 top-9 text-lg">
            {task.deadline && (
            <div className="absolute right-20 top-9 text-lg">
              <p>{calculateDaysLeft(task.deadline) < 0 ? "Overdue" : calculateDaysLeft(task.deadline) + " days left"}</p>
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
                  className="text-white decoration-sky-500 mb-2 text-lg"
                  color="primary"
                  size="lg"
                  placeholder="Title"
                  type="date" value={deadline} 
                  onChange={(e) => setDeadline(e.target.value)} />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button
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
      <Button onPress={onOpen} color="secondary" className="mt-5">
        ADD TASK
      </Button>
    </div>}
    </div>
  );
}

export default Tasks;
