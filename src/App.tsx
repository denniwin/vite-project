import React, { createContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import NotFoundPage from "./components/404/NotFoundPage";
import Person from "./components/pages/Person/Person";
import ListPerson from "./components/pages/Person/ListPerson";
import NavbarMain from "./components/Navbar/Navbar";
import ViewedPerson from "./components/pages/Person/ViewedPerson";
import { People } from "./components/models/People";

export type SwapContext = {
  personAll: People[];
  setPersonAll: React.Dispatch<React.SetStateAction<People[]>>;
};

export const ThemeContext = createContext<SwapContext>({
  personAll: [],
  setPersonAll: () => {},
});

const App: React.FC = () => {
  const [personAll, setPersonAll] = useState<People[]>([]);

  return (
    <div className="App">
      <ThemeContext.Provider value={{ personAll, setPersonAll }}>
        <NavbarMain />
        <Routes>
          <Route path="/" element={<ListPerson />} />
          <Route path="/history" element={<ViewedPerson />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/:uid/:personId" element={<Person />} />
        </Routes>
      </ThemeContext.Provider>
    </div>
  );
};

export default App;
