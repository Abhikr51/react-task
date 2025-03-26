import { ApiIcon, DatabaseIcon, HomeIcon, UserBadgeIcon } from "@salt-ds/icons"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import DataDisplay from "./pages/DataDisplay"
import SaltHoc from "./pages/SaltHoc"
import MiddlewareDemo from "./pages/MiddleWareDemo"


const AppRoutes =[
    {
        title : "My Dashboard",
        path : "/",
        Component : Home,
        Icon : HomeIcon
    },
    {
        title : "Profile",
        path : "/profile",
        Component : Profile,
        Icon : UserBadgeIcon
    },
    {
        title : "Data Display",
        path : "/data-display",
        Component : DataDisplay,
        Icon : DatabaseIcon
    },
    {
        title : "Salt DS Hoc",
        path : "/salt-hoc",
        Component : SaltHoc,
        Icon : ApiIcon
    },
    {
        title : "Demo",
        path : "/middleware-demo",
        Component : MiddlewareDemo,
        Icon : ApiIcon
    },
]

export default AppRoutes