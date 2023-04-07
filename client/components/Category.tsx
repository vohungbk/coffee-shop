type Props = {
  text: string;
};

const Category = ({ text }: Props) => {
  return (
    <div className="rounded-lg border-[2px] border-solid border-[#FFD28F] py-[10px] px-[17px] font-semibold text-primary">
      <span className="leading-6"> {text}</span>
    </div>
  );
};

export default Category;
