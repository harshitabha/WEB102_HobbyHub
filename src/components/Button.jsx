import "./Button.css";

const Button = ({content, classes, type, handleClick, icon}) => {
    return (
        <button 
            className={`btn ${classes} ${type}`}
            onClick={handleClick}>
            {content} {icon ? icon : ""}
        </button>
    );
}

export default Button;