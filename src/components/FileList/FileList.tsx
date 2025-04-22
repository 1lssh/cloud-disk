import { useSelector } from "react-redux"
import { FileItem } from "../FileItem/FileItem"
import "./fileList.scss"

export const FileList = ({ setImageList }: any) => {

	const fileList = useSelector((state: any) => state.fileList.list)

	return (
		<div className="fileList">
			<div className='fileList_grid'>
				{
					fileList.map((item: any) => {
						return (
							<div className='fileItem' key={item.url}>
								<FileItem name={item.name} url={item.url} setImageList={setImageList} />
							</div>

						)
					})
				}
			</div>
		</div>
	)
}