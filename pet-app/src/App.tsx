import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Actions from 'components/Actions';
import { PetContainer } from 'components/PetComponents';
import { OwnerContainer } from 'components/OwnerComponents';

function App() {
  return (
    <div className='min-h-screen bg-navy-base py-10'>
      <div className='container mx-auto my-auto'>
        <Router>
          <Actions />
          <div className='mx-4 py-4 md:px-4  border-t-2 border-navy-lighter'>
            <Switch>
              <Route exact path='/'>
                <PetContainer />
              </Route>
              <Route exact path='/owner'>
                <OwnerContainer />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    </div>
  );
}

export default App;
