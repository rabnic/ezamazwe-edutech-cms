// Firebase Services

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

import { initializeAuth, get, signInWithEmailAndPassword, EmailAuthProvider, signOut, reauthenticateWithCredential, updatePassword, onAuthStateChanged, getIdTokenResult, signOut as signOutFirebase } from 'firebase/auth';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"
import { addDoc, collection, doc, documentId, getFirestore, setDoc } from "firebase/firestore";

import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCI6TYQ3ZYawor7WxjhTwKnDQKT8_Sj6gI",
  authDomain: "edutech-app-eecfd.firebaseapp.com",
  databaseURL: "https://edutech-app-eecfd-default-rtdb.firebaseio.com",
  projectId: "edutech-app-eecfd",
  storageBucket: "edutech-app-eecfd.appspot.com",
  messagingSenderId: "904449562777",
  appId: "1:904449562777:web:27e8ad9dd1a27d5054c008",
  measurementId: "G-7CCCTV9REH"
};
// const firebaseConfig = {
//   apiKey: "AIzaSyC4jjc8DNsYsxTaxAdhY98kCiitok-58k0",
//   authDomain: "hotel-app-f6ef9.firebaseapp.com",
//   projectId: "hotel-app-f6ef9",
//   storageBucket: "hotel-app-f6ef9.appspot.com",
//   messagingSenderId: "668661025183",
//   appId: "1:668661025183:web:33f4702258caf90dbb95aa",
//   measurementId: "G-GYBK5P9EKQ"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

//auth for firebase
export const auth = getAuth(app)
//  { auth }

//firestore 
export default getFirestore(app)
export const database = getFirestore(app)
export const storage = getStorage(app)


const value = collection(database, "admin")

// const setUP = (role) => {

//   setUserRole(role)

//   if (role === "admin") {
//     adminLinks.forEach(item => item.style.display = "none")
//     guestLinks.forEach(item => item.style.display = "block")

//     console.log(role);
//   }
//   else {

//     adminLinks.forEach(item => item.style.display = "block")
//     guestLinks.forEach(item => item.style.display = "block")

//   }

//   //console.log(role);

// }

export const signOutFromFirebase = () => {
  if (auth) {
    signOutFirebase(auth).then(() => {
      console.log("Sign out successful")
    })
  }
}

export const createNewAdmin = async (email, fullName, phoneNumber) => {
  // e.preventDefault();
  let uid = "userRecord.uid"
  try {
    const response = await fetch('https://ezamazwe-edutech-nodejs.onrender.com/create-user', {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, fullName, phoneNumber }),
    });

    const responseData = await response.json();
    // setMessage(responseData.message);

    console.log("Details: ", email, fullName, phoneNumber);
    console.log("Creating user: ", responseData);

  } catch (error) {
    console.log("Unable to create user: ", error);
    // setMessage('Unable to create user. Please try again later.');
  }
}

export const AdminLogin = async (emailA, password) => {

  const url = 'https://ezamazwe-edutech-nodejs.onrender.com/admin-login';

  // const 

  const email = { email: emailA, password: password }


  try {
    const response = await fetch(url, {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(email),

    })

    const result = await response.json()

    console.log("sssssss", result);

    // return

    //   // Handle the response data
    if (result.message === 'Authorized') {

      console.log('Admin:', result.message);


      // Further actions for an authorized user


    } else if (result.message === 'Not authorized') {
      console.log('Not Admin:', result.message);
      // Further actions for an unauthorized user

      // alert('Not Authorized')

    }
    else {
      console.log('Invalid:', result.message);
      // Further actions for an unauthorized user

      // alert('Invalid ')

    }
    return result


  } catch (error) {
    console.log("Error login in: ", error)
  }


}


// export async function AdminLogin(email, password) {
//   try {
//     const response = await fetch('https://ezamazwe-edutech-nodejs.onrender.com/admin-login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email: email, password: password }),
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();
//     console.log(data);

//     if (data.message === 'Authorised') {
//       console.log('Admin:', data.message);
//       // Further actions for an authorized user

//     } else {
//       console.log('Not Admin:', data.message);
//       // Further actions for an unauthorized user
//     }
//   } catch (error) {
//     console.error('Error during authentication:', error);
//     // Handle errors, such as network issues or server errors
//   }
// }

export const logout = () => {

  const auth = getAuth();
  signOut(auth).then(() => {
    console.log("User has logged out Successfully")
    // navigate('/login')
  })
}


// try {
//   const response = await fetch('https://ezamazwe-edutech-nodejs.onrender.com/admin-login', {

//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ email: email }),
//   })

//   const responseData = await response.json();
//   // setMessage(responseData.message);, password
//   console.log("Details: ", email);
//   console.log("user logging in ====: ", responseData);

//   // setMessage(response.data.message);, password
//   // console.log("Logged in:: ", (response.data.message))

// } catch (error) {
//  https://ezamazwe-edutech-nodejs.onrender.com/update-password-reset

//   console.log("Unable to login:: ", error);
//   // setMessage(error)
// }

export const ResetPasswordFunction = async (oldPassword, newPassword) => {
  const user = auth.currentUser;
  console.log("User currently logged in:", user);
  try {
    // Re-authenticate the user with their current password
    const credential = EmailAuthProvider.credential(user.email, oldPassword);
    const reAuthed = await reauthenticateWithCredential(user, credential);
    console.log("reAuthed", reAuthed)
    // If re-authentication is successful, update the password
    const updatedPass = await updatePassword(user, newPassword);
    console.log("updatedPass", updatedPass)
    console.log('Password reset successful:', user);
    console.log('Password reset successful.');
  } catch (error) {
    console.error('Error resetting password:', error.message);
    // Handle specific error cases, such as incorrect current password
    if (error.code === 'auth/wrong-password') {
      console.log('Incorrect current password. Please try again.');
    } else {
      console.log('Error resetting password. Please make sure you are logged in.');
    }
    throw error; // Re-throw the error to propagate it if needed
  }
};

export const updatePasswordReset = async (email) => {
  console.log("update password reset", email);

  try {
    const apiUrl = await fetch(`https://ezamazwe-edutech-nodejs.onrender.com/update-password-reset`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
      });
    const response = await apiUrl.json();
    return response;
    // alert("Email for password reset has been sent")
    // Handle the response here
    console.log('Server Response:', response);
  } catch (error) {
    console.log("Error resetting password", error);
  }
}

// Forgot password function
export const ForgotPasswordFunction = async (email) => {
  console.log("Forgot password", email);
  const url = "https://ezamazwe-edutech-cms.netlify.app"
  try {
    const apiUrl = await fetch(`https://ezamazwe-edutech-nodejs.onrender.com/reset-password`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, url: url }),
      });
    const response = await apiUrl.json();
    return response;
    // alert("Email for password reset has been sent")
    // Handle the response here
    console.log('Server Response:', response);
  } catch (error) {
    console.log("Error resetting password", error);
  }
}

export const checkAuthState = () => {
  console.log("inside checkAuthState")
  return new Promise((resolve) => {
    console.log("inside new Promise")
    onAuthStateChanged(auth, async (user) => {
      console.log("inside onAuthStateChanged")
      if (user) {
        const idTokenResult = await getIdTokenResult(user, true);
        const customClaims = idTokenResult.claims;
        console.log("Custom claims", customClaims);

        const adminData = {
          fullname: "Admin",
          email: customClaims.email,
          passwordChanged: !customClaims.forcePasswordReset,
          phoneNumber: customClaims.phone_number,
          uid: customClaims.user_id,
          admin: customClaims.admin,
          permissions: customClaims.permissions
        }
        resolve(adminData);
      } else {
        resolve(null);
      }
    });
  });
}

export const getUserCustomClaims = async (user) => {
  const idTokenResult = await getIdTokenResult(user, true);
  const customClaims = idTokenResult.claims;
  console.log("Custom claims", customClaims);

  const adminData = {
    fullname: "Admin",
    email: customClaims.email,
    passwordChanged: !customClaims.forcePasswordReset,
    phoneNumber: customClaims.phone_number,
    uid: customClaims.user_id,
    admin: customClaims.admin,
    permissions: customClaims.permissions
  }
  console.log("====", adminData)
  return adminData;
}

// /////
// //creates new admin
const createAdminToFirestore = async (admin) => {
  // await addDoc(adminCollection, { firstName: firstName, lastName: lastName, phoneNumber: phoneNumber, email: email, role: role, image: uri, passwordChanged: passwordChanged })
  const docRef = await setDoc(doc(database, "admins", admin.uid), admin)
  console.log("Doc Reff ===== ", docRef);
};

export const saveCourseToFirestore = async (courseData) => {
  let documentId;
  try {
    const docRef = await addDoc(collection(database, "courses"), courseData)
    documentId = docRef.id;
    console.log('Document course write success', documentId);
  } catch (error) {
    console.error('Error adding document: ', error);
  }
  return documentId;
};

export const saveLessonToFirestore = async (courseId, lessonData) => {
  let documentId;
  try {
    const courseDocRef = doc(database, "courses", courseId);
    const collectionRef = collection(courseDocRef, "lessons");
    const docRef = await addDoc(collectionRef, lessonData);
    documentId = docRef.id;
    console.log('Document lesson write success', documentId);
  } catch (error) {
    console.error('Error adding document: ', error);
  }
  return documentId;
};


export const saveTopicToFirestore = async (courseId, lessonId, topicData) => {
  let documentId;
  try {
    const courseDocRef = doc(database, "courses", courseId);
    const lessonsCollectionRef = collection(courseDocRef, "lessons");
    const lessonDocRef = doc(database, "courses", courseId);

    // const docRef = await addDoc(courseCollectionRef, lessonData);
    // documentId = docRef.id;
    // console.log('Document lessonTopic write success', documentId);
  } catch (error) {
    console.error('Error adding document: ', error);
  }
  return documentId;
};



// Function to upload video to Firebase Storage
export const uploadVideoToFirebase = async (courseId, videoObject) => {
  const { video, videoName } = videoObject;

  // Create a reference to the storage location
  // const storageRef = storage.ref().child(`videos/${videoName}`);
  const storageRef = ref(storage, `/videos/${courseId}/${videoName}`);
  // Convert the blob URL to a Blob object
  const response = await fetch(video);
  const blob = await response.blob();

  // Upload the video to Firebase Storage
  await storageRef.put(blob);

  // Get the download URL
  const downloadURL = await storageRef.getDownloadURL();

  return downloadURL;
};

// Update each video object with the Firebase download URL
export const updateVideosWithFirebaseURLs = async (videos) => {
  const uploadPromises = videos.map(uploadVideoToFirebase);

  // Wait for all uploads to complete
  const downloadURLs = await Promise.all(uploadPromises);

  // Update the original videos array with the Firebase download URLs
  videos.forEach((video, index) => {
    video.video = downloadURLs[index];
  });

  return videos;
};

////////////////////////////////////////////////////////////////


// Create a function to upload a video and replace the URL
export const uploadVideo = async (video) => {
  try {
    // Initialize Firebase Storage
    const storage = getStorage();

    // Create a reference to the video in Firebase Storage
    const storageRef = ref(storage, video.videoName);

    // Upload the video bytes to Firebase Storage
    const snapshot = await uploadBytes(storageRef, video.video);

    // Get the download URL of the uploaded video
    const downloadURL = await getDownloadURL(snapshot.ref);

    // Replace the blob URL with the Firebase download URL
    video.video = downloadURL;

    // Return the updated video object
    return video;
  } catch (error) {
    console.error('Error uploading video:', error);
    throw error;
  }
};

// Use Promise.all to upload all videos and replace the URLs
export const uploadAllVideos = async (videos) => {
  try {
    // Map each video to an upload promise
    const uploadPromises = videos.map(uploadVideo);

    // Wait for all upload promises to resolve
    const updatedVideos = await Promise.all(uploadPromises);

    // Return the array of updated videos
    return updatedVideos;
  } catch (error) {
    console.error('Error uploading videos:', error);
    throw error;
  }
};

// Call the uploadAllVideos function with the videos array


export const uploadCourseVideos = async (courseId, videos) => {
  // const storage = getStorage();
  const updatedVideos = [...videos];

  // Upload 1 image at a time
  for (let [index, video] of videos.entries()) {
    // console.log(index)
    const imageRef = ref(storage, `/videos/${courseId}/${video.videoName}`);
    await uploadBytes(imageRef, video.video)
      .then(async (snapshot) => {
        // console.log(image.name, "upload success");
        await getDownloadURL(snapshot.ref).then((url) => {
          //   console.log(url);
          updatedVideos[index].video = url;
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  return updatedVideos;
};



/////////////////////////////////////////////////////////////////

// Call the function to update videos with Firebase URLs
// updateVideosWithFirebaseURLs(videos)
//   .then(() => {
//     console.log("Videos updated with Firebase download URLs:", videos);
//   })
//   .catch((error) => {
//     console.error("Error updating videos:", error);
//   });



// //deletes admin
// const deleteAdmin = async (id) => {

//   const admin = doc(database, "admins", id);
//   await deleteDoc(admin);
//   alert("This item was deleted")

// }

// //edit admin
// const editAdmin = async (id, email, firstName, lastName, phoneNumber, role) => {
//   setEmail(email)
//   setFirstName(firstName)
//   setLastName(lastName)
//   setPhoneNumber(phoneNumber)
//   setRole(role)
//   setPasswordChanged(passwordChanged)
//   setID(id)

//   // setShow(true)

//   const shopItem = doc(database, "List", id);
//   // await updateDoc(shopItem, { Item: updatedItem });


// };


// //udates admin with new information
// const updateAdmin = async () => {
//   // setItem(item)
//   // setQuantity(quantity)
//   // setID(id)

//   const shopItem = doc(database, "List", id);
//   // await updateDoc(shopItem, { Item: updatedItem });
//   await updateDoc(shopItem, { firstName: firstName, lastName: lastName, phoneNumber: phoneNumber, email: email, role: role, });
//   alert("Item was updated")
//   // setShow(false)


// };


// //gets information from firestore
// const getAdminList = async () => {

//   //get data from database
//   try {
//       const data = await getDocs(adminCollection);

//       const filtereddata = data.docs.map((doc) => ({

//           //this fucntion  returns the values in the collection
//           ...doc.data(),
//           id: doc.id,

//       }));

//       setAdminList(filtereddata);
//       // setShoppingList(data);

//       console.log(filtereddata);
//   } catch (error) {
//       console.error("Error fetching collection", error);
//   }
// };