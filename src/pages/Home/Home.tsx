import React from 'react';

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}

export default { component: Home, loadData: async (params: any) => console.log('params >>>', params) };
