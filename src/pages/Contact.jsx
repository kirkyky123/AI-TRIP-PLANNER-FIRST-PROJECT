import React from 'react';
import ContactForm from '../components/custom/ContactForm';

function Contact() {
  return (
    <div className="flex flex-col items-center gap-14 min-h-screen bg-gradient-to-br from-orange-200 via-light-secondary to-light-primary/40 dark:from-dark-background dark:via-dark-primary/30 dark:to-dark-primary/20">
      <h1 className="text-4xl font-bold text-center mt-20 bg-gradient-to-l from-blue-500 to-orange-500 dark:from-blue-400 dark:via-[#38da97] dark:to-red-600 text-transparent bg-clip-text">
        Get in touch
      </h1>
      <p className="text-gray-900 dark:text-[#abe3cb] text-center text-xl lg:mx-20 sm:mx-0">
        We&apos;d love to hear from you! Fill out the form below and we&apos;ll get back to you as soon as possible.
      </p>
      <ContactForm className="mx-20 sm:mx-10 md:mx-30 lg:mx-20"/>
    </div>
  );
}

export default Contact;