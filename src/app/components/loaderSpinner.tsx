import { ThreeCircles } from "react-loader-spinner";

export default function LoaderSpinner() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <ThreeCircles
        height="100"
        width="100"
        color="#ffe600"
        ariaLabel="loading"
      />
    </div>
  );
}
