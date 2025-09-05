import Image from "next/image";
import React, { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Control, Controller } from "react-hook-form";

// Extend File type to include preview
type FileWithPreview = File & { preview?: string };

type ImageUploadProps = {
  fieldName: string;
  control: Control<any>;
  src: string; // fallback image src
};

const DropzoneField: React.FC<{
  value: FileWithPreview | null;
  onChange: (file: FileWithPreview | null) => void;
  fallbackSrc: string;
}> = ({ value, onChange, fallbackSrc }) => {
  // Handle file drop
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const fileWithPreview: FileWithPreview[] = acceptedFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      );
      onChange(fileWithPreview[0]);
    },
    [onChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  // Cleanup object URL when component unmounts or value changes
  useEffect(() => {
    return () => {
      if (value?.preview) {
        URL.revokeObjectURL(value.preview);
      }
    };
  }, [value]);

  return (
    <div
      {...getRootProps()}
      className="cursor-pointer border-2 rounded-lg p-2 text-center hover:border-gray-400"
    >
      <input {...getInputProps()} />
      {value?.preview ? (
        <Image
          src={value.preview}
          alt="Preview"
          className="w-full h-72 object-cover rounded-md"
          width={1000}
          height={1000}
        />
      ) : (
        <Image
          src={fallbackSrc}
          alt="Example pose"
          className="w-full h-72 object-cover rounded-md"
          width={1000}
          height={1000}
        />
      )}
    </div>
  );
};

const ImageUpload: React.FC<ImageUploadProps> = ({ fieldName, control, src }) => {
  return (
    <Controller
      control={control}
      name={fieldName}
      render={({ field: { onChange, value } }) => (
        <DropzoneField
          value={value as FileWithPreview | null}
          onChange={onChange}
          fallbackSrc={src}
        />
      )}
    />
  );
};

export default ImageUpload;
