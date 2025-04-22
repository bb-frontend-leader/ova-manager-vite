import confetti from 'canvas-confetti';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';

import ovaService from '@/services/ova-service';
import type { Ova } from '@/types/ova';

import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';

interface Props {
  ova?: Ova;
}

export const OvaCard: React.FC<Props> = ({ ova }) => {
  const mutation = useMutation({
    mutationFn: (id: string) => ovaService.fetchOvaZip(id),
    onSuccess: (zip) => {
      if (!zip.data) return;

      toast.success('OVA zip created successfully 📁', {
        duration: 5000,
        description: 'Your zip file is ready for download.'
      });

      throwConfetti();
      handleDownload(zip.data);
    },
    onMutate: () => {
      toast.info('Started OVA zip creation 📁', {
        duration: 5000,
        description: 'Please wait while we create the zip file.'
      });
    },
    onError: () => {
      toast.error('Failed to create OVA zip 📁', {
        duration: 5000,
        description: 'Please try again later.'
      });
    }
  });

  // Function to navigate to the OVA's URL in a new tab
  const handleNavigateToTheOva = () => {
    if (!ova) return;
    window.open(ova.ovaPath, '_blank');
  };

  // Function to trigger the download of a file from a given URL
  const handleDownload = (url: string) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = `${ova?.title}.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Function to handle the creation and download of the OVA zip file
  const handleZip = async () => {
    if (!ova) return;
    mutation.mutate(ova.id);
  };

  // Function to trigger a confetti animation for 2 seconds
  const throwConfetti = () => {
    const timeEnd = Date.now() + 2 * 1000; // Set the end time for the animation (2 seconds from now)
    const colors = ['#FF0D72', '#0ABDE3', '#F9C80E', '#FF477E', '#F9C80E']; // Define the colors for the confetti

    // Recursive function to create confetti bursts
    (function frame() {
      // Create confetti burst from the left side
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });

      // Create confetti burst from the right side
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      // Continue the animation until the time ends
      if (Date.now() < timeEnd) {
        requestAnimationFrame(frame);
      }
    })();
  };

  return (
    <Card className="bg-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold capitalize">{ova?.title || 'Ova'}</h2>
          <Badge variant="neutral" className="text-sm font-light capitalize">
            {ova?.group || 'Group-2'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <img src={ova?.imagePath} alt={ova?.title} className="w-full h-48 border-border border-2 object-cover" />
      </CardContent>
      <CardFooter className="flex flex-between items-center gap-2.5">
        <Button variant="neutral" onClick={handleNavigateToTheOva}>
          Go to the OVA
        </Button>
        <Button onClick={handleZip} disabled={mutation.isPending}>
          {mutation.isPending ? (
            <span className="flex items-center justify-center">
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="#121212"
                />
              </svg>
            </span>
          ) : (
            'Download'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
