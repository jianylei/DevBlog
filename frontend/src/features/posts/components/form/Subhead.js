import { useDispatch } from 'react-redux';
import { setSubhead as setPostSub } from '../../postSlice';

const Subhead = ({ state, err, resetInputErr }) => {
    const [subhead, setSubhead] = state;

    const dispatch = useDispatch();

    const handleChange = (e) => {
        setSubhead(e.target.value);
        dispatch(setPostSub({ subHeading: e.target.value }));
        resetInputErr();
    };

    return (
        <div className={`form-input__container ${err ? 'errborder' : ''}`}>
            <input
                className="form__input"
                id="subheading"
                name="subheading"
                type="text"
                placeholder="Subheading"
                autoComplete="off"
                value={subhead}
                onChange={handleChange}
            />
            <span className="sub-span"></span>
        </div>
    );
};

export default Subhead;
