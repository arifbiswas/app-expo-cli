import React from "react";
import { useUploadNewfileMutation } from "@/src/redux/apiSlices/mediaSlices";

interface FileUploadProgress {
  fileName: string;
  progress: number;
  status: "existing" | "uploading" | "completed" | "failed";
  error?: string;
}

export const useUploadProgress = () => {
  const [uploadFile] = useUploadNewfileMutation();
  const [uploadProgress, setUploadProgress] = React.useState<
    FileUploadProgress[]
  >([]);
  const [isUploading, setIsUploading] = React.useState(false);

  const uploadFilesWithProgress = async (files: any[]) => {
    setIsUploading(true);

    const existingIds: string[] = [];
    const localFiles: any[] = [];

    // ✅ Separate backend + local files
    files.forEach((file) => {
      if (file?._id && !file.mimeType) {
        existingIds.push(file._id);
      } else if (file?.mimeType) {
        localFiles.push(file);
      }
    });

    // ✅ Initialize state only once
    setUploadProgress(
      files.map((file) => ({
        fileName: file.name || file.url?.split("/")?.pop() || "backend_file",
        progress: file._id ? 100 : 0,
        status: file._id ? "existing" : "uploading",
      }))
    );

    const uploadedLocalIds: string[] = [];
    const errors: string[] = [];

    // ✅ Upload local files sequentially with stable updates
    for (let i = 0; i < localFiles.length; i++) {
      const file = localFiles[i];

      const matchIndex = files.findIndex(
        (f) => f.uri === file.uri || f.url === file.url
      );

      try {
        // ✅ Reliable progress update
        setUploadProgress((prev) => {
          const updated = [...prev];
          updated[matchIndex] = {
            ...updated[matchIndex],
            progress: 30,
            status: "uploading",
          };
          return updated;
        });

        const formData = new FormData();
        formData.append("audio", {
          uri: file.uri,
          name: file.name,
          type: file.mimeType,
        } as any);

        const uploadedMedia = await uploadFile(formData).unwrap();

        setUploadProgress((prev) => {
          const updated = [...prev];
          updated[matchIndex] = {
            ...updated[matchIndex],
            progress: 100,
            status: "completed",
          };
          return updated;
        });

        if (uploadedMedia?.data) {
          const ids = uploadedMedia.data.map((item: any) => item._id);
          uploadedLocalIds.push(...ids);
        }
      } catch (err: any) {
        setUploadProgress((prev) => {
          const updated = [...prev];
          updated[matchIndex] = {
            ...updated[matchIndex],
            progress: 0,
            status: "failed",
            error: err?.data?.message || "Upload failed",
          };
          return updated;
        });

        errors.push(err?.data?.message || "Upload failed");
      }
    }

    setIsUploading(false);

    return {
      success: errors.length === 0,
      audioIds: [...existingIds, ...uploadedLocalIds],
      errors: errors.length > 0 ? errors : undefined,
    };
  };

  const totalProgress =
    uploadProgress.length > 0
      ? Math.round(
          uploadProgress.reduce((sum, f) => sum + f.progress, 0) /
            uploadProgress.length
        )
      : 0;

  return {
    uploadFilesWithProgress,
    uploadProgress,
    totalProgress,
    isUploading,
  };
};
