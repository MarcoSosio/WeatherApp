import './TipBar.scss';
import { TIP_BAR_STATES } from '../../../constants/constants.js';

export default function TipBar({ tipCity, searchCity, tipBarStatus }) {
    return (
        <>
            {/* Mostra Nothing found se lo stato è NOTHING_FOUND */}
            {tipBarStatus === TIP_BAR_STATES.NOTHING_FOUND && (
                <span>Nothing found</span>
            )}

            {/* Mostra il bottone se esiste tipCity e lo stato non è HIDDEN o NOTHING_FOUND */}
            {tipCity &&
                tipBarStatus !== TIP_BAR_STATES.HIDDEN &&
                tipBarStatus !== TIP_BAR_STATES.NOTHING_FOUND && (
                    <button id="TipBar" onClick={() => searchCity(tipCity)}>
                        {tipCity}
                    </button>
                )}
        </>
    );
}
