/* @refresh reload */
import { render, delegateEvents } from "solid-js/web";
import App from "./app";

delegateEvents("click");
render(() => <App />, document.getElementById("app")!);
