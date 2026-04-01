import { Col } from "react-bootstrap";

export const ProjectCard = ({ title, description, imgUrl, extLink }) => {
  return (
    <Col size={12} sm={6} md={4}>
      {/* 1. Agregamos rel="noopener noreferrer" por seguridad */}
      <a href={extLink} target="_blank" rel="noopener noreferrer">
        <div className="proj-imgbx">
          {/* 2. Cambiamos el alt para que sea descriptivo y no use la palabra "image" */}
          <img alt={title} src={imgUrl} />
          <div className="proj-txtx">
            <h4>{title}</h4>
            <span>{description}</span>
          </div>
        </div>
      </a>
    </Col>
  );
};