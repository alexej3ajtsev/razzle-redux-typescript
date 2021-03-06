import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import testSlice, { asyncThunkActionMultipl } from '../../redux/slices/test';
import styles from './style.module.css';

const Home = () => {
  const dispatch = useDispatch();
  // @ts-ignore
  const value = useSelector(state => state.test)
  const handleIncrement = () => {
    dispatch(testSlice.actions.increment(1))
  }

  return (
    <div>
      <h1 className={styles.header}>Home {value}</h1>
      <button onClick={() => handleIncrement()}>
        Increment
      </button>
    </div>
  )
}

export default { component: Home, action: asyncThunkActionMultipl, params: { num: 'int' } };
