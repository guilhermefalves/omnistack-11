import React, { useState } from 'react';

import './styles.css'

import logoImg from '../../assets/logo.svg'
import { FiArrowLeft } from 'react-icons/fi'

import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

export default function NewIncident() {
    const ongId = localStorage.getItem('ongId')

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')

    const history = useHistory()

    function handleNewIncident(e) {
        e.preventDefault()
        try {
            const data = {
                title,
                description,
                value,
            }

            api.post('incidents', data, {
                headers: {
                    Authorization: ongId
                },
                data
            }).then(() => history.push('/profile'))
        } catch (err) {
            alert('Erro ao cadastrar novo caso, tente novamente')
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section className="form">
                    <img src={logoImg} alt="Be The Hero" />

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para home
                    </Link>
                </section>

                <form>
                    <input placeholder="Título do caso"
                        value={title} onChange={e => setTitle(e.target.value)}
                    />

                    <textarea placeholder="Descrição"
                        value={description} onChange={e => setDescription(e.target.value)}
                    />

                    <input placeholder="Valor em reais"
                        value={value} onChange={e => setValue(e.target.value)}
                    />

                    <button type="submit" className="button"
                        onClick={e => handleNewIncident(e)}>
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    )
}