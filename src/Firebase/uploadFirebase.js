import {
  getStorage,
  ref,
  //   uploadBytesResumable,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { app } from "./firebase";

export const uploadFile = async (file, setFirebaseFileURL ,setFileName) => {
  const storage = getStorage(app);

  const fileName = new Date().getTime() + file.name;
  if (!file) return null;
  const fileRef = ref(storage, "files/" + fileName);
  uploadBytes(fileRef, file).then((snapshort) => {
    getDownloadURL(snapshort.ref).then((url) => {
      setFirebaseFileURL(url);
      console.log(url);
      setFileName(fileName);
      console.log(fileName);
      // return url
    });
  });
};

// multiUploadFiles uploadFirebase.js


export const multiUploadFiles = async (files, setFirebaseFileURLs, setFileNames) => {
  const storage = getStorage(app);

  // Upload each file in the array
  const uploadPromises = files.map(async (file) => {
    const fileName = new Date().getTime() + file.name;
    const fileRef = ref(storage, "files/" + fileName);
    
    await uploadBytes(fileRef, file);
    
    const url = await getDownloadURL(fileRef);

    // Update state arrays
    setFirebaseFileURLs((prevURLs) => [...prevURLs, url]);
    setFileNames((prevNames) => [...prevNames, file.name]);
  });

  try {
    await Promise.all(uploadPromises);
    return { success: true };
  } catch (error) {
    console.error('Error uploading files:', error);
    return { success: false, error };
  }
};


export const deleteFile = async (fileName) => {
  const storage = getStorage(app);

  // Create a reference to the file to delete
  const desertRef = ref(storage, "files/" + fileName);

  // Delete the file
  deleteObject(desertRef)
    .then((res) => {
      // File deleted successfully
      console.log(res);
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
      console.log(error);
    });
};

// const fileNameeeee ="1704355827798Timir_Paul.pdf";
// ;(deleteFile(fileNameeeee))();


// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import app from "./firebase";
// import analytics from "./firebase";

// const uploadFirebase = async (file)={

// const storage = getStorage(app);

// const fileName= new Date().getTime()+file.name;
// // Upload file and metadata to the object 'images/mountains.jpg'
// const storageRef = ref(storage, 'files/' + file.name)
// const uploadTask = uploadBytesResumable(storageRef, file, metadata)

// // Listen for state changes, errors, and completion of the upload.
// uploadTask.on('state_changed',
//   (snapshot) => {
//     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//     console.log('Upload is ' + progress + '% done');
//     switch (snapshot.state) {
//       case 'paused':
//         console.log('Upload is paused');
//         break;
//       case 'running':
//         console.log('Upload is running');
//         break;
//     }
//   },
//   (error) => {
//     // A full list of error codes is available at
//     // https://firebase.google.com/docs/storage/web/handle-errors
//     switch (error.code) {
//       case 'storage/unauthorized':
//         // User doesn't have permission to access the object
//         break;
//       case 'storage/canceled':
//         // User canceled the upload
//         break;

//       // ...

//       case 'storage/unknown':
//         // Unknown error occurred, inspect error.serverResponse
//         break;
//     }
//   },
//   () => {
//     // Upload completed successfully, now we can get the download URL
//     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//       console.log('File available at', downloadURL);
//     });
//   }
// )

// }
