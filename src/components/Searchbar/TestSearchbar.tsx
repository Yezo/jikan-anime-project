type Props = {
  setQuery: React.Dispatch<React.SetStateAction<string>>
}

export const TestSearchbar = ({ setQuery }: Props) => {
  return (
    <div className="grid place-items-center py-8">
      <form>
        <label htmlFor="searchbar">
          <input
            type="searchbar"
            id="searchbar"
            placeholder="This is a test searchbar"
            className="w-fulltracking-tighter rounded bg-titleTEXT px-4 py-2 text-sm text-primaryBG placeholder:text-xs placeholder:italic placeholder:text-primaryBG focus:outline-none focus:ring-0"
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      </form>
    </div>
  )
}
