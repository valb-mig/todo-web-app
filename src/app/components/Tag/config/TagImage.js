import './styles/TagImage.scss';

const TagImage = ({ Image }) => {
    return(
        <span className='tag-image'>
            <img src={ Image }></img>
        </span>
    );
}

export default TagImage;