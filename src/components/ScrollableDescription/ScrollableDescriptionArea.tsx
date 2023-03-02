import * as ScrollArea from "@radix-ui/react-scroll-area";

type Props = {
  children?: React.ReactNode;
};

export const ScrollableDescriptionArea = ({ children }: Props) => {
  return (
    <ScrollArea.Root className="max-h-[6rem] overflow-hidden rounded bg-white text-xs">
      <ScrollArea.Viewport className="h-full w-full rounded">
        <div className="pr-4 text-[0.7rem]  leading-5 text-normalTEXT">
          {children}
        </div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        className="flex touch-none select-none bg-white p-0.5 transition-colors duration-[160ms] ease-out hover:bg-white data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
        orientation="vertical"
      >
        <ScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-titleTEXT/30 before:absolute before:top-1/2 before:left-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-[''] hover:bg-titleTEXT/80" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Scrollbar
        className="flex touch-none select-none bg-white p-0.5 transition-colors duration-[160ms] ease-out hover:bg-white data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
        orientation="horizontal"
      >
        <ScrollArea.Thumb className="bg-mauve10 relative flex-1 rounded-[10px] before:absolute before:top-1/2 before:left-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner className="bg-blackA8" />
    </ScrollArea.Root>
  );
};
