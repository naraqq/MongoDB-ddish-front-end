import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cell from '../components/cell';
export default function Home() {
  const [stats, setStats] = useState(false);
  const [show, setshow] = useState(false);
  const [text, setText] = useState('');
  const [totalList, setTotalList] = useState();
  useEffect(() => {
    axios.get('http://localhost:5000/list')
      .then(response => {
        setTotalList(response.data)
});
  }, [show, stats])
  const data = {
    text: text,
    status: true
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/list", data)
      .then(res =>setshow(false))
      .catch(err => {
      return err
      })
  }

  return (
    <div className={styles.container}>
      <div className='w-screen h-screen flex justify-center items-center bg-grad'>
        <div className='w-[400px] h-[500px] rounded-lg shadow p-4 bg-white'>
          <h1 className='text-[18px] border-b p-2 flex gap-2 text-red-500'>
          <i className="bi bi-card-checklist"></i>
            Todo-list-app for MongoDB</h1>
          <div className='h-full w-full flex flex-col justify-between pb-14'>
            <div className='w-full h-full px-3 overflow-scroll'>
              {
                totalList ? totalList.map((list, index) =>
                  <div key={index}>
                    <Cell data={list} index={index} func={setStats} stats={stats} />
                  </div>)
                  : null
              }
            </div>
            {
              show ? <form onSubmit={handleSubmit} className='w-full h-10 relative flex items-center px-2 mb-2'>
                <button type='submit'></button>
                <input className='w-full outline-none h-full text-gray-500 border-t ' onChange={(e) => {
                  setText(e.target.value)
                  }} type={"text"} autoFocus/>
                  <button onClick={() => {
                    setshow(false)
                  }} className='text-[20px] border w-[40px] right-0 h-full rounded-md'>x</button>
              </form> : 
                <div className='h-10'></div>
              }
            <button onClick={() => {
              setshow(true)
            }} className='bg-green-500 w-full h-12 rounded text-white active:bg-green-400'>+</button>
          </div>
        </div>
     </div>
    </div>
  )
}
