import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <div className="nav-style">
        <Link href="/">Home</Link>
        <Link href="/account/login">Login</Link>
        <Link href="/about">About</Link>
      </div>
    </>
  );
};

export default Navbar;
