import { useEffect, useState } from 'react';
import './App.css';
import { storage } from './firebase';
import { getDownloadURL, getMetadata, listAll, ref, uploadBytesResumable } from 'firebase/storage';
import { Sidebar } from './components/Sidebar';
import { FileList } from './components/FileList/FileList';
import { Header } from './components/Header';
import { Downloads } from './components/Downloads';
import { useDispatch, useSelector } from 'react-redux';
import { getListItem } from './components/FileList/fileItemSlice';

function App() {

	const [imageList, setImageList] = useState<Array<object>>([]);

	const imageListRef = ref(storage, 'images/');

	const dispatch = useDispatch()

	useEffect(() => {
		listAll(imageListRef).then((response) => {
			response.items.forEach((item) => {
				Promise.all([getMetadata(item), getDownloadURL(item)])
					.then(([metadataRes, urlRes]) => {
						let obj = {
							url: urlRes,
							name: metadataRes.name,
							date: metadataRes.timeCreated
						}
						dispatch(getListItem(obj))
						//setImageList((prev: Array<object>) => [...prev, obj])
					})
			})
		})
	}, [])

	return (
		<div className='container'>
			<Header />
			<div className="main">
				<Sidebar
					setImageList
				/>
				<FileList setImageList={setImageList} />
				<div className="info">
					info
				</div>
			</div>
		</div>
	);
}

export default App;
