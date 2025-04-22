import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Downloads } from "./Downloads"
import { useState } from "react";
import { storage } from "../firebase";

export const Sidebar = ({ setImageList }: any) => {
	const [fileUpload, setFileUpload] = useState<File | null>(null);
	const [isFileLoading, setIsFileLoading] = useState<boolean>(false)
	const [uploadProgress, setUploadProgress] = useState<number>(0);

	const onFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		if (!e.target.files) return;
		setFileUpload(e.target.files[0])
	}

	const uploadFile = () => {
		if (fileUpload == null) return;

		const imageRef = ref(storage, `images/${fileUpload.name}`);

		const uploadTask = uploadBytesResumable(imageRef, fileUpload)

		uploadTask.on('state_changed', (snapshot) => {
			let data = snapshot.metadata
			//console.log(data)
			const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			setUploadProgress(progress)
			setIsFileLoading(true)

			if (progress === 100) {
				console.log(snapshot.ref)
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

	return (
		<div className="sidebar">
			<input type="file" onChange={onFileChange} />
			<button onClick={uploadFile} >Upload</button>
			{uploadProgress && <Downloads
				uploadProgress={uploadProgress}
				fileName={fileUpload!.name}
				isFileLoading={isFileLoading}
			/>}
		</div>
	)
}