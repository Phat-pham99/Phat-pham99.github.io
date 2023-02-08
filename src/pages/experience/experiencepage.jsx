import React from 'react';
import ExperiencePageComponent from "../../components/experience/experiencepage_component.jsx"
import "./experiencepage.css"

const ExperiencePage = () =>{

    return (
    <>
        <div className='body_experience flex flex-row justify-center'>
            <ExperiencePageComponent/>
        </div>
        <br/>
        <br/>
        <h1 className="text-red text-3xl text-center">Exchange-traded fund</h1>
        <p className=" xl:text-2xl md:xl sm:text-base">An exchange-traded fund (ETF) is a type of <a className ="text-orange hover:text-blue"href="https://en.wikipedia.org/wiki/Investment_fund">investment fund</a> and exchange-traded product, i.e. they are traded on stock exchanges.[1][2][3] ETFs are similar in many ways to mutual funds, except that ETFs are bought and sold from other owners throughout the day on stock exchanges whereas mutual funds are bought and sold from the issuer based on their price at day's end.[4] An ETF holds assets such as stocks, bonds, currencies, futures contracts, and/or commodities such as gold bars, and generally operates with an arbitrage mechanism designed to keep it trading close to its net asset value,[5] although deviations can occasionally occur. Most ETFs are index funds: that is, they hold the same securities in the same proportions as a certain stock market index or bond market index. The most popular ETFs in the U.S. replicate the S&P 500, the total market index, the NASDAQ-100 index, the price of gold, the "growth" stocks in the Russell 1000 Index, or the index of the largest technology companies.[6] With the exception of non-transparent actively managed ETFs, in most cases, the list of stocks that each ETF owns, as well as their weightings, is posted daily on the website of the issuer. The largest ETFs have annual fees of 0.03% of the amount invested, or even lower, although specialty ETFs can have annual fees well in excess of 1% of the amount invested. These fees are paid to the ETF issuer out of dividends received from the underlying holdings or from selling assets.
        </p>

    </>
    );
}
export default ExperiencePage;