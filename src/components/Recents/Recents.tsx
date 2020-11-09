// @ts-nocheck
import * as React from 'preact/compat';
import './Recents.less';

import * as firebase from 'firebase/app';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const db = firebase.default.firestore();

export default function Recents() {
  const friendsRef = db.collection('users');
  const friendsQuery = friendsRef.where(firebase.default.firestore.FieldPath.documentId(), '==', firebase.default.auth().currentUser.uid).limit(10);
  const [friends] = useCollectionData(friendsQuery);

  return (
    <div class="recents">
      {friends && friends[0].friends.map(friend => <GroupPost uid={friend} />)}
    </div>
  )
}

type GroupPost = {
  uid: string
}

function GroupPost({ uid }: GroupPost) {
  const userRef = db.collection('users');
  const userQuery = userRef.where("userID", '==', uid);
  const [user] = useCollectionData(userQuery);
  
  const postsRef = db.collection('posts').doc(uid).collection('posts');
  const postsQuery = postsRef.orderBy('createdAt').limit(5);
  const [posts] = useCollectionData(postsQuery);

  return (
    <>
      <div class="user">
        <div class="topBar">
          {user && <img src={user[0].photoURL}></img>}
        </div>
        <div class="posts">
          {posts && posts.map(post => <Post createdAt={post.createdAt.toDate()} content={post.content}/>)}
        </div>
      </div>
    </>
  )
}

type PostProps = {
  createdAt: Date,
  content: string,
}

function Post({createdAt, content}: PostProps) {
  return (
    <>
      <div class="post">
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