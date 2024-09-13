
import './App.css';
import { BrowserRouter as Router} from 'react-router-dom';
import {MenuProvider} from "./contexts/sideMenu.context.tsx";
import {EntryPage} from "./pages/entry-page/entryPage.tsx";
import Toast from "./components/shared/toast/Toast.tsx";
const App = () => {

  return (
      <div>
          <Toast></Toast>
          <div className="main-page">
              <MenuProvider>
                  <Router>
                      <div></div>
                      <EntryPage>

                      </EntryPage>
                      <div></div>
                  </Router>
              </MenuProvider>
          </div>
      </div>


  )
}

export default App
