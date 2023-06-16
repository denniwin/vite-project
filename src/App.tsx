import React from 'react';
import { Routes, Route } from 'react-router-dom'
import NotFoundPage from './components/404/NotFoundPage'
import Person from './components/Person/Person'
import ListPerson from './components/Person/ListPerson';
import NavbarMain from './components/Navbar/Navbar';
import ViewedPerson from './components/Person/ViewedPerson';

const ThemeContext = React.createContext('red');
const App: React.FC = () => {

  return (
    <div className="App">
      <ThemeContext.Provider value="dark">
      <NavbarMain/>
      <Routes>
        <Route path='/' element={<ListPerson /> }/>
        <Route path='/history' element={<ViewedPerson/> }/>
        <Route path='*' element={ <NotFoundPage />} />
        <Route path='/person/:id' element={<Person/>} />
      </Routes>
      </ThemeContext.Provider>
    </div>
  )
}

export default App
