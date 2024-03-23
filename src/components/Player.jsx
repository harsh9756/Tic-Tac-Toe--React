import { useState } from "react";

export default function Player({ name, symbol, active,changeName }) {
    const [Newname, setNewname] = useState(name);
    const [isEditing, setisEditing] = useState(false);

    function handleEditClick() {
        setisEditing(editing => !editing);
        if (isEditing) {
            changeName(symbol,Newname)
        }
    }

    function handleChange(e) {
        setNewname(e.target.value);
    }

    let playername = <span className="player-name">{Newname}</span>;

    if (isEditing) {
        playername = <input type="text" onChange={handleChange} autoFocus value={Newname} required />;
    }

    return (
        <li className={active?"active":""}>
            <span className="player">
                {playername}
            </span>
            <span className="player-symbol">
            {symbol}</span>
            <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
        </li>
    );
}
