import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { selectContacts } from '../../redux/contactSlice';
import { addContact } from '../../redux/operations';
import { contactSchema } from 'schemas/contactSchema';

const ContactForm = () => {
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(contactSchema),
  });

  const submit = data => {
    if (checkContact(data.name)) {
      return;
    }

    dispatch(addContact(data));
    reset();
  };

  const checkContact = name => {
    const checkName = name.toLowerCase();
    const isExist = contacts.find(
      item => item.name.toLowerCase() === checkName
    );
    if (isExist) {
      alert(`${name} is already exist`);
    }
    return isExist;
  };

  return (
    <div className="container mx-auto">
      <form
        onSubmit={handleSubmit(submit)}
        className="flex gap-4 justify-center"
      >
        <div>
          <input
            {...register('name')}
            type="text"
            placeholder="Insert name"
            className="appearance-none rounded-full nm-inset-gray-200 leading-5 px-8 py-4 flex-grow w-full focus:nm-inset-gray-300 focus:outline-none"
          />
          <p className="pt-1 text-red-500 text-sm text-center">
            {errors.name?.message}
          </p>
        </div>

        <div>
          <input
            {...register('number')}
            type="text"
            placeholder="Insert phone"
            className="appearance-none rounded-full nm-inset-gray-200 leading-5 px-8 py-4 flex-grow w-full focus:nm-inset-gray-300 focus:outline-none"
          />
          <p className="pt-1 text-red-500 text-sm text-center">
            {errors.number?.message}
          </p>
        </div>

        <div>
          <button
            type="submit"
            className="rounded-full nm-flat-gray-200 hover:nm-flat-gray-200-lg leading-5 px-8 py-4 text-gray-600 font-bold  transition duration-200 ease-in-out transform hover:scale-110"
          >
            Add contact
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
