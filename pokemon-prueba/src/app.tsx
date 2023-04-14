import './app.scss';
import { AppContextProvider } from './context/app-context';
import CardList from './components/organism/card-list/card-list';
import SearchCard from './components/organism/search-card/search-card';

function App() {
  return (
    <AppContextProvider>
      <div className='app'>
        <SearchCard />
        <CardList />
      </div>
    </AppContextProvider>
  );
}

export default App;
