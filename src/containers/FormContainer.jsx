import React, { useState } from 'react';
import Input from '../components/Input';

const FormContainer = () => {
  const [title, updateTitle] = useState('');

  const handleChange = event => updateTitle(event.target.value);

  return (
    <form id="article-form">
      <Input
        text="Title"
        label="title"
        type="text"
        id="title"
        value={title}
        handleChange={handleChange}
      />
    </form>
  );
};

export default FormContainer;
