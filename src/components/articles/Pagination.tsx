import Link from "next/link";

interface PaginationProps {
  pageNumber: number,
  pages: number,
  router: string,
}

const Pagination = ({pageNumber, pages, router}: PaginationProps) => {
  let pagesArray = [];
  for (let i = 1; i <= pages; i++) pagesArray.push(i)

  const prev = pageNumber - 1
  const next = pageNumber + 1
  
  return (
    <div className="flex items-center justify-center mt-2 mb-10">
      {
        pageNumber !== 1 && (
          <Link href={`${router}?pageNumber=${prev}`} className="border border-gray-700 text-gray-700 py-1 px-3 font-bold text-xl cursor-pointer hover:bg-red-200 transition">
            Prev
          </Link>
        )
      }
      
      {pagesArray.map((page) => (
        <Link
          href={`${router}?pageNumber=${page}`}
          key={page}
          className={`${page === pageNumber && 'bg-gray-400'} border border-gray-700 text-gray-700 py-1 px-3 font-bold text-xl cursor-pointer hover:bg-red-200 transition`}
        >
          {page}
        </Link>
      ))}
      {
        pageNumber !== pages && (
          <Link href={`${router}?pageNumber=${next}`} className="border border-gray-700 text-gray-700 py-1 px-3 font-bold text-xl cursor-pointer hover:bg-red-200 transition">
            Next
          </Link>
        )
      }
      
    </div>
  );
};

export default Pagination;
