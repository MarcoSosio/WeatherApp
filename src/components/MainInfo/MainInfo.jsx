import { useContext } from "react";
import "./MainInfo.scss"
import Context from "../../Context"

export default function MainInfo(){

    const context=useContext(Context)
    const {dataState}=context
    const [data,]=dataState;
    
    return (
        <>
            {!data && null}
            {data?.error && <span>{data.error.message}</span>}
            {data?.current && (
                <div id="MainInfo">
                    <div id="city-name">{data.location.name}</div>
                    <div id="container-icon-temp">
                        <img
                            src={data.current.condition.icon}
                            alt="icon"
                            id="condition-icon"
                        />
                        <div id="temp-c">{data.current.temp_c}</div>
                    </div>
                    <div id="condition-text">{data.current.condition.text}</div>
                </div>
            )}
        </>
    );

}