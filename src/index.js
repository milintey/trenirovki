import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth"; 
import Notiflix from 'notiflix';


const firebaseConfig = {
  apiKey: "AIzaSyD606fLTGqofK4cSdWdTzIn8ZRRAFlLyLU",
  authDomain: "testfilmotekaautorization.firebaseapp.com",
  databaseURL: "https://testfilmotekaautorization-default-rtdb.firebaseio.com",
  projectId: "testfilmotekaautorization",
  storageBucket: "testfilmotekaautorization.appspot.com",
  messagingSenderId: "1095764227428",
  appId: "1:1095764227428:web:221bd773a83340321e3671"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const auth = getAuth(app);

perezagruzka();


function perezagruzka() {
    const auth = getAuth(app);
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    userId = uid;
    glavnaPage.style.display = "block";
    searchForm.style.display = "none";
  } else {
    console.log("Ошибка");
  }
});
}








// Функция которая создает и колекцию и документ в ней.
// const film = {
//     name: "Maloy",
//     state: "CA",
//     country: "USAA",
// }

// setDoc(doc(db, "films", "Maloy"), film);

// Функция чтобы записать объект в колекцию фильмов + Cloud Firestore автоматически сгенерировать идентификатор для вас
// addDoc(collection(db, "prosmotr"), {
//     first: "Alan",
//     middle: "Mathison",
//     last: "Turing",
//     born: 1912
//   });


// Асинхронная функциия для чтения (доступа) к колекции фильмов
// async function proba() {
//     const querySnapshot = await getDocs(collection(db, "films"));
//     querySnapshot.forEach((doc) => {
//     console.log(`Ключ к документу в колекции: ${doc.id}`, doc.data());
// });
// }

async function proba() {
    const querySnapshot = await getDocs(collection(db, "films"));
    querySnapshot.forEach((doc) => {
        if (userId === doc.data().owner) {
            console.log(`Ключ к документу в колекции: ${doc.id}`, doc.data());
        }
});
}

// proba();

let userId = "";

const searchForm = document.querySelector('.search-form');
const vhodBtn = document.querySelector('.voiti');
const registrBtn = document.querySelector('.registr');
const inputEmail = document.querySelector('.inputEmail');
const inputPassword = document.querySelector('.inputPassword');
const vihodBtn = document.querySelector('.vihod');
const glavnaPage = document.querySelector('.glavna');

const chitkaBtn = document.querySelector('.chitka');
const dobavitBtn = document.querySelector('.dobavit');


chitkaBtn.addEventListener('click', proba);
dobavitBtn.addEventListener('click', onDobavit);

function onDobavit() {
    addDoc(collection(db, "films"), {
    first: "Alan",
    middle: "Mathison",
    last: "Turing",
    born: 1912,
    owner: `${userId}`,
  });
}



glavnaPage.style.display = "none";


registrBtn.addEventListener('click', onRegistr);
vhodBtn.addEventListener('click', onVhod);
vihodBtn.addEventListener('click', onVifod);

async function onRegistr() {
    let email = inputEmail.value;
    let password = inputPassword.value;

    if (email === "" && password === "") {
        Notiflix.Notify.failure('Введите Email и Password!');
    } else if (email !== "" && password === "") {
        Notiflix.Notify.failure('Введите Password!');
    } else if (email === "" && password !== "") {
        Notiflix.Notify.failure('Введите Email!');
    }
    
    const auth = getAuth(app);
    await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
            console.log(user);
            userId = user.uid;
            glavnaPage.style.display = "block";
            searchForm.style.display = "none";
            Notiflix.Notify.success('Регистрация прошла успешно! Добро пожаловать на сайт');
            searchForm.reset();
        }
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        if (errorCode === 'auth/email-already-in-use') {
            Notiflix.Notify.warning('Пользователь уже зарегестрирован, войдите на сайт!');
        }
    });
}


async function onVhod() {
    let email = inputEmail.value;
    let password = inputPassword.value;

    if (email === "" && password === "") {
        Notiflix.Notify.failure('Введите Email и Password!');
    } else if (email !== "" && password === "") {
        Notiflix.Notify.failure('Введите Password!');
    } else if (email === "" && password !== "") {
        Notiflix.Notify.failure('Введите Email!');
    }
    
    const auth = getAuth(app);
    await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
            console.log(user);
            userId = user.uid;
            glavnaPage.style.display = "block";
            searchForm.style.display = "none";
            Notiflix.Notify.info('Добро пожаловать на сайт');
            searchForm.reset();
        }
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        if (errorCode === 'auth/user-not-found') {
            Notiflix.Notify.failure('Пользователь не найден, загерестрируйтесь или проверьте Email!');
        } else if (errorCode === 'auth/wrong-password') {
            Notiflix.Notify.failure('Неверный пароль, попробуйте ещё раз');
        }
    });
}

function onVifod() {
    const auth = getAuth(app);
    signOut(auth).then(() => {
        glavnaPage.style.display = "none";
        searchForm.style.display = "flex";
    }).catch((error) => {
        console.log(error);
    });
}


// ______________________________________________________________________





// import { initializeApp } from "firebase/app";
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// import { getAuth } from "firebase/auth";


// const firebaseConfig = {
//   apiKey: "AIzaSyD606fLTGqofK4cSdWdTzIn8ZRRAFlLyLU",
//   authDomain: "testfilmotekaautorization.firebaseapp.com",
//   databaseURL: "https://testfilmotekaautorization-default-rtdb.firebaseio.com",
//   projectId: "testfilmotekaautorization",
//   storageBucket: "testfilmotekaautorization.appspot.com",
//   messagingSenderId: "1095764227428",
//   appId: "1:1095764227428:web:221bd773a83340321e3671"
// };


// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);


// // const db = getFirestore(app);

// // Get a list of cities from your database Получить список городов из вашей базы данных
// // async function getCities(db) {
// //   const citiesCol = collection(db, 'cities');
// //   const citySnapshot = await getDocs(citiesCol);
// //   const cityList = citySnapshot.docs.map(doc => doc.data());
// //   return cityList;
// // }


// const searchForm = document.querySelector('.search-form');
// const vhodBtn = document.querySelector('.voiti');
// const registrBtn = document.querySelector('.registr');
// const inputEmail = document.querySelector('.inputEmail');
// const inputPassword = document.querySelector('.inputPassword');
// const vihodBtn = document.querySelector('.vihod');
// const glavnaPage = document.querySelector('.glavna');