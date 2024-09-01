function Sidebar() {
  return <>
  <aside id="sidebar" className="sidebar">

    <ul className="sidebar-nav" id="sidebar-nav">

      <li className="nav-item">
        <a className="nav-link collapsed" href="index.html">
          <i className="bi bi-grid"></i>
          <span>Dashboard</span>
        </a>
      </li>
            <li className="nav-item">
        <a className="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" href="#">
          <i className="bi bi-journal-text"></i><span>Menu </span><i className="bi bi-chevron-down ms-auto"></i>
        </a>
        <ul id="forms-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
          <li>
            <a href="">
              <i className="bi bi-circle"></i><span>Sub Menu 1</span>
            </a>
          </li>
          <li>
            <a href="">
              <i className="bi bi-circle"></i><span>Sub Menu 2</span>
            </a>
          </li>
        </ul>
      </li>

    </ul>

  </aside>
  </>;
}

export default Sidebar;
