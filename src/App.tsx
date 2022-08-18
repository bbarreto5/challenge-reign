import { useEffect, useState } from 'react';
import './App.css'
import Bar from "./Components/Bar";
import Button from "./Components/Button";
import Container from "./Components/Container";
import Card from './Components/Card';
import { getData } from "./Services";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface IData {
  author: string,
  story_title: string,
  story_url: string,
  created_at: string,
}


function App() {

  const [page, setPage] = useState<number>(-1);
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
      created_at: d.created_at,
    }))
    console.log({ auxData });
    return auxData;
  }

  useEffect(() => {
    setPage(-1);
    getData(type, 0).then(data => {
      setTotalPage(data.nbPages);
      setData(dataFilter(data))
    });
  }, [])

  useEffect(() => {
    if (page != -1) {
      getData(type, page).then(data => setData(dataFilter(data)));
    }
  }, [page])

  const handlePagination = (_: any, newPage: number) => {
    setPage(--newPage);
  }

  return (
    <div className="App">
      <Bar />
      <Container>
        <div className="container_buttons">
          <Button name="ALL" />
          <Button name="My faves" />
        </div>
        <div className=''>

          <div className='list_article'>
            {
              data.map( (d:IData) => <Card date={d.created_at} description={d.story_title}/>)
            }
          </div>

        </div>
        <div className='container_pagination'>
          <Stack spacing={2}>
            <Pagination count={totalPages} variant="outlined" shape="rounded" onChange={handlePagination} />
          </Stack>
        </div>
      </Container>
    </div>
  );
}

export default App;
