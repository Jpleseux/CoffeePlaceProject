import InputInterface from "../../../public/layouts/interfaces/InputInterface"
import "./Input.css"
function Input({type, text, placeholder, name, value, handleOnChange}:InputInterface){
    return(
        <div className="input-container">
            <label htmlFor={name}>{text}</label>
            <input name={name} placeholder={placeholder} id={name} type={type} onChange={handleOnChange}
            value={value}
            >

            </input>
        </div>
    )
}
  
export default Input