import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/images/logo2.svg";

interface userProps {
  img_url?: string;
  username?: string;
}

export const Header = ({ img_url, username }: userProps) => {
  return (
    <header className="max-w-[1300px] flex items-center justify-center mx-auto p-8">
      <Link className="flex items-center justify-center gap-4" href="/">
        <Image src={Logo} alt="Logo" />
        <h2 className="text-gray-200 font-semibold text-xl">dev.Chat</h2>
      </Link>

      <div>
        <img src={img_url} alt={username} />
        <span>{username}</span>
      </div>
    </header>
  );
};
