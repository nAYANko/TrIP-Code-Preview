
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Share2, Download, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { generateTripPNG, downloadPNG } from "@/utils/pngGenerator";

interface ShareTripProps {
  trip: any;
  activities: any[];
}

const ShareTrip = ({ trip, activities }: ShareTripProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [shareUrl, setShareUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const handleGeneratePreview = async () => {
    setIsGenerating(true);
    try {
      const pngDataUrl = await generateTripPNG({ trip, activities });
      setPreviewImage(pngDataUrl);
      
      // Generate shareable URL (in a real app, this would be a proper sharing endpoint)
      const currentUrl = window.location.href;
      setShareUrl(currentUrl);
      
      toast.success("Preview generated successfully!");
    } catch (error) {
      console.error('Error generating preview:', error);
      toast.error("Failed to generate preview");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadPNG = () => {
    if (previewImage) {
      const filename = `${trip.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_itinerary.png`;
      downloadPNG(previewImage, filename);
      toast.success("PNG downloaded successfully!");
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success("Link copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={handleGeneratePreview}
        >
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Share Your Trip</DialogTitle>
          <DialogDescription>
            Share your itinerary with friends or download it as an image.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Preview Section */}
          <div>
            <h4 className="font-medium mb-3">Preview</h4>
            {isGenerating ? (
              <div className="flex items-center justify-center h-48 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-travel-600 mx-auto mb-2"></div>
                  <p className="text-sm text-gray-600">Generating preview...</p>
                </div>
              </div>
            ) : previewImage ? (
              <div className="border rounded-lg overflow-hidden">
                <img 
                  src={previewImage} 
                  alt="Trip Itinerary Preview" 
                  className="w-full h-auto max-h-96 object-contain"
                  style={{ backgroundColor: '#ffffff' }}
                />
              </div>
            ) : (
              <div className="flex items-center justify-center h-48 bg-gray-50 rounded-lg">
                <p className="text-gray-500">Preview will appear here</p>
              </div>
            )}
          </div>

          {/* Actions */}
          {previewImage && (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-3">Share Options</h4>
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <input 
                    type="text" 
                    value={shareUrl} 
                    readOnly 
                    className="flex-1 bg-transparent text-sm text-gray-600 outline-none"
                  />
                  <Button 
                    onClick={handleCopyLink} 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3 w-3" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Download</h4>
                <Button 
                  onClick={handleDownloadPNG} 
                  className="travel-button flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download PNG
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareTrip;
