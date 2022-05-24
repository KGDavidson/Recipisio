import search from "./imgs/search.png";
import filter from "./imgs/filter.png";
import close from "./imgs/close.png";
import { useEffect, useRef, useState } from "react";

const SearchOverlay = (props: {
    searchOverlayOpen?: boolean;
    closeSearchOverlay: () => void;
}) => {
    return (
        <div
            className={
                props.searchOverlayOpen === undefined
                    ? "searchOverlay"
                    : props.searchOverlayOpen
                    ? "searchOverlay open"
                    : "searchOverlay close"
            }
        >
            <SearchBar
                closeSearchOverlay={props.closeSearchOverlay}
            ></SearchBar>
        </div>
    );
};

const SearchBar = (props: { closeSearchOverlay: () => void }) => {
    const [searchText, setSearchText] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const setInputFocus = () => {
        if (inputRef.current !== null) {
            inputRef.current.focus();
            inputRef.current.value = "";
        }
    };

    const closeSearchOverlay = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        props.closeSearchOverlay();
    };

    useEffect(() => {
        setInputFocus();
    });

    return (
        <form className="searchBar">
            <input
                ref={inputRef}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            ></input>
            <button
                className={
                    searchText.length > 0 ? "searchIcon hidden" : "searchIcon"
                }
            >
                <img src={search} alt="searchIcon"></img>
            </button>
            <button onClick={closeSearchOverlay} className="closeFilterButton">
                <img src={filter} className="filterIcon" alt="filterIcon"></img>
                <img src={close} className="closeIcon" alt="closeIcon"></img>
            </button>
        </form>
    );
};

export default SearchOverlay;
