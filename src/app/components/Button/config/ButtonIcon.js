import './styles/ButtonIcon.scss';

const ButtonIcon = ({ Class, Icon }) => {
    return(
        <span className={"button-icon"+" "+(Class != undefined ? Class : '')}>{ Icon }</span>
    );
}

export default ButtonIcon;