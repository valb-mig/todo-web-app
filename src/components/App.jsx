import './scss/App.scss';
import '../main.css';

const App = (props) => {
  return (
    <div className="App bg-dark">

      <div className='header-bar bg-gray text-white'>

        <div className='header-item'>

          <div className='header-start'>
            <div className='header-logo bg-light-gray'><i className='fa fa-window-restore '></i></div>
            
            <div className='search-bar'>
              <i className='fa fa-search bg-foreground'></i><input type='text' id='search' className='search bg-light-gray text-white' placeholder='Search'/>
            </div>

          </div>

          <div className='header-end'>
            <div className='header-account bg-light-gray'><i className='fa fa-user'></i></div>
          </div>
        </div>

      </div>

      <div className='sidebar bg-gray'>
        <div className='sidebar-buttons'></div>
        <div className='sidebar-projects'></div>
      </div>

      <div className='content'></div>

    </div>
  );
}

export default App;
