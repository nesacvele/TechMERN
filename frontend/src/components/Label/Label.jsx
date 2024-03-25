function Label({ children, htmlFor, color = true }) {
    return (
        <>
            <label htmlFor={htmlFor} style={{ color: color ? '' : 'tomato' }}>
                {children}
            </label>
        </>
    );
}

export default Label;
