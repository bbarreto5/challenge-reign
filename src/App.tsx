import { useEffect, useState } from 'react';
import './App.css'
import Bar from "./Components/Bar";
import Button from "./Components/Button";
import Container from "./Components/Container";
import Card from './Components/Card';
import { getData } from "./Services";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import imgAngular from './Source/Img/image-138@2x.png'
import imgReact from './Source/Img/image-140@3x.png'
import imgVue from './Source/Img/image-141@3x.png'

interface IData {
  author: string,
  story_title: string,
  story_url: string,
  created_at: string,
}

const types = [
  {
    name: 'angular',
    value: 1,
    img: imgAngular
  },
  {
    name: 'react',
    value: 2,
    img: imgReact
  },
  {
    name: 'vue',
    value: 3,
    img: imgVue
  }
]


function App() {

  const [page, setPage] = useState<number>(-1);
  const [totalPages, setTotalPage] = useState<number>(0);
  const [type, setType] = useState<any>(1);
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
  }, [type])

  useEffect(() => {
    if (page !== -1) {
      getData(type, page).then(data => setData(dataFilter(data)));
    }
  }, [page])

  const handlePagination = (_: any, newPage: number) => {
    setPage(--newPage);
  }

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;

    setType(parseInt(value));
  };

  return (
    <div className="App">
      <Bar />
      <Container>
        <div className="container_buttons">
          <Button name="ALL" />
          <Button name="My faves" />
        </div>
        <div className=''>

          <div>
            <FormControl sx={{ width: 300 }}>
              <Select
                value={type}
                onChange={handleChange}
              >
                {
                  types.map((t) => (
                    <MenuItem
                      key={t.name}
                      value={t.value}
                    >
                      <div style={{ display:"flex" }}>
                        {<img src={t.img} alt="" style={{ width: 20, height: 20, marginRight: 10 }} />}
                        {t.name}
                      </div>

                    </MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </div>

          <div className='list_article'>
            {
              data.map((d: IData, index: number) => <Card key={index} date={d.created_at} description={d.story_title} />)
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
