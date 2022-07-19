import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import Notiflix from 'notiflix';

const firebaseConfig = {
  apiKey: "AIzaSyD606fLTGqofK4cSdWdTzIn8ZRRAFlLyLU",
  authDomain: "testfilmotekaautorization.firebaseapp.com",
  projectId: "testfilmotekaautorization",
  storageBucket: "testfilmotekaautorization.appspot.com",
  messagingSenderId: "1095764227428",
  appId: "1:1095764227428:web:221bd773a83340321e3671"
};

const app = initializeApp(firebaseConfig);


const searchForm = document.querySelector('.search-form');
const vhodBtn = document.querySelector('.voiti');
const registrBtn = document.querySelector('.registr');
const inputEmail = document.querySelector('.inputEmail');
const inputPassword = document.querySelector('.inputPassword');
const vihodBtn = document.querySelector('.vihod');
const glavnaPage = document.querySelector('.glavna');

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