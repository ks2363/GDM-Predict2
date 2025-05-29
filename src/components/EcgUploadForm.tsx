
import { useState, ChangeEvent } from "react";
import { toast } from "sonner";
import { Upload, FileImage, Loader2, AlertCircle } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface EcgUploadFormProps {
  onSubmit: (base64Image: string) => void;
  isLoading: boolean;
}

const EcgUploadForm = ({ onSubmit, isLoading }: EcgUploadFormProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/bmp"];
    if (!allowedTypes.includes(file.type)) {
      setError("Please select a valid image file (JPEG, PNG, or BMP)");
      setSelectedFile(null);
      setPreview(null);
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB");
      setSelectedFile(null);
      setPreview(null);
      return;
    }

    setSelectedFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile || !preview) {
      toast.error("Please select an ECG image to upload");
      return;
    }

    onSubmit(preview);
  };

  return (
    <div className="glass-card p-6 lg:p-8">
      <h2 className="text-2xl font-display font-medium text-gdm-dark-charcoal mb-6">
        ECG Image Upload
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="ecg-file" className="block text-sm font-medium text-gdm-charcoal">
            Upload ECG Image
          </label>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors"
               onClick={() => document.getElementById("ecg-file")?.click()}>
            <Input
              id="ecg-file"
              type="file"
              accept="image/jpeg,image/png,image/bmp"
              className="hidden"
              onChange={handleFileChange}
            />
            
            {preview ? (
              <div className="space-y-4">
                <div className="mx-auto max-w-xs overflow-hidden">
                  <img 
                    src={preview} 
                    alt="ECG Preview" 
                    className="w-full h-auto object-contain"
                  />
                </div>
                <p className="text-sm text-gdm-gray">
                  {selectedFile?.name} ({(selectedFile?.size / 1024).toFixed(2)} KB)
                </p>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFile(null);
                    setPreview(null);
                  }}
                >
                  Change Image
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-6">
                <FileImage className="mb-2 h-10 w-10 text-gdm-blue" />
                <p className="mb-1 text-sm font-medium text-gdm-charcoal">
                  Click to upload ECG image
                </p>
                <p className="text-xs text-gdm-gray">
                  JPEG, PNG, or BMP (max. 10MB)
                </p>
              </div>
            )}
          </div>
          
          {error && (
            <div className="flex items-center gap-2 text-red-500 text-sm mt-2">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}
        </div>
        
        <Button
          type="submit"
          className="w-full bg-gdm-blue hover:bg-gdm-blue/90 text-white font-medium"
          disabled={!selectedFile || isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Analyze ECG Image
            </>
          )}
        </Button>
        
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
          <p className="text-sm text-blue-700">
            <strong>Note:</strong> For optimal results, ensure the ECG image is clear and properly oriented. The image should contain visible waveforms with minimal background noise.
          </p>
        </div>
      </form>
    </div>
  );
};

export default EcgUploadForm;
