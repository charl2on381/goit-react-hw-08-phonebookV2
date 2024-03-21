import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

import {
  deleteContact,
  editContact,
  fetchContacts,
} from '../../redux/operations';
import { selectFilteredContacts } from '../../redux/selectors';
import Notification from 'components/Notification/Notification';

const ContactList = () => {
  const contacts = useSelector(selectFilteredContacts);

  const dispatch = useDispatch();

  const [selectedId, setSelectedId] = useState(null);
  const [contact, setContact] = useState({});

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const changeMode = ({ id, name, number }) => {
    setSelectedId(selectedId === id ? null : id);
    setContact({ id, name, number });
  };

  const handleSubmit = () => {
    dispatch(editContact(contact));
    setSelectedId(null);
  };

  const centerStyle = {
    position: 'absolute',
    top: '30%',
    left: '30%',
    transform: 'translate(-50%, -50%) ',
    zIndex: 10,
  };

  return (
    <>
      {contacts.length ? (
        <AnimatePresence>
          <ul className="px-6 grid grid-cols-3 py-6 gap-6 container mx-auto">
            {contacts.map(({ id, name, number }) => (
              <motion.li
                key={id}
                layout
                initial={{ opacity: 0.9 }}
                animate={{
                  scale: selectedId === id ? 1.5 : 1,
                  opacity: selectedId === id ? 1 : 0.9,
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.5 }}
                className="nm-flat-gray-200-lg rounded-lg p-8 text-center max-w-sm w-full"
                style={selectedId === id ? centerStyle : {}}
              >
                <div className="p-2">
                  <p>Name </p>
                  {selectedId === id ? (
                    <input
                      onChange={e => {
                        if (contact.id === id) {
                          setContact(prev => ({
                            ...prev,
                            name: e.target.value,
                          }));
                        }
                      }}
                      value={contact.name}
                      className="appearance-none text-center rounded-full nm-inset-gray-200 leading-5 mx-2 px-2 py-2 flex-grow w-full focus:nm-inset-gray-300 focus:outline-none"
                    />
                  ) : (
                    <span className="font-bold w-full text-lg">{name}</span>
                  )}
                </div>
                <div className="p-2">
                  <p>Phone </p>
                  {selectedId === id ? (
                    <input
                      value={contact.number}
                      onChange={e =>
                        setContact(prev => ({
                          ...prev,
                          number: e.target.value,
                        }))
                      }
                      className="appearance-none text-center rounded-full nm-inset-gray-200 leading-5 mx-2 px-2 py-2 flex-grow w-full focus:nm-inset-gray-300 focus:outline-none"
                    />
                  ) : (
                    <span className="font-bold text-lg">{number}</span>
                  )}
                </div>
                <div className="card-actions justify-end py-2">
                  {selectedId === id ? (
                    <button
                      onClick={() => handleSubmit()}
                      className="w-12 h-12 flex justify-center items-center rounded-full nm-convex-gray-200-xs hover:nm-inset-gray-200-xs hover:font-semibold text-sm"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="w-12 h-12 flex justify-center items-center rounded-full nm-convex-gray-200-xs hover:nm-inset-gray-200-xs hover:font-semibold text-sm"
                      onClick={() => changeMode({ id, number, name })}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => dispatch(deleteContact(id))}
                    className="w-12 h-12 flex justify-center items-center rounded-full nm-convex-gray-200-xs text-red-500 hover:nm-inset-gray-200-xs hover:font-semibold text-sm"
                  >
                    Delete
                  </button>
                  {selectedId === id && (
                    <motion.button
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      onClick={() => setSelectedId(null)}
                      className="w-12 h-12 flex justify-center items-center rounded-full nm-convex-gray-200-xs hover:nm-inset-gray-200-xs hover:font-semibold text-sm"
                    >
                      Close
                    </motion.button>
                  )}
                </div>
              </motion.li>
            ))}
          </ul>
        </AnimatePresence>
      ) : (
        <Notification message="No contacts" />
      )}
    </>
  );
};

export default ContactList;
