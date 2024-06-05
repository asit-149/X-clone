'use client'
import { HiOutlineChat, HiOutlineHeart, HiOutlineTrash, HiHeart } from "react-icons/hi";
import { signIn, useSession } from "next-auth/react";
import {
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { app } from '../firebase';
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { modalState, postIdState } from "@/atom/modalAtom";

export default function Icons({ id, uid }) {
  const { data: session } = useSession();
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  const [comments,setComments]=useState([])
  const [open, setOpen] = useRecoilState(modalState)
  const [postId,setPostId] = useRecoilState(postIdState)
  const db = getFirestore(app);

  const likePost = async () => {
    if (session) {
      if (isLiked) {
        await deleteDoc(doc(db, 'posts', id, 'likes', session.user.uid));
      } else {
        await setDoc(doc(db, 'posts', id, 'likes', session.user.uid), {
          username: session.user.username,
          timestamp: serverTimestamp(),
        });
      }
    } else {
      signIn();
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'posts', id, 'likes'), (snapshot) => {
      setLikes(snapshot.docs);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [db, id]);

  useEffect(() => {
    setIsLiked(likes.findIndex((like) => like.id === session?.user?.uid) !== -1);
  }, [likes, session?.user?.uid]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'posts', id, 'comments'),
      (snapshot) => setComments(snapshot.docs)
    );
    return () => unsubscribe();
  }, [db, id]);

  const deletePost = async () => {
    if (window.confirm('Are you sure you want to delete the post')) {
      if (session.user.uid === uid) {
        
        deleteDoc(doc(db, 'posts', id))
          .then(() => {
            console.log('Document Successfully deleted');
            window.location.reload();
          })
          .catch((error) => {
            console.error('Error Removing DOCUMENT', error);
          });
      }else{
        alert("You are Unauthorized to delete this post")
      }
    }
  };

  return (
    <div className="flex justify-start gap-5 p-2 text-gray-500">
      <div className="flex items-center">

      <HiOutlineChat onClick={()=>{
        if (!session) {
          signIn()
        }else{
          setOpen(!open)
          setPostId(id) 
        }
      } } className='h-8 w-8 cursor-pointer rounded-full transition duration-500 ease-in-out p-2 hover:text-sky-500 hover:bg-sky-100' />
      {comments.length > 0 && (<span className="text-xs">{comments.length}</span>)}
      </div>
      <div className="flex items-center">
        {isLiked ? (
          <HiHeart onClick={likePost} className='h-8 w-8 cursor-pointer rounded-full transition duration-500 ease-in-out p-2 text-red-600 hover:text-red-500 hover:bg-red-100' />
        ) : (
          <HiOutlineHeart onClick={likePost} className='h-8 w-8 cursor-pointer rounded-full transition duration-500 ease-in-out p-2 hover:text-red-500 hover:bg-red-100' />
        )}
        {likes.length > 0 && <span className="text-xs">{likes.length}</span>}
      </div>
      {session && session.user && session.user.uid === uid && (
        <HiOutlineTrash
          className='h-8 w-8 cursor-pointer rounded-full transition duration-500 ease-in-out p-2 hover:text-red-500 hover:bg-red-100'
          onClick={deletePost}
        />
      )}
    </div>
  );
}
