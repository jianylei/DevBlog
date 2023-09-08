import { useDispatch, useSelector } from 'react-redux';
import { useUpdatePostMutation } from '../../postsApiSlice';
import { selectCurrentPost, setError } from '../../postSlice';
import { useUploadMutation } from '../../../uploads/uploadApiSlice';
import { stringToTags, parseImgFromHTML, dataURLtoFile } from '../../../../utils/postFormUtils';
import { getPathStrFromStr } from '../../../../utils/utils';
import { IMGPATH } from '../../../../constants/constants';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const UpdateButton = () => {
    const post = useSelector(selectCurrentPost);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [upload, { isLoading: uploadLoading, isError: uploadIsError, error: uploadError }] =
        useUploadMutation();

    const [
        updatePost,
        {
            isSuccess: updatePostSuccess,
            isLoading: postLoading,
            isError: updatePostIsError,
            error: updatePostError
        }
    ] = useUpdatePostMutation();

    useEffect(() => {
        if (updatePostSuccess && !uploadLoading && !uploadIsError) {
            navigate('/');
        }
        // eslint-disable-next-line
    }, [navigate, updatePostSuccess, uploadIsError, uploadLoading]);

    useEffect(() => {
        if (updatePostIsError) dispatch(setError({ errMsg: updatePostError.data?.message }));
    }, [dispatch, updatePostError, updatePostIsError]);

    const canSave = [post.title, post.subHeading, post.content].every(Boolean);

    if (uploadIsError) {
        console.log(uploadError);
    }

    const handlePublish = async (e) => {
        e.preventDefault();

        if (canSave) {
            const { id, title, subHeading, content, tags, cover } = post;
            const name = getPathStrFromStr(title);
            const { str, imageList, imageNames } = parseImgFromHTML(content, name);
            const tagsList = stringToTags(tags);
            const cover_reg = /^(?!https)/;
            let coverUrl = '';

            if (imageList?.length || cover) {
                const data = new FormData();

                data.append('name', name);

                if (imageList) {
                    for (const idx in imageList) {
                        const file = dataURLtoFile(imageList[idx], imageNames[idx]);
                        data.append('posts', file);
                    }
                }

                if (cover && cover_reg.test(cover)) {
                    const coverName = Date.now() + '-' + Math.round(Math.random() * 1e9) + '.jpg';
                    const newFile = dataURLtoFile(cover, coverName);
                    data.append('posts', newFile);
                    coverUrl = IMGPATH.IMAGES + coverName;
                } else if (cover) {
                    coverUrl = cover;
                }

                await upload(data);
            }
            await updatePost({
                id,
                title,
                subHeading,
                content: str,
                tags: tagsList,
                cover: coverUrl
            });
        } else {
            dispatch(setError({ errMsg: '' }));
        }
    };

    return (
        <button
            className="login__button"
            onClick={handlePublish}
            disabled={postLoading || uploadLoading}
            style={{ cursor: postLoading || uploadLoading ? 'wait' : 'pointer' }}
        >
            Update
        </button>
    );
};

export default UpdateButton;
