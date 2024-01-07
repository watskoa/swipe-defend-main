

const InfoSection = () => {
    return (
        <section className="items-center p-4 bg-base-200 px-6 md:px-10 mx-auto flex flex-col md:flex-row justify-between gap-4 md:gap-11 text-black mt-20">
        <aside className="items-center grid-flow-col">
            <p className="w-full md:w-96 text-3xl">What You Need to Know:</p>
        </aside>
        <div>
            <h1 className=" md:text-left">
                The credit scores provided are based on the <span className="font-bold">Swipe Defend® 3.0 model</span>. Lenders use a variety of credit scores and are likely to use a credit score different from <span className="font-bold">Swipe Defend® 3.0</span> to assess your creditworthiness.
                <span className="block mt-2 md:inline">
                    <h1 className="text-center text-xs md:text-left">
                        Subscription price is $29.95 per month (plus tax where applicable). Cancel anytime.
                    </h1>
                </span>
            </h1>
        </div>
    </section>
    );
};

export default InfoSection;