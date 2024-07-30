import React, { useState } from 'react';
import Select from 'react-select';
import './App.css';

const App = () => {
  const [formData, setFormData] = useState({
    company: '',
    contactName: '',
    phoneNumber: '',
    products: [{ id: Date.now(), name: '', quantity: 1 }]
  });

  const productOptions = [
    { value: 'Товар 1', label: 'Товар 1' },
    { value: 'Товар 2', label: 'Товар 2' },
    { value: 'Товар 3', label: 'Товар 3' },
    { value: 'Товар 4', label: 'Товар 4' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleProductChange = (index, value) => {
    setFormData(prevState => ({
      ...prevState,
      products: prevState.products.map((product, i) => 
        i === index ? { ...product, name: value } : product
    )}));
  };

  const handleProductAdd = () => {
    setFormData(prevState => ({
      ...prevState,
      products: [...prevState.products, { id: Date.now(), name: '', quantity: 1 }]
    }));
  };

  const handleProductRemove = (index) => {
    setFormData(prevState => ({
      ...prevState,
      products: prevState.products.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Data:', formData);
    // Here you can also add logic to send data to the server
  };
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <h2 className="form-title">Форма торгового представителя</h2>
        
        <div className="form-group">
          <label htmlFor="company">Компания</label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
          />
        </div>
  
        <div className="form-group">
          <label htmlFor="contactName">Имя контакта</label>
          <input
            type="text"
            id="contactName"
            name="contactName"
            value={formData.contactName}
            onChange={handleChange}
            required
          />
        </div>
  
        <div className="form-group">
          <label htmlFor="phoneNumber">Номер телефона</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
  
        {formData.products.map((product, index) => (
          <div key={product.id} className="form-group">
            <Select
              options={productOptions}
              value={productOptions.find(option => option.value === product.name)}
              onChange={(selectedOption) => handleProductChange(index, selectedOption.value)}
              className="basic-single"
              classNamePrefix="select"
            />
            <button
              type="button"
              onClick={() => handleProductRemove(index)}
              className="button button-red"
            >
              Удалить
            </button>
          </div>
        ))}
  
        <button
          type="button"
          onClick={handleProductAdd}
          className="button button-add"
        >
          Добавить продукт
        </button>
  
        <div className="form-group">
          <button
            type="submit"
            className="button button-blue"
          >
            Отправить
          </button>
        </div>
      </form>
    </div>
  );
  
};

export default App;
