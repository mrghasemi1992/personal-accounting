import { ReactComponent as ArrowIcon } from "../../../assets/icons/common/arrow.svg";

type Props = {};

const Summary = ({}: Props) => {
  return (
    <div className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 p-6 rounded-3xl">
      <div className="text-center text-white text-2xl font-medium">
        Total Balance
      </div>
      <div className="text-center text-white text-5xl mt-4 font-medium">
        $4800
      </div>
      <div className="flex justify-between mt-8">
        <div className="flex items-center gap-x-4">
          <div className="bg-white rounded-full p-1 scale-125 opacity-60">
            <ArrowIcon className="text-green-500" />
          </div>
          <div>
            <p className="text-white">Income</p>
            <p className="text-white">$100,000</p>
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <div className="bg-white rounded-full p-1 scale-125 opacity-60">
            <ArrowIcon className="text-red-500 transform rotate-180" />
          </div>
          <div>
            <p className="text-white">Expenses</p>
            <p className="text-white">$52,000</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
