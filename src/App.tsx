import { useEffect, useState } from 'react';
import './App.css'
import Bar from "./Components/Bar";
import Button from "./Components/Button";
import Container from "./Components/Container";
import { getData } from "./Services";

interface IData {
  author: string,
  story_title: string,
  story_url: string,
  reated_at: string,
}


function App() {

  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPage] = useState<number>(0);
  const [type, setType] = useState<1 | 2 | 3>(1);
  const [data, setData] = useState<Array<IData>>([]);

  const dataFilter = (data: any): Array<IData> => {
    var auxData: Array<IData> = [];
    const filter = data.hits.filter((d: any) => (d.author && d.story_title && d.story_url && d.created_at))
    auxData = filter.map((d: any) => ({
      author: d.author,
      story_title: d.story_title,
      story_url: d.story_url,
      reated_at: d.reated_at,
    }))
    return auxData;
  }

  useEffect(() => {
    getData(1, page).then(data => setData(dataFilter(data)));
  }, [])




  return (
    <div className="App">
      <Bar />
      <Container>
        <div className="container_buttons">
          <Button name="ALL" />
          <Button name="My faves" />
        </div>
        <div className=''>

        </div>
        <div className=''>

        </div>
      </Container>
    </div>
  );
}

export default App;
