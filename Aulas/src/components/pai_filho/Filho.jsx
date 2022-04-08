import React from "react";

const Filho = (props) => {
    return (
        <div>
            <button onClick={()=> props.noticarPai('Tudo bem??')}>
                Oii Pai
            </button>
        </div>
    )
}

export default Filho;