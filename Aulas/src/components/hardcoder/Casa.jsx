import React from "react";

const Casa = (props) => 
    
  <div>
      {
          React.Children.map(props.children, personagem => {
              return React.cloneElement(personagem, {...props})
          })
      }
  </div>
    



export default Casa;