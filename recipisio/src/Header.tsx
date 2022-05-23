import search from "./imgs/search.png";
import pantry from "./imgs/pantry.png";

const Header = () => {
    return (
        <header>
            <div>
                <h1>What would you cook today?</h1>
                <TangerineSliceShape></TangerineSliceShape>
                <LemonSliceShape></LemonSliceShape>
                <PickleShape></PickleShape>
            </div>
            <SearchBar></SearchBar>
        </header>
    );
};

const SearchBar = () => {
    return (
        <form className="searchBar">
            <input></input>
            <button className="searchIcon">
                <img src={search} alt="searchIcon"></img>
            </button>
            <button className="pantryIcon">
                <img src={pantry} alt="searchIcon"></img>
            </button>
        </form>
    );
};

const TangerineSliceShape = () => {
    const randomY = Math.floor(Math.random() * 10 + 10);
    const randomX = Math.floor(Math.random() * 20 + 50);
    const scale = Math.floor(Math.random() * 5 + 10) / 100;
    const angle = Math.floor(Math.random() * 40 + 190);
    return (
        <SliceShape
            randomX={randomX}
            randomY={randomY}
            scale={scale}
            angle={angle}
            fill="#f3994b"
        ></SliceShape>
    );
};

const LemonSliceShape = () => {
    const randomY = Math.floor(Math.random() * 10 + 60);
    const randomX = Math.floor(Math.random() * 5 + 5);
    const scale = Math.floor(Math.random() * 5 + 13) / 100;
    const angle = Math.floor(Math.random() * 50 + 20);
    return (
        <SliceShape
            randomX={randomX}
            randomY={randomY}
            scale={scale}
            angle={angle}
            fill="#f2c84c"
        ></SliceShape>
    );
};

const SliceShape = (props: {
    scale: number;
    randomX: number;
    randomY: number;
    angle: number;
    fill: string;
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={200 * props.scale}
            height={100 * props.scale}
            style={{
                top: `${props.randomY}%`,
                left: `${props.randomX}%`,
                transform: `rotate(${props.angle}deg)`,
            }}
        >
            <g transform={`scale(${props.scale})`}>
                <path
                    d="M 0 0
                        A 100 100 0 0 0 200 0
                        L 0 0
                        Z"
                    fill={props.fill}
                />
            </g>
        </svg>
    );
};

const PickleShape = () => {
    const randomY = Math.floor(Math.random() * 10 + 55);
    const randomX = Math.floor(Math.random() * 15 + 75);
    const scale = Math.floor(Math.random() * 5 + 13) / 100;
    const angle = Math.floor(Math.random() * 60 + 110);
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={300 * scale}
            height={200 * scale}
            style={{
                top: `${randomY}%`,
                left: `${randomX}%`,
                transform: `rotate(${angle}deg)`,
            }}
        >
            <g transform={`scale(${scale})`}>
                <ellipse cx="200" cy="80" rx="100" ry="50" fill="#26af61" />
            </g>
        </svg>
    );
};

export default Header;
