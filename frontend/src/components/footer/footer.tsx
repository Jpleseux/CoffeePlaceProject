import "./footer.css"
import { useLocation } from "react-router"
import { useEffect } from "react";
function Footer(){

    const excludeRoutes = ["/signup", "/"]
    if(excludeRoutes.includes(location.pathname)){
        return null
    }
    return(
        <footer className="footer">
            <p>Coffee Place &copy;2023</p>
        </footer>
    )
}

export default Footer