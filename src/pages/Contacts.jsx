import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import React from 'react';

const Contacts = () => {
  return (
    <>
      <ContactForm />
      <div className="divider py-3 font-bold text-xl">Contacts</div>
      <ContactList />
    </>
  );
};
export default Contacts;
