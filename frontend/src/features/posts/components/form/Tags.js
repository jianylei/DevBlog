import { useDispatch } from 'react-redux';
import { setTags as setPostTags } from '../../postSlice';

const Tags = ({ state }) => {
    const [tags, setTags] = state;

    const dispatch = useDispatch();

    const handleChange = (e) => {
        setTags(e.target.value);
        dispatch(setPostTags({ tags: e.target.value }));
    };

    return (
        <div className="form-input__container">
            <input
                className="form__input"
                id="tags"
                name="tags"
                type="text"
                placeholder="Tags"
                autoComplete="off"
                value={tags}
                onChange={handleChange}
            />
            <span className="tags-span"></span>
            <p className="form-tags-note">*Space and/or comma seperated</p>
        </div>
    );
};

export default Tags;
