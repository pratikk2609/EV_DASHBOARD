const Navbar = () => {
  return (
    <header className="navbar">
      <div className="logo">EVCharge Pro</div>
      <nav>
        <a href="#">Dashboard</a>
        <a href="#">Map</a>
        <a href="#">Bookings</a>
        <a href="#">Profile</a>
      </nav>
      <div className="user-info">
        <span>Welcome<br />Pratik Pawar</span>
        <button>Logout</button>
      </div>
    </header>
  );
};

export default Navbar;
