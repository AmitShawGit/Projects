

let Header = ({ theme, currentTheme , onCollapse}) => {
 

  return (
      <div className="row align-center">
        {/* right-side  */}
        <div className="col-md-5">
          <div className="header-right">
            <div className="logo">
              Projects
            </div>
            {/* menu bar  */}
            <i className="ri-menu-line" onClick={onCollapse}></i>
            {/* menu bar  */}
            <div className="searchbar">
              <input type="text" />
              <i className="ri-search-line"></i>
            </div>
          </div>
        </div>

        {/* left side  */}
        <div className="offset-md-5 col md-2">
          <i
            className={
              currentTheme
                ? "ri-sun-line header_left_icon"
                : "ri-moon-line header_left_icon"
            }
            onClick={() => theme(!currentTheme)}
          ></i>
          <i className="ri-notification-line header_left_icon"></i>
          <i className="ri-user-smile-line header_left_icon"></i>
        </div>
      </div>
      
   
  );
};

export default Header;
