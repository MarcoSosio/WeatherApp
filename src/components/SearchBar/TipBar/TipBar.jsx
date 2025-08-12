import "./TipBar.scss"

export default function TipBar({tipCity, acceptTip}){

    function isDisplayed(){
        if(!tipCity){ //se non ho trovato un suggerimento
            return "none"
        }
        else{ //se non ho ancora fatto la ricerca ma ho un suggerimento
            return "unset"
        }
    }

    return (
        <button id="TipBar" onClick={()=>acceptTip(tipCity)} style={{display:isDisplayed()}}>
            {tipCity}
        </button>
    ) 
    
}