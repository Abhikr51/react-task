import { DatabaseIcon, HomeIcon, NotificationIcon, UserBadgeIcon } from "@salt-ds/icons"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import DataDisplay from "./pages/DataDisplay"


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
]

export default AppRoutes