import axios from "axios";
import useSWR from "swr";

export default function FetchSWR() {
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const responseSWR = useSWR(`/helloWorld`, fetcher, {
    refreshInterval: 1000,
  });

  return responseSWR;
}
