import search from "./imgs/search.png";
import filter from "./imgs/filter.png";
import { useState } from "react";

const TangerineSlice = {
    randomY: Math.floor(Math.random() * 10 + 10),
    randomX: Math.floor(Math.random() * 20 + 50),
    scale: Math.floor(Math.random() * 5 + 10) / 100,
    angle: Math.floor(Math.random() * 40 + 190),
};

const LemonSlice = {
    randomY: Math.floor(Math.random() * 10 + 60),
    randomX: Math.floor(Math.random() * 5 + 5),
    scale: Math.floor(Math.random() * 5 + 13) / 100,
    angle: Math.floor(Math.random() * 50 + 20),
};

const Pickle = {
    randomY: Math.floor(Math.random() * 10 + 55),
    randomX: Math.floor(Math.random() * 15 + 75),
    scale: Math.floor(Math.random() * 5 + 13) / 100,
    angle: Math.floor(Math.random() * 60 + 110),
};

const Header = (props: {
    openSearchOverlay: (autofocusInput: boolean) => void;
    searchOverlayOpen?: boolean;
}) => {
    return (
        <header>
            <div className="heading">
                <h1>What would you cook today?</h1>
                <TangerineSliceShape></TangerineSliceShape>
                <LemonSliceShape></LemonSliceShape>
                <PickleShape></PickleShape>
            </div>
            <SearchBar
                searchOverlayOpen={props.searchOverlayOpen}
                openSearchOverlay={props.openSearchOverlay}
            ></SearchBar>
        </header>
    );
};

const SearchBar = (props: {
    openSearchOverlay: (autofocusInput: boolean) => void;
    searchOverlayOpen?: boolean;
}) => {
    const openSearch = (
        e: { stopPropagation: () => void },
        autofocusInput: boolean
    ) => {
        console.log(autofocusInput);
        e.stopPropagation();
        props.openSearchOverlay(autofocusInput);
    };

    return (
        <div
            onClick={(e) => openSearch(e, true)}
            className={
                props.searchOverlayOpen === undefined
                    ? "searchBar"
                    : props.searchOverlayOpen
                    ? "searchBar hidden"
                    : "searchBar"
            }
        >
            <input disabled></input>
            <button onClick={(e) => openSearch(e, true)} className="searchIcon">
                <img src={search} alt="searchIcon"></img>
            </button>
            <button
                onClick={(e) => openSearch(e, false)}
                className="closeFilterButton"
            >
                <img src={filter} className="filterIcon" alt="filterIcon"></img>
            </button>
        </div>
    );
};

const TangerineSliceShape = () => {
    return (
        <SliceShape
            randomX={TangerineSlice.randomX}
            randomY={TangerineSlice.randomY}
            scale={TangerineSlice.scale}
            angle={TangerineSlice.angle}
            fill="#f3994b"
        ></SliceShape>
    );
};

const LemonSliceShape = () => {
    return (
        <SliceShape
            randomX={LemonSlice.randomX}
            randomY={LemonSlice.randomY}
            scale={LemonSlice.scale}
            angle={LemonSlice.angle}
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
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={300 * Pickle.scale}
            height={200 * Pickle.scale}
            style={{
                top: `${Pickle.randomY}%`,
                left: `${Pickle.randomX}%`,
                transform: `rotate(${Pickle.angle}deg)`,
            }}
        >
            <g transform={`scale(${Pickle.scale})`}>
                <ellipse cx="200" cy="80" rx="100" ry="50" fill="#26af61" />
            </g>
        </svg>
    );
};

export default Header;
