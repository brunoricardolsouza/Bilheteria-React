import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div>
      <Link to="/" className="text-xl font-bold tracking-widest text-white">
        CINE<span className="text-red-500">PLEX</span>
      </Link>
    </div>
  );
};

export default Logo;
