import React from 'react';
import ContactForm from '../components/custom/ContactForm';

function Contact() {
  return (
    <div className="flex flex-col items-center mx-20 sm:mx-10 md:mx-30 lg:mx-20 gap-14 min-h-screen">
      <h1 className="text-4xl font-bold text-center mt-20 bg-gradient-to-l from-blue-400 via-[#38da97] to-red-600 text-transparent bg-clip-text">
        Get in touch
      </h1>
      <p className="text-[#abe3cb] text-center text-xl lg:mx-20 sm:mx-0">
        We&apos;d love to hear from you! Fill out the form below and we&apos;ll get back to you as soon as possible.
      </p>
      <ContactForm />
    </div>
  );
}

export default Contact;