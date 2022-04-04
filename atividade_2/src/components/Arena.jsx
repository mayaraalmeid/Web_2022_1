import React from "react";

const Arena = (props) =>
    <div>
        {
            React.Children.map(
                props.children,
                (arena) => {
                    return React.cloneElement(arena,{ ...props })
                }
            )
        }
    </div>

export default Arena;