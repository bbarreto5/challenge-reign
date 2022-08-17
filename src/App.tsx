import './App.css'
import Bar from "./Components/Bar";
import Button from "./Components/Button";
import Container from "./Components/Container";



function App() {
  return (
    <div className="App">
      <Bar/>
      <Container>
        <div className="container_buttons">
          <Button name="ALL"/>
          <Button name="My faves"/>
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
