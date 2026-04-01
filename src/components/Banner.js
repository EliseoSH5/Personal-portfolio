import { useState, useEffect, useCallback } from "react"; // 1. Agregamos useCallback
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/img/header-img.svg";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(250 - Math.random() * 100);
  // Se eliminó la variable 'index' porque no se usaba en el HTML
  
  const toRotate = [ "Web Developer", "Web Designer", "UX/UI Designer" ];
  const period = 2000;

  // 2. Envolvemos tick en useCallback para que useEffect no de errores de dependencia
  const tick = useCallback(() => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(500);
    }
  }, [isDeleting, loopNum, text.length, toRotate]); // Dependencias de tick

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [tick, delta]); // 3. Ahora tick y delta son dependencias válidas

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="align-items-center"> {/* Corregido: aligh -> align */}
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <span className="tagline">Welcome to my Portfolio</span>
                <h1>{`Hi! I'm Eliseo Salinas`}</h1>
                <h1>
                  <span className="txt-rotate">
                    <span className="wrap">{text}</span>
                  </span>
                </h1>
                <p>I am a passionate UX/UI designer and Product Designer with over 3 years of experience in designing and developing websites and mobile applications focused on functionality and user experiences.</p>
              </div>}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                  {/* Corregido: El alt no debe decir "Img" */}
                  <img src={headerImg} alt="Header banner showcasing development theme"/>
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  )
}