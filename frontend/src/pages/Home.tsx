import {useState } from "react";
import Message from "../components/interface/Message";
function Home(){

    const [message, setMessage] = useState<string | null>(null);

        return(
        <div className="">
            <h1>

            </h1>
            {message&&<Message msg={"error"} timers={5000}/>}
        </div>
    )
}

export default Home