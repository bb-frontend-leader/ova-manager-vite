import { ServerCrash } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Alert, AlertDescription, AlertTitle, Footer, Header, Toaster } from "@ui";

import { OvaView, OvaViewSkeleton } from "@/components/app";
import ovaService from "@/services/ova-service";

function App() {
  const ovas = useQuery({
    queryKey: ["ovas"],
    queryFn: () => ovaService.fetchOvas(),
    refetchOnWindowFocus: false,
    retry: false,
  });

  const groups = useQuery({
    queryKey: ["groups"],
    queryFn: () => ovaService.fetchOvaGroups(),
    refetchOnWindowFocus: false,
    retry: false,
  });

  return (
    <div className="relative min-h-screen w-full bg-bg grid grid-rows-[auto_1fr_auto] gap-3.5">
      <Header />
      <main className="container mx-auto h-full w-[min(100%-1rem,150ch)]">
        <section className="w-full h-full grid grid-rows-[auto_1fr] gap-2.5">
          {ovas.isError && (
            <div className="container-border h-fit px-10 py-8 not-prose z-[15] relative bg-[radial-gradient(#80808080_1px,transparent_1px)] shadow-light dark:shadow-dark [background-size:16px_16px]">
              <Alert>
                <ServerCrash className="h-6 w-6 inline-flex justify-center items-center" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{ovas.data?.message}</AlertDescription>
              </Alert>
            </div>
          )}

          {groups.isError && (
            <div className="container-border h-fit px-10 py-8 not-prose z-[15] relative bg-[radial-gradient(#80808080_1px,transparent_1px)] shadow-light dark:shadow-dark [background-size:16px_16px]">
              <Alert>
                <ServerCrash className="h-6 w-6 inline-flex justify-center items-center" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{groups.data?.message}</AlertDescription>
              </Alert>
            </div>
          )}

          {(ovas.isLoading || groups.isLoading) && <OvaViewSkeleton />}

          {ovas.isSuccess && groups.isSuccess && (
            <OvaView data={ovas.data.data} groups={groups.data.data} />
          )}
        </section>
      </main>
      <Toaster />
      <Footer />
    </div>
  );
}

export default App;
