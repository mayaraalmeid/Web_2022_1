import React from "react";
import Filho from "./Filho";

const Pai = (props) => {
    const msgReceb = msg => alert(`Recebi ${msg}`)
    return (
        <div>
            <Filho noticarPai = {msgReceb} />
        </div>
    )
}


export default Pai;