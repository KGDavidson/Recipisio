import search from "./imgs/search.png";
import filter from "./imgs/filter.png";
import close from "./imgs/close.png";
import { useEffect, useRef, useState } from "react";
import { API_KEY } from "./API_KEY";

const SearchOverlay = (props: {
    searchOverlayOpen?: boolean;
    closeSearchOverlay: () => void;
    autofocusInput: boolean;
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
                searchOverlayOpen={props.searchOverlayOpen}
                autofocusInput={props.autofocusInput}
                closeSearchOverlay={props.closeSearchOverlay}
            ></SearchBar>
        </div>
    );
};

const SearchBar = (props: {
    searchOverlayOpen?: boolean;
    closeSearchOverlay: () => void;
    autofocusInput: boolean;
}) => {
    const [searchText, setSearchText] = useState("");
    const [autofillText, setAutofillText] = useState("");
    const [focussed, setFocussed] = useState(false);
    const [autofillVisible, setAutoFillVisible] = useState(false);

    const inputRef = useRef<HTMLDivElement>(null);

    var autocompleted: boolean = false;

    const setInputFocusAndClear = () => {
        setInputFocus();
        clearInput();
        setFocussed(true);
    };

    const clearInput = () => {
        if (inputRef.current !== null) {
            inputRef.current.textContent = "";
        }
    };

    const setInputFocus = () => {
        if (inputRef.current !== null) {
            inputRef.current.focus();
            moveCursorToEnd(inputRef);
        }
    };

    const closeSearchOverlay = (e: { preventDefault: () => void }) => {
        e.preventDefault();

        setFocussed(false);
        props.closeSearchOverlay();
    };

    useEffect(() => {
        if (!props.autofocusInput) clearInput();
        if (!focussed && props.autofocusInput && props.searchOverlayOpen)
            setInputFocusAndClear();
    });

    const setAutofill = async (text: string) => {
        setAutofillText("ple");
        setAutoFillVisible(true);

        /*const url = `https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=${API_KEY}&query=${text}&number=1&metaInformation=false`;
        const response = await fetch(url);
        const json = await response.json();
        console.log(json);

        if (json.length > 0) {
            setAutofillText(json[0].name.substring(text.length));
            setAutoFillVisible(true);
        }*/
    };

    useEffect(() => {
        setAutoFillVisible(false);
        moveCursorToEnd(inputRef);
        const delayDebounceFn = setTimeout(() => {
            if (searchText.length >= 3 && !autocompleted) {
                setAutofill(searchText);
                console.log(searchText);
            }
            autocompleted = false;
        }, 700);

        return () => clearTimeout(delayDebounceFn);
    }, [searchText]);

    const moveCursorToEnd = (e: any) => {
        const el = e.currentTarget || e.current;
        const range = document.createRange();
        const sel = window.getSelection();

        try {
            range.setStart(el.childNodes[0], searchText.length);
            range.collapse(true);

            if (sel !== null) {
                sel.removeAllRanges();
                sel.addRange(range);
            }
        } catch (e) {}
    };

    return (
        <form onClick={setInputFocus} className="searchBar">
            <div className="autofillInput">
                <div
                    className="input"
                    ref={inputRef}
                    onInput={(e) =>
                        setSearchText(e.currentTarget.textContent || "")
                    }
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            console.log("search");
                        }
                        if (e.key === "Tab") {
                            e.preventDefault();
                            setSearchText(searchText + autofillText);
                            e.currentTarget.textContent =
                                searchText + autofillText;
                            setAutofill("");
                        }
                    }}
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                    spellCheck={false}
                ></div>
                {autofillVisible ? (
                    <div className="autofill">{autofillText}</div>
                ) : (
                    <></>
                )}
            </div>
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
