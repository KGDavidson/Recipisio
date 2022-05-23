const SectionTiles = () => {
    return (
        <section>
            <h3>test</h3>
            <div className="scroller">
                <SectionTile></SectionTile>
                <SectionTile></SectionTile>
                <SectionTile></SectionTile>
                <SectionTile></SectionTile>
                <SectionTile></SectionTile>
            </div>
        </section>
    );
};

const SectionSingular = () => {
    return (
        <section>
            <h3>test</h3>
            <SectionLargeTile></SectionLargeTile>
        </section>
    );
};

const SectionLargeTile = () => {
    return (
        <article>
            <div className="info">
                <div className="ratings">
                    <div className="bar"></div>
                    <RatingCircle></RatingCircle>
                    <RatingCircle></RatingCircle>
                    <RatingCircle></RatingCircle>
                    <RatingCircle></RatingCircle>
                    <RatingCircle></RatingCircle>
                </div>
                <p>45 mins</p>
            </div>
        </article>
    );
};

const RatingCircle = () => {
    return (
        <svg width="15" height="10" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <mask id="mask" x="0" y="0">
                    <rect width="15" height="10" fill="white" />
                    <circle cx="5" cy="5" r="5" fill="black" />
                </mask>
            </defs>
            <rect
                x="0"
                y="0"
                width="600"
                height="250"
                fill="#fce5d0"
                mask="url(#mask)"
            ></rect>
        </svg>
    );
};

const SectionTile = () => {
    return (
        <article>
            <div className="info">
                <div className="ratings">
                    <div className="bar"></div>
                    <RatingCircle></RatingCircle>
                    <RatingCircle></RatingCircle>
                    <RatingCircle></RatingCircle>
                    <RatingCircle></RatingCircle>
                    <RatingCircle></RatingCircle>
                </div>
                <p>45 mins</p>
            </div>
        </article>
    );
};

const PopularSection = () => {
    return (
        <>
            <SectionSingular></SectionSingular>
            <SectionTiles></SectionTiles>
        </>
    );
};

const VegetarianSection = () => {
    return <div></div>;
};

const VeganSection = () => {
    return <div></div>;
};

export { PopularSection, VegetarianSection, VeganSection };
