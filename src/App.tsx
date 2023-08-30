import React, {createContext, useState} from "react";
import {Routes, Route} from "react-router-dom";
import NotFoundPage from "./components/pages/404/NotFoundPage";
import Person from "./components/pages/Person/Person";
import ListPerson from "./components/pages/Person/ListPerson";
import NavbarMain from "./components/layouts/Navbar/Navbar";
import ViewedPerson from "./components/pages/Person/ViewedPerson";
import {People} from "./services/models/People";

export type SwapContext = {
  personAll: People[];
  setPersonAll: React.Dispatch<React.SetStateAction<People[]>>;
};

export const PersonContext = createContext<SwapContext>({
  personAll: [],
  setPersonAll: () => {},
});

const App: React.FC = () => {
  const [personAll, setPersonAll] = useState<People[]>([]);

  return (
    <div className="App">
      <PersonContext.Provider value={{personAll, setPersonAll}}>
        <NavbarMain />
        <Routes>
          <Route path="/" element={<ListPerson />} />
          <Route path="/history" element={<ViewedPerson />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/:uid/:personId" element={<Person />} />
        </Routes>
      </PersonContext.Provider>
    </div>
  );
};

export default App;
