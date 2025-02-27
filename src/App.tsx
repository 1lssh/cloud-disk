import { useEffect, useState } from 'react';
import './App.css';
import { storage } from './firebase';
import { getDownloadURL, getMetadata, listAll, ref, uploadBytesResumable } from 'firebase/storage';
import { Sidebar } from './components/Sidebar';
import { FileList } from './components/FileList/FileList';
import { Header } from './components/Header';
import { Downloads } from './components/Downloads';

function App() {
	const [fileUpload, setFileUpload] = useState<File | null>(null);
	const [imageList, setImageList] = useState<Array<object>>([]);
	const [isFileLoading, setIsFileLoading] = useState<boolean>(false)
	const [uploadProgress, setUploadProgress] = useState<number>(0);

	const onFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		if (!e.target.files) return;
		setFileUpload(e.target.files[0])
	}


	const imageListRef = ref(storage, 'images/');

	const uploadFile = () => {
		if (fileUpload == null) return;

		const imageRef = ref(storage, `images/${fileUpload.name}`);

		const uploadTask = uploadBytesResumable(imageRef, fileUpload)

		uploadTask.on('state_changed', (snapshot) => {
			let data = snapshot.metadata
			console.log(data)
			const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			setUploadProgress(progress)
			setIsFileLoading(true)

			if (progress === 100) {
				console.log(snapshot)
				getDownloadURL(snapshot.ref).then((url) => {
					let obj = {
						url: url,
						name: data.name,
						date: data.timeCreated
					}
					setImageList((prev: Array<object>) => [...prev, obj])
				})
				setIsFileLoading(false)
			}
		})
	};

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
						setImageList((prev: Array<object>) => [...prev, obj])
					})
			})
		})
	}, [])

	return (
		<div className='container'>
			<Header />
			<div className="main">
				<Sidebar />
				<FileList imageList={imageList} setImageList={setImageList} />
				<div className="info">
					<input type="file" onChange={onFileChange} />
					<button onClick={uploadFile} >Upload</button>
					{fileUpload && <Downloads
						uploadProgress={uploadProgress}
						fileName={fileUpload!.name}
						isFileLoading={isFileLoading}
					/>}
				</div>
			</div>
		</div>
	);
}

export default App;
