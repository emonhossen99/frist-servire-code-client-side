import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  const handleAddedUser = event => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = {name, email}

    //fetch data post to server

    fetch(`http://localhost:5000/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        const newUser = [...users,data];
        setUsers(newUser)
      })
  }

  return (
    <div className="App">
      <h1>Our Own Users : {users.length}</h1>

      <form onSubmit={handleAddedUser}>
        <input type="text" name="name" id="" placeholder='Enter Your Name :' required />
        <br />
        <input type="text" name="email" id="" placeholder='Enter Your Email :' required />
        <br />
        <input type="submit" value="Add User" />
      </form>
      {
        users.map(user => <li key={user.id}>
         id : {user.id} Name : {user.name},  Email : {user.email}, 
        </li>
        )
      }
    </div>
  );
}

export default App;
