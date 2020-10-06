import React from "react";
import "./Popups.css";

function Popups({ messageIds, messages }) {

    return (
        <div className="popups">
            {messageIds.map((messageId) => {
                const message = messages[messageId];
                return (
                    <div key={messageId} className={"popup " + message.type}>
                        {!!message.title &&
                            <span>{message.title}</span>
                        }
                        {message.content}
                    </div>
                )
            })}
        </div>
    );
}

export default Popups;
