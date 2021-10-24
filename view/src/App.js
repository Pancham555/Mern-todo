import { useEffect, useState } from 'react'
import axios from 'axios'
function App() {
  const [note, setnote] = useState("")
  const [state, setstate] = useState([])
  const link = "/data"

  const postData = () => {
    if (note === "") {
      alert("Note cannot be empty")
    } else {
      axios.post(link, {
        note
      }).then((res) => console.log(res.data))
        .catch(err => console.log(err))
      setnote("")
    }
  }

  const getData = () => {
    axios.get(link).then((res) => setstate(res.data))
      .catch(err => console.log(err))
  }
  const updatedtxt = (updatenote) => {
    setnote(updatenote)
  }
  const updateData = (_id) => {
    if (note === "") {
      alert("Updated note cannot be empty")
    } else {
      axios.put(link, {
        _id, note
      }).then(() => console.log("Note updated successfully"))
        .catch(err => console.log(err))
      setnote("")
    }
  }

  const deleteData = (_id) => {
    axios.post(link + "del", {
      _id
    }).then((res) => console.log(res.data))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getData()
  }, [state])
  return (
    <div>
      <form className='flex justify-center w-full my-5'>
        <input type="text" value={note} onChange={(e) => setnote(e.target.value)}
          placeholder='write your notes here'
          className='p-2 mx-2 text-xl font-medium border-2 rounded-md focus:ring-black w-80'
        />
        <button type='button' onClick={postData}
          className='px-4 py-1 mx-2 text-3xl font-black text-white bg-blue-500 border-2 border-blue-500 rounded-md'
        >+</button>
      </form>
      <div className='flex justify-center'>
        <div className='flex flex-col justify-evenly'>
          {state.map(data => {
            return <div key={data._id} className='w-auto max-w-full m-5 border-2 rounded-md'>

              <div onClick={() => deleteData(data._id)}
                className='float-right m-2 text-2xl font-black cursor-pointer'
              >&times;</div>

              <div className='h-auto m-4 text-2xl font-medium break-words break-all'>{data.note}</div>
              <div className="flex w-full justify-evenly">
                <button type='button' className='inline-block p-3 m-2 font-medium border-2 rounded-md focus:border-blue-500'
                  onClick={() => updatedtxt(data.note)}>Update note</button>
                <button type='button' className='inline-block p-3 m-2 font-medium border-2 rounded-md focus:border-blue-500'
                  onClick={() => updateData(data._id)}>Update</button>
              </div>
            </div>
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
