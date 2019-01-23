import React from "react"
import ReactDOM from "react-dom"
import { App } from "./App";

const rootElementId = "root"

if (typeof window !== undefined) {
    if (!window.document.getElementById(rootElementId)) {
        const root = document.createElement("div");
        root.id = rootElementId
        window.document.body.appendChild(root);
    }
    ReactDOM.render(
        <App localStorage={window.localStorage} />,
        window.document.getElementById(rootElementId)
    )
}