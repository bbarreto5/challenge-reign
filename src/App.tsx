import { useEffect, useState } from 'react';
import './App.css';
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
import imgAngular from './Source/Img/image-138@2x.png';
import imgReact from './Source/Img/image-140@3x.png';
import imgVue from './Source/Img/image-141@3x.png';
import moment from 'moment';

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

  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPage] = useState<number>(0);
  const [type, setType] = useState<any>(localStorage.getItem("type") || 1);
  const [data, setData] = useState<Array<IData>>([]);
  const [faves, setFaves] = useState<boolean>(false);
  const [dataFaves, setDataFaves] = useState<Array<IData>>([]);

  useEffect(() => {
    localStorage.setItem("type", type);
    setPage(0);
    setData([]);
    getData(type, 0).then(data => {
      setTotalPage(data.nbPages);
      setData(dataFilter(data))
    });
  }, [type])

  useEffect(() => {
    const favesLocal = localStorage.getItem("faves");
    if (favesLocal && favesLocal !== undefined && favesLocal !== "undefined") {
      setDataFaves(JSON.parse(favesLocal))
    };
  }, [])

  const dataFilter = (data: any): Array<IData> => {
    var auxData: Array<IData> = [];
    const filter = data.hits.filter((d: any) => (d.author && d.story_title && d.story_url && d.created_at))
    auxData = filter.map((d: any) => ({
      author: d.author,
      story_title: d.story_title,
      story_url: d.story_url,
      created_at: d.created_at,
    }))
    return auxData;
  }

  const handlePagination = (_: any, newPage: number) => {
    setData([]);
    setPage(newPage - 1);
    getData(type, newPage - 1).then(data => setData(dataFilter(data)));
  }

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;

    setType(parseInt(value));
  };

  const handleSwithData = () => setFaves(!faves);

  const handleDataFaves = (state: boolean, newData: IData) => {
    setDataFaves([]);
    let aux: Array<IData> = []
    if (state) {
      dataFaves.push(newData);
      aux = dataFaves.map(d => d);
    } else {
      aux = dataFaves.filter(
        d => (
          d.author !== newData.author &&
          d.story_title !== newData.story_title &&
          d.story_url !== newData.story_url &&
          d.created_at !== newData.created_at
        )
      )
    }
    faves
      ? setTimeout(() => {
        setDataFaves(aux);
      }, 1)
      : setDataFaves(aux);
    localStorage.setItem("faves", JSON.stringify(aux))
  }

  const isFavotite = (data: IData) => {
    return dataFaves.find(
      d => (
        d.author === data.author &&
        d.story_title === data.story_title &&
        d.story_url === data.story_url &&
        d.created_at === data.created_at
      )
    ) ? true : false;
  }

  return (
    <div className="App">
      <Bar />
      <Container>
        <div className="container_buttons">
          <Button name="ALL" active={!faves} handle={handleSwithData} />
          <Button name="My faves" active={faves} handle={handleSwithData} />
        </div>
        <div className=''>

          {
            !faves && (
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
                          <div style={{ display: "flex" }}>
                            {<img src={t.img} alt="" style={{ width: 20, height: 20, marginRight: 10 }} />}
                            {t.name}
                          </div>

                        </MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </div>
            )
          }

          <div className='list_article'>
            {
              faves && dataFaves.map((d: IData, index: number) =>
                <Card
                  key={d.story_title}
                  date={`${moment(d.created_at).fromNow()} by ${d.author}`}
                  description={d.story_title}
                  handle={(state) => handleDataFaves(state, d)}
                  favorite={true}
                  url={d.story_url}
                />
              )
            }
            {
              !faves && data.map((d: IData, index: number) =>
                <Card
                  key={index}
                  date={`${moment(d.created_at).fromNow()} by ${d.author}`}
                  description={d.story_title}
                  handle={(state) => handleDataFaves(state, d)}
                  favorite={isFavotite(d)}
                  url={d.story_url}
                />
              )
            }
          </div>

        </div>
        <div className='container_pagination'>
          <Stack spacing={2}>
            <Pagination
              page={page + 1}
              count={totalPages}
              variant="outlined"
              shape="rounded"
              onChange={handlePagination}
              sx={{
                '.Mui-selected':{
                  backgroundColor: "#1797ff !important"
                }
              }}
            />
          </Stack>
        </div>
      </Container>
    </div>
  );
}

export default App;
