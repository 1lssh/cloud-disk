import { ProgressBar } from "../ProgressBar";

export default function DownloadItem({ uploadProgress, fileName, isFileLoading }: any) {


  return (
    <div className="download_item">
      <div className="download_item-info">
        {fileName}
      </div>
      <div className="download_item-progress">

        {isFileLoading && <ProgressBar value={uploadProgress} />}
      </div>
      <div>{uploadProgress.toFixed()}%</div>
    </div>
  )
}
