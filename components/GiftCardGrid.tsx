'use client';

import Image from 'next/image';

const GIFT_CARDS = [
    {
        amount: '$750',
        logo: '/images/amazon-logo.svg',
        color: 'bg-[#FF9900]',
        textColor: 'text-black',
    },
    {
        amount: '$750',
        logo: '/images/shein-logo.svg',
        color: 'bg-black',
        textColor: 'text-white',
    },
    {
        amount: '$750',
        logo: '/images/target-logo.svg',
        color: 'bg-[#CC0000]',
        textColor: 'text-white',
    },
];

export default function GiftCardGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {GIFT_CARDS.map((card, index) => (
                <div
                    key={index}
                    className={`${card.color} rounded-2xl p-6 flex flex-col items-center justify-center 
                      shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer
                      min-h-[160px] border-2 border-black group`}
                >
                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm group-hover:shadow-md transition-shadow">
                        <div className="w-10 h-10 relative">
                            <Image
                                src={card.logo}
                                alt="Gift Card Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>
                    <span className={`text-4xl font-bold ${card.textColor}`} style={{ fontFamily: 'var(--font-arbutus)' }}>
                        {card.amount}
                    </span>
                </div>
            ))}
        </div>
    );
}
