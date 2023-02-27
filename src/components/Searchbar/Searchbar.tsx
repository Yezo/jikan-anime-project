type Props = {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
};

export const Searchbar = ({ setQuery }: Props) => {
  return (
    <div className="grid place-items-center py-8">
      <form>
        <label
          htmlFor="searchbar"
          className="border-secondary focus-within:border-secondary relative block overflow-hidden border-b"
        >
          <input
            type="searchbar"
            id="searchbar"
            placeholder="Type the name of an anime..."
            className="peer h-7 w-full border-none bg-transparent p-0 px-1 py-1 italic tracking-tighter focus:border-transparent focus:placeholder-transparent focus:outline-none focus:ring-0 sm:text-sm"
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      </form>
    </div>
  );
};
