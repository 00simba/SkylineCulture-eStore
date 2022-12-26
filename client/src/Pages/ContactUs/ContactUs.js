import React, { useRef, useState} from 'react';
import emailjs from '@emailjs/browser';
import { toast, ToastContainer, Slide } from 'react-toastify';
import './contactus.css'

export default function ContactUs(){

    const notify = () => toast.success(`Email Sent!`, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });

    const form = useRef();

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_tstetdc', 'template_nquyi7w', form.current, 'tMgSATKzaRQ4LzWTM')
        .then((result) => {
            console.log(result.text);
            setName('')
            setEmail('')
            setMessage('')
            document.getElementById('name').value = ''
            document.getElementById('email').value = ''
            document.getElementById('message').value = ''
        }, (error) => {
            console.log(error.text);
        });
    };

    return (
        <div>
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Slide}
                limit={1}
            />
            <div className='contactContainer'>
                <form ref={form} onSubmit={sendEmail} className='contactForm'>

                    <h2>Contact Us</h2>
                    <br/>
                    <span>Please fill out the form below in order to get in touch about any inquiries. You can expect to receive a response within 24 hours.</span>

                    <label className='nameLabel'>Name</label>
                    <input type="text" name="user_name" id='name' value={name} onChange={(e) => setName(e.target.value)}/>

                    <label className='emailLabel'>Email</label>
                    <input type="email" name="user_email" id='email' value={email} onChange={(e) => setEmail(e.target.value)}/>

                    <label className='messageLabel'>Message</label>
                    <textarea name="message" className='messageBox' id='message' value={message} onChange={(e) => setMessage(e.target.value)}/>

                    <div className='submitDiv'>
                        <button className='submitBtn' type="submit" value="Send" disabled={!(name && email && message)} onClick={(e) => {sendEmail(e); notify();}}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
