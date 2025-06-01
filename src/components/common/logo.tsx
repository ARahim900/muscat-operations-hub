import React from 'react';

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export default function Logo({ size = 32, className, ...props }: LogoProps) {
  return (
    <div className="flex items-center gap-2" data-ai-hint="logo company">
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        className={className || "text-primary"}
        {...props}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M50 0C22.3858 0 0 22.3858 0 50C0 77.6142 22.3858 100 50 100C77.6142 100 100 77.6142 100 50C100 22.3858 77.6142 0 50 0ZM50 10C27.9086 10 10 27.9086 10 50C10 72.0914 27.9086 90 50 90C72.0914 90 90 72.0914 90 50C90 27.9086 72.0914 10 50 10ZM50 20C33.4315 20 20 33.4315 20 50C20 66.5685 33.4315 80 50 80C66.5685 80 80 66.5685 80 50C80 33.4315 66.5685 20 50 20ZM50 30C38.9543 30 30 38.9543 30 50C30 61.0457 38.9543 70 50 70C61.0457 70 70 61.0457 70 50C70 38.9543 61.0457 30 50 30Z"
          fill="currentColor"
        />
      </svg>
      <span className="font-headline text-xl font-semibold text-primary group-data-[collapsible=icon]/sidebar:hidden">
        Muscat Hub
      </span>
    </div>
  );
}
