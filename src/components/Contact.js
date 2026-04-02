import React, { useState, useRef } from 'react'; // Agregamos useState para feedback visual
import { Container, Row, Col } from "react-bootstrap";
import contactImg from "../assets/img/contact-img.svg";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Contact = () => {
  const form = useRef();
  const [buttonText, setButtonText] = useState('Send message');
  const [status, setStatus] = useState({});

  const sendEmail = async (e) => {
    e.preventDefault();
    setButtonText("Sending...");
    
    // Obtenemos los valores directamente del ref del formulario
    const details = {
      firstName: form.current.from_name.value,
      email: form.current.from_email.value,
      message: form.current.message.value,
    };

    try {
      // IMPORTANTE: La ruta comienza con / para ir a la raíz de Vercel
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(details),
      });

      // Verificamos si la respuesta es válida antes de procesar el JSON
      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      const result = await response.json();
      
      setButtonText("Send message");

      if (result.code === 200) {
        setStatus({ success: true, message: 'Message sent successfully!' });
        form.current.reset(); // Limpia el formulario tras el éxito
      } else {
        setStatus({ success: false, message: 'Something went wrong, please try again later.' });
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setButtonText("Send message");
      setStatus({ success: false, message: 'Could not connect to the server.' });
    }
  };

  return (
    <section className="contact" id="contact">
      <Container>
        <Row className="align-items-center">
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) => (
                <img 
                  className={isVisible ? "animate__animated animate__zoomIn" : ""} 
                  src={contactImg} 
                  alt="Contact Us" 
                />
              )}
            </TrackVisibility>
          </Col>
          <Col size={12} md={6}>
            <div className="animate__animated animate__fadeIn">
              <h2>Get In Touch</h2>
              <form ref={form} onSubmit={sendEmail}>
                <Row>
                  <Col size={12} className="px-1">
                    <label>Name</label>
                    <input type="text" name="from_name" placeholder="Full Name" required />
                  </Col>
                  <Col size={12} className="px-1">
                    <label>Email</label>
                    <input type="email" name="from_email" placeholder="Email Address" required />
                  </Col>
                  <Col size={12} className="px-1">
                    <label>Message</label>
                    <textarea rows="6" name="message" placeholder="Message" required></textarea>
                    <button type="submit"><span>{buttonText}</span></button>
                  </Col>
                  {
                    status.message &&
                    <Col>
                      <p className={status.success === false ? "danger" : "success"} style={{ marginTop: "10px" }}>
                        {status.message}
                      </p>
                    </Col>
                  }
                </Row>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};