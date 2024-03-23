export default function Logs({ turns }) {
    return (
        <div id="log">
            <h2>Game Logs</h2>
            <ul>
                {turns.map((turn, index) => (
                    <li key={index}>
                        {turn.player}: Selected ({turn.square.row}, {turn.square.col})
                    </li>
                ))}
            </ul>
        </div>
    )
}
