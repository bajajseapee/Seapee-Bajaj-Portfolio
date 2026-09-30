import React from 'react';

export interface NextImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string | { src: string };
  webpSrc?: string;
  webpSrcSet?: string;
  pictureClassName?: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  priority?: boolean;
  quality?: number;
}

export default function Image({
  src,
  webpSrc,
  webpSrcSet,
  pictureClassName = 'contents',
  alt,
  width = 80,
  height = 80,
  priority = false,
  loading,
  fetchPriority,
  decoding = 'async',
  srcSet,
  sizes,
  ...rest
}: NextImageProps) {
  const resolvedSrc = typeof src === 'string' ? src : src.src;
  const numericWidth = typeof width === 'number' ? width : parseInt(String(width), 10) || 80;
  const resolvedSizes = sizes || `${numericWidth}px`;

  if (webpSrc || webpSrcSet) {
    const computedWebpSrcSet =
      webpSrcSet || `${webpSrc} ${numericWidth}w, ${webpSrc} ${numericWidth * 2}w`;
    const computedFallbackSrcSet =
      srcSet || `${resolvedSrc} ${numericWidth}w, ${resolvedSrc} ${numericWidth * 2}w`;

    return (
      <picture className={pictureClassName}>
        <source
          type="image/webp"
          srcSet={computedWebpSrcSet}
          sizes={resolvedSizes}
        />
        <img
          src={resolvedSrc}
          srcSet={computedFallbackSrcSet}
          sizes={resolvedSizes}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : loading ?? 'lazy'}
          fetchPriority={priority ? 'high' : fetchPriority}
          decoding={decoding}
          {...rest}
        />
      </picture>
    );
  }

  return (
    <img
      src={resolvedSrc}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : loading ?? 'lazy'}
      fetchPriority={priority ? 'high' : fetchPriority}
      decoding={decoding}
      {...rest}
    />
  );
}
