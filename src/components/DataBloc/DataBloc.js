import React from "react";
import "./DataBloc.css";



function DataBloc({ groupName, content }) {

    return (
        <div className="personList">
            <h2>{groupName}:</h2>
            <div>
                {content.map((client, index) => {
                    return (
                        <div key={index}>
                            {Object.entries(client).map((line, value) => {
                                return (
                                    <span className="entry" key={line[0]}>
                                        <span>{line[0]}: </span>
                                        <span>{line[1]}</span>
                                        <span> | </span>
                                    </span>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default DataBloc;
