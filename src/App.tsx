import React from 'react';

import UpdatedDataNotification from './UpdatedDataNotification';
import Counter from './Counter';
import './App.css';

function App() {
  return (
    <article>
      <UpdatedDataNotification>
        There were an update on the data. Want to retrive the updated data?
      </UpdatedDataNotification>
      <Counter />
    </article>
  );
}

export default App;
