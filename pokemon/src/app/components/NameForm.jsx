import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useName, types } from '../../contexts/nameContext';



function NameForm() {
  const { dispatch } = useName();
  const navigate = useNavigate(); 
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputRef.current) return;

    const name = inputRef.current.value.trim();
    if (!name) return;

    dispatch({
      type: types.SET_NAME,
      payload: name,
    });

    inputRef.current.value = '';
    navigate('/pokedex');
  };

  return (
    <div className="py-4 flex justify-center items-center gap-1 ">
      <input
        type="text"
        ref={inputRef}
        className="input"
        placeholder="Ingresa tu nombre"
      />
      <button
        onClick={handleSubmit}
        className="bg-red-500 text-white font-semibold py-1.5 px-4 rounded-lg hover:bg-red-600 transition duration-300"
      >
        Iniciar
      </button>
    </div>
  );
}

export default NameForm;
