import { useState } from "react"
import DownloadItem from "./DownloadItem/DownloadItem"

export const Downloads = ({ uploadProgress, fileName, isFileLoading }: any) => {
  const [isDownloadsActive, setIsDownloadsActive] = useState<boolean>(false)

  return (
    <div className="downloads">
      <div className={`downloads_wrapper ${isDownloadsActive && 'downloads_wrapper-active'}`}>
        <div className="downloads_button" onClick={() => setIsDownloadsActive(!isDownloadsActive)}>
          Загрузки
        </div>
        <DownloadItem uploadProgress={uploadProgress} fileName={fileName} isFileLoading={isFileLoading} />
      </div>
    </div>
  )
}


