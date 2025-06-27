import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Fade } from "react-awesome-reveal";

const NewsletterSection = () => {
    const [email, setEmail] = useState('');
    const [isValid, setIsValid] = useState(false);

    const validateEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        setIsValid(validateEmail(value));
    };

    const handleSubmit = () => {
        if (!email.trim()) {
            Swal.fire({
                icon: 'warning',
                title: 'Please enter an email address.',
            });
        } else if (!validateEmail(email)) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Email',
                text: 'Please enter a valid email address.',
            });
        } else {
            Swal.fire({
                icon: 'success',
                title: 'Email Sent!',
                text: 'You have successfully subscribed to our newsletter.',
            });
            setIsValid(false)
            setEmail("")
        }
    };

    return (
        <Fade direction="up">
            <section className="px-4 md:px-10 lg:px-36 mb-20 bg-base-100 text-base-content">
                <div className="max-w-full mx-auto text-center bg-base-200 rounded-xl p-20 shadow-xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                        Subscribe to Our Newsletter
                    </h2>
                    <p className="mb-6 text-lg">
                        Stay informed about upcoming events, new initiatives, and ways you can make an impact in your community.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={handleChange}
                            className="input input-bordered w-full sm:w-96"
                        />
                        <button
                            className="btn btn-primary"
                            onClick={handleSubmit}
                            // disabled={!isValid}
                            style={{
                                cursor: isValid ? 'pointer' : 'not-allowed',
                            }}
                        >
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>
        </Fade>
    );
};

export default NewsletterSection;
