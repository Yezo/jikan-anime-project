type Props = {
  setQuery: React.Dispatch<React.SetStateAction<string>>
  type: string
}

export const Searchbar = ({ setQuery, type }: Props) => {
  return (
    <div className="grid place-items-center py-8">
      <h2 className="mb-2 text-lg font-semibold tracking-tight">{type} Search</h2>
      <form>
        <label htmlFor="searchbar">
          <input
            type="searchbar"
            id="searchbar"
            placeholder={`Search the name of any ${type.toLowerCase()}...`}
            className="w-fulltracking-tighter rounded bg-titleTEXT px-4 py-2 text-sm text-primaryBG placeholder:text-xs placeholder:italic placeholder:text-primaryBG focus:outline-none focus:ring-0"
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      </form>
    </div>
  )
}
