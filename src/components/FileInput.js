import React from "react";

const defaultChange = () => {};

const FileInput = ({ value, label='Upload', onChange = defaultChange, ...rest }) => (
    <div>
        <label>
            <span className="clickable">{label}</span>
            <input
                {...rest}
                style={{ display: "none" }}
                type="file"
                onChange={(e) => {
                    onChange([...e.target.files]);
                }}
                multiple
            />
        </label>
    </div>
);

export default FileInput;
