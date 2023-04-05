import { Pagination as IPagination } from "../../interfaces/anime/IMultiAnime"

type Props = {
  data: IPagination
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  children?: React.ReactNode
}

export const Pagination = ({ data, page, setPage }: Props) => {
  //Destructure for better visibility
  const { current_page: currentPage, last_visible_page: max } = data

  //Helper functions
  const handleNextPagination = () => {
    const hasNextPage = data.has_next_page
    if (page >= 1 && hasNextPage) {
      setPage(page + 1)
      window.scrollTo(0, 0)
    } else return
  }

  const handlePreviousPagination = () => {
    if (page > 1) {
      setPage(page - 1)
      window.scrollTo(0, 0)
    }
    if (page === 1 || currentPage === 1) return
    else return
  }

  return (
    <div className="flex items-center justify-center divide-x divide-[#a4c1e8] py-10 text-sm">
      <button
        onClick={handlePreviousPagination}
        className={`inline-flex items-center justify-center rounded-tl-md rounded-bl-md bg-accent p-2 text-white  ${
          currentPage === 1 ? "hidden" : "hover:bg-[#2b6dc4]"
        }`}
        disabled={currentPage === 1 ? true : false}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <div className="flex min-h-[36px] min-w-[3rem] items-center justify-center bg-accent py-2 px-4 font-bold text-white">
        {currentPage}
      </div>
      <button
        onClick={handleNextPagination}
        className={`inline-flex items-center justify-center rounded-tr-md rounded-br-md bg-accent p-2  text-white ${
          currentPage === max ? "hidden" : "hover:bg-[#2b6dc4]"
        }`}
        disabled={currentPage === max ? true : false}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>
  )
}
