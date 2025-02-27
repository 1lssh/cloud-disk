import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
	apiKey: "AIzaSyBpfNsaCVOhtl_AB9EWyoW89RtpHe-UZzw",
	authDomain: "cloud-disk-970e9.firebaseapp.com",
	projectId: "cloud-disk-970e9",
	storageBucket: "cloud-disk-970e9.appspot.com",
	messagingSenderId: "294819244819",
	appId: "1:294819244819:web:2cfa4fa834c6b6f2aac8e6",
	measurementId: "G-1TBRT6FJV2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)