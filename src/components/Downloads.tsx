import DownloadItem from "./DownloadItem/DownloadItem"

export const Downloads = ({ uploadProgress, fileName, isFileLoading }: any) => {
  return (
    <div className="downloads_wrapper">
      <DownloadItem uploadProgress={uploadProgress} fileName={fileName} isFileLoading={isFileLoading} />
    </div>
  )
}


