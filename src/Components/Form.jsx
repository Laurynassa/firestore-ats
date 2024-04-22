import React, { useState } from "react";
import { getFirestore, collection, addDoc } from "@firebase/firestore";
import { app } from "../Firebase/firebase.js";

const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const db = getFirestore(app);

    try {
      await addDoc(collection(db, "contacts"), {
        name: name,
        email: email,
        question: question,
      });

      setName("");
      setEmail("");
      setQuestion("");
      console.log("Form data submitted !");
    } catch (error) {
      console.error("Error submitting form data: ", error);
    }
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Čia įrašykite savo Varda"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="question">Question</label>
          <textarea
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
            placeholder="Čia galite įrašyti savo klausima"
          ></textarea>
        </div>
        <div className="button-container">
          <button className="button" type="submit">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
