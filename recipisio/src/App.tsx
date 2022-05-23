import Header from "./Header";
import { PopularSection, VeganSection, VegetarianSection } from "./Sections";

const App = () => {
    return (
        <div className="content">
            <Header></Header>
            <PopularSection></PopularSection>
            <VegetarianSection></VegetarianSection>
            <VeganSection></VeganSection>
        </div>
    );
};

export default App;
