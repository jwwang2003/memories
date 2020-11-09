// @ts-nocheck
import * as React from 'preact/compat';
import { useState } from 'preact/compat'

import * as firebase from 'firebase/app';
import { useCollectionData } from 'react-firebase-hooks/firestore'

import './Myself.less';

export default function Myself() {
  const [post, setPost] = useState('');

  const db = firebase.default.firestore();
  const userRef = db.collection('posts').doc(firebase.default.auth().currentUser.email).collection('posts');
  const userQuery = userRef.orderBy('createdAt').limit(30);
  const [user] = useCollectionData(userQuery, {idField: 'id'});

  async function handlePost() {
    await userRef.add({
      createdAt: firebase.default.firestore.FieldValue.serverTimestamp(),
      content: post
    })
    setPost('');
  }

  return (
    <div class="myself">
      <textarea value={post} onChange={(e) => setPost(e.target.value)}></textarea>
      <button onClick={() => handlePost()}>POST</button>
      {user && user.length > 0 && user.map(user => <Post id={user.id} createdAt={user.createdAt ? user.createdAt.toDate() : ""} content={user.content}/>)}
    </div>
  )
}

type PostProps = {
  id: string,
  createdAt: Date,
  content: string,
}

function Post({createdAt, content, id}: PostProps) {

  function handleDelete() {
    const db = firebase.default.firestore();
    db.collection('posts').doc(firebase.default.auth().currentUser.email).collection('posts').doc(id).delete();
  }

  return (
    <>
      <div class="post" onClick={() => handleDelete()}>
        <div class="topBar">
          {createdAt.toString()}
        </div>
        <div class="content">
          {content}
        </div>
      </div>
    </>
  )
}