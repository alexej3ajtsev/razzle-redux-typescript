import App from "../App";
import About from "../pages/About/About";
import Contacts from "../pages/Contacts/Contacts";
import Home from "../pages/Home/Home";

export default [
  {
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