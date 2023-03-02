import { useEffect, useRef, useState } from "react";
import search from "./imgs/search.png";
import filter from "./imgs/filter.png";
import close from "./imgs/close.png";

interface SearchRecipe {
    title: string;
    image: string;
    usedIngredients: {}[];
    unusedIngredients: {}[];
}

const SearchOverlay = (props: {
    searchOverlayOpen?: boolean;
    closeSearchOverlay: () => void;
    autofocusInput: boolean;
}) => {
    const [items, setItems] = useState([
        "eggs",
        "pasta",
        "tomatoes",
        "cheese",
        "cereal",
        "bread",
        "sausages",
        "beans",
        "beans",
    ]);

    const [searchRecipes, setSearchRecipes] = useState<SearchRecipe[]>([]);

    const removeItem = (index: number) => {
        const itemToRemove = items[index];
        setItems(items.filter((item: string) => item !== itemToRemove));
    };

    const addItem = (item: string) => {
        setItems([...items, item]);
    };

    const search = async () => {
        //setSearchRecipes(SEARCH_RECIPES);

        //return;
        const url = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.REACT_APP_API_KEY}&ingredients=${items.join(
            ","
        )}`;
        const response = await fetch(url);
        const json = await response.json();

        console.log(json);
        setSearchRecipes(json);
    };

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
                addItem={addItem}
            ></SearchBar>
            <SearchButton search={search}></SearchButton>
            <SearchTags items={items} removeItem={removeItem}></SearchTags>
            <section>
                {searchRecipes.map((recipe: SearchRecipe, index: number) => (
                    <SectionTile
                        key={index}
                        imageUrl={recipe.image}
                        title={recipe.title}
                        usedIngredients={recipe.usedIngredients}
                        unusedIngredients={recipe.unusedIngredients}
                    ></SectionTile>
                ))}
            </section>
        </div>
    );
};

const SectionTile = (props: {
    imageUrl: string;
    title: string;
    unusedIngredients: {}[];
    usedIngredients: {}[];
}) => {
    return (
        <a target="_blank" rel="noreferrer">
            <article
                style={{
                    backgroundImage: `radial-gradient(transparent, rgba(0, 0, 0, 0.192)), url("${props.imageUrl}")`,
                }}
            >
                <div className="info">
                    <h6>{props.title}</h6>
                    <p>
                        {props.usedIngredients.length}/
                        {props.usedIngredients.length +
                            props.unusedIngredients.length}
                    </p>
                </div>
            </article>
        </a>
    );
};

const SearchBar = (props: {
    searchOverlayOpen?: boolean;
    closeSearchOverlay: () => void;
    autofocusInput: boolean;
    addItem: (item: string) => void;
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
        //setAutofillText("ple");
        //setAutoFillVisible(true);
        //return;

        const url = `https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=${process.env.REACT_APP_API_KEY}&query=${text}&number=1&metaInformation=false`;
        const response = await fetch(url);
        const json = await response.json();
        console.log(json);

        if (json.length > 0) {
            setAutofillText(json[0].name.substring(text.length));
            setAutoFillVisible(true);
        }
    };

    useEffect(() => {
        setAutoFillVisible(false);
        moveCursorToEnd(inputRef);
        const delayDebounceFn = setTimeout(() => {
            if (searchText.length >= 3 && !autocompleted) {
                setAutofill(searchText);
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
                            if (searchText.length < 3) return;

                            props.addItem(searchText);
                            setSearchText("");
                            e.currentTarget.textContent = "";
                            setAutofill("");
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
                <button
                    className={
                        searchText.length > 0
                            ? "searchIcon hidden"
                            : "searchIcon"
                    }
                    disabled
                >
                    <img src={search} alt="searchIcon"></img>
                </button>
            </div>
            <button onClick={closeSearchOverlay} className="closeFilterButton">
                <img src={filter} className="filterIcon" alt="filterIcon"></img>
                <img src={close} className="closeIcon" alt="closeIcon"></img>
            </button>
        </form>
    );
};

const SearchButton = (props: { search: () => void }) => {
    return (
        <button onClick={props.search} className="searchButton">
            Search
        </button>
    );
};

const SearchTags = (props: {
    items: string[];
    removeItem: (index: number) => void;
}) => {
    const [expanded, setExpanded] = useState(true);

    return (
        <>
            <div className={!expanded ? "searchTags" : "searchTags expanded"}>
                {props.items.map((item: string, index: number) => (
                    <p key={index} onClick={() => props.removeItem(index)}>
                        {item}
                        <svg height="10" width="10">
                            <path
                                d="m 0 0 l 10 10 z m 10 0 l -10 10"
                                stroke="#71ce97"
                                strokeWidth="2"
                            ></path>
                        </svg>
                    </p>
                ))}
            </div>
            <div
                onClick={() => setExpanded(!expanded)}
                className={
                    !expanded ? "searchTagsButton" : "searchTagsButton expanded"
                }
            ></div>
        </>
    );
};

export default SearchOverlay;
