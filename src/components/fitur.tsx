import React from 'react';

const Fitur = () => {
    return (
        <div className="py-16 md:py-32 flex flex-col gap-16 md:gap-24">
            {/* Header Section */}
            <div className="flex flex-col items-center text-center px-4">
                <p className="font-montserrat font-medium text-3xl md:text-4xl lg:text-[43.2px] text-black">
                    Features
                </p>
                <p className="font-montserrat font-bold text-4xl md:text-5xl lg:text-[48px] text-black mt-2">
                    What we offer
                </p>
                <p className="font-montserrat font-medium text-lg md:text-xl lg:text-[28.8px] text-black mt-4">
                    We Create Features That Helps You To Hatch Your Egg Faster<br />
                    and Easier, Wherever You Are.
                </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 md:px-12">
                {/* Feature 1 */}
                <div className="p-6 md:p-8 flex flex-col items-center justify-between rounded-lg bg-[#d9d9d9] bg-opacity-20 shadow-md">
                    <img src="/assets/wifi.png" alt="Internet of Things" className="w-16 h-16 md:w-auto md:h-auto" />
                    <p className="font-montserrat font-semibold text-xl md:text-2xl lg:text-[28.8px] text-black text-center mt-4">
                        Internet of Things
                    </p>
                </div>

                {/* Feature 2 */}
                <div className="p-6 md:p-8 flex flex-col items-center justify-between rounded-lg bg-[#d9d9d9] bg-opacity-20 shadow-md">
                    <img src="/assets/realtime.png" alt="Real-Time Dashboard" className="w-16 h-16 md:w-auto md:h-auto" />
                    <p className="font-montserrat font-semibold text-xl md:text-2xl lg:text-[28.8px] text-black text-center mt-4">
                        Real-Time Dashboard
                    </p>
                </div>

                {/* Feature 3 */}
                <div className="p-6 md:p-8 flex flex-col items-center justify-between rounded-lg bg-[#d9d9d9] bg-opacity-20 shadow-md">
                    <img src="/assets/reports.png" alt="Full Reports" className="w-16 h-16 md:w-auto md:h-auto" />
                    <p className="font-montserrat font-semibold text-xl md:text-2xl lg:text-[28.8px] text-black text-center mt-4">
                        Full Reports
                    </p>
                </div>

                {/* Feature 4 */}
                <div className="p-6 md:p-8 flex flex-col items-center justify-between rounded-lg bg-[#d9d9d9] bg-opacity-20 shadow-md">
                    <img src="/assets/notif.png" alt="Notification" className="w-16 h-16 md:w-auto md:h-auto" />
                    <p className="font-montserrat font-semibold text-xl md:text-2xl lg:text-[28.8px] text-black text-center mt-4">
                        Notification
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Fitur;
