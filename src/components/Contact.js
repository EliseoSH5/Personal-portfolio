import React, { useRef } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import contactImg from "../assets/img/contact-img.svg";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Contact = () => {
  const form = useRef();

  const sendEmail = async (e) => {
    e.preventDefault();

    // Map your form inputs to the object your backend expects
    const details = {
      firstName: form.current.from_name.value,
      email: form.current.from_email.value,
      message: form.current.message.value,
      phone: "N/A", // Your backend expects a phone field, so we provide a fallback
    };

    try {
      const response = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(details),
      });
      const result = await response.json();
      if (result.code === 200) {
        console.log("Success:", result.status);
      } else {
        console.log("Error:", result);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }

    e.target.reset();
  };

  return (
    <section className="contact" id="contact">
      <Container>
        <Row className="align-items-center">
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) => (
                <img className={isVisible ? "animate__animated animate__zoomIn" : ""} src={contactImg} alt="Contact Us" />
              )}
            </TrackVisibility>
          </Col>
          <Col size={12} md={6}>
            <h2>Get In Touch</h2>
            <form ref={form} onSubmit={sendEmail}>
              <label>Name</label>
              <input type="text" name="from_name" required />
              <label>Email</label>
              <input type="email" name="from_email" required />
              <label>Message</label>
              <textarea name="message" required />
              <button type="submit"><span>Send message</span></button>
            </form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};