import "../../public/layouts/signup.css"
import Input from "../components/forms/Input"
import { useState, useEffect } from "react"
function SignUp(){

    async function handleOnChange(e:any) {
        
    }

    async function submit(e:any) {
        
    }

    return(
        <div className="form-login">
            {/* <div className="option-login">
                 <h1>ola</h1>
            </div> */}
            <div className="split right-side-s">

            </div>

            <div className="split left-side-s">

            </div>
        </div>
    )
}
export default SignUp
{/* <form onSubmit={submit}>
<p className="form-title">Cadastro</p>
<div className="container">
    <Input name="name"  type="text"handleOnChange={handleOnChange} placeholder="Digite seu Nome"/>
    <Input name="age" type="date" handleOnChange={handleOnChange}/>
</div>
</form> */}