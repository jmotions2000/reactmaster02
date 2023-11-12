import styled from "styled-components";
import { Link } from "react-router-dom";

import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};

  border-radius: 25px;
  margin-bottom: 15px;
  border: 1px solid white;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.3 s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;
interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}
const IButton = styled.button`
  margin-left: 20px;
  padding: 5px 15px;
  border-radius: 25px;
  border: none;
`;

const ButtonView = styled.div`
  display: flex;
  justify-content: right;
  align-items: right;

  padding: 10px 20px;
  border-radius: 10px;
`;
const ButtonViewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: right;
  button {
    position: relative;
    left: 150px;
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
  }
`;

function Coins() {
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
  /* ..// const [coins, setCoins] = useState<CoinInterface[]>([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch("https://api.coinpaprika.com/v1/coins");
  //     const json = await response.json();
  //     setCoins(json.slice(0, 100));
  //     setLoading(false);
  //   })();
  // }, []); */

  return (
    <Container>
      <Helmet>
        <title>COINS</title>
      </Helmet>

      <Header>
        <ButtonView>
          <ButtonViewItem>
            <IButton onClick={toggleDarkAtom}>Mode</IButton>
          </ButtonViewItem>
        </ButtonView>
        <Title>Coins III</Title>
      </Header>
      {isLoading ? (
        <Loader>"LOading..."</Loader>
      ) : (
        <CoinList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={coin}>
                <Img
                  src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
}
// 리액트 라우터 6부터는
// Link to={`/${coin.id}`} state={coin.name} 로 따로 적으시면 됩니다! 버전이 바뀌면서 state가 to로부터 분리되었네요
export default Coins;
