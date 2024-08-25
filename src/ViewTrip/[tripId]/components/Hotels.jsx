import HotelCard from "./HotelCard";

function Hotels({ trip }) {
  return (
    <div className="mt-20">
      <h1 className="my-10 text-xl font-bold">
        Hotel Recommendations 🏨
        <span className="text-base font-normal text-gray-500">
          <br />
          (Click on each card for location)
        </span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-10 sm:gap-8">
        {trip?.tripInfo?.HotelOptions?.map((hotel, index) => (
          <HotelCard hotel={hotel} key={index} />
        ))}
      </div>
    </div>
  );
}

export default Hotels;
