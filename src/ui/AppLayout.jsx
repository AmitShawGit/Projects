import { useEffect, useState } from "react";
import loader from "../assets/loader.gif";
import Header from "../components/Header.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { Outlet, useNavigation } from "react-router-dom";

const AppLayout = () => {
  // whole application theme setup
  let [dark, setDark] = useState(false);

  let [showSidebar,setShowSideBar] = useState(false);

  useEffect(() => {
    // whole application theme setup
    document.body.setAttribute("data-theme", dark ? "dark" : "white");
  }, [dark]);

  let loading = useNavigation();
  let isLoading = loading.state;



  return (
    <>
      <div className={`container-fluid bg-${dark ? "dark" : "light"}`}>

        <header>
          <Header theme={setDark} currentTheme={dark} onCollapse={()=>setShowSideBar(!showSidebar)} />
        </header>

        <div className="row">
          <div className={`${showSidebar ? "":"col-md-2"}`}>
            <aside>
              <Sidebar collapseSidebar={showSidebar} />
            </aside>
          </div>
          <div className={`${showSidebar ? "col-md-12":"col-md-10"}`}>
            <main className="main-content">
              {isLoading == "loading" ? <img src={loader} alt="" /> : <Outlet />}
            </main>
          </div>
        </div>

      </div>
    </>
  );
};

export default AppLayout;
