const Button = ({ isLoading, button, onClick, ...rest }) => (
    <button type="button" onClick={onClick} disabled={isLoading} {...rest}>
        {isLoading ? '...' : button}
    </button>
);

export default Button;
