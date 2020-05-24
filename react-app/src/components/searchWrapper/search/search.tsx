import React, {useState} from "react";
import {KEYCODE_ENTER} from "../../../constants/keyConstants";
import "./search.scss";

interface SearchProps {
  onSend(searchQuery: string): any;
}

export const Search: React.FC<SearchProps> = ({onSend}) => {
  const [query, setQuery] = useState<string>("");

  const onKeyDown = (keyCode: number) => {
    if (keyCode === KEYCODE_ENTER){
      onSend(query);
    }
  }

  return <div className="search-bar control has-icons-left has-icons-right">
    <input className="input is-medium" value={query} onKeyDown={({keyCode}) => onKeyDown(keyCode)}
      onChange={({target}) => setQuery(target.value)} placeholder="Just enter a query and hit enter!"/>
    <span className="icon is-left">
      <i className="fas fa-search"></i>
    </span>
  </div>
}