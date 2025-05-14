import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Table,
  Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ViewProjectModal from "./ViewProjectModal";

import {
  fetchProjects,
  deleteProject,
  getSingleProject,
} from "../../../redux/slices/projectSlice";
import EditProjectModal from "./EditProjectModal";
import { apiUrl } from "../../../utils/config";
import { toast } from "react-toastify";
import axiosInstance from "../../../utils/axiosInstance";

const ProjectDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.projects);
  console.log(data);

  const handleShowModal = async (projectId) => {
    try {
      const response = await axiosInstance.get(
        `${apiUrl}/projects/${projectId}`
      );
      setSelectedProject(response.data);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching single project:", error);
      alert("Failed to load project details");
    }
  };

  useEffect(() => {
    dispatch(fetchProjects());
    // dispatch(fetchUsers());
  }, [dispatch]);


  const color = [ "primary", "success", "warning", "danger", "info", "dark" ];

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProject(null);
  };

  const handleDelete = (projectId) => {
    dispatch(deleteProject(projectId));
  };

  const filteredData = data.filter((project) => {
    const matchesSearch = project.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter ? project.status === statusFilter : true;
    const matchesPriority = priorityFilter
      ? project.priority === priorityFilter
      : true;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Container className="mt-4 ">



      <div className="bg-white p-3 rounded-3">
        <Row className="mb-3">
          <Col>
            <h2>Project Management</h2>
            {loading && <p>Loading projects...</p>}
            {error && <p>Error: {error}</p>}
          </Col>
          <Col className="text-end">
            <Link to="/add-project">
              <Button variant="primary" className="mb-3 p-2">
                <i class="fa-solid fa-plus me-2"></i> Add New Project
              </Button>
            </Link>
          </Col>
        </Row>

        {/* Filters Row */}
        <Row className="mb-3">
          <Col md={4}>
            <Form.Control
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col md={2}>
            <Form.Control
              as="select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
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
              value={priorityFilter}
              onChange={(e) => {
                setPriorityFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">All Priorities</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </Form.Control>
          </Col>
        </Row>

        {/* Project Table */}
        <Table bordered hover responsive style={{ border: '1px solid #dee2e6', borderRadius: '8px' }}>
          <thead className="table-light">
            <tr>
              <th className="ps-4">Project Name</th>
              <th>Assigned To</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Progress</th>
              <th className="pe-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((project, index) => (
              <tr key={index} className="bg-white py-3">
                <td className="ps-4 py-3">{project.name}</td>
                <td className="py-3">
                  {project.assignedTo?.firstName} {project.assignedTo?.lastName}
                </td>
                <td className="py-3">
                  {new Date(project.startDate).toLocaleDateString()}
                </td>
                <td className="py-3">
                  {new Date(project.endDate).toLocaleDateString()}
                </td>
                <td className="py-3">
                  <span
                    className={`badge ${
                      project.status === "Completed"
                        ? "bg-success"
                        : project.status === "Ongoing"
                        ? "bg-primary"
                        : project.status === "Pending"
                        ? "bg-warning"
                        : "bg-danger"
                    }`}
                  >
                    {project.status}
                  </span>
                </td>
                <td className="py-3">
                  <span
                    className={`badge ${
                      project.priority === "High"
                        ? "bg-danger"
                        : project.priority === "Medium"
                        ? "bg-warning"
                        : "bg-success"
                    }`}
                  >
                    {project.priority}
                  </span>
                </td>
                <td className="py-3">
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: `${project.Progress}%` }}
                      aria-valuenow={project.Progress}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {project.Progress}%
                    </div>
                  </div>
                </td>
                <td className="pe-4 py-3">
                  <button
                    className="me-2 text-info btn p-0"
                    onClick={() => handleShowModal(project._id)}
                  >
                    <i className="fa-solid fa-eye"></i>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedProject(project);
                      setShowEditModal(true);
                    }}
                    className="me-2 text-primary btn p-0"
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button
                    className="text-danger btn p-0"
                    onClick={() => handleDelete(`${project._id}`)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {selectedProject && (
          <ViewProjectModal
            show={showModal}
            handleClose={handleCloseModal}
            project={selectedProject}
          />
        )}

        <EditProjectModal
          show={showEditModal}
          handleClose={() => setShowEditModal(false)}
          project={selectedProject}
          // users={users}
          // refreshData={fetchProjectsAgain} // optional
        />

        <div className="d-flex justify-content-end mt-3">
          <Button
            size="sm"
            variant="outline-secondary"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </Button>
          {[...Array(totalPages)].map((_, idx) => (
            <Button
              key={idx}
              size="sm"
              variant={
                currentPage === idx + 1 ? "primary" : "outline-secondary"
              }
              className="mx-1"
              onClick={() => setCurrentPage(idx + 1)}
            >
              {idx + 1}
            </Button>
          ))}
          <Button
            size="sm"
            variant="outline-secondary"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </div>

        {/* Pagination */}
      </div>

      <div className="row gx-3 gy-3 text-center mt-2">
          {[
            {
              title: "Total Projects",
              value: 12,
              // note: "Next talk in 2 hours",
            },
            {
              title: "Completed Projects",
              value: "95%",
              // note: "Last 30 days average",
              className: "text-success",
            },
            { title: "Pending Projects", value: 8, 
              // note: "Requires attention"
             },
            {
              title: "Inprogress Projects",
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
    </Container>
  );
};

export default ProjectDashboard;
