import React from 'react';
import Image from 'next/image';

interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({ size = 32, className }: LogoProps) {
  return (
    <div className="flex items-center gap-2" data-ai-hint="logo company">
      <Image
        src="/logo.png" // Ensure your new logo image is saved as 'logo.png' in the 'public' directory
        alt="Muscat Bay Assets & Operation Logo"
        width={size}
        height={size}
        className={className || "rounded-sm"} // Added rounded-sm for better image appearance
        priority // Preload logo image
        data-ai-hint="company logo brand"
      />
      <span className="font-headline text-xl font-semibold text-primary group-data-[collapsible=icon]/sidebar:hidden">
        Muscat Bay - Assets &amp; Operation
      </span>
    </div>
  );
}
