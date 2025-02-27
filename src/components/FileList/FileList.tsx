import { FileItem } from "../FileItem/FileItem"

export const FileList = ({ imageList, setImageList }: any) => {
	return (
		<div className="fileList">
			<div className='fileList_grid'>
				{
					imageList.map((item: any) => {
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