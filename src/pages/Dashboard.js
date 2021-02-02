import React from "react"
import { Navbar, Search, Info, User, Repos} from "../components";

const Dashboard = () => {
    return <div>
        <Navbar />
        <Search />
        <Info />
        <User />
        <Repos />

    </div>
}

export default Dashboard