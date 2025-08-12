import { useContext } from "react";
import "./MainInfo.scss"
import Context from "../../Context"

export default function MainInfo(){

    const context=useContext(Context)
    const {dataState}=context
    const [data,]=dataState;
    
    function displayInfo(){
        if(!data){
            return null
        }
        else if(data.error){
            return (
                <span>{data.error.message}</span>
            )
        }
        else if(data.current){
            console.log(data)
            return (
                <div id="MainInfo">
                    <div id="container1">
                        <img
                            src={data.current.condition.icon}
                            alt="icon"
                            id="condition-icon"
                        />
                        <p id="temp-c">{data.current.temp_c}</p>
                    </div>
                    <p id="condition-text">{data.current.condition.text}</p>
                </div>
            );
        }
    }
    return (
        <div>
            {displayInfo()}
        </div>
    );
}