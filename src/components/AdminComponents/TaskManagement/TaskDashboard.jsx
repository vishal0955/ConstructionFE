import React, { useEffect, useState } from "react";
import { Table, Button, Form, InputGroup, FormControl, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteTask, fetchTasks } from "../../../redux/slices/taskManagement";
import Swal from "sweetalert2";

const AllTasks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { tasks, loading, error } = useSelector((state) => state.task);

  

  console.log("Tasks:", tasks);

  const HandleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteTask(id))
          .then(() => {
            Swal.fire("Deleted!", "The Task has been deleted.", "success");
            dispatch(fetchTasks()); // Refresh the table after delete
          })
          .catch((error) => {
            Swal.fire("Error!", "Something went wrong.", "error");
          });
      }
    });
  };

  const [filter, setFilter] = useState("");

  const filteredTasks = loading ? (
    <p> Loading...</p>
  ) : tasks.filter((task) => {
    const taskTitle = task?.taskTitle || "";
    let assignTo = "";
    if (typeof task?.assignTo === "object" && task?.assignTo !== null) {
      assignTo = `${task.assignTo.firstName || ""} ${task.assignTo.lastName || ""}`;
    } else if (typeof task?.assignTo === "string") {
      assignTo = task?.assignTo;
    }
    const category = task?.category || "";
  
    return (
      taskTitle.toLowerCase().includes(filter.toLowerCase()) ||
      assignTo.toLowerCase().includes(filter.toLowerCase()) ||
      category.toLowerCase().includes(filter.toLowerCase())
    );
  });

  // const filteredData = data.filter((project) => {
  //   const matchesSearch = task?.name
  //     .toLowerCase()
  //     .includes(searchTerm.toLowerCase());
  //   const matchesStatus = statusFilter ? project.status === statusFilter : true;
  //   const matchesPriority = priorityFilter
  //     ? project.priority === priorityFilter
  //     : true;
  //   return matchesSearch && matchesStatus && matchesPriority;
  // });


  const color = [ "primary", "success", "warning", "danger", "info", "dark" ];

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div>
      <div className="d-flex justify-content-between mb-3 mt-4">  
        <h3>All Tasks</h3>
        <Link to="/create-task">
          <Button variant="primary" className="mb-3">
            Add New Task
          </Button>
        </Link>
      </div>

      
      

         <Row className="mb-3">
                  <Col md={4}>
                    <Form.Control
                      type="text"
                      placeholder="Search Tasks .."
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                    />
                  </Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                    >
                      <option value="">All Statuses</option>
                      <option>Ongoing</option>
                      <option>Completed</option>
                      <option>In Progress</option>
                      <option>Delayed</option>
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      // value={priorityFilter}
                      // onChange={(e) => {
                      //   setPriorityFilter(e.target.value);
                      //   setCurrentPage(1);
                      // }}

                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                    >
                      <option value="">All Priorities</option>
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </Form.Control>
                  </Col>
                </Row>

 


      <Table bordered hover responsive className="mb-0" style={{ border: '1px solid #dee2e6', borderRadius: '8px' }}>
        <thead className="table-light">
          <tr>
            <th className="ps-4">Task Title</th>
            <th>Assigned To</th>
            <th>Category</th>
            <th>Priority</th>
            <th>Due Date</th>
            <th>Status</th>
            <th className="pe-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="7" className="text-center py-3">
                Loading...
              </td>
            </tr>
          ) : filteredTasks.length > 0 ? (
            filteredTasks.map((task, index) => (
              <tr
                key={index}
                className="bg-white py-3"
                style={{ cursor: "pointer" }}
              >
                <td className="ps-4 py-3">{task.taskTitle}</td>
                <td className="py-3">
                  {task.assignTo
                    ? `${task.assignTo.firstName} ${task.assignTo.lastName}`
                    : "Unassigned"}
                </td>
                <td className="py-3">{task.category}</td>
                <td className="py-3">
                  <span
                    className={`badge text-white ${
                      task.priority === "High"
                        ? "bg-danger"
                        : task.priority === "Medium"
                        ? "bg-warning"
                        : "bg-success"
                    }`}
                  >
                    {task.priority}
                  </span>
                </td>
                <td className="py-3">
                  {new Date(task.dueDate).toISOString().split("T")[0]}
                </td>
                <td className="py-3">
                  <span
                    className={`badge text-white ${
                      task.status === "Completed"
                        ? "bg-[#117a1f]"
                        : task.status === "In Progress"
                        ? "bg-primary"
                        : "bg-danger"
                    }`}
                  >
                    {task.status}
                  </span>
                </td>
                <td className="pe-4 py-3">
                  <button
                    className="btn p-0 me-2 text-primary"
                    onClick={() => navigate(`/updatetask/${task._id}`)}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button
                    className="btn p-0 text-danger"
                    onClick={() => HandleDelete(task._id)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-3">
                No tasks found
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <div className="d-flex justify-content-end mt-3">
        <Button size="sm" variant="outline-secondary" className="me-2">
          Previous
        </Button>
        <Button size="sm" variant="primary" className="ms-2">
          1
        </Button>
        <Button size="sm" variant="outline-secondary" className="ms-2">
          2
        </Button>
        <Button size="sm" variant="outline-secondary" className="ms-2">
          Next
        </Button>
      </div>

      <div className="row gx-3 gy-3 text-center mt-2">
          {[
            {
              title: "Total Tasks",
              value: 12,
              // note: "Next talk in 2 hours",
            },
            {
              title: "Completed Tasks",
              value: "95%",
              // note: "Last 30 days average",
              className: "text-success",
            },
            { title: "Pending Tasks", value: 8, 
              // note: "Requires attention"
             },
            {
              title: "Inprogress Tasks",
              value: "10",
              // note: "All requirements met",
              className: "text-success",
            },
          ].map((card, i) => (
            <>
            


 <div className="col-md-3" >
            <div
              className={`stats-card p-4 shadow-lg border-start border-4 border-${color[i]} rounded-3  h-100 transition-all hover:shadow-xl`}
            >
              <div className="d-flex align-items-start gap-3">
                <div
                  className={`stats-number h2 mb-0 fw-bold text-${color[i]}`}
                >
                  {card.value}
         
                </div>
                <div>
                  <div className="stats-title h4 mb-1 text-gray-800">
                  {card.title}
                  </div>
                 

                </div>
              </div>
            </div>
          </div>

          </>
          ))}
        </div>
    </div>
  );
};

export default AllTasks;
