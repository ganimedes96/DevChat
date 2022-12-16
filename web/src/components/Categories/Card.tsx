import Link from'next/link'

interface CardProps {
  category: string;
  path: string
}

export const Card = ({ category, path }: CardProps) => {
  return (
    <Link className='w-full' href={`/rooms/${category}`}>
        <div className="bg-green-600 p-1 rounded text-center font-semibold">
        <h3>{category}</h3>
        </div>
    </Link>
  );
};
