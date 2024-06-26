import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import DashPosts from "../components/DashPosts";
import DashUsers from "../components/DashUsers";
import DashComments from "../components/DashComments";
import DashBoardComponent from "../components/DashBoardComponent";

export default function Dashboard() {
  const location = useLocation();
  const [tab,setTab] = useState('')
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFormUrl = urlParams.get('tab');
    if(tabFormUrl){
      setTab(tabFormUrl);
    }
  },[location.search])
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
       {/* sibe bar   */}
       <div className="md:w-56">
        <DashSidebar />
       </div>
       {/* profile  */}
       {
        tab === 'profile' && <DashProfile/>
       }
       {/* posts  */}
       {
        tab === 'posts' && <DashPosts />
       }
       {/* users  */}
       {
        tab === 'users' && <DashUsers />
       }
       {/* comments  */}
       {
        tab === 'comments' && <DashComments    />
       }
       {/* dashboard  */}
       {
        tab === 'dash' && <DashBoardComponent />
       }
    </div>
  )
}
