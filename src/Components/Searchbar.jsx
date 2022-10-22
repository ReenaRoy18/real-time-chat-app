import React from "react";
import { useState } from "react";
import "../Stylesheets/searchbar.scss";
import {
  collection,
  query,
  where,
  getDoc,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import { db } from "../utils/firebase/firebase.js";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Searchbar() {
  const [username, setUsername] = useState(""); //username for i/p fields whatever we write in i/p, we will change username
  const [user, setUser] = useState(null); //actual user
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    //it is search function
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    ); //using this query we search for users

    try {
      const querySnapshot = await getDocs(q);
      //using query , we get user
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        setUser(doc.data());
        //if there is user then we set doc.data
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    console.log("handle select called");
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      console.log(res);

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), {
          messages: [],
        });
        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        console.log("try block called");
      }
    } catch (err) {
      console.log(err);
    }
    setUser(null);
    setUsername("");
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        {/* onKeyDOwn: it will listen for keyboard action ehatever we type and enter it will search tat user */}
      </div>
      {err && <span>User Not Found</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="" />

          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Searchbar;
