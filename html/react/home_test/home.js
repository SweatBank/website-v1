import React from "react";
import ReactDOM from "react-dom";
import title from "./component/title";
import icons from "./component/icons";
import buttons from "./component/buttons";
import bottom from "./component/bottom";

ReactDOM.render(<title/>, document.getElementById("title"));
ReactDOM.render(<icons/>, document.getElementById("icons"));
ReactDOM.render(<buttons/>, document.getElementById("buttons"));
ReactDOM.render(<bottom/>, document.getElementById("bottom"));