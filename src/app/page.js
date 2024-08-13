"use client"
import React, {useEffect, useState} from "react"

export default function Home() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    ;(async function fetchData() {
      const response = await fetch("/api/users")
      const data = await response.json()
      setUsers(data)
    })()
  }, [])

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
      <form id="form-users">
        <input type="text" name="name" id="name"></input>
        <input type="email" name="email" id="email"></input>
        <button type="submit">submit</button>
      </form>
    </div>
  )
}
