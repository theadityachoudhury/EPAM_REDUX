import Button from "../../../../common/Button/Button"
import Input, { InputProps } from "../../../../common/Input/Input"
import "./SearchBar.css"

type SearchBarType = {
  onChange: (e: string) => void,
  onSearch: () => void
}

const SearchBar = ({ onChange, onSearch }: SearchBarType) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e.target.value)
  }
  const input: InputProps = {
    label: {
      show: false,
      text: "Search"
    },
    type: "email",
    onChange: handleChange,
    metaData: {
      placeholder: "Search",
      name: "search"
    }
  }
  return (
    <div className="searchBar__container">
      <Input {...input} />
      <Button
        title="Search"
        onClick={onSearch} />
    </div>
  )
}

export default SearchBar
