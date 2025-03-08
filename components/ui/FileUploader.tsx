
'use client'
import { useDropzone } from "react-dropzone";
import { useState } from "react";

 export default function FileUploader() {
  const [files, setFiles] = useState<File[]>([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
    },
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles);
    },
  });

  return (
    <div {...getRootProps()} className="p-4 border-dashed border-2 border-gray-400 rounded-md text-center cursor-pointer">
      <input {...getInputProps()} />
      <p className="text-gray-600">ลากและวางไฟล์ PDF ที่นี่ หรือคลิกเพื่อเลือกไฟล์</p>
      {files.length > 0 && (
        <div className="mt-2">
          <p className="text-green-600">อัปโหลดสำเร็จ: {files[0].name}</p>
        </div>
      )}
    </div>
  );
}
