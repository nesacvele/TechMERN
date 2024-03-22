function Label({ children, htmlFor, labelColor = true }) {
    return (
        <>
            <label htmlFor={htmlFor} style={{ color: labelColor ? '' : 'tomato' }}>
                {children}
            </label>
        </>
    );
}

export default Label;
