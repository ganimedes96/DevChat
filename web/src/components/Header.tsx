import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/images/logo2.svg";

interface userProps {
  img_url?: string;
  username?: string;
}

export const Header = ({ img_url, username }: userProps) => {
  return (
    <header className="max-w-[1100px] flex items-center justify-between mx-auto p-8">
      <Link className="flex items-center justify-center gap-4" href="/">
        <Image src={Logo} alt="Logo" />
        <h2 className="text-gray-200 font-semibold text-xl">dev.Chat</h2>
      </Link>

      <div className="flex items-center justify-center gap-2 text-gray-200">
        <img  className="w-8 rounded-full" src={img_url} alt={username} />
        <span className="text-xs text-green-500">{username}</span>
      </div>
    </header>
  );
};
