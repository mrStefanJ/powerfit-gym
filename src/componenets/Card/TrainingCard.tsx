import React from 'react';

interface TrainingCardProps {
  index: number;
  image: string;
  alt: string;
  level: string;
  name: string;
}

const TrainingCard = ({ index, image, alt, name, level }: TrainingCardProps) => {
  return (
    <div
      className={`flex flex-col sm:flex-row items-center justify-between rounded-md border-2 border-yellow-700 p-4 
      max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 
      ${index % 2 === 0 ? 'sm:flex-row-reverse' : ''}`}
    >
      <div>
        <img src={image} alt={alt} className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-cover rounded-md" />
      </div>
      <div className="text-center sm:text-left p-2">
        <h1 className="text-lg sm:text-xl md:text-2xl font-semibold">{name}</h1>
        <p>{level}</p>
      </div>
    </div>
  );
};

export default TrainingCard;
