import React from "react";

const defaultChange = () => {};

const FileInput = ({ value, label='Upload', onChange = defaultChange, ...rest }) => {
    return (
    <span>
        <label>
            <span className="clickable">{label}</span>
            <input
                {...rest}
                style={{ display: "none" }}
                type="file"
                onChange={(e) => {
                    onChange([...e.target.files]);
                    e.target.value = null;
                }}
            />
        </label>
    </span>
    );
};

export default FileInput;
