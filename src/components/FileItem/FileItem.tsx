import { ref, deleteObject } from "firebase/storage";
import { storage } from '../../firebase';
import './fileItem.scss'
import { useDispatch } from "react-redux";
import { deleteItem } from "../FileList/fileItemSlice";

export const FileItem = ({ name, url }: any) => {

	// Create a reference to the file to delete
	const fileRef = ref(storage, `images/${name}`);

	const dispatch = useDispatch()

	const deleteFile = () => {
		// // Delete the file
		// deleteObject(fileRef).then(() => {
		// 	alert('File deleted')
		// 	setImageList((prev: Array<object>) => [...prev])
		// 	// File deleted successfully
		// }).catch((error) => {
		// 	alert(error)
		// 	// Uh-oh, an error occurred!
		// });

	}


	return (
		<div className="fileItem_wrapper">
			<div className="fileItem_info">
				<div className="fileItem_info-title">
					{name}
				</div>
				<div className="fileItem_info-menu">
					<button onClick={() => dispatch(deleteItem(name))}>del</button>
				</div>
			</div>
			<div className="fileItem_img">
				<img className='img' alt='img' src={url} />
			</div>
		</div>
	)
}