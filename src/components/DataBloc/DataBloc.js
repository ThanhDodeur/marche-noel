import React, { useState } from "react";
import "./DataBloc.css";


function DataBloc({ data, value }) {

    return (
        <div className="personList">
            <h2>{data}:</h2>
            <div>
                {value.map((client, index) => {
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
