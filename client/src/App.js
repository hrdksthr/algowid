import React, { Suspense, lazy} from 'react';
import './App.css';
const Routes = lazy(() => import("./Routes"));

function App() {
  return (
    <Suspense fallback={<div>...Loading</div>}>
      <Routes />
    </Suspense>
  );
}

export default App;
