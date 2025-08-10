import "./TipBar.scss"

export default function TipBar({tipCity, inputRef}){
    function handlerAccept(){
        inputRef.current.value=tipCity
    }


    return (
        <div onClick={handlerAccept} 
        onKeyDown={
            (e)=>{
                e.key=="Enter" && handlerAccept();
                console.log(e.key)
            }
        }>
                {tipCity ? tipCity : 'notip'}
        </div>
    ) 
    
}