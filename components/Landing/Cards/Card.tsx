type Props = {
  title: string;
  description: string;
};

function Card({ title, description }: Props) {
  return (
    <div className='flex justify-center space-y-3  flex-col  hover:cursor-grab active:cursor-grabbing text-center bg-white dark:bg-dark-mainActive rounded-2xl drop-shadow-xl dark:drop-shadow-[0_20px_13px_rgba(0,0,0,0.25)]  max-w-xs h-auto w-auto  aspect-[2/1.5]   px-5   mb-4'>
      <p className=' text-dark-mainHover text-2xl font-bold uppercase  dark:text-light-main'>
        {title}
      </p>

      <p className='text-lg font-medium dark:text-neutral-300 text-neutral-500'>
        {description}
      </p>
    </div>
  );
}

export default Card;
