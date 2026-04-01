import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import projImg1 from "../assets/img/project-img1.png";
import projImg2 from "../assets/img/project-img2.png";
import projImg3 from "../assets/img/project-img3.png";
import projImg4 from "../assets/img/project-img4.png";
import projImg5 from "../assets/img/project-img5.png";
import projImg7 from "../assets/img/project-img7.png";
import colorSharp2 from "../assets/img/color-sharp2.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Projects = () => {

  const projectsD = [
    {
      title: "AGENTXIA",
      description: "Design & Development",
      imgUrl: projImg1,
      extLink:""
    },
    {
      title: "DinoTransfers",
      description: "Design & Branding",
      imgUrl: projImg2,
      extLink:"https://www.figma.com/proto/20gv0eBOf3NJAuPVSJQAHz/DinoTransfers?type=design&node-id=227-376&t=1u4EDeKMFRTSlVOk-0&scaling=scale-down-width&page-id=36%3A2&starting-point-node-id=227%3A376&show-proto-sidebar=1"
    },
    {
      title: "NFT Store",
      description: "Design",
      imgUrl: projImg3,
      extLink:"https://www.figma.com/proto/X0rGMkU8bWKiyXLGXiTF0W/NFT?type=design&node-id=22-1706&t=teMggeqj6eIi62tE-0&scaling=scale-down-width&page-id=0%3A1&starting-point-node-id=22%3A1706"
    },
    {
      title: "KÁAPEJ COFFEE",
      description: "Design",
      imgUrl: projImg4,
      extLink:"https://www.figma.com/proto/w4PsCUyrrnzy3EsiwdMzQq/Coffee-App?type=design&node-id=31-1021&t=Ju5MPuYKyKiFuwYn-1&scaling=scale-down&page-id=0%3A1&starting-point-node-id=31%3A1021&mode=design"
    },
    {
      title: "Be^nu",
      description: "Design & Brand",
      imgUrl: projImg5,
      extLink:"https://www.figma.com/proto/gNOGVwwSGig37SEg0VwJl0/Be'nu?type=design&node-id=1-1613&t=LFx8LvSCzZ83Balj-0&scaling=scale-down&page-id=0%3A1&starting-point-node-id=1%3A1613&show-proto-sidebar=1"
    },
  ];

  const projectsC = [
    {
      title: "AGENTXIA",
      description: "Design & Development",
      imgUrl: projImg1,
      extLink:""
    },
    {
      title: "Walthome",
      description: "Development",
      imgUrl: projImg7,
      extLink:"https://eliseosh5.github.io/Walthome/"
    }

  ];

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn": ""}>
                <h2>Projects</h2>
                <p>These are some of the projects he worked on.</p>
                <Tab.Container id="projects-tabs" defaultActiveKey="first">
                  <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                    <Nav.Item>
                      <Nav.Link eventKey="first">Design</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">Programming</Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                    <Tab.Pane eventKey="first">
                      <Row>
                        {
                          projectsD.map((project, index) => {
                            return (
                              <ProjectCard
                                key={index}
                                {...project}
                                />
                            )
                          })
                        }
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                      <Row>
                        {
                          projectsC.map((project, index) => {
                            return (
                              <ProjectCard
                                key={index}
                                {...project}
                                />
                            )
                          })
                        }
                      </Row>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" alt="background" src={colorSharp2}></img>
    </section>
  )
}