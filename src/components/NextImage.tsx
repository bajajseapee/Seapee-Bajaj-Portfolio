import React from 'react';

export interface NextImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string | { src: string };
  alt: string;
  width?: number | string;
  height?: number | string;
  priority?: boolean;
  quality?: number;
}

export default function Image({
  src,
  alt,
  width = 80,
  height = 80,
  priority = false,
  loading,
  decoding = 'async',
  ...rest
}: NextImageProps) {
  const resolvedSrc = typeof src === 'string' ? src : src.src;
  return (
    <img
      src={resolvedSrc}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : loading ?? 'lazy'}
      decoding={decoding}
      {...rest}
    />
  );
}
