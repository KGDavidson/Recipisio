import { useEffect, useState } from "react";

interface Recipe {
    readyInMinutes: number;
    image: string;
    sourceUrl: string;
}

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

const SectionTiles = (props: { title: string; recipes: Recipe[] }) => {
    return (
        <section>
            <h3>{props.title}</h3>
            <div className="scroller">
                {props.recipes.map((recipe: Recipe, index: number) => (
                    <SectionTile
                        key={index}
                        sourceUrl={recipe.sourceUrl}
                        readyIn={recipe.readyInMinutes}
                        imageUrl={recipe.image}
                    ></SectionTile>
                ))}
            </div>
        </section>
    );
};

const SectionSingular = (props: { title: string; recipe: Recipe }) => {
    return (
        <section>
            <h3>{props.title}</h3>
            <SectionTile
                sourceUrl={props.recipe.sourceUrl}
                readyIn={props.recipe.readyInMinutes}
                imageUrl={props.recipe.image}
            ></SectionTile>
        </section>
    );
};

const SectionTile = (props: {
    readyIn: number;
    imageUrl: string;
    sourceUrl: string;
}) => {
    return (
        <a target="_blank" rel="noreferrer" href={props.sourceUrl}>
            <article
                style={{
                    backgroundImage: `radial-gradient(transparent, rgba(0, 0, 0, 0.192)), url("${props.imageUrl}")`,
                }}
            >
                <div className="info">
                    <div className="ratings">
                        <div className="bar"></div>
                        <RatingCircle></RatingCircle>
                        <RatingCircle></RatingCircle>
                        <RatingCircle></RatingCircle>
                        <RatingCircle></RatingCircle>
                        <RatingCircle></RatingCircle>
                    </div>
                    <p>{props.readyIn} mins</p>
                </div>
            </article>
        </a>
    );
};

const PopularSection = () => {
    const [popularRecipes, setPopularRecipes] = useState<Recipe[]>([]);

    const getPopularRecipes = async () => {
        //setPopularRecipes(POPULAR_RECIPES as Recipe[]);
        //return;

        const url = `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=11`;
        const response = await fetch(url);
        const json = await response.json();

        console.log(json.recipes);

        setPopularRecipes(json.recipes);
    };

    useEffect(() => {
        getPopularRecipes();
    }, []);

    return (
        <>
            <SectionSingular
                title="Recipe of the Day"
                recipe={
                    popularRecipes.length > 0
                        ? popularRecipes[0]
                        : {
                              readyInMinutes: 0,
                              image: "",
                              sourceUrl: "",
                          }
                }
            ></SectionSingular>
            <SectionTiles
                title="Popular Today"
                recipes={popularRecipes.slice(1)}
            ></SectionTiles>
        </>
    );
};

const VegetarianSection = () => {
    const [vegetarianRecipes, setVegetarianRecipes] = useState<Recipe[]>([]);

    const getVegetarianRecipes = async () => {
        //setVegetarianRecipes(VEGETARIAN_RECIPES);
        //return;

        const url = `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=11&tags=vegetarian`;
        const response = await fetch(url);
        const json = await response.json();
        console.log(json.recipes);
        setVegetarianRecipes(json.recipes);
    };

    useEffect(() => {
        getVegetarianRecipes();
    }, []);

    return (
        <SectionTiles
            title="Vegetarian Recipes"
            recipes={vegetarianRecipes}
        ></SectionTiles>
    );
};

const VeganSection = () => {
    const [veganRecipes, setVeganRecipes] = useState<Recipe[]>([]);

    const getVeganRecipes = async () => {
        //setVeganRecipes(VEGAN_RECIPES);
        //return;

        const url = `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=11&tags=vegan`;
        const response = await fetch(url);
        const json = await response.json();

        setVeganRecipes(json.recipes);
    };

    useEffect(() => {
        getVeganRecipes();
    }, []);

    return (
        <SectionTiles
            title="Vegan Recipes"
            recipes={veganRecipes}
        ></SectionTiles>
    );
};

export { PopularSection, VegetarianSection, VeganSection };
