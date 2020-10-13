import { RouteConfig } from "react-router-config";
import App from "../App";
import About from "../pages/About/About";
import Contacts from "../pages/Contacts/Contacts";
import Home from "../pages/Home/Home";

const routes: RouteConfig[] = [
  {
    // @ts-ignore
    component: App,
    routes: [
      {
        path: "/",
        exact: true,
        ...Home
      },
      {
        path: "/about",
        ...About
      },
      {
        path: "/contacts",
        ...Contacts
      },
    ]
  }
]

export default routes