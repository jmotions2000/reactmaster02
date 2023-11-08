import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCoinTickers } from "../api";
import { styled } from "styled-components";

interface priceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;

      market_cap: number;

      market_cap_change_24h: number;

      percent_change_1h: number;

      percent_change_1y: number;

      percent_change_6h: number;

      percent_change_7d: number;

      percent_change_12h: number;

      percent_change_15m: number;

      percent_change_24h: number;

      percent_change_30d: number;

      percent_change_30m: number;

      percent_from_price_ath: number;

      price: number;

      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  width: 100%;
`;
const Container2 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  max-width: 500px;
  width: 100%;
  gap: 10px;

  div {
    color: ${(props) => props.theme.textColor};
    margin: 5px 0;
    flex: 100%;
    padding: 13px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    text-align: center;
  }
  span {
    color: ${(props) => props.theme.textColor};
    margin: 5px 0;
    flex: 100%;
    padding: 20px;
    text-align: center;
    font-size: 0.7rem;
    color: lightblue;
  }
`;

function Price() {
  const { coinId } = useParams();
  const { isLoading, data } = useQuery<priceData>(
    ["price", coinId],
    () => fetchCoinTickers(coinId!),
    {
      refetchInterval: 10000,
    }
  );
  return (
    <>
      <div>
        {isLoading ? (
          "Loading Price..."
        ) : (
          <Container>
            <Container2>
              <div>${data!.quotes.USD.price.toFixed(3)}</div>
              <div>Rank: {data?.rank}</div>
            </Container2>

            <Container2>
              <div>15분전: {data?.quotes.USD.percent_change_15m}%</div>
              <div>1시간전: {data?.quotes.USD.percent_change_1h}%</div>
            </Container2>
            <Container2>
              <div>하루 전: {data?.quotes.USD.percent_change_24h}%</div>
              <div>한달 전: {data?.quotes.USD.percent_change_30d}%</div>
            </Container2>
            <Container2>
              <span>Last Update: {data!.last_updated.toString()}</span>
            </Container2>
          </Container>
        )}
      </div>
    </>
  );
}

export default Price;
