import React, { useState } from "react";
import "./PageData.css";

function PageData({ days }) {
    const [state, setState] = useState({});

    function updateState(updates) {
        setState({ ...state, ...updates });
    }

    return (
        <div className="content">
            {JSON.stringify(days)}
        </div>
    );
}

export default PageData;
