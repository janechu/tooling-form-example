import React from "react";
import ReactDOM from "react-dom";
import Example from "./example";

const root = document.createElement("div");
root.setAttribute("id", "root");
document.body.appendChild(root);

/**
 * Primary render function for app. Called on store updates
 */
ReactDOM.render(
    <Example />,
    root
);
