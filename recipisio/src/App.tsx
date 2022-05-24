import { useState } from "react";

import Header from "./Header";
import SearchOverlay from "./SearchOverlay";
import { PopularSection, VeganSection, VegetarianSection } from "./Sections";

const App = () => {
    const [searchOverlayOpen, setSearchOverlayOpen] = useState<
        boolean | undefined
    >(undefined);

    const openSearchOverlay = () => {
        setSearchOverlayOpen(true);
    };

    const closeSearchOverlay = () => {
        setSearchOverlayOpen(false);
    };

    return (
        <div className="content">
            <Header
                openSearchOverlay={openSearchOverlay}
                searchOverlayOpen={searchOverlayOpen}
            ></Header>
            <PopularSection></PopularSection>
            <VegetarianSection></VegetarianSection>
            <VeganSection></VeganSection>
            <SearchOverlay
                searchOverlayOpen={searchOverlayOpen}
                closeSearchOverlay={closeSearchOverlay}
            ></SearchOverlay>
        </div>
    );
};

export default App;
