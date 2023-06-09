import { useDispatch } from 'react-redux';
import { setTitle as setPostTitle } from '../../postSlice';

const Title = ({ state, err, resetInputErr }) => {
    const [title, setTitle] = state;

    const dispatch = useDispatch();

    const handleChange = (e) => {
        setTitle(e.target.value);
        dispatch(setPostTitle({ title: e.target.value }));
        resetInputErr();
    };

    return (
        <div className={`form-input__container ${err ? 'errborder' : ''}`}>
            <input
                className="form__input"
                id="title"
                name="title"
                type="text"
                placeholder="Title"
                autoComplete="off"
                value={title}
                onChange={handleChange}
            />
            <span className="title-span"></span>
        </div>
    );
};

export default Title;
