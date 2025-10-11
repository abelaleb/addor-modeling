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
  disabled?: boolean; // Added disabled prop
};

const DropzoneField: React.FC<{
  value: FileWithPreview | null;
  onChange: (file: FileWithPreview | null) => void;
  fallbackSrc: string;
  disabled?: boolean; // Added disabled prop
}> = ({ value, onChange, fallbackSrc, disabled }) => {
  // Handle file drop
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (disabled) return; // Prevent upload when disabled
      
      const fileWithPreview: FileWithPreview[] = acceptedFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      );
      onChange(fileWithPreview[0]);
    },
    [onChange, disabled]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
    disabled, // Pass disabled to dropzone
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
      className={`border-2 rounded-lg p-2 text-center transition-all ${
        disabled 
          ? 'cursor-not-allowed opacity-50 border-gray-300' 
          : isDragActive 
            ? 'cursor-pointer border-blue-500 bg-blue-50' 
            : 'cursor-pointer border-gray-300 hover:border-gray-400'
      }`}
    >
      <input {...getInputProps()} disabled={disabled} />
      {value?.preview ? (
        <div className="relative">
          <Image
            src={value.preview}
            alt="Preview"
            className="w-full h-72 object-cover rounded-md"
            width={1000}
            height={1000}
          />
          {!disabled && (
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-all rounded-md">
              <p className="text-white text-sm font-medium">Click to change</p>
            </div>
          )}
        </div>
      ) : (
        <div className="relative">
          <Image
            src={fallbackSrc}
            alt="Example pose"
            className="w-full h-72 object-cover rounded-md"
            width={1000}
            height={1000}
          />
          {!disabled && (
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center rounded-md">
              <p className="text-white text-sm font-medium">
                {isDragActive ? 'Drop image here' : 'Click or drag to upload'}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  fieldName, 
  control, 
  src, 
  disabled 
}) => {
  return (
    <Controller
      control={control}
      name={fieldName}
      render={({ field: { onChange, value } }) => (
        <DropzoneField
          value={value as FileWithPreview | null}
          onChange={onChange}
          fallbackSrc={src}
          disabled={disabled}
        />
      )}
    />
  );
};

export default ImageUpload;
