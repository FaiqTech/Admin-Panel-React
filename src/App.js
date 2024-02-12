// App.js
import React, { useState } from "react";
import uniqid from "uniqid";
import { validate } from "./helpers/helpers";
import "./App.css";

function App() {
  const [cards, setCards] = useState([]);
  const [inputValues, setInputValues] = useState({
    title: "",
    image: null,
    description: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    image: "",
    description: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value, files } = e.target;

    setInputValues({
      ...inputValues,
      [name]: files ? files[0] : value,
    });

    const error = validate(name, files ? files[0] : value);

    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Input alanlarının dolu olduğunu ve hata olmadığını kontrol et
    if (
      inputValues.title.trim() === "" ||
      inputValues.description.trim() === "" ||
      inputValues.image === null ||
      errors.title !== "" ||
      errors.description !== "" ||
      errors.image !== ""
    ) {
      alert("Zəhmət olmasa bütün sahələri düzgün doldurun");
      return; // Hatalı giriş varsa işlemi durdur
    }

    // Tüm alanlar dolu ve hatalar yoksa yeni kart oluştur
    const newCard = {
      id: uniqid(),
      title: inputValues.title,
      image: URL.createObjectURL(inputValues.image),
      description: inputValues.description,
    };

    // Kartları güncelle
    setCards((prevCards) => [...prevCards, newCard]);

    // Input alanlarını sıfırla
    setInputValues({
      title: "",
      image: null,
      description: "",
    });
  };

  const handleDelete = (id) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== id));
  };

  return (
    <div className="container">
      <h1 className="title">Admin Panel</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="title" className="label">
            Title:
          </label>
          <input
            type="text"
            name="title"
            value={inputValues.title}
            onChange={handleChange}
            className="input"
          />
          {errors.title && <p className="error">{errors.title}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="image" className="label">
            Image:
          </label>
          <input
            type="file"
            accept="image/*"
            name="image"
            onChange={handleChange}
            className="input"
          />
          {errors.image && <p className="error">{errors.image}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="description" className="label">
            Description:
          </label>
          <textarea
            name="description"
            value={inputValues.description}
            onChange={handleChange}
            className="input textarea"
          ></textarea>
          {errors.description && <p className="error">{errors.description}</p>}
        </div>

        <button type="submit" className="button">
          Add Card
        </button>
      </form>

      <div className="cards">
        {cards.map((card) => (
          <div className="card" key={card.id}>
            <div className="card-header">
              <h3>{card.title}</h3>
              <button
                onClick={() => handleDelete(card.id)}
                className="delete-button"
              >
                <img
                  src="https://img.icons8.com/ios/24/000000/delete-sign.png"
                  alt="Delete"
                />
              </button>
            </div>
            <img src={card.image} alt={card.title} className="card-image" />
            <p>{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
