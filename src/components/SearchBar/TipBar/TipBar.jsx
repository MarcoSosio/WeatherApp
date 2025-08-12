import "./TipBar.scss"

export default function TipBar({tipCity, acceptTip}){

    const isDisplayed=tipCity ? "unset" : "none"
    return (
        <button id="TipBar" onClick={()=>acceptTip(tipCity)} style={{display:isDisplayed}}>
            {tipCity}
        </button>
    ) 
    
}