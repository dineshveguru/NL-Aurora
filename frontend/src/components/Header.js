import logo from "../assets/logo.svg";

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white border-b-2 drop-shadow-sm">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <img src={logo} />
      </nav>
    </header>
  );
}

export default Header;
