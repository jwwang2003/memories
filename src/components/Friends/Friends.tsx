// @ts-nocheck
import * as React from 'preact/compat';
import { useState } from 'preact/compat';

import * as firebase from 'firebase/app';
import { useCollectionData } from 'react-firebase-hooks/firestore'

import './Friends.less';

export default function Friends() {
  const [friendID, setFriendID] = useState('');
  const db = firebase.default.firestore();
  const userRef = db.collection('users');
  const userQuery = userRef.where(firebase.default.firestore.FieldPath.documentId(), '==', firebase.default.auth().currentUser.uid);
  const [user] = useCollectionData(userQuery, {idField: 'id'});

  function addFriend() {
    const userRef = db.collection('users');
    userRef.where("userID", '==', friendID).get().then((doc) => {
      if (doc.empty) return;
      else {
        const friend = db.collection('users').doc(firebase.default.auth().currentUser.uid);
        friend.update({
          friends: firebase.default.firestore.FieldValue.arrayUnion(friendID)
        })
      }
    })
    setFriendID('');
  }

  return (
    <>
      <input value={friendID} onChange={(e) => setFriendID(e.target.value)}/>
      <button  onClick={() => addFriend()}>Add</button>

      <div class="friends">
        {user && user.length > 0 && user[0].friends.map(friend => <Friend id={friend.id} name={friend} />
        )}
      </div>
    </>
  )
}

type FriendProps = {
  id: string,
  name: string,
}

function Friend({id, name} : FriendProps) {

  function handleDelete() {
    const db = firebase.default.firestore();
    const friend = db.collection('users').doc(firebase.default.auth().currentUser.uid);
    friend.update({
      friends: firebase.default.firestore.FieldValue.arrayRemove(name)
    })
  }

  return (
    <>
      <h4 onClick={() => handleDelete()}>{name}</h4>
    </>
  )
}