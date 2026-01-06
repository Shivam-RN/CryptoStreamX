import React from 'react'
import Image from 'next/image'
import DataTable from '@/components/DataTable'
import Link from 'next/link'
import { cn, formatPercentage } from '@/lib/utils'
import { TrendingDown, TrendingUp } from 'lucide-react'

const columns : DataTableColumn<TrendingCoin>[] = [
  {
    header: "Name", cellClassName: "name-cell", cell: (coin) =>{
      const item = coin.item
      return(
        <Link href={`/coins/${item.id}`}>
          <Image src={item.large} alt={item.name} width={36} height={36} />
          <p>{item.name}</p>
        </Link>
      )
    },  
  },{
      header:"24 Change",
      cellClassName: "name-cell",
      cell:(coin)=>{
        const item = coin.item;
        const isTrendingUp = item.data.price_change_percentage_24h.usd > 0;
        return(
          <div className={cn('price-change', isTrendingUp ? 'text-green-500' : 'text-red-500')}>
            <p>
             
              {isTrendingUp ? (
                <TrendingUp width={16} height={16} />
              ) : (
                <TrendingDown width={16} height={16} />
              )}
               {formatPercentage(item.data.price_change_percentage_24h.usd)}
            </p>
          </div>
        )
      }
    },
    {header:"Price", cellClassName:"price-cell", cell:(coin) => coin.item.data.price }  
]
const dummyTrendingcoins: TrendingCoin[] = [
  {
    item: {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'BTC',
      market_cap_rank: 1,
      thumb: '/logo.svg',
      large: '/logo.svg',
      data: {
        price: 89113.0,
        price_change_percentage_24h: {
          usd: 2.5,
        },
      },
    },
  },
  {
    item: {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      market_cap_rank: 2,
      thumb: '/logo.svg',
      large: '/logo.svg',
      data: {
        price: 4820.5,
        price_change_percentage_24h: {
          usd: -1.2,
        },
      },
    },
  },
];


const page = () => {
  return (
     <main className="main-container">
      <section className="home-grid">
       <div id='coin-overview'>
        <div className='header pt-2'>
          <Image src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png" alt="Bitcoin" width={56} height={56}/>
          <div className='info'>
            <p>Bitcoin / BTC</p>
            <h1>$93,591.00</h1>
          </div>
        </div>
       </div>
        <p>Trending Coins</p>
        <DataTable columns={columns} rowKey={(coin)=>coin.item.id} data={dummyTrendingcoins} tableClassName='trending-coins-table'/>
      </section>

      <section className="w-full mt-7 space-y-4">
        <p>Categories</p>
      </section>
    </main>
  )
}

export default page
