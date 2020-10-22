import React, { useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import styled from 'styled-components';

const NewRating = styled.div`
    padding-bottom: 50px;
`;

const Input = styled.input`
    border-width: 0;
    height: 20px;
    font-family: "Arial", sans-serif;
    margin-bottom: 10px;
    width: 90%;
`;

const Textarea = styled.textarea`
    border-width: 0;
    height: 40px;
    font-family: "Arial", sans-serif;
    margin-bottom: 10px;
    width: 90%;
`;
const Button = styled.button`
    background-color: #a5572f;
    border-color: #a5572f;
    color: white;
    font-weight: 800;
    height: 30px;
    margin-top: 10px;
    width: 90px;
`;

const Form = (props) => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [value, setValue] = useState(1);

    return (
        <NewRating>
            <h4>Deixe sua Opinião</h4>

            <form>
                <Input 
                    name="name"
                    type="text"
                    placeholder="Seu primeiro nome"
                    onChange={(e) => setName(e.target.value)}
                    value={name} 
                />

                <Textarea 
                    name="message"
                    placeholder="Sua opinião"
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                />

                <div>
                    <ReactStars
                        count={5}
                        value={value}
                        size={24}
                        activeColor="#ffd700"
                        onChange={(newValue) => { setValue(newValue); }} 
                    />

                    <Button type="submit">Enviar</Button>
                </div>
            </form>
        </NewRating>
    );
}

export default Form;