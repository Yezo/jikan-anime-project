import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  setPagination: React.Dispatch<React.SetStateAction<number>>;
  setAPI: React.Dispatch<React.SetStateAction<string>>;
  pagination: number;
};
//TODO dynamic pages is donem just need to clean up the unnecssary code and code the top100 page to look the same as the homepage + style the individual anime pages next

const Pagination = ({ setPagination, setAPI, pagination }: Props) => {
  const pages = [1, 2, 3, 4, 5];
  //Navigate to a singular anime's page since you can't have an img element inside a Link element
  const navigate = useNavigate();
  const move = (url: string) => {
    return navigate(url);
  };

  function handlePageClick(e: React.MouseEvent<HTMLElement>) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const target = e.target as any;
    console.log(target.textContent);
    const value = parseInt(target.textContent);
    setPagination(parseInt(target.textContent));
    move(`/top100/${value}`);
  }
  useEffect(() => {
    //Moves the user back to the top of the page when clicking on a new page
    window.scrollTo(0, 0);
  }, [pagination]);

  return (
    <div>
      <ul className="flex gap-4">
        {pages.map((item) => (
          <li
            className={`flex cursor-pointer gap-4 hover:font-bold ${
              item === pagination ? "font-bold" : null
            }  `}
            key={item}
            onClick={(e: React.MouseEvent<HTMLElement>) => handlePageClick(e)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
