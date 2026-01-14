import Image from 'next/image';
import { fetcher } from '@/lib/coingecko.actions';
import { formatCurrency } from '@/lib/utils';
import { CoinOverviewFallback } from './fallback';

const CoinOverview = async () => {
  try {
    const coin = await fetcher<CoinDetailsData>('/coins/bitcoin', {
      dex_pair_format: 'symbol',
    });

    const price = coin.market_data?.current_price?.usd ?? 0;

    return (
      <div id="coin-overview">
        <div className="header pt-2 flex items-center gap-3">
          <Image
            src={coin.image.large}
            alt={coin.name}
            width={56}
            height={56}
            priority
          />
          <div className="info">
            <p>
              {coin.name} / {coin.symbol.toUpperCase()}
            </p>
            <h1>{formatCurrency(price)}</h1>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching coin overview:', error);
    return <CoinOverviewFallback />;
  }
};

export default CoinOverview;
