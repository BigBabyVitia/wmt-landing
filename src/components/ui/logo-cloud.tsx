import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { cn } from "@/lib/utils";

type Logo = {
  name: string;
  src?: string;
  invert?: boolean;
};

type LogoCloudProps = React.ComponentProps<"div"> & {
  logos: Logo[];
};

export function LogoCloud({ className, logos, ...props }: LogoCloudProps) {
  return (
    <div
      {...props}
      className={cn(
        "overflow-hidden py-8 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className
      )}
    >
      <InfiniteSlider gap={48} duration={30} durationOnHover={60}>
        {logos.map((logo) => (
          <div
            key={logo.name}
            className="flex items-center shrink-0 select-none"
          >
            {logo.src ? (
              <img
                src={logo.src}
                alt={logo.name}
                className={cn(
                  "h-9 max-w-[180px] object-contain pointer-events-none transition-[filter] duration-300",
                  "brightness-0 dark:invert opacity-80 hover:opacity-100"
                )}
                loading="lazy"
              />
            ) : (
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                {logo.name}
              </span>
            )}
          </div>
        ))}
      </InfiniteSlider>
    </div>
  );
}
