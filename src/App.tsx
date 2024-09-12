
import './App.css';
import { BrowserRouter as Router} from 'react-router-dom';
import {MenuProvider} from "./contexts/sideMenu.context.tsx";
import {EntryPage} from "./pages/entry-page/entryPage.tsx";

const App = () => {

  return (
    <div>
      <MenuProvider>
        <Router>
          <EntryPage>

          </EntryPage>
        </Router>
      </MenuProvider>

    </div>
    
  )
}

export default App
