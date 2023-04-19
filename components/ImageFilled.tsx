import Image from 'next/image';

type ImageFilledProps = {
  containerClass: string;
  imageClass: string;
  src: string;
  alt: string;
};

export default function ImageFilled({
  containerClass,
  imageClass,
  src,
  alt,
}: ImageFilledProps) {
  return (
    <div className={`${containerClass}`}>
      <Image className={`${imageClass}`} alt={`${alt}`} src={`${src}`} fill />
    </div>
  );
}
