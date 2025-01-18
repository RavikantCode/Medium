import { Link } from "react-router-dom";

interface BlogCardProps {
    id:string,
  authorname: string;
  title: string;
  content: string;
}

export const BlogCard = ({ id,authorname, title, content }: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
    <div className="bg-yellow-100 p-3 border border-blue-300 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      {/* Author Section */}
      <div className="flex items-center space-x-3 cursor-pointer">
        <Avatar size={6} name={authorname} />
        <div className="text-sm">
          <div className="text-gray-800 font-medium">{authorname}</div>
          <div className="text-gray-500 flex items-center space-x-2">
            {/* <span>{publishDate}</span> */}
            <Circle />
            <span>{`${Math.ceil(content.length / 100)} min read`}</span>
          </div>
        </div>
      </div>

      {/* Title Section */}
      <div className="text-lg font-semibold text-gray-900 mt-4">{title}</div>

      {/* Content Section */}
      <div className="text-sm text-gray-700 mt-2">{content.slice(0, 100) + "..."}</div>

      {/* Divider */}
      <div className="mt-4 h-[1px] w-full bg-blue-300"></div>

      {/* Footer Section */}
      <div className="mt-1 text-right">
        <button className="text-blue-600 text-sm hover:underline">Read More</button>
      </div>
    </div>
    </Link>
  );
};

export function Avatar({ name ,size}: { name: string,size:number }) {
  return (
    <div className={`relative inline-flex items-center justify-center w-[${size}] h-[${size}] overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
      <span className="font-medium text-gray-600 dark:text-gray-300">{name?.[0]}</span>
    </div>
  );
}

export function Circle() {
  return <div className="h-1.5 w-1.5 rounded-full bg-gray-400"></div>;
}
