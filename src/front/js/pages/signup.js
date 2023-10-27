import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/signup.css";

export const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { store, actions } = useContext(Context);
  console.log("STORE***", store.user);

  return (
    <div className="text-center">
      <form className="form">
        <label>First Name:</label>
        <input
          class="input"
          type="text"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <br />
        <br />

        <label>Last Name:</label>
        <input
          class="input"
          type="text"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <br />
        <br />

        <label>Age:</label>
        <input
          class="input"
          type="number"
          name="age"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <br />
        <br />

        <label>Location:</label>
        <input
          class="input"
          type="text"
          name="location"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <br />
        <br />

        <label>Email ID:</label>
        <input
          class="input"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <br />

        <label>Password:</label>
        <input
          class="input"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <br />

        <button class="btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
