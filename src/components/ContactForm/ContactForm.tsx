import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
//import axios from 'axios';

type FormData = {
    nombre: string;
    apellido: string;
    correo: string;
    mensaje: string;
};

type FormErrors = {
    nombre: string;
    apellido: string;
    correo: string;
    mensaje: string;
};

/*
///////// FORMATO PARA ENVIAR INFORMACION
{
    "locale": "en",
    "fields": [
        {
            "slug": "country",
            "value": "US"
        },
        {
            "slug": "phone_number",
            "value": null
        }
    ]
}

*/

const ContactForm = () => {
    const [formData, setFormData] = useState<FormData>({
        nombre: '',
        apellido: '',
        correo: '',
        mensaje: ''
    });

    const [errors, setErrors] = useState<FormErrors>({
        nombre: '',
        apellido: '',
        correo: '',
        mensaje: ''
    });

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isFormValid, setIsFormValid] = useState<boolean>(false);
    const [apiError, setApiError] = useState<string>('');

    useEffect(() => {
        // Verifica si todos los campos están llenos y sin errores
        const isValid = Object.values(formData).every(value => value.trim() !== '') && 
                        Object.values(errors).every(error => error === '');
        setIsFormValid(isValid);
    }, [formData, errors]);

    const validateField = (fieldName: keyof FormData, value: string) => {
        let error = '';
        
        switch(fieldName) {
            case 'nombre':
            case 'apellido':
                if (!value.trim()) {
                    error = 'Este campo es requerido';
                } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) {
                    error = 'Solo se permiten letras y espacios';
                }
                break;
            case 'correo':
                if (!value.trim()) {
                    error = 'Este campo es requerido';
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    error = 'Ingrese un correo válido';
                }
                break;
            case 'mensaje':
                if (!value.trim()) {
                    error = 'Este campo es requerido';
                }
                break;
            default:
                break;
        }
        
        setErrors({
            ...errors,
            [fieldName]: error
        });
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        validateField(name as keyof FormData, value);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setApiError('');
        
        // Validar todos los campos
        (Object.keys(formData) as Array<keyof FormData>).forEach(field => {
            validateField(field, formData[field]);
        });
        
        if (isFormValid) {
            try {
                const contactData = {
                    email: formData.correo,
                    first_name: formData.nombre,
                    last_name: formData.apellido,
                    address1: formData.mensaje,
                    tags: ["PRUEBA CONTACTO (NO USAR)"]
                };

                // Reemplaza con tu API key y lista ID de systeme.io
                const API_KEY = 'a7czj8rdm6kn43npb7r53qdkfim6z6z17ujtfqdd7axsbc7dvuzx8434f6i6q05k';
                /*
                const apiClient = axios.create();
                const response = await apiClient.post(
                    `https://api.systeme.io/api/contacts`,
                    contactData,
                    {
                        headers: {
                            accept: 'application/json',
                            'X-API-Key': API_KEY,
                            'Content-Type': 'application/json'
                        }
                    }
                );

                if (response.status === 200 || response.status === 201) {
                    // Redirigir a /register después de enviar exitosamente
                    //sweetAlert
                    
                    // Resetear el formulario
                    setFormData({
                        nombre: '',
                        apellido: '',
                        correo: '',
                        mensaje: ''
                    });
                } else {
                    setApiError('Error al enviar el formulario. Inténtalo de nuevo.');
                }
                */
                
            } catch (error) {
                console.error('Error al enviar el formulario:', error);
                setApiError('Ocurrió un error al enviar el formulario. Por favor, inténtalo más tarde.');
            }
        }
        
        setIsSubmitting(false);
    };

    return (
        <div>
            <h2>Contáctanos</h2>
            <h3>Envíanos un mensaje o agenda una llamada</h3>
            <p>Desde Uplin, te acompañamos con soluciones eficientes y a medida.</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <div className="form-group">
                        <label className='text-start' htmlFor="nombre">Nombre:</label>
                        <br/>
                        <input 
                            type="text" 
                            id="nombre" 
                            name="nombre" 
                            value={formData.nombre}
                            onChange={handleChange}
                            className={errors.nombre ? 'error' : ''}
                            
                        />
                        {errors.nombre && <span className="error-message">{errors.nombre}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="apellido">Apellido:</label>
                        <br/>
                        <input 
                            type="text" 
                            id="apellido" 
                            name="apellido" 
                            value={formData.apellido}
                            onChange={handleChange}
                            className={errors.apellido ? 'error' : ''}
                        />
                        {errors.apellido && <span className="error-message">{errors.apellido}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="correo">Correo electrónico:</label>
                        <br/>
                        <input 
                            type="email" 
                            id="correo" 
                            name="correo" 
                            value={formData.correo}
                            onChange={handleChange}
                            className={errors.correo ? 'error' : ''}
                        />
                        {errors.correo && <span className="error-message">{errors.correo}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="mensaje">Mensaje:</label>
                        <br/>
                        <textarea 
                            id="mensaje" 
                            name="mensaje" 
                            value={formData.mensaje}
                            onChange={handleChange}
                            className={errors.mensaje ? 'error' : ''}
                            rows={5}
                        />
                        {errors.mensaje && <span className="error-message">{errors.mensaje}</span>}
                    </div>

                    <button 
                        type="submit" 
                        disabled={!isFormValid || isSubmitting}
                    >
                        {isSubmitting ? 'Enviando...' : 'Enviar'}
                    </button>
                </div>
            </form>
            <style jsx>{`
                .contact-form {
                    max-width: 500px;
                    margin: 0 auto;
                    padding: 20px;
                    font-family: Arial, sans-serif;
                }
                
                .form-group {
                    margin-bottom: 15px;
                }
                
                label {
                    display: block;
                    margin-bottom: 5px;
                    font-weight: bold;
                }
                
                input, textarea {
                    width: 100%;
                    padding: 8px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    box-sizing: border-box;
                }
                
                input.error, textarea.error {
                    border-color: #ff0000;
                }
                
                .error-message {
                    color: #ff0000;
                    font-size: 0.8em;
                    margin-top: 5px;
                    display: block;
                }
                
                button {
                    background-color: #4CAF50;
                    color: white;
                    padding: 10px 15px;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 16px;
                }
                
                button:hover {
                    background-color: #45a049;
                }
                
                button:disabled {
                    background-color: #cccccc;
                    cursor: not-allowed;
                }
            `}</style>
        </div>
    )
}

export default ContactForm