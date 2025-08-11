import "./TipBar.scss"

export default function TipBar({tipCity, acceptTip}){

    return (
        <div onClick={()=>acceptTip(tipCity)} style={{backgroundColor:"red"}}>
            {tipCity ? tipCity : 'notip'}
        </div>
    ) 
    
}