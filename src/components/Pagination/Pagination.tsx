type Props = {
  handleNextPagination: () => void
  handlePreviousPagination: () => void
  current?: number
  max?: number
  children?: React.ReactNode
}

export const Pagination = ({
  handleNextPagination,
  handlePreviousPagination,
  current,
  max,
}: Props) => {
  return (
    <div className="flex items-center justify-center divide-x divide-[#a4c1e8] py-10 text-sm">
      <button
        onClick={handlePreviousPagination}
        className={`inline-flex items-center justify-center rounded-tl-md rounded-bl-md bg-accent p-2 text-white  ${
          current === 1 ? "hidden" : "hover:bg-[#2b6dc4]"
        }`}
        disabled={current === 1 ? true : false}
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
        {current}
      </div>
      <button
        onClick={handleNextPagination}
        className={`inline-flex items-center justify-center rounded-tr-md rounded-br-md bg-accent p-2  text-white ${
          current === max ? "hidden" : "hover:bg-[#2b6dc4]"
        }`}
        disabled={current === max ? true : false}
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
