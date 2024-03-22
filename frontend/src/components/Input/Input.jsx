function Input({ type, id, placeholder, onChange }) {
    return (
        <>
            <input type={type} id={id} placeholder={placeholder} onChange={onChange} />
        </>
    );
}

export default Input;
