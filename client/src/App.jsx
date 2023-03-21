import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [userList, setUserList] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [username, setUsername] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/getUsers")
      .then((response) => setUserList(response.data));
  }, [userList]);

  const createUser = () => {
    axios
      .post("http://localhost:8000/createUser", {
        name: name,
        age: age,
        username: username,
      })
      .then((response) => {
        alert("User created");
        setUserList([...userList, { name, age, username }]);
      });
  };

  return (
    <div>
      <div>
        <div className="usersDisplay">
          {userList.map((user) => {
            return (
              <div key={user._id}>
                <h2>Name: {user.name}</h2>
                <p>Age: {user.age}</p>
                <p>Username: {user.username}</p>
              </div>
            );
          })}
        </div>
        <div className="addUser">
          <input
            type="text"
            placeholder="Name"
            onChange={(event) => setName(event.target.value)}
          />
          <input
            type="number"
            placeholder="Age"
            onChange={(event) => setAge(event.target.value)}
          />
          <input
            type="text"
            placeholder="Username"
            onChange={(event) => setUsername(event.target.value)}
          />
          <button onClick={createUser}>Create user</button>
        </div>
      </div>
    </div>
  );
}

export default App;
