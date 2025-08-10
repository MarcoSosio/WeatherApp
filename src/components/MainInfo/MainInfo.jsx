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
            return (
                <div>
                    <img src={data.current.condition.icon} alt="Icona meteo" />
                    <span>{data.current.condition.text}</span>
                    <span>{data.current.temp_c}</span>
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