import './TipBar.scss';
import { TIP_BAR_STATES } from '../../../constants';

export default function TipBar({ tipCity, acceptTip, tipBarStatus }) {
    return (
        <>
            {(function () { //IIFE function
                if (!tipCity || tipBarStatus == TIP_BAR_STATES.HIDDEN) {
                    //se non ho trovato un suggerimento
                    return null;
                } else if (tipBarStatus == TIP_BAR_STATES.NOTHING_FOUND) {
                    return <span>Nothing found</span>;
                } else {
                    return (
                        <button id="TipBar" onClick={() => acceptTip(tipCity)}>
                            {tipCity}
                        </button>
                    );
                }
            })()}
        </>
    );
}
