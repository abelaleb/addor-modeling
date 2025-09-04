import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Control, Controller } from "react-hook-form";

type ImageUploadProps = {
  fieldName: string;
  control: Control<any>;
  src: string;
};

const ImageUpload: React.FC<ImageUploadProps> = ({
  fieldName,
  control,
  src,
}) => {
  return (
    <Controller
      control={control}
      name={fieldName}
      render={({ field: { onChange, value } }) => {
        const onDrop = useCallback(
          (acceptedFiles: File[]) => {
            const fileWithPreview = acceptedFiles.map((file) =>
              Object.assign(file, { preview: URL.createObjectURL(file) })
            );
            onChange(fileWithPreview[0]);
          },
          [onChange]
        );

        const { getRootProps, getInputProps } = useDropzone({
          onDrop,
          accept: {
            "image/*": [],
          },
          multiple: false,
        });

        return (
          <div
            {...getRootProps()}
            className="cursor-pointer border-2 p-2 text-center"
          >
            <input {...getInputProps()} />
            {value?.preview ? (
              <img
                src={value.preview}
                alt="Preview"
                className="w-full h-72 object-cover"
              />
            ) : (
              <img
                key={src}
                src={src}
                alt={`Example pose`}
                className="w-full h-72 object-cover"
              />
            )}
          </div>
        );
      }}
    />
  );
};

export default ImageUpload;
