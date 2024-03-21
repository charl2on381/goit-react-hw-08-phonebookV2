import { useDispatch } from 'react-redux';
import { filterContact } from '../../redux/filterSlice';

const Filter = () => {
  const dispatch = useDispatch();

  return (
    <div className="w-1/3">
      <input
        type="text"
        name="search"
        onChange={e => dispatch(filterContact(e.currentTarget.value))}
        placeholder="Search contacts by name"
        className="appearance-none rounded-full nm-inset-gray-200 leading-5 px-8 py-4 flex-grow sm:w-full focus:nm-inset-gray-300 focus:outline-none"
      />
    </div>
  );
};

export default Filter;
